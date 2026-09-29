import * as Phaser from 'phaser'
import type {
  BuildState,
  GameState,
  PlayerSnapshot,
  Rotation,
} from '../../shared/gameProtocol'
import {
  PDZZ_CHARACTERS,
  PDZZ_COMPONENTS,
  PDZZ_MAP_CATALOG,
} from '../../shared/pdzzConfig'

const PLAYER_COLLIDER_WIDTH = 30
const PLAYER_COLLIDER_HEIGHT = 60
// The APK's league stage is a fixed 750x1670 logical viewport. The haystack
// level is authored in that same coordinate space: its grass line is at world
// y=1300 and remains near the bottom of the play area. Do not fit the full
// 2150px level into the portrait viewport; the original camera shows a 750px
// slice and pans horizontally during the race.
const HAYSTACK_PLAY_ZOOM = 1
// The APK's haystack editor keeps a small upper/left inset inside the
// translated edit bounds. These values put the grass edge and haystack at the
// same logical pixels as the league recording before the tray is shown.
const HAYSTACK_CAMERA_X = 100
const HAYSTACK_CAMERA_Y = 50
const HAYSTACK_CAMERA_BOUND_Y = 0
const CHARACTER_AVATAR_CROPS: Record<string, { x: number; y: number; width: number; height: number }> = {
  rabbit2: { x: 36, y: 62, width: 130, height: 180 },
  pig: { x: 34, y: 16, width: 208, height: 224 },
}

function cactusProgress(age: number) {
  if (age < 0.3 || age >= 2.1) return 0
  if (age < 0.8) {
    const t = Math.max(0, Math.min(1, (age - 0.3) / 0.5))
    // The APK uses Laya.Ease.bounceIn for the 0.5s extension.
    if (t < 1 / 2.75) return 7.5625 * t * t
    if (t < 2 / 2.75) {
      const adjusted = t - 1.5 / 2.75
      return 7.5625 * adjusted * adjusted + 0.75
    }
    if (t < 2.5 / 2.75) {
      const adjusted = t - 2.25 / 2.75
      return 7.5625 * adjusted * adjusted + 0.9375
    }
    const adjusted = t - 2.625 / 2.75
    return 7.5625 * adjusted * adjusted + 0.984375
  }
  if (age < 1.6) return 1
  const t = Math.max(0, Math.min(1, (2.1 - age) / 0.5))
  if (t < 1 / 2.75) return 7.5625 * t * t
  if (t < 2 / 2.75) {
    const adjusted = t - 1.5 / 2.75
    return 7.5625 * adjusted * adjusted + 0.75
  }
  if (t < 2.5 / 2.75) {
    const adjusted = t - 2.25 / 2.75
    return 7.5625 * adjusted * adjusted + 0.9375
  }
  const adjusted = t - 2.625 / 2.75
  return 7.5625 * adjusted * adjusted + 0.984375
}

type SceneCallbacks = {
  onReady: (scene: PartyScene) => void
  onPlace: (x: number, y: number) => void
  initialState?: GameState | null
  onMapReady?: (mapId: string) => void
}

type PlayerRenderTarget = {
  x: number
  y: number
  direction: -1 | 1
  snap: boolean
}

export class PartyScene extends Phaser.Scene {
  private currentState: GameState | null = null
  private currentBuild: BuildState | null = null
  private currentCountdown: number | null = null
  private localPlayerId: string | null = null
  private callbacks: SceneCallbacks
  // Keep a cropped single-pose fallback for camera following and for browsers
  // where the Laya WebGL canvas is delayed. Never draw the full extracted
  // sprite sheet: that is what caused the mixed-pet artifact.
  private players = new Map<string, Phaser.GameObjects.Image>()
  private playerTargets = new Map<string, PlayerRenderTarget>()
  private lastRenderedBuildSignature = ''
  private lastRenderedUiSignature = ''
  private nameplates = new Map<string, Phaser.GameObjects.Text>()
  private worldBackground?: Phaser.GameObjects.Rectangle
  private worldDecorations: Phaser.GameObjects.GameObject[] = []
  private worldPlatforms: Phaser.GameObjects.GameObject[] = []
  private animatedMapSprites: Array<{
    sprite: Phaser.GameObjects.Image
    map: (typeof PDZZ_MAP_CATALOG)[number]
    prefix: string
    period: number
  }> = []
  private renderedMapId: string | null = null
  private renderedMapAssetsReady = false
  private nextMapAssetProbeAt = 0
  private gridGraphics?: Phaser.GameObjects.Graphics
  private buildStartLabel?: Phaser.GameObjects.Text
  private trapSprites = new Map<string, Phaser.GameObjects.Container>()
  private trapRenderSignatures = new Map<string, string>()
  private trapPhaseStartedAt = new Map<string, number>()
  private nextTrapAnimationProbeAt = 0
  private uiObjects: Phaser.GameObjects.GameObject[] = []
  private hudCountdownText?: Phaser.GameObjects.Text
  private hudCountdownRoundText?: Phaser.GameObjects.Text
  private hudCountdownTargetText?: Phaser.GameObjects.Text
  private previewSprite?: Phaser.GameObjects.Image
  private previewGraphics?: Phaser.GameObjects.Graphics
  private previewText?: Phaser.GameObjects.Text
  private previewCell = { x: 0, y: 0 }
  private draggingPreview = false
  private currentPreviewRotation: Rotation = 0
  private lastStatus: GameState['status'] | null = null
  private readonly initialMapId: string | null

  private uiTextureFrame(frame: string) {
    return this.textures.exists('pdzz-ui') ? this.resolveAtlasFrame('pdzz-ui', frame) : null
  }

  private componentFor(trapId: string) {
    return PDZZ_COMPONENTS.find((component) => component.id === trapId) ?? null
  }

  private componentTexture(component: ReturnType<PartyScene['componentFor']>) {
    if (!component?.iconFrame || !component.iconSource) return null
    const directKey = `pdzz-component-image-${component.id}`
    if (component.iconAsset && this.textures.exists(directKey)) {
      return { key: directKey, frame: undefined }
    }
    const key = component.iconSource === 'game' ? 'pdzz-game' : 'pdzz-components'
    if (!this.textures.exists(key)) return null
    const frame = this.resolveAtlasFrame(key, component.iconFrame)
    return frame ? { key, frame } : null
  }

