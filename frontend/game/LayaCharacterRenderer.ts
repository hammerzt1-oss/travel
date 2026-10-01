import { PDZZ_CHARACTERS, PDZZ_PHYSICS } from '../../shared/pdzzConfig'
import type { GameState, PlayerInput, PlayerSnapshot } from '../../shared/gameProtocol'
import type { PartyScene } from './PartyScene'

type LayaRuntime = {
  init: (width: number, height: number) => void
  Render: { canvas: HTMLCanvasElement }
  stage: {
    addChild: (child: unknown) => void
    removeChild: (child: unknown) => void
    removeChildren: () => void
    frameRate?: string
  }
  Texture: new (source: HTMLImageElement) => unknown
  Templet: new () => {
    once: (event: string, caller: unknown, handler: (...args: unknown[]) => void) => void
    parseData: (texture: unknown, data: ArrayBuffer) => void
    buildArmature: (mode?: number) => LayaSkeleton
  }
}

type LayaSkeleton = {
  x: number
  y: number
  visible: boolean
  alpha: number
  scale: (x: number, y: number) => void
  play: (nameOrIndex: string | number, loop: boolean, force?: boolean) => void
  getAnimNum: () => number
  getAniNameByIndex: (index: number) => string | null
  getBounds?: () => { x: number; y: number; width: number; height: number }
  destroy: (destroyChildren?: boolean) => void
}

type CharacterInstance = {
  skeleton: LayaSkeleton
  animations: Set<string>
  animation: string | null
  artScale: number
  // Laya's armature origin is not the gameplay collider origin. Keep the
  // authored local bounds so every pose is anchored by its visible feet.
  bounds: { x: number; y: number; width: number; height: number } | null
}

type PositionSample = {
  receivedAt: number
  x: number
  y: number
  velocityX: number
  velocityY: number
}

type PlayerTrack = {
  samples: PositionSample[]
  snap: boolean
  localPrediction?: {
    x: number
    y: number
    velocityX: number
    velocityY: number
    jumping: boolean
    updatedAt: number
    correctionX: number
    correctionY: number
  }
}

declare global {
  interface Window {
    Laya?: LayaRuntime
    __pdzzLayaRuntimePromise?: Promise<LayaRuntime>
  }
}

const runtimeUrl = '/game/runtime/laya.vendor.js'
const PDZZ_VIEWPORT_WIDTH = 750
const PDZZ_VIEWPORT_HEIGHT = 1670
// The server broadcasts at 30Hz. Rendering a short history lets the browser
// draw between authoritative samples instead of visibly jumping every packet.
const CHARACTER_INTERPOLATION_DELAY_MS = 50
const CHARACTER_MAX_EXTRAPOLATION_MS = 66
const CHARACTER_MAX_HISTORY = 8
const CHARACTER_ART_HEIGHT = 60
const CHARACTER_RENDER_INTERVAL_MS = 1000 / 60
const LOCAL_PREDICTION_MAX_DT_MS = 120
const animationForState: Record<PlayerSnapshot['animationState'], string> = {
  idle: 'idle',
  run: 'run',
  jump: 'jump',
  fall: 'falldown',
  death: 'die',
  win: 'celebrate',
}

// The two league armatures are not authored to the same art bounds. Their
// controller is still the same 30x60 box, but a shared display scale makes
// Pink visibly several times larger than Bonnie. These values normalize the
// extracted armatures to the proportions in the league recording.
const fallbackCharacterArtScale: Record<string, number> = {
  rabbit2: 0.34,
  // pig.sk reports a 351.95px authored pose box. Keep its fallback at the
  // same 60px gameplay height when a mobile browser returns an empty bounds
  // object during the first animation tick.
  pig: CHARACTER_ART_HEIGHT / 351.9543828946005,
}

const preventCanvasMenu = (event: Event) => event.preventDefault()
const preventCanvasDrag = (event: DragEvent) => event.preventDefault()

