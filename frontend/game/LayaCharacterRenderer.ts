import { PDZZ_CHARACTERS } from '../../shared/pdzzConfig'
import type { GameState, PlayerSnapshot } from '../../shared/gameProtocol'
import type { PartyScene } from './PartyScene'

type LayaRuntime = {
  init: (width: number, height: number) => void
  Render: { canvas: HTMLCanvasElement }
  stage: {
    addChild: (child: unknown) => void
    removeChild: (child: unknown) => void
    removeChildren: () => void
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
// The server broadcasts at 20Hz. Rendering a short history lets the browser
// draw between authoritative samples instead of visibly jumping every packet.
const CHARACTER_INTERPOLATION_DELAY_MS = 70
const CHARACTER_MAX_EXTRAPOLATION_MS = 80
const CHARACTER_MAX_HISTORY = 8
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
  // pig.sk has a wider authored art box than rabbit2.sk. The APK display
  // height is still close to one 30x60 controller, not the raw 1024px sheet.
  // Keep the pig's visible silhouette at the recording's proportion instead
  // of letting the large DragonBones art box dominate the controller.
  pig: 0.065,
}

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
  private latestState: GameState | null = null
  private latestScene: PartyScene | null = null
  private frameHandle: number | null = null
  private disposed = false

  private constructor(host: HTMLElement, runtime: LayaRuntime) {
    this.host = host
    this.runtime = runtime
    if (!runtime.stage || !runtime.Render?.canvas) runtime.init(PDZZ_VIEWPORT_WIDTH, PDZZ_VIEWPORT_HEIGHT)
    const canvas = runtime.Render.canvas
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.background = 'transparent'
    canvas.style.zIndex = '3'
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

  destroy() {
    if (this.disposed) return
    this.disposed = true
    if (this.frameHandle !== null) window.cancelAnimationFrame(this.frameHandle)
    this.frameHandle = null
    for (const instance of this.instances.values()) instance.skeleton.destroy(true)
    this.instances.clear()
    this.tracks.clear()
    this.latestState = null
    this.latestScene = null
    LayaCharacterRenderer.activeCount = Math.max(0, LayaCharacterRenderer.activeCount - 1)
    // The runtime and canvas are shared by StrictMode's short-lived probe
    // renderer and the real renderer. Only remove the canvas when the last
    // owner is gone; never clear the global stage from one instance.
    if (LayaCharacterRenderer.activeCount === 0) this.runtime.Render.canvas.remove()
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
    this.renderPlayer(player.id, state, scene, performance.now())
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
      this.tracks.set(player.id, { samples: [sample], snap: true })
      return
    }
    const last = previous.samples[previous.samples.length - 1]
    const moved = last ? Math.hypot(sample.x - last.x, sample.y - last.y) : 0
    // A reset, respawn, death or a server correction must not be animated as
    // travel across the map. The next render frame will align immediately.
    previous.snap = moved > 260 || player.animationState === 'death' || !player.alive || player.finished
    previous.samples.push(sample)
    if (previous.samples.length > CHARACTER_MAX_HISTORY) previous.samples.shift()
  }

  private interpolatedPosition(track: PlayerTrack, now: number) {
    const samples = track.samples
    const latest = samples[samples.length - 1]
    if (!latest) return { x: 0, y: 0 }
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
    const player = state.players.find((item) => item.id === playerId)
    const instance = this.instances.get(playerId)
    const track = this.tracks.get(playerId)
    if (!player || !instance || !track) return
    const worldPosition = this.interpolatedPosition(track, now)
    const displayPlayer = { ...player, x: worldPosition.x, y: worldPosition.y }
    const position = scene.playerScreenPosition(displayPlayer, this.host.clientWidth, this.host.clientHeight)
    instance.skeleton.x = position.x
    instance.skeleton.y = position.y
    instance.skeleton.visible = state.status !== 'BUILDING'
    instance.skeleton.alpha = player.alive || player.finished ? 1 : 0.35
    const animation = animationForState[player.animationState]
    if (instance.animation !== animation) {
      const next = instance.animations.has(animation) ? animation : instance.animations.has('idle') ? 'idle' : null
      if (next) {
        instance.skeleton.play(next, true, true)
        instance.animation = next
      }
    }
    // The APK character controller is 30x60, while the Laya root is the
    // character's foot pivot. This scale keeps that pivot exactly on the
    // server collider's bottom edge for both rabbit and pig.
    const baseScale = Math.min(position.zoom, 1) * instance.artScale
    instance.skeleton.scale(baseScale * (player.direction < 0 ? -1 : 1), baseScale)
  }

  private renderFrame = (now: number) => {
    if (this.disposed) return
    if (this.latestState && this.latestScene) {
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
      const bounds = skeleton.getBounds?.()
      const measuredScale = bounds && bounds.height > 0 ? 60 / bounds.height : null
      const artScale = measuredScale ?? fallbackCharacterArtScale[character.avatarID] ?? 0.2
      this.runtime.stage.addChild(skeleton)
      this.instances.set(playerId, { skeleton, animations, animation: null, artScale })
      scene.setPlayerFallbackVisible(playerId, false)
      console.info('[pdzz] character skeleton ready', playerId, avatarId)
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