  private trapTexture(
    component: ReturnType<PartyScene['componentFor']>,
    trap: GameState['level']['traps'][number],
  ) {
    if (!component || !this.textures.exists('pdzz-game')) return this.componentTexture(component)
    const frameName = (() => {
      if (trap.trapId === 'triggerhazard') {
        if (trap.phase === 'active') return 'triggerhazard.png'
        if (trap.phase === 'reverting') return 'triggerhazard2.png'
        return 'triggerhazardhide.png'
      }
      if (trap.trapId === 'fortunecat' && trap.phase === 'active') return 'fortunecat_active.png'
      if (trap.trapId === 'gas') {
        return `gas${(Math.floor(this.time.now / 250) % 3) + 1}.png`
      }
      return null
    })()
    if (!frameName) return this.componentTexture(component)
    const frame = this.resolveAtlasFrame('pdzz-game', frameName)
    return frame ? { key: 'pdzz-game', frame } : this.componentTexture(component)
  }

  private resolveAtlasFrame(key: string, frame: string) {
    if (!this.textures.exists(key)) return null
    const texture = this.textures.get(key)
    if (texture.has(frame)) return frame
    const names = texture.getFrameNames()
    return names.find((name) => name === frame || name.endsWith(`/${frame}`)) ?? null
  }

  private mapSpriteKey(mapId: string, sprite: string) {
    return `pdzz-map-sprite-${mapId}-${sprite.split('/').pop() ?? sprite}`
  }

  private mapTexture(
    map: (typeof PDZZ_MAP_CATALOG)[number],
    sprite: string | null | undefined,
  ) {
    if (!sprite) return null
    const assetKey = this.mapSpriteKey(map.id, sprite)
    if (this.textures.exists(assetKey)) return { key: assetKey, frame: undefined }
    const atlasKey = `pdzz-map-atlas-${map.id}`
    const baseFrame = `${sprite.split('/').pop() ?? sprite}.png`
    const frame = this.resolveAtlasFrame(atlasKey, baseFrame)
    if (frame) {
      return { key: atlasKey, frame }
    }
    return null
  }

  private mapDirectTexture(mapId: string, fileName: string) {
    const key = `pdzz-map-direct-${mapId}-${fileName}`
    return this.textures.exists(key) ? { key, frame: undefined } : null
  }

  private mapAssetsReady(map: (typeof PDZZ_MAP_CATALOG)[number], state: GameState) {
    const sprites = new Set<string>()
    if (map.skySprite) sprites.add(map.skySprite)
    for (const decoration of state.level.decorations) sprites.add(decoration.sprite)
    return Array.from(sprites).every((sprite) => this.mapTexture(map, sprite) !== null)
  }

  private mapHasRenderableTexture(map: (typeof PDZZ_MAP_CATALOG)[number], state: GameState) {
    return Boolean(
      (map.skySprite && this.mapTexture(map, map.skySprite)) ||
      state.level.decorations.some((decoration) => this.mapTexture(map, decoration.sprite)),
    )
  }

  private addMapImage(
    map: (typeof PDZZ_MAP_CATALOG)[number],
    sprite: string,
    x: number,
    y: number,
    scale: number,
    angle: number,
    alpha: number,
    flipX: boolean,
    flipY: boolean,
    zOrder: number,
  ) {
    const texture = this.mapTexture(map, sprite)
    if (!texture) return null
    return this.add.image(x, y, texture.key, texture.frame)
      .setOrigin(0.5, 0.5)
      .setScale(scale)
      .setAngle(angle)
      .setAlpha(alpha)
      .setFlipX(flipX)
      .setFlipY(flipY)
      .setDepth(-8 + zOrder)
  }

  private isSupported(trapId: string) {
    return this.componentFor(trapId)?.placement === 'supported'
  }

  private componentCells(trapId: string, rotation: Rotation) {
    const component = this.componentFor(trapId)
    if (!component) return []
    const cells = component.cells?.length ? component.cells : [[0, 0]]
    return cells.map(([x, y]) => {
      if (rotation === 90) return { x: component.height - 1 - y, y: x }
      if (rotation === 180) return { x: component.width - 1 - x, y: component.height - 1 - y }
      if (rotation === 270) return { x: y, y: component.width - 1 - x }
      return { x, y }
    })
  }

  constructor(callbacks: SceneCallbacks) {
    super('PartyScene')
    this.callbacks = callbacks
    this.initialMapId = callbacks.initialState?.level.mapId ?? null
  }

  private loadMapAssets(map: (typeof PDZZ_MAP_CATALOG)[number]) {
    if (map.atlasAsset && map.atlasImageAsset && !this.textures.exists(`pdzz-map-atlas-${map.id}`)) {
      this.load.atlas(
        `pdzz-map-atlas-${map.id}`,
        map.atlasImageAsset,
        map.atlasAsset,
      )
    }
    for (const [sprite, asset] of Object.entries(map.spriteAssets ?? {})) {
      const key = this.mapSpriteKey(map.id, sprite)
      if (!this.textures.exists(key)) this.load.image(key, asset)
    }
    if (map.skySprite && !map.spriteAssets?.[map.skySprite]) {
      const skyName = map.skySprite.split('/').pop() ?? 'sky'
      const skyAsset = Object.entries(map.spriteAssets ?? {}).find(([sprite]) => sprite === map.skySprite)?.[1]
        ?? Object.entries(map.spriteAssets ?? {}).find(([sprite]) => {
          const name = sprite.split('/').pop() ?? ''
          return name.includes(skyName) || (skyName === 'bluesky' && name === 'skyblue')
        })?.[1]
        ?? `/game/assets/pdzz/maps/${map.id}/${skyName}.png`
      const key = this.mapSpriteKey(map.id, map.skySprite)
      if (!this.textures.exists(key)) this.load.image(key, skyAsset)
    }
    if (map.id === 'levelclassic') {
      const key = `pdzz-map-direct-${map.id}-groundtile`
      if (!this.textures.exists(key)) this.load.image(key, '/game/assets/pdzz/maps/levelclassic/groundtile.png')
    }
  }