function loadRuntime() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Laya runtime requires a browser'))
  if (window.Laya) return Promise.resolve(window.Laya)
  if (window.__pdzzLayaRuntimePromise) return window.__pdzzLayaRuntimePromise
  window.__pdzzLayaRuntimePromise = new Promise<LayaRuntime>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = runtimeUrl
    script.async = true
    script.onload = () => window.Laya ? resolve(window.Laya) : reject(new Error('Laya runtime did not expose window.Laya'))
    script.onerror = () => reject(new Error(`Unable to load ${runtimeUrl}`))
    document.head.appendChild(script)
  })
  return window.__pdzzLayaRuntimePromise
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Unable to load ${url}`))
    image.src = url
  })
}

function loadTemplet(runtime: LayaRuntime, skeletonUrl: string, imageUrl: string) {
  return Promise.all([
    fetch(skeletonUrl).then((response) => {
      if (!response.ok) throw new Error(`Unable to load ${skeletonUrl}`)
      return response.arrayBuffer()
    }),
    loadImage(imageUrl),
  ]).then(([data, image]) => new Promise<LayaSkeleton>((resolve, reject) => {
    const templet = new runtime.Templet()
    templet.once('complete', templet, () => resolve(templet.buildArmature(0)))
    templet.once('error', templet, (error) => reject(error))
    templet.parseData(new runtime.Texture(image), data)
  }))
}

export class LayaCharacterRenderer {
  private static activeCount = 0
  private readonly host: HTMLElement
  private readonly runtime: LayaRuntime
  private readonly instances = new Map<string, CharacterInstance>()
  private readonly pending = new Map<string, Promise<void>>()
  private readonly tracks = new Map<string, PlayerTrack>()
  private readonly latestPlayers = new Map<string, PlayerSnapshot>()
  private readonly canvasTransformObserver: MutationObserver | null
  private latestState: GameState | null = null
  private latestScene: PartyScene | null = null
  private localPlayerId: string | null = null
  private localInput: PlayerInput = { left: false, right: false, jump: false }
  private frameHandle: number | null = null
  private lastRenderAt = 0
  private disposed = false

  private constructor(host: HTMLElement, runtime: LayaRuntime) {
    this.host = host
    this.runtime = runtime
    if (!runtime.stage || !runtime.Render?.canvas) runtime.init(PDZZ_VIEWPORT_WIDTH, PDZZ_VIEWPORT_HEIGHT)
    // The character transform loop is already frame-budgeted below. Keep the
    // Laya stage on its fast path so mobile browsers do not add a second 30 FPS
    // ceiling on top of the Phaser canvas.
    if (runtime.stage) runtime.stage.frameRate = 'fast'
    const canvas = runtime.Render.canvas
    // Phaser and Laya share the same portrait surface. Keep the backing
    // canvas in the game's logical coordinate system; relying on a mobile
    // browser's first canvas size makes the armatures render at the wrong
    // scale or near the top edge after a viewport change.
    if (canvas.width !== PDZZ_VIEWPORT_WIDTH) canvas.width = PDZZ_VIEWPORT_WIDTH
    if (canvas.height !== PDZZ_VIEWPORT_HEIGHT) canvas.height = PDZZ_VIEWPORT_HEIGHT
    canvas.dataset.pdzzViewport = `${PDZZ_VIEWPORT_WIDTH}x${PDZZ_VIEWPORT_HEIGHT}`
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.background = 'transparent'
    canvas.style.zIndex = '3'
    // MiniAdpter writes a mobile stage matrix back to the canvas whenever the
    // viewport changes. The Phaser surface already owns the responsive fit,
    // so that second transform must remain disabled at runtime as well as in
    // CSS; otherwise characters can drift toward the top-left after rotation
    // or browser chrome changes.
    const lockCanvasTransform = () => {
      canvas.style.setProperty('transform', 'none', 'important')
      canvas.style.setProperty('transform-origin', '0 0', 'important')
    }
    lockCanvasTransform()
    this.canvasTransformObserver = typeof MutationObserver === 'undefined'
      ? null
      : new MutationObserver(lockCanvasTransform)
    this.canvasTransformObserver?.observe(canvas, {
      attributes: true,
      attributeFilter: ['style'],
    })
    canvas.classList.add('pdzz-laya-character-canvas')
    canvas.draggable = false
    canvas.setAttribute('aria-hidden', 'true')
    canvas.addEventListener('contextmenu', preventCanvasMenu)
    canvas.addEventListener('dragstart', preventCanvasDrag)
    host.appendChild(canvas)
    LayaCharacterRenderer.activeCount += 1
    this.frameHandle = window.requestAnimationFrame(this.renderFrame)
  }

  static async create(host: HTMLElement) {
    const runtime = await loadRuntime()
    if (!runtime.stage || !runtime.Render?.canvas) runtime.init(PDZZ_VIEWPORT_WIDTH, PDZZ_VIEWPORT_HEIGHT)
    console.info('[pdzz] Laya character renderer ready')
    return new LayaCharacterRenderer(host, runtime)
  }

  update(state: GameState | null, scene: PartyScene | null) {
    if (this.disposed || !state || !scene) return
    const receivedAt = performance.now()
    this.latestState = state
    this.latestScene = scene
    const activeIds = new Set(state.players.map((player) => player.id))
    this.latestPlayers.clear()
    for (const player of state.players) this.latestPlayers.set(player.id, player)
    for (const [id, instance] of this.instances) {
      if (activeIds.has(id)) continue
      instance.skeleton.destroy(true)
      this.instances.delete(id)
    }
    for (const id of this.tracks.keys()) {
      if (!activeIds.has(id)) this.tracks.delete(id)
    }

    for (const player of state.players) {
      this.recordSample(player, receivedAt)
      this.updatePlayer(player, state, scene)
    }
  }

  setLocalInput(playerId: string | null, input: PlayerInput) {
    if (this.disposed) return
    const now = performance.now()
    this.advanceLocalPrediction(now)
    const previous = this.localInput
    this.localPlayerId = playerId
    this.localInput = { ...input }
    if (!playerId || !input.jump || previous.jump) return
    const player = this.latestPlayers.get(playerId)
    const track = this.tracks.get(playerId)
    if (track && !track.localPrediction) {
      const latest = track.samples[track.samples.length - 1]
      if (latest && player) track.localPrediction = this.createLocalPrediction(latest, player, now)
    }
    const prediction = track?.localPrediction
    if (!player || !prediction || !player.alive || player.finished) return
    if (player.animationState === 'idle' || player.animationState === 'run') {
      prediction.velocityY = PDZZ_PHYSICS.playerDerived.normalJumpStartVelocity
      prediction.jumping = true
      prediction.updatedAt = now
    }
  }

  destroy() {
    if (this.disposed) return
    this.disposed = true
    this.canvasTransformObserver?.disconnect()
    if (this.frameHandle !== null) window.cancelAnimationFrame(this.frameHandle)
    this.frameHandle = null
    for (const instance of this.instances.values()) instance.skeleton.destroy(true)
    this.instances.clear()
    this.tracks.clear()
    this.latestPlayers.clear()
    this.latestState = null
    this.latestScene = null
    LayaCharacterRenderer.activeCount = Math.max(0, LayaCharacterRenderer.activeCount - 1)
    // The runtime and canvas are shared by StrictMode's short-lived probe
    // renderer and the real renderer. Only remove the canvas when the last
    // owner is gone; never clear the global stage from one instance.
    if (LayaCharacterRenderer.activeCount === 0) {
      this.runtime.Render.canvas.removeEventListener('contextmenu', preventCanvasMenu)
      this.runtime.Render.canvas.removeEventListener('dragstart', preventCanvasDrag)
      this.runtime.Render.canvas.remove()
    }
  }

  private updatePlayer(player: PlayerSnapshot, state: GameState, scene: PartyScene) {
    const character = PDZZ_CHARACTERS.find((item) => item.refID === player.characterId) ?? PDZZ_CHARACTERS[0]
    if (!character) return
    const instance = this.instances.get(player.id)
    if (!instance) {
      scene.setPlayerFallbackVisible(player.id, true)
      this.ensurePlayer(player.id, character.avatarID, player, state, scene)
      return
    }
    scene.setPlayerFallbackVisible(player.id, false)
  }

  private recordSample(player: PlayerSnapshot, receivedAt: number) {
    const previous = this.tracks.get(player.id)
    const sample: PositionSample = {
      receivedAt,
      x: player.x,
      y: player.y,
      velocityX: player.velocityX,
      velocityY: player.velocityY,
    }
    if (!previous) {
      const track: PlayerTrack = { samples: [sample], snap: true }
      if (player.id === this.localPlayerId) track.localPrediction = this.createLocalPrediction(sample, player, receivedAt)
      this.tracks.set(player.id, track)
      return
    }
    const last = previous.samples[previous.samples.length - 1]
    const moved = last ? Math.hypot(sample.x - last.x, sample.y - last.y) : 0
    // A reset, respawn, death or a server correction must not be animated as
    // travel across the map. The next render frame will align immediately.
    previous.snap = moved > 260 || player.animationState === 'death' || !player.alive || player.finished
    previous.samples.push(sample)
    if (previous.samples.length > CHARACTER_MAX_HISTORY) previous.samples.shift()
    if (player.id === this.localPlayerId) {
      const prediction = previous.localPrediction
      if (!prediction) {
        previous.localPrediction = this.createLocalPrediction(sample, player, receivedAt)
        return
      }
      this.advanceLocalPrediction(receivedAt)
      const errorX = sample.x - prediction.x
      const errorY = sample.y - prediction.y
      // Large corrections are respawns, deaths, or a server-side collision
      // decision. Snap those explicitly; ordinary network drift is eased out
      // over several render frames so the animal never rubber-bands.
      if (
        Math.abs(errorX) > 180 ||
        Math.abs(errorY) > 180 ||
        player.animationState === 'death' ||
        !player.alive ||
        player.finished
      ) {
        previous.localPrediction = this.createLocalPrediction(sample, player, receivedAt)
        return
      }
      prediction.correctionX = this.clampCorrection(prediction.correctionX + errorX)
      prediction.correctionY = this.clampCorrection(prediction.correctionY + errorY)
      prediction.velocityX = prediction.velocityX * 0.65 + sample.velocityX * 0.35
      prediction.velocityY = prediction.velocityY * 0.65 + sample.velocityY * 0.35
      prediction.jumping = player.animationState === 'jump' || player.animationState === 'fall'
      prediction.updatedAt = receivedAt
    }
  }

  private createLocalPrediction(sample: PositionSample, player: PlayerSnapshot, receivedAt: number) {
    return {
      x: sample.x,
      y: sample.y,
      velocityX: sample.velocityX,
      velocityY: sample.velocityY,
      jumping: player.animationState === 'jump' || player.animationState === 'fall',
      updatedAt: receivedAt,
      correctionX: 0,
      correctionY: 0,
    }
  }

  private advanceLocalPrediction(now: number) {
    if (!this.localPlayerId) return
    const track = this.tracks.get(this.localPlayerId)
    const player = this.latestPlayers.get(this.localPlayerId)
    const prediction = track?.localPrediction
    if (!track || !player || !prediction || !player.alive || player.finished) return
    const elapsedMs = Math.max(0, Math.min(LOCAL_PREDICTION_MAX_DT_MS, now - prediction.updatedAt))
    if (elapsedMs <= 0) return
    const dt = elapsedMs / 1000
    const correctionBlend = Math.min(1, dt * 12)
    prediction.x += prediction.correctionX * correctionBlend
    prediction.y += prediction.correctionY * correctionBlend
    prediction.correctionX *= 1 - correctionBlend
    prediction.correctionY *= 1 - correctionBlend
    const horizontal = (this.localInput.right ? 1 : 0) - (this.localInput.left ? 1 : 0)
    const targetVelocity = horizontal * PDZZ_PHYSICS.player.normalHorizontalSpeed
    const acceleration = PDZZ_PHYSICS.player.horizontalInputAcceleration * dt
    if (horizontal !== 0) {
      prediction.velocityX = this.approach(prediction.velocityX, targetVelocity, acceleration)
    } else {
      prediction.velocityX = 0
    }
    prediction.x += prediction.velocityX * dt
    if (prediction.jumping) {
      const gravity = this.localInput.jump
        ? PDZZ_PHYSICS.playerDerived.gravity
        : PDZZ_PHYSICS.playerDerived.gravity * PDZZ_PHYSICS.player.jumpUpGravityVariation
      prediction.velocityY = Math.min(
        PDZZ_PHYSICS.player.maxFallSpeed,
        prediction.velocityY + gravity * dt,
      )
      prediction.y += prediction.velocityY * dt
    }
    prediction.updatedAt = now
  }

  private approach(value: number, target: number, amount: number) {
    if (value < target) return Math.min(value + amount, target)
    if (value > target) return Math.max(value - amount, target)
    return target
  }

  private clampCorrection(value: number) {
    return Math.max(-120, Math.min(120, value))
  }

  private interpolatedPosition(track: PlayerTrack, now: number) {
    const samples = track.samples
    const latest = samples[samples.length - 1]
    if (!latest) return { x: 0, y: 0 }
    if (track === this.tracks.get(this.localPlayerId ?? '') && track.localPrediction) {
      this.advanceLocalPrediction(now)
      return { x: track.localPrediction.x, y: track.localPrediction.y }
    }
    if (track.snap || samples.length === 1) {
      track.snap = false
      return { x: latest.x, y: latest.y }
    }

    const renderAt = now - CHARACTER_INTERPOLATION_DELAY_MS
    for (let index = samples.length - 1; index > 0; index -= 1) {
      const next = samples[index]
      const previous = samples[index - 1]
      if (renderAt < previous.receivedAt || renderAt > next.receivedAt) continue
      const duration = Math.max(1, next.receivedAt - previous.receivedAt)
      const progress = Math.max(0, Math.min(1, (renderAt - previous.receivedAt) / duration))
      return {
        x: previous.x + (next.x - previous.x) * progress,
        y: previous.y + (next.y - previous.y) * progress,
      }
    }

    // If the network interval is longer than expected, use the APK-reported
    // velocity briefly so the pose keeps moving until the next sample arrives.
    const extrapolation = Math.max(0, Math.min(CHARACTER_MAX_EXTRAPOLATION_MS, renderAt - latest.receivedAt))
    return {
      x: latest.x + latest.velocityX * extrapolation / 1000,
      y: latest.y + latest.velocityY * extrapolation / 1000,
    }
  }

  private renderPlayer(playerId: string, state: GameState, scene: PartyScene, now: number) {
    const player = this.latestPlayers.get(playerId)
    const instance = this.instances.get(playerId)
    const track = this.tracks.get(playerId)
    if (!player || !instance || !track) return
    const worldPosition = this.interpolatedPosition(track, now)
    const isLocal = playerId === this.localPlayerId
    const horizontalInput = (this.localInput.right ? 1 : 0) - (this.localInput.left ? 1 : 0)
    const displayPlayer = {
      ...player,
      x: worldPosition.x,
      y: worldPosition.y,
      direction: isLocal && horizontalInput !== 0 ? horizontalInput as -1 | 1 : player.direction,
    }
    const position = scene.playerScreenPosition(displayPlayer, this.host.clientWidth, this.host.clientHeight)
    instance.skeleton.visible = state.status !== 'BUILDING'
    instance.skeleton.alpha = player.alive || player.finished ? 1 : 0.35
    const serverAnimation = animationForState[player.animationState]
    const animation = isLocal && player.alive && !player.finished
      ? this.localInput.jump
        ? 'jump'
        : horizontalInput !== 0 && player.animationState !== 'jump' && player.animationState !== 'fall'
          ? 'run'
          : serverAnimation
      : serverAnimation
    if (instance.animation !== animation) {
      const next = instance.animations.has(animation) ? animation : instance.animations.has('idle') ? 'idle' : null
      if (next) {
        instance.skeleton.play(next, true, true)
        instance.animation = next
      }
    }
    // The server collider is 30x60, but an imported Laya armature usually has
    // a root at its torso (and some armatures have a large empty local box).
    // Scale the authored visible bounds to the controller height, then move
    // the root so the visible bounds' center/feet match the collider exactly.
    // Do not call getBounds on every frame: mobile Canvas2D can return a
    // different pose box while an animation is playing, which changes the
    // character's skin size and makes the animal jump or appear duplicated.
    const baseScale = Math.min(position.zoom, 1) * instance.artScale
    const signedScaleX = baseScale * (player.direction < 0 ? -1 : 1)
    const bounds = instance.bounds
    if (bounds && bounds.height > 0) {
      instance.skeleton.x = position.x - (bounds.x + bounds.width / 2) * signedScaleX
      instance.skeleton.y = position.y - (bounds.y + bounds.height) * baseScale
    } else {
      instance.skeleton.x = position.x
      instance.skeleton.y = position.y
    }
    instance.skeleton.scale(signedScaleX, baseScale)
  }

  private renderFrame = (now: number) => {
    if (this.disposed) return
    if (
      this.latestState &&
      this.latestScene &&
      (this.lastRenderAt === 0 || now - this.lastRenderAt >= CHARACTER_RENDER_INTERVAL_MS)
    ) {
      this.lastRenderAt = now
      for (const player of this.latestState.players) {
        this.renderPlayer(player.id, this.latestState, this.latestScene, now)
      }
    }
    this.frameHandle = window.requestAnimationFrame(this.renderFrame)
  }

  private ensurePlayer(
    playerId: string,
    avatarId: string,
    player: PlayerSnapshot,
    state: GameState,
    scene: PartyScene,
  ) {
    // Loading is keyed by player, not avatar. Multiple players may select the same APK character.
    if (this.pending.has(playerId) || this.instances.has(playerId)) return
    const character = PDZZ_CHARACTERS.find((item) => item.avatarID === avatarId)
    if (!character) return
    const promise = loadTemplet(
      this.runtime,
      `/game/assets/pdzz/characters/skeletons/${avatarId}.sk`,
      `/game/assets/pdzz/characters/raw/${avatarId}.png`,
    ).then((skeleton) => {
      if (this.disposed) {
        skeleton.destroy(true)
        return
      }
      const animations = new Set<string>()
      for (let index = 0; index < skeleton.getAnimNum(); index += 1) {
        const name = skeleton.getAniNameByIndex(index)
        if (name) animations.add(name)
      }
      const idle = animations.has('idle') ? 'idle' : animations.values().next().value
      if (idle) skeleton.play(idle, true, true)
      // Measure one deterministic idle pose. The bounds are deliberately
      // retained for the whole instance; animation must not change the
      // character's authored scale or foot anchor.
      const bounds = skeleton.getBounds?.()
      const measuredScale = bounds && bounds.height > 0 ? CHARACTER_ART_HEIGHT / bounds.height : null
      const artScale = measuredScale ?? fallbackCharacterArtScale[character.avatarID] ?? 0.2
      this.runtime.stage.addChild(skeleton)
      this.instances.set(playerId, {
        skeleton,
        animations,
        animation: null,
        artScale,
        bounds: bounds && bounds.height > 0 ? bounds : null,
      })
      scene.setPlayerFallbackVisible(playerId, false)
      console.info('[pdzz] character skeleton ready', playerId, avatarId, {
        bounds,
        artScale,
        targetHeight: CHARACTER_ART_HEIGHT,
      })
      // Loading is asynchronous. Apply the latest snapshot immediately so a
      // short countdown or round cannot finish before the first pose appears.
      const latestState = this.latestState ?? state
      const latestScene = this.latestScene ?? scene
      this.renderPlayer(playerId, latestState, latestScene, performance.now())
      console.info('[pdzz] character pose', playerId, {
        x: skeleton.x,
        y: skeleton.y,
        visible: skeleton.visible,
        animation: player.animationState,
      })
    }).catch((error) => {
      // Keep failures visible during APK asset integration; otherwise a
      // rejected skeleton load looks identical to a missing character.
      console.error('[pdzz] character skeleton load failed', error)
    }).finally(() => {
      this.pending.delete(playerId)
    })
    this.pending.set(playerId, promise)
  }
}

export type { LayaCharacterRenderer as PdzzCharacterRenderer }