  preload() {
    this.load.atlas(
      'pdzz-components',
      '/game/assets/pdzz/componenticon.png',
      '/game/assets/pdzz/componenticon.json',
    )
    this.load.atlas(
      'pdzz-game',
      '/game/assets/pdzz/game.png',
      '/game/assets/pdzz/game.json',
    )
    this.load.atlas(
      'pdzz-ui',
      '/game/assets/pdzz/ui/ui.png',
      '/game/assets/pdzz/ui/ui.json',
    )
    for (const component of PDZZ_COMPONENTS) {
      if (component.iconAsset) {
        this.load.image(`pdzz-component-image-${component.id}`, component.iconAsset)
      }
    }
    // The build screen only needs the selected map. Loading every map atlas
    // here delayed the real map behind an empty CSS sky. Defer the remaining
    // catalog until after the first scene has rendered; later random rounds
    // still have access to the same extracted assets.
    const initialMap = PDZZ_MAP_CATALOG.find((map) => map.id === this.initialMapId)
    if (initialMap) this.loadMapAssets(initialMap)
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      const remainingMaps = PDZZ_MAP_CATALOG.filter((map) => map.id !== this.initialMapId)
      for (const map of remainingMaps) this.loadMapAssets(map)
      if (remainingMaps.length > 0) this.load.start()
    })
    for (const character of PDZZ_CHARACTERS) {
      if (character.imageAsset) {
        this.load.image(`character-avatar-${character.refID}`, character.imageAsset)
      }
    }
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)')
    this.physics.world.setBounds(0, 0, 3072, 672)
    this.cameras.main.setBounds(0, 0, 3072, 672)
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => this.handlePointerMove(pointer))
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => this.handlePointerDown(pointer))
    this.input.on('pointerup', () => {
      if (this.draggingPreview) {
        this.draggingPreview = false
        this.callbacks.onPlace(this.previewCell.x, this.previewCell.y)
      }
    })
    this.input.on(
      'wheel',
      (
        _pointer: Phaser.Input.Pointer,
        _gameObjects: Phaser.GameObjects.GameObject[],
        deltaX: number,
        deltaY: number,
      ) => {
        if (this.currentState?.status !== 'BUILDING') return
        this.cameras.main.scrollX += deltaX + deltaY
      },
    )
    this.callbacks.onReady(this)
    this.renderState()
  }

  update(time: number) {
    this.updatePlayerSprites(this.game.loop.delta)
    // State can arrive before Phaser has finished decoding an image loaded by
    // the map manifest. Retry the authored layer after the loader settles so
    // the first build frame cannot be stuck on the fallback color.
    if (this.currentState && !this.renderedMapAssetsReady && time >= this.nextMapAssetProbeAt) {
      this.nextMapAssetProbeAt = time + 100
      const map = PDZZ_MAP_CATALOG.find((item) => item.id === this.currentState?.level.mapId)
      if (
        !map ||
        this.mapAssetsReady(map, this.currentState) ||
        this.mapHasRenderableTexture(map, this.currentState)
      ) this.renderState()
    }
    // The haystack level swaps the three grass frames in the APK runtime;
    // keeping that animation on the map layer avoids a static screenshot
    // being mistaken for the original scene.
    for (const animated of this.animatedMapSprites) {
      const frameNumber = Math.floor(time / (animated.period * 1000)) % 3 + 1
      const texture = this.mapTexture(animated.map, `${animated.prefix}${frameNumber}`)
      if (texture) animated.sprite.setTexture(texture.key, texture.frame)
    }
    if (this.currentState && time >= this.nextTrapAnimationProbeAt) {
      this.nextTrapAnimationProbeAt = time + 50
      this.drawPlacedTraps(this.currentState, this.currentBuild)
    }
    this.updateHudCountdown()
    if (this.currentState && this.currentState.status !== 'BUILDING') {
      this.updateCamera(this.currentState)
    }
  }

  setState(
    state: GameState | null,
    localPlayerId: string | null,
    build: BuildState | null = null,
    countdown: number | null = null,
  ) {
    this.currentState = state
    this.currentBuild = build
    this.localPlayerId = localPlayerId
    this.currentCountdown = countdown
    if (!state) return
    this.renderState()
  }

  private renderState() {
    const state = this.currentState
    if (!state) return
    this.drawLevel(state)
    this.drawPlacedTraps(state, this.currentBuild)
    const buildSignature = JSON.stringify({ status: state.status, build: this.currentBuild })
    if (buildSignature !== this.lastRenderedBuildSignature) {
      this.drawBuildGrid(state, this.currentBuild)
      this.lastRenderedBuildSignature = buildSignature
    }
    this.drawPlayers(state.players)
    const uiSignature = JSON.stringify({
      status: state.status,
      round: state.round,
      countdown: this.currentCountdown,
      players: state.players.map((player) => ({ id: player.id, score: player.score, alive: player.alive })),
    })
    if (uiSignature !== this.lastRenderedUiSignature) {
      this.drawGameUi(state)
      this.lastRenderedUiSignature = uiSignature
    }
    this.updateCamera(state)
  }

  private drawLevel(state: GameState) {
    const map = PDZZ_MAP_CATALOG.find((item) => item.id === state.level.mapId)
    const mapAssetsReady = !map || this.mapAssetsReady(map, state)
    if (
      this.renderedMapId === state.level.mapId &&
      this.worldDecorations.length > 0 &&
      this.renderedMapAssetsReady
    ) return
    for (const decoration of this.worldDecorations) decoration.destroy()
    for (const platform of this.worldPlatforms) platform.destroy()
    this.animatedMapSprites = []
    this.worldDecorations = []
    this.worldPlatforms = []
    this.renderedMapId = state.level.mapId
    // Keep the readiness bit false until every authored sprite is available.
    // This lets a late atlas/image load trigger a complete redraw instead of
    // permanently leaving the build screen on the blue fallback background.
    this.renderedMapAssetsReady = false
    this.physics.world.setBounds(0, 0, state.level.width, state.level.height)
    const haystackMap = state.level.mapId === 'levelhaystack2' || state.level.mapId === 'levelhaystackbattle2'
    // The server translates the APK view-bounds origin to world (0, 0).
    this.cameras.main.setBounds(
      0,
      haystackMap ? HAYSTACK_CAMERA_BOUND_Y : 0,
      state.level.width,
      state.level.height - (haystackMap ? HAYSTACK_CAMERA_BOUND_Y : 0),
    )
    if (!map?.skySprite) {
      this.worldBackground = this.add.rectangle(
        state.level.width / 2,
        state.level.height / 2,
        state.level.width,
        state.level.height,
        0x4b91b7,
      ).setDepth(-30)
      this.worldDecorations.push(this.worldBackground)
    }

    if (!map) {
      this.renderedMapAssetsReady = true
      return
    }

    const skyTexture = this.mapTexture(map, map.skySprite)
    if (skyTexture) {
      const frame = this.textures.get(skyTexture.key).get(skyTexture.frame)
      const sky = this.add.tileSprite(
        state.level.width / 2,
        state.level.height / 2,
        state.level.width,
        state.level.height,
        skyTexture.key,
        skyTexture.frame,
      ).setOrigin(0.5)
        // APK sky strips are authored at their level size. Repeat only after
        // scaling the strip to the complete map bounds.
        .setTileScale(
          state.level.width / Math.max(1, frame.width),
          state.level.height / Math.max(1, frame.height),
        )
        .setDepth(-29)
      this.worldDecorations.push(sky)
    }

    const sortedDecorations = [...state.level.decorations].sort(
      (left, right) => (left.zOrder ?? 0) - (right.zOrder ?? 0),
    )
    for (const decoration of sortedDecorations) {
      const texture = this.mapTexture(map, decoration.sprite)
      if (!texture) continue
      const sprite = this.add.image(
        decoration.x,
        decoration.y,
        texture.key,
        texture.frame,
      )
        .setOrigin(0.5, 0.5)
        .setAngle(decoration.angle)
        .setAlpha(decoration.alpha)
        .setFlipX(decoration.flipX)
        .setFlipY(decoration.flipY)
        .setDepth(-8 + (decoration.zOrder ?? 0))
      if (
        decoration.isSliced &&
        decoration.slicedWidth &&
        decoration.slicedHeight &&
        decoration.sprite.endsWith('/ground')
      ) {
        // The APK's grass/soil image is a 202px strip. Its scene entry is a
        // sliced width, but repeating the strip keeps every grass tuft sharp
        // instead of stretching a single tuft across the whole level.
        sprite.destroy()
        const ground = this.add.tileSprite(
          decoration.x,
          decoration.y,
          decoration.slicedWidth,
          decoration.slicedHeight,
          texture.key,
          texture.frame,
        )
          .setOrigin(0.5, 0.5)
          .setAngle(decoration.angle)
          .setAlpha(decoration.alpha)
          .setDepth(-8 + (decoration.zOrder ?? 0))
        this.worldDecorations.push(ground)
      } else if (decoration.isSliced && decoration.slicedWidth && decoration.slicedHeight) {
        sprite.destroy()
        const slice = decoration.sprite.endsWith('/groundtile')
          ? { left: 234, right: 2, top: 2, bottom: 2 }
          : { left: 1, right: 1, top: 1, bottom: 1 }
        const sliced = this.add.nineslice(
          decoration.x,
          decoration.y,
          texture.key,
          texture.frame,
          decoration.slicedWidth,
          decoration.slicedHeight,
          slice.left,
          slice.right,
          slice.top,
          slice.bottom,
        )
          .setOrigin(0.5, 0.5)
          .setAngle(decoration.angle)
          .setAlpha(decoration.alpha)
          .setDepth(-8 + (decoration.zOrder ?? 0))
        this.worldDecorations.push(sliced)
      } else {
        sprite.setScale(decoration.scale)
        const grassAnimation = decoration.sprite.match(/^(.*\/grass)([hms])1$/)
        if (grassAnimation) {
          const period = grassAnimation[2] === 's' ? 0.28 : grassAnimation[2] === 'm' ? 0.27 : 0.30
          this.animatedMapSprites.push({
            sprite,
            map,
            prefix: `${grassAnimation[1]}${grassAnimation[2]}`,
            period,
          })
        }
        this.worldDecorations.push(sprite)
      }
    }
    this.renderedMapAssetsReady = mapAssetsReady
    if (mapAssetsReady) this.callbacks.onMapReady?.(state.level.mapId)
  }

  setPlayerFallbackVisible(playerId: string, visible: boolean) {
    this.players.get(playerId)?.setAlpha(visible ? 1 : 0)
  }

  private addTextureImage(
    container: Phaser.GameObjects.Container,
    texture: { key: string; frame?: string },
    x: number,
    y: number,
    scale = 1,
    originX = 0.5,
    originY = 0.5,
  ) {
    const frame = this.textures.get(texture.key).get(texture.frame ?? '__BASE')
    if (!frame) return null
    const image = this.add.image(x, y, texture.key, texture.frame)
      .setOrigin(originX, originY)
      .setScale(scale)
    container.add(image)
    return image
  }

  private addGameImage(
    container: Phaser.GameObjects.Container,
    frameName: string,
    x: number,
    y: number,
    scale = 1,
    originX = 0.5,
    originY = 0.5,
  ) {
    const frame = this.resolveAtlasFrame('pdzz-game', frameName)
    if (!frame) return null
    return this.addTextureImage(container, { key: 'pdzz-game', frame }, x, y, scale, originX, originY)
  }

  private trapVisualSignature(trap: GameState['level']['traps'][number]) {
    const phase = trap.phase ?? 'idle'
    const animationStep = trap.trapId === 'triggerspikes'
      ? Math.floor((this.time.now - (this.trapPhaseStartedAt.get(trap.instanceId) ?? this.time.now)) / 50)
      : 0
    const cactusAnimationStep = trap.trapId === 'triggerhazard'
      ? Math.floor((this.time.now - (this.trapPhaseStartedAt.get(trap.instanceId) ?? this.time.now)) / 50)
      : 0
    const gasFrame = trap.trapId === 'gas' ? Math.floor(this.time.now / 250) % 3 : 0
    return [
      trap.trapId,
      phase,
      trap.rotation,
      trap.visualRotation ?? trap.rotation,
      trap.offsetX ?? 0,
      trap.offsetY ?? 0,
      animationStep,
      cactusAnimationStep,
      gasFrame,
    ].join('|')
  }

  private rebuildTrapVisual(
    container: Phaser.GameObjects.Container,
    state: GameState,
    trap: GameState['level']['traps'][number],
    component: NonNullable<ReturnType<PartyScene['componentFor']>>,
  ) {
    const cell = state.level.cellSize
    const phase = trap.phase ?? 'idle'
    const startedAt = this.trapPhaseStartedAt.get(trap.instanceId) ?? this.time.now
    const age = Math.max(0, (this.time.now - startedAt) / 1000)
    container.removeAll(true)

    if (trap.trapId === 'triggerspikes') {
      // This is the APK Iv component hierarchy. Its entity origin is the
      // bottom centre of the platform, not the centre of the occupied cells.
      const defaultY = 20 - 36
      const activeY = -36 - 8
      let topY = defaultY
      let spikeY = defaultY
      let spikeScaleY = 0.3
      let springScaleY = 0.3
      if (phase === 'warning') {
        topY = age < 0.5 && Math.floor(age / 0.05) % 2 === 1 ? defaultY - 3 : defaultY
        const progress = Phaser.Math.Clamp((age - 0.5) / 0.05, 0, 1)
        spikeY = Phaser.Math.Linear(defaultY, activeY, progress)
        spikeScaleY = Phaser.Math.Linear(0.3, 0.85, progress)
        springScaleY = 0.3
      } else if (phase === 'active') {
        spikeY = activeY
        spikeScaleY = 0.85
        springScaleY = 0.85
      } else if (phase === 'reverting') {
        const progress = Phaser.Math.Clamp(age / 0.05, 0, 1)
        spikeY = Phaser.Math.Linear(activeY, defaultY, progress)
        spikeScaleY = Phaser.Math.Linear(0.85, 0.3, progress)
        springScaleY = Phaser.Math.Linear(0.85, 0.3, progress)
      }

      this.addGameImage(container, 'triggerspikes_platform.png', 0, 0, 1, 0.5, 1)
      this.addGameImage(container, 'triggerspikes_top.png', 0, topY, 1, 0.5, 1)
      const springLayer = this.add.container(0, 30 - 36).setScale(1, springScaleY)
      const springOffsetY = 1 - cell / 2 + 40 / 2
      this.addGameImage(springLayer, 'spring.png', -cell, springOffsetY, 1.2, 0.5, 1)
      this.addGameImage(springLayer, 'spring.png', cell, springOffsetY, 1.2, 0.5, 1)
      container.add(springLayer)
      const spikes = this.addGameImage(container, 'spikes4x1.png', 0, spikeY, 1, 0.5, 1)
      spikes?.setScale(1, spikeScaleY)
      return
    }

    if (trap.trapId === 'spike3x1') {
      // Jf creates three independent cv spike components. The component icon
      // is only an editor preview; gameplay uses three native spike frames.
      for (let index = 0; index < 3; index += 1) {
        this.addGameImage(container, 'spike.png', (index - 1) * cell, 0)
      }
      return
    }

    if (trap.trapId === 'fortunecat') {
      const catFrame = phase === 'active' ? 'fortunecat_active.png' : 'fortunecat.png'
      this.addGameImage(container, catFrame, 0, 10)
      const windmill = this.addGameImage(container, 'fortunecatwm.png', -8, -40, 1.2)
      windmill?.setDepth(1)
      return
    }

    if (trap.trapId === 'gas') {
      const frameName = `gas${(Math.floor(this.time.now / 250) % 3) + 1}.png`
      this.addGameImage(container, frameName, 3, -3)
      return
    }

    if (trap.trapId === 'triggerhazard') {
      const renderAge = age
      const progress = phase === 'active'
        ? 1
        : phase === 'reverting'
          ? Math.max(0, 1 - renderAge / 0.5)
          : cactusProgress(renderAge)
      if (progress <= 0) {
        this.addGameImage(container, 'triggerhazardhide.png', 0, 53, 1, 0.5, 1)
      } else {
        const frame = phase === 'reverting' || Math.floor(renderAge / 0.2) % 2 === 1
          ? 'triggerhazard2.png'
          : 'triggerhazard.png'
        const cactus = this.addGameImage(container, frame, 0, 25, 1, 0.5, 1)
        cactus?.setScale(1, progress)
      }
      return
    }

    if (trap.trapId === 'mud') {
      this.addGameImage(container, 'mud.png', 0, 0)
      return
    }

    const texture = this.componentTexture(component)
    if (texture) this.addTextureImage(container, texture, 0, 0)
  }

  private drawPlacedTraps(state: GameState, build: BuildState | null) {
    void build
    const activeIds = new Set(state.level.traps.map((trap) => trap.instanceId))
    for (const [id, sprite] of this.trapSprites) {
      if (activeIds.has(id)) continue
      sprite.destroy()
      this.trapSprites.delete(id)
      this.trapRenderSignatures.delete(id)
      this.trapPhaseStartedAt.delete(id)
    }
    for (const trap of state.level.traps) {
      const component = PDZZ_COMPONENTS.find((item) => item.id === trap.trapId)
      if (!component) continue
      const offsetX = trap.offsetX ?? 0
      const offsetY = trap.offsetY ?? 0
      const phase = trap.phase ?? 'idle'
      const previousPhase = this.trapPhaseStartedAt.has(trap.instanceId)
        ? this.trapPhaseStartedAt.get(trap.instanceId)
        : undefined
      if (previousPhase === undefined || this.trapRenderSignatures.get(trap.instanceId)?.split('|')[1] !== phase) {
        this.trapPhaseStartedAt.set(trap.instanceId, this.time.now)
      }
      let sprite = this.trapSprites.get(trap.instanceId)
      if (!sprite) {
        sprite = this.add.container(0, 0).setDepth(2)
        this.trapSprites.set(trap.instanceId, sprite)
      }
      const signature = this.trapVisualSignature(trap)
      if (this.trapRenderSignatures.get(trap.instanceId) !== signature) {
        this.rebuildTrapVisual(sprite, state, trap, component)
        this.trapRenderSignatures.set(trap.instanceId, signature)
      }
      const isTriggerSpikes = trap.trapId === 'triggerspikes'
      sprite
        .setPosition(
          trap.x * state.level.cellSize + offsetX + (trap.width * state.level.cellSize) / 2,
          trap.y * state.level.cellSize + offsetY + (isTriggerSpikes ? trap.height * state.level.cellSize : (trap.height * state.level.cellSize) / 2),
        )
        .setAngle(trap.visualRotation ?? trap.rotation)
    }
  }

  private drawBuildGrid(state: GameState, build: BuildState | null) {
    this.gridGraphics?.destroy()
    this.buildStartLabel?.destroy()
    this.previewGraphics?.destroy()
    this.previewText?.destroy()
    this.gridGraphics = undefined
    this.previewSprite?.destroy()
    this.previewSprite = undefined
    this.previewGraphics = undefined
    this.previewText = undefined
    if (state.status !== 'BUILDING') return

    this.gridGraphics = this.add.graphics().setDepth(7)
    if (state.level.mapId === 'levelhaystack2' || state.level.mapId === 'levelhaystackbattle2') {
      this.buildStartLabel = this.add.text(330, 1100, '起跑区', {
        color: '#18343a',
        fontFamily: 'Arial, sans-serif',
        fontSize: '28px',
        fontStyle: 'bold',
      }).setOrigin(0.5).setDepth(1)
    }
    const pending = build?.pendingPlacements.find((item) => item.playerId === this.localPlayerId)
    if (pending?.legalCells.length) {
      this.gridGraphics.fillStyle(0x58b778, 0.18)
      for (const cell of pending.legalCells) {
        for (const occupied of this.componentCells(pending.trapId, pending.rotation)) {
          this.gridGraphics.fillRect(
            (cell.x + occupied.x) * state.level.cellSize + 2,
            (cell.y + occupied.y) * state.level.cellSize + 2,
            state.level.cellSize - 4,
            state.level.cellSize - 4,
          )
        }
      }
    }
    this.gridGraphics.lineStyle(1, 0x18343a, 0.22)
    for (let x = 0; x <= state.level.gridWidth; x += 1) {
      this.gridGraphics.lineBetween(x * state.level.cellSize, 0, x * state.level.cellSize, state.level.height)
    }
    for (let y = 0; y <= state.level.gridHeight; y += 1) {
      this.gridGraphics.lineBetween(0, y * state.level.cellSize, state.level.width, y * state.level.cellSize)
    }

    if (!pending || pending.playerId !== this.localPlayerId) return
    this.currentPreviewRotation = pending.rotation
    this.previewCell = { x: pending.x, y: pending.y }
    this.previewGraphics = this.add.graphics().setDepth(8)
    this.previewText = this.add.text(0, 0, '', {
      color: '#18343a',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      stroke: '#fff9e9',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(9)
    this.drawPreview(state, pending.trapId, pending.width, pending.height, pending.rotation, pending.valid)
  }

  private drawPreview(
    state: GameState,
    trapId: string,
    width: number,
    height: number,
    rotation: Rotation,
    valid: boolean,
  ) {
    if (!this.previewGraphics || !this.previewText) return
    const component = this.componentFor(trapId)
    if (!component) return
    const texture = this.componentTexture(component)
    if (!texture) return
    if (!this.previewSprite) {
      this.previewSprite = this.add.image(0, 0, texture.key, texture.frame).setOrigin(0.5).setDepth(8)
    } else {
      this.previewSprite.setTexture(texture.key, texture.frame)
    }
    this.previewSprite
      .setOrigin(0.5, 0.5)
      .setPosition(
        (this.previewCell.x + width / 2) * state.level.cellSize,
        (this.previewCell.y + height / 2) * state.level.cellSize,
      )
        .setDisplaySize(
         (component.viewWidth ?? component.width) * state.level.cellSize,
         (component.viewHeight ?? component.height) * state.level.cellSize,
      )
      .setAngle(rotation)
      .setAlpha(0.68)
      .setTint(valid ? 0xffffff : 0xffb4a7)
    this.previewGraphics.clear()
    const color = valid ? 0x5b9c73 : 0xef765b
    this.previewGraphics.fillStyle(color, 0.48)
    for (const cell of this.componentCells(trapId, rotation)) {
      this.previewGraphics.fillRect(
        (this.previewCell.x + cell.x) * state.level.cellSize,
        (this.previewCell.y + cell.y) * state.level.cellSize,
        state.level.cellSize,
        state.level.cellSize,
      )
    }
    this.previewGraphics.lineStyle(3, color, 1)
    for (const cell of this.componentCells(trapId, rotation)) {
      this.previewGraphics.strokeRect(
        (this.previewCell.x + cell.x) * state.level.cellSize + 2,
        (this.previewCell.y + cell.y) * state.level.cellSize + 2,
        state.level.cellSize - 4,
        state.level.cellSize - 4,
      )
    }
    this.previewText
      .setPosition(
        (this.previewCell.x + width / 2) * state.level.cellSize,
        (this.previewCell.y + height / 2) * state.level.cellSize,
      )
      .setText(valid ? '可放置' : '不可放置')
      .setColor(valid ? '#235f49' : '#a33b32')
  }

  private drawPlayers(snapshots: PlayerSnapshot[]) {
    const activeIds = new Set(snapshots.map((player) => player.id))
    for (const [id, sprite] of this.players) {
      if (!activeIds.has(id)) {
        sprite.destroy()
        this.players.delete(id)
        this.playerTargets.delete(id)
        this.nameplates.get(id)?.destroy()
        this.nameplates.delete(id)
      }
    }

    for (const player of snapshots) {
      let sprite = this.players.get(player.id)
      if (!sprite) {
        const textureKey = `character-avatar-${player.characterId}`
        if (!this.textures.exists(textureKey)) continue
        sprite = this.add.image(
          player.x + PLAYER_COLLIDER_WIDTH / 2,
          player.y + PLAYER_COLLIDER_HEIGHT / 2,
          textureKey,
        )
          .setOrigin(0.5, 0.5)
          .setDisplaySize(PLAYER_COLLIDER_WIDTH, PLAYER_COLLIDER_HEIGHT)
          .setDepth(4)
        const crop = CHARACTER_AVATAR_CROPS[player.characterId]
        if (crop) sprite.setCrop(crop.x, crop.y, crop.width, crop.height)
        this.players.set(player.id, sprite)
      }

      const targetX = player.x + PLAYER_COLLIDER_WIDTH / 2
      const targetY = player.y + PLAYER_COLLIDER_HEIGHT / 2
      const previousTarget = this.playerTargets.get(player.id)
      const moved = previousTarget ? Math.hypot(targetX - previousTarget.x, targetY - previousTarget.y) : 0
      this.playerTargets.set(player.id, {
        x: targetX,
        y: targetY,
        direction: player.direction,
        snap: !previousTarget || moved > 260 || !player.alive || player.finished,
      })
      sprite
        .setFlipX(player.direction < 0)
        // The APK armature is the authoritative in-game character layer.
        // Keep this Phaser object only as a camera anchor while Laya loads.
        .setAlpha(1)
        .setVisible(this.currentState?.status !== 'BUILDING')
    }
  }

  private updatePlayerSprites(delta: number) {
    const smoothing = 1 - Math.exp(-Math.max(0, delta) / 65)
    for (const [id, target] of this.playerTargets) {
      const sprite = this.players.get(id)
      if (!sprite) continue
      if (target.snap) {
        sprite.setPosition(target.x, target.y)
        target.snap = false
        continue
      }
      sprite.x = Phaser.Math.Linear(sprite.x, target.x, smoothing)
      sprite.y = Phaser.Math.Linear(sprite.y, target.y, smoothing)
    }
  }

  playerScreenPosition(player: PlayerSnapshot, width: number, height: number) {
    const view = this.cameras.main.worldView
    const zoom = this.cameras.main.zoom
    void width
    void height
    return {
      x: (player.x + PLAYER_COLLIDER_WIDTH / 2 - view.x) * zoom,
      y: (player.y + PLAYER_COLLIDER_HEIGHT - view.y) * zoom,
      zoom,
    }
  }

  private drawGameUi(state: GameState) {
    for (const object of this.uiObjects) object.destroy()
    this.uiObjects = []
    this.hudCountdownText = undefined
    this.hudCountdownRoundText = undefined
    this.hudCountdownTargetText = undefined
    const back = this.uiTextureFrame('back_button_bg.png')
    const backIcon = this.uiTextureFrame('icon_back.png')
    if (back) {
      const button = this.add.image(10, 10, 'pdzz-ui', back).setOrigin(0, 0).setScrollFactor(0).setDepth(50)
      this.uiObjects.push(button)
      if (backIcon) {
        const icon = this.add.image(71, 34, 'pdzz-ui', backIcon).setOrigin(0.5).setScrollFactor(0).setDepth(51)
        this.uiObjects.push(icon)
      }
    }

    const width = this.scale.width
    const round = this.add.text(width / 2, 22, `第${state.round}局`, {
      color: '#d8d8d8', fontFamily: 'Arial, sans-serif', fontSize: '20px', fontStyle: 'bold',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(51)
    const target = this.add.text(width / 2, 52, '共5局', {
      color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontStyle: 'bold',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(51)
    this.uiObjects.push(round, target)

    const scoreFrames = [
      'bg_levelscore_blue.png',
      'bg_levelscore_orange.png',
      'bg_levelscore_yellow.png',
      'bg_levelscore_red.png',
    ]
    const rowHeight = state.players.length >= 4 ? 54 : state.players.length === 3 ? 60 : 68
    const drawHud = (player: PlayerSnapshot | undefined, index: number) => {
      if (!player) return
      const x = 12
      const y = 16 + index * rowHeight
      const frameName = player.alive ? 'avatar_frame_running.png' : 'avatar_frame_die.png'
      const frame = this.uiTextureFrame(frameName)
      if (frame) {
        this.uiObjects.push(
          this.add.image(x, y, 'pdzz-ui', frame)
            .setOrigin(0, 0)
            .setDisplaySize(56, 56)
            .setScrollFactor(0)
            .setDepth(50),
        )
      }
      const textureKey = `character-avatar-${player.characterId}`
      if (this.textures.exists(textureKey)) {
        const avatar = this.add.image(x + 28, y + 29, textureKey)
          .setDisplaySize(42, 42)
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(51)
        const crop = CHARACTER_AVATAR_CROPS[player.characterId]
        if (crop) avatar.setCrop(crop.x, crop.y, crop.width, crop.height)
        this.uiObjects.push(avatar)
      }
      this.uiObjects.push(this.add.text(x + 28, y + 8, `P${player.slot}`, {
        color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '15px', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3,
      }).setOrigin(0.5).setScrollFactor(0).setDepth(52))
      const scoreFrame = this.uiTextureFrame(scoreFrames[(player.slot - 1) % scoreFrames.length])
      const scoreX = x + 62
      if (scoreFrame) {
        this.uiObjects.push(
          this.add.image(scoreX, y + 28, 'pdzz-ui', scoreFrame)
            .setOrigin(0, 0.5)
            .setDisplaySize(58, 32)
            .setScrollFactor(0)
            .setDepth(50),
        )
      }
      this.uiObjects.push(this.add.text(scoreX + 29, y + 28, String(player.score), {
        color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '18px', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3,
      }).setOrigin(0.5).setScrollFactor(0).setDepth(52))
    }
    ;[...state.players]
      .sort((left, right) => left.slot - right.slot)
      .forEach((player, index) => drawHud(player, index))

    const timerValue = this.hudTimerValue()
    if (timerValue !== null) {
      const bg = this.uiTextureFrame('count_bg.png')
      const ring = this.uiTextureFrame('count_ring.png')
      if (bg) this.uiObjects.push(this.add.image(width / 2, 104, 'pdzz-ui', bg).setScrollFactor(0).setDepth(50))
      if (ring) this.uiObjects.push(this.add.image(width / 2, 104, 'pdzz-ui', ring).setScrollFactor(0).setDepth(51))
      this.hudCountdownRoundText = this.add.text(width / 2, 74, '第' + state.round + '局', {
        color: '#d8d8d8', fontFamily: 'Arial, sans-serif', fontSize: '13px', fontStyle: 'bold',
      }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(52)
      this.hudCountdownTargetText = this.add.text(width / 2, 136, '共5局', {
        color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '10px', fontStyle: 'bold',
      }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(52)
      this.hudCountdownText = this.add.text(width / 2, 104, String(timerValue), {
        color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '54px', fontStyle: 'bold', stroke: '#000000', strokeThickness: 5,
      }).setOrigin(0.5).setScrollFactor(0).setDepth(52)
      this.uiObjects.push(this.hudCountdownText, this.hudCountdownRoundText, this.hudCountdownTargetText)
    }
  }

  private hudTimerValue() {
    const state = this.currentState
    if (!state) return null
    if (state.status === 'COUNTDOWN') return this.currentCountdown
    const timerEnd = state.status === 'BUILDING'
      ? this.currentBuild?.endsAt ?? null
      : state.status === 'PLAYING'
        ? state.phaseEndsAt
        : null
    return timerEnd === null ? null : Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000))
  }

  private updateHudCountdown() {
    if (!this.hudCountdownText) return
    const value = this.hudTimerValue()
    const visible = value !== null
    this.hudCountdownText.setVisible(visible)
    this.hudCountdownRoundText?.setVisible(visible)
    this.hudCountdownTargetText?.setVisible(visible)
    if (visible) this.hudCountdownText.setText(String(value))
  }

  private updateCamera(state: GameState) {
    if (state.status === 'BUILDING') {
      this.cameras.main.stopFollow()
      const isHaystack = state.level.mapId === 'levelhaystack2' || state.level.mapId === 'levelhaystackbattle2'
      const zoom = isHaystack
        ? HAYSTACK_PLAY_ZOOM
        : (this.scale.height / state.level.height) * 0.94
      const clampedZoom = isHaystack
        ? HAYSTACK_PLAY_ZOOM
        : Math.max(0.38, Math.min(0.7, zoom))
      this.cameras.main.setZoom(clampedZoom)
      const camera = this.cameras.main
      const enteredBuildPhase = this.lastStatus !== 'BUILDING'
      const maxScrollX = Math.max(0, state.level.width - camera.width / camera.zoom)
      if (enteredBuildPhase) {
        if (isHaystack) {
          // The build view starts at translated world y=0, matching the APK's
          // view-bounds top while keeping the grass line in the viewport.
          camera.setScroll(HAYSTACK_CAMERA_X, HAYSTACK_CAMERA_Y)
        } else {
          camera.centerOn(state.level.width / 2, state.level.height / 2)
        }
      } else {
        camera.setScroll(
          Phaser.Math.Clamp(camera.scrollX, 0, maxScrollX),
          Phaser.Math.Clamp(camera.scrollY, 0, Math.max(0, state.level.height - camera.height / camera.zoom)),
        )
      }
      this.lastStatus = state.status
      return
    }
    const local = state.players.find((player) => player.id === this.localPlayerId)
    if (!local) return
    const camera = this.cameras.main
    const isHaystack = state.level.mapId === 'levelhaystack2' || state.level.mapId === 'levelhaystackbattle2'
    camera.setZoom(isHaystack ? HAYSTACK_PLAY_ZOOM : 1)
    const maxScrollX = Math.max(0, state.level.width - camera.width / camera.zoom)
    const localSprite = this.players.get(local.id)
    const localWorldX = localSprite?.x ?? local.x + PLAYER_COLLIDER_WIDTH / 2
    const targetX = localWorldX - camera.width / (2 * camera.zoom)
    const scrollX = Phaser.Math.Clamp(targetX, 0, maxScrollX)
    // The APK keeps the haystack race on a fixed vertical track. The player
    // remains close to the grass while jumping, rather than being centered by
    // the camera. Other maps retain the normal vertical follow behavior.
    if (isHaystack) {
      camera.stopFollow()
      // Keep the translated view-bounds top fixed so the grass line does not
      // drift vertically while the player runs and jumps.
      camera.setScroll(scrollX, HAYSTACK_CAMERA_Y)
    } else {
      const sprite = this.players.get(local.id)
      if (sprite) camera.startFollow(sprite, true, 0.12, 0.12)
    }
    this.lastStatus = state.status
  }

  private handlePointerMove(pointer: Phaser.Input.Pointer) {
    const state = this.currentState
    const build = this.currentBuild
    const pending = build?.pendingPlacements.find((item) => item.playerId === this.localPlayerId)
    if (!state || state.status !== 'BUILDING' || !pending || pending.playerId !== this.localPlayerId) return
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
    if (pointer.isDown) {
      const panDistance = 24 / this.cameras.main.zoom
      if (pointer.x < 54) this.cameras.main.scrollX -= panDistance
      if (pointer.x > this.scale.width - 54) this.cameras.main.scrollX += panDistance
    }
    this.previewCell = this.pointerPlacementCell(state, pending, worldPoint)
    this.draggingPreview = pointer.isDown
    const valid = pending.legalCells.some(
      (cell) => cell.x === this.previewCell.x && cell.y === this.previewCell.y,
    )
    this.drawPreview(state, pending.trapId, pending.width, pending.height, pending.rotation, valid)
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer) {
    const state = this.currentState
    const build = this.currentBuild
    const pending = build?.pendingPlacements.find((item) => item.playerId === this.localPlayerId)
    if (!state || state.status !== 'BUILDING' || !pending || pending.playerId !== this.localPlayerId) return
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
    this.previewCell = this.pointerPlacementCell(state, pending, worldPoint)
    this.draggingPreview = true
    const valid = pending.legalCells.some(
      (cell) => cell.x === this.previewCell.x && cell.y === this.previewCell.y,
    )
    this.drawPreview(state, pending.trapId, pending.width, pending.height, pending.rotation, valid)
  }

  private pointerPlacementCell(
    state: GameState,
    pending: BuildState['pendingPlacements'][number],
    worldPoint: Phaser.Math.Vector2,
  ) {
    const rawX = Phaser.Math.Clamp(
      Math.floor(worldPoint.x / state.level.cellSize),
      0,
      state.level.gridWidth - pending.width,
    )
    const rawY = Phaser.Math.Clamp(
      Math.floor(worldPoint.y / state.level.cellSize),
      0,
      state.level.gridHeight - pending.height,
    )
    if (!this.isSupported(pending.trapId)) {
      return { x: rawX, y: rawY }
    }

    const surface = state.level.platforms
      .filter((platform) => {
        const withinHorizontalRange =
          worldPoint.x >= platform.x - state.level.cellSize / 2 &&
          worldPoint.x <= platform.x + platform.width + state.level.cellSize / 2
        const withinVerticalRange =
          worldPoint.y >= platform.y - state.level.cellSize &&
          worldPoint.y <= platform.y + platform.height
        return withinHorizontalRange && withinVerticalRange
      })
      .sort((a, b) => Math.abs(worldPoint.y - a.y) - Math.abs(worldPoint.y - b.y))[0]

    if (!surface) return { x: rawX, y: rawY }
    return {
      x: rawX,
      y: Math.max(0, surface.y / state.level.cellSize - pending.height),
    }
  }
}
