'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import * as Phaser from 'phaser'
import { io, type Socket } from 'socket.io-client'
import type {
  BuildState,
  ClientMessage,
  GameState,
  PlayerInput,
  RoomState,
  RoundResult,
  ServerMessage,
} from '../../shared/gameProtocol'
import {
  PDZZ_COMPONENTS,
  PDZZ_LEAGUE_COMPONENT_GUIDE,
  PDZZ_LEAGUE_MAP_CATALOG,
  PDZZ_MAP_CATALOG,
  pdzzTrapRequiresGroundSupport,
} from '../../shared/pdzzConfig'
import { PartyScene } from '../game/PartyScene'
import { LayaCharacterRenderer } from '../game/LayaCharacterRenderer'

type Screen = 'home' | 'lobby' | 'build' | 'game' | 'result' | 'final'
type ComponentCategory = 'all' | 'platform' | 'hazard' | 'special'
type SessionInfo = Extract<ServerMessage, { type: 'session' }>

// Keep local development configurable, but never let a production build fall
// back to the user's own device. On phones, localhost is the phone itself.
const SERVER_URL = process.env.NEXT_PUBLIC_GAME_SERVER_URL || 'https://travel-backend-afnq.onrender.com'
const PDZZ_VIEWPORT_WIDTH = 750
// The league recording is a 1220x2712 capture, i.e. a 750x1670 logical
// viewport. The haystack level itself is authored at 2150x1700, so using
// 1334 here compresses the vertical composition and hides the grass line.
const PDZZ_VIEWPORT_HEIGHT = 1670
const ROTATIONS = [0, 90, 180, 270] as const
const GAME_STATE_RENDER_INTERVAL_MS = 33

function ComponentIcon({
  option,
}: {
  option: {
    glyph: string
    iconAsset?: string | null
    iconCrop?: { x: number; y: number; width: number; height: number } | null
  }
}) {
  if (option.iconAsset) {
    return (
      <span className="component-icon-frame">
        <img className="component-icon-image" src={option.iconAsset} alt="" aria-hidden="true" />
      </span>
    )
  }
  if (!option.iconCrop) return <span className="component-icon-fallback">{option.glyph}</span>
  const crop = option.iconCrop
  const scale = Math.min(1, 56 / crop.width, 38 / crop.height)
  return (
    <span className="component-icon-frame">
      <span
        className="component-icon-sprite"
        style={{
          width: crop.width,
          height: crop.height,
          backgroundImage: `url(${option.iconAsset ?? '/game/assets/pdzz/game.png'})`,
          backgroundPosition: `-${crop.x}px -${crop.y}px`,
          transform: `scale(${scale})`,
        }}
      />
    </span>
  )
}

function TouchControls({
  onInput,
  inputRef,
  disabled = false,
}: {
  onInput: (input: PlayerInput, jumpPressed?: boolean) => void
  inputRef: MutableRefObject<PlayerInput>
  disabled?: boolean
}) {
  const onInputRef = useRef(onInput)
  const [pressed, setPressed] = useState<Record<keyof PlayerInput, boolean>>({
    left: false,
    right: false,
    jump: false,
  })

  useEffect(() => {
    onInputRef.current = onInput
  }, [onInput])

  useEffect(() => {
    if (!disabled) return
    inputRef.current = { left: false, right: false, jump: false }
    setPressed({ left: false, right: false, jump: false })
  }, [disabled, inputRef])

  const update = (key: keyof PlayerInput, value: boolean, jumpPressed = false) => {
    inputRef.current = { ...inputRef.current, [key]: value }
    setPressed((current) => ({ ...current, [key]: value }))
    onInput(inputRef.current, jumpPressed)
  }

  useEffect(() => {
    const releaseAll = () => {
      inputRef.current = { left: false, right: false, jump: false }
      setPressed({ left: false, right: false, jump: false })
      onInputRef.current(inputRef.current)
    }
    window.addEventListener('blur', releaseAll)
    document.addEventListener('visibilitychange', releaseAll)
    return () => {
      window.removeEventListener('blur', releaseAll)
      document.removeEventListener('visibilitychange', releaseAll)
    }
  }, [])

  const pressProps = (key: keyof PlayerInput) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      update(key, true, key === 'jump')
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault()
      update(key, false)
    },
    onPointerCancel: () => update(key, false),
    onLostPointerCapture: () => update(key, false),
    onContextMenu: (event: React.MouseEvent) => event.preventDefault(),
  })

  return (
    <div className="pdzz-touch-controls" aria-label="游戏操作">
      <div className="pdzz-move-control">
        <button disabled={disabled} className={`pdzz-touch-button pdzz-touch-left ${pressed.left ? 'is-pressed' : ''}`} aria-label="向左移动" aria-pressed={pressed.left} {...pressProps('left')}>
          <img src="/game/assets/pdzz/ui/frames/move_white.png" alt="" aria-hidden="true" />
        </button>
        <button disabled={disabled} className={`pdzz-touch-button pdzz-touch-right ${pressed.right ? 'is-pressed' : ''}`} aria-label="向右移动" aria-pressed={pressed.right} {...pressProps('right')}>
          <img src="/game/assets/pdzz/ui/frames/move_white.png" alt="" aria-hidden="true" />
        </button>
        <span>移动</span>
      </div>
      <button disabled={disabled} className={`pdzz-touch-button pdzz-jump-control ${pressed.jump ? 'is-pressed' : ''}`} aria-label="跳跃" aria-pressed={pressed.jump} {...pressProps('jump')}>
        <img src="/game/assets/pdzz/ui/frames/icon_jump.png" alt="" aria-hidden="true" />
        <span>跳</span>
      </button>
    </div>
  )
}

/*
function MapWarmupLayer({ state }: { state: GameState | null }) {
  const map = state
    ? PDZZ_MAP_CATALOG.find((item) => item.id === state.level.mapId)
    : null
  if (!map || !map.skySprite) return null
  const isHaystack = map.id === 'levelhaystack2' || map.id === 'levelhaystackbattle2'
  if (!isHaystack) return null
  const assets = map.spriteAssets
  const sky = assets[map.skySprite]
  const haystack = assets['levelhaystack2/haystack']
  const scarecrow = assets['levelhaystack2/scarecrow']
  const ground = assets['levelhaystack2/ground']
  if (!sky || !haystack || !ground) return null
  const haystackX = 1048 / HAYSTACK_CAMERA_WORLD_WIDTH * 100
  const haystackY = 1150 / HAYSTACK_CAMERA_WORLD_HEIGHT * 100
  const scarecrowX = 950 / HAYSTACK_CAMERA_WORLD_WIDTH * 100
  const scarecrowY = 1302 / HAYSTACK_CAMERA_WORLD_HEIGHT * 100
  const groundX = 1038 / HAYSTACK_CAMERA_WORLD_WIDTH * 100
  const groundY = 1700 / HAYSTACK_CAMERA_WORLD_HEIGHT * 100
  return (
    <div className="pdzz-map-warmup" aria-hidden="true">
      <img className="pdzz-map-warmup-sky" src={sky} alt="" />
      <img
        className="pdzz-map-warmup-haystack"
        src={haystack}
        alt=""
        style={{ left: `${haystackX}%`, top: `${haystackY}%` }}
      />
      {scarecrow && (
        <img
          className="pdzz-map-warmup-scarecrow"
          src={scarecrow}
          alt=""
          style={{ left: `${scarecrowX}%`, top: `${scarecrowY}%` }}
        />
      )}
      <div
        className="pdzz-map-warmup-ground"
        style={{ left: `${groundX}%`, top: `${groundY}%`, backgroundImage: `url(${ground})` }}
      />
    </div>
  )
}
*/

type LocalInputListener = (playerId: string | null, input: PlayerInput, sequence?: number, jumpPressed?: boolean) => void

function GameCanvas({
  state,
  build,
  countdown,
  localPlayerId,
  localInput,
  localInputListenerRef,
  onPlace,
}: {
  state: GameState | null
  build: BuildState | null
  countdown: number | null
  localPlayerId: string | null
  localInput: PlayerInput
  localInputListenerRef: MutableRefObject<LocalInputListener | null>
  onPlace: (x: number, y: number) => void
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<PartyScene | null>(null)
  const characterRendererRef = useRef<LayaCharacterRenderer | null>(null)
  const onPlaceRef = useRef(onPlace)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setMapReady(false)
  }, [state?.level.mapId])

  useEffect(() => {
    onPlaceRef.current = onPlace
  }, [onPlace])

  useEffect(() => {
    if (!hostRef.current) return
    // The APK uses the Laya armature and its raw texture for the playable
    // animal. This is also the authoritative layer on mobile; Phaser remains
    // responsible for the map, traps and camera only.
    const useLayaCharacters = true
    const scene = new PartyScene({
      initialState: state,
      useLayaCharacters,
      onReady: (readyScene) => {
        sceneRef.current = readyScene
        readyScene.setState(state, localPlayerId, build, countdown)
      },
      onMapReady: () => setMapReady(true),
      onPlace: (x, y) => onPlaceRef.current(x, y),
    })
    const game = new Phaser.Game({
      // Both layers are 2D: Phaser owns the map canvas and Laya owns the
      // skeleton canvas above it. Canvas avoids WebGL context eviction when
      // the user has more than one game tab or the dev server hot-reloads.
      type: Phaser.CANVAS,
      parent: hostRef.current,
      // The APK league recording uses a fixed 750x1670 portrait coordinate system.
      width: PDZZ_VIEWPORT_WIDTH,
      height: PDZZ_VIEWPORT_HEIGHT,
      transparent: true,
      backgroundColor: 'transparent',
      render: { antialias: true, pixelArt: false },
      // Keep the visual loop at display refresh rate. The server remains
      // authoritative at its fixed step; throttling this loop to 30 FPS made
      // touch input visibly wait for a second render tick on mobile.
      fps: { target: 60, limit: 0, forceSetTimeOut: false },
      physics: {
        default: 'arcade',
        arcade: { debug: false },
      },
      scene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    })
    let cancelled = false
    // Some mobile WebViews report unstable Laya armature bounds. That makes
    // one character render at a different scale or position from another.
    // The Phaser fallback uses the same fixed collider dimensions on every
    // browser, so keep it authoritative on touch-sized screens.
    void LayaCharacterRenderer.create(hostRef.current).then((renderer) => {
      if (cancelled) {
        renderer.destroy()
        return
      }
      characterRendererRef.current = renderer
      const applyInputImmediately: LocalInputListener = (playerId, input, sequence, jumpPressed) => {
        renderer.setLocalInput(playerId, input, sequence, jumpPressed)
      }
      localInputListenerRef.current = applyInputImmediately
      renderer.setLocalInput(localPlayerId, localInput)
      renderer.update(state, sceneRef.current)
    })
    return () => {
      cancelled = true
      characterRendererRef.current?.destroy()
      characterRendererRef.current = null
      localInputListenerRef.current = null
      sceneRef.current = null
      game.destroy(true)
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.setState(state, localPlayerId, build, countdown)
    characterRendererRef.current?.update(state, sceneRef.current)
  }, [state, build, localPlayerId, countdown])

  useEffect(() => {
    characterRendererRef.current?.setLocalInput(localPlayerId, localInput)
  }, [localInput, localPlayerId])

  return (
    <div
      ref={hostRef}
      className="game-canvas"
      aria-label="横版平台游戏画面"
      data-has-state={state ? 'yes' : 'no'}
      data-game-status={state?.status ?? 'none'}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      {state?.status === 'COUNTDOWN' && (
        <div className="game-loading" aria-live="polite">
          <span className="game-loading-spinner" aria-hidden="true" />
          <strong>加载中...</strong>
        </div>
      )}
      <MapFallbackLayer state={state} hidden={mapReady} />
    </div>
  )
}

const HAYSTACK_FALLBACK_FRAME_SIZES: Record<string, { width: number; height: number }> = {
  cloud: { width: 1125, height: 707 },
  cloud1: { width: 197, height: 109 },
  cloud2: { width: 232, height: 96 },
  cloud3: { width: 342, height: 177 },
  grassback: { width: 293, height: 50 },
  grassh1: { width: 281, height: 81 },
  grassm1: { width: 218, height: 80 },
  grasss1: { width: 215, height: 40 },
  haystack: { width: 614, height: 301 },
  scarecrow: { width: 180, height: 238 },
}

function MapFallbackLayer({ state, hidden }: { state: GameState | null; hidden: boolean }) {
  const map = state ? PDZZ_MAP_CATALOG.find((item) => item.id === state.level.mapId) : null
  if (!state || !map?.skySprite || !map.spriteAssets || !map.id.startsWith('levelhaystack')) return null
  const sky = map.spriteAssets[map.skySprite]
  if (!sky) return null
  const logicalStyle = (x: number, y: number) => ({
    left: `${(x / PDZZ_VIEWPORT_WIDTH) * 100}%`,
    top: `${(y / PDZZ_VIEWPORT_HEIGHT) * 100}%`,
  })
  return (
    <div className="pdzz-map-fallback" aria-hidden="true" style={{ opacity: hidden ? 0 : 1 }}>
      <img className="pdzz-map-fallback-sky" src={sky} alt="" />
      {state.level.decorations.map((decoration) => {
        const source = decoration.sprite.split('/').pop() ?? decoration.sprite
        const asset = map.spriteAssets[decoration.sprite]
        if (!asset) return null
        if (source === 'ground') {
          return (
            <div
              key={decoration.id}
              className="pdzz-map-fallback-ground"
              style={{
                ...logicalStyle(decoration.x, decoration.y),
                width: `${((decoration.slicedWidth ?? 2895) / PDZZ_VIEWPORT_WIDTH) * 100}%`,
                height: `${((decoration.slicedHeight ?? 830) / PDZZ_VIEWPORT_HEIGHT) * 100}%`,
                backgroundImage: `url(${asset})`,
                backgroundSize: `${(202 / (decoration.slicedWidth ?? 2895)) * 100}% 100%`,
              }}
            />
          )
        }
        const size = HAYSTACK_FALLBACK_FRAME_SIZES[source]
        if (!size) return null
        return (
          <img
            key={decoration.id}
            className="pdzz-map-fallback-sprite"
            src={asset}
            alt=""
            style={{
              ...logicalStyle(decoration.x, decoration.y),
              width: `${(size.width * decoration.scale / PDZZ_VIEWPORT_WIDTH) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${decoration.angle}deg) scale(${decoration.flipX ? -1 : 1}, ${decoration.flipY ? -1 : 1})`,
              opacity: decoration.alpha,
              zIndex: decoration.zOrder ?? 0,
            }}
          />
        )
      })}
    </div>
  )
}

export default function PartyGame() {
  const socketRef = useRef<Socket | null>(null)
  const pendingMessages = useRef<ClientMessage[]>([])
  const [screen, setScreen] = useState<Screen>('home')
  const [componentCategory, setComponentCategory] = useState<ComponentCategory>('all')
  const [room, setRoom] = useState<RoomState | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [result, setResult] = useState<RoundResult | null>(null)
  const [localPlayerId, setLocalPlayerId] = useState<string | null>(null)
  const [roomInput, setRoomInput] = useState('')
  const [countdown, setCountdown] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [connectionState, setConnectionState] = useState<'offline' | 'connecting' | 'online'>('offline')
  const [now, setNow] = useState(() => Date.now())
  const reconnectAttempted = useRef(false)
  const pendingGameStateRef = useRef<GameState | null>(null)
  const gameStateFlushTimerRef = useRef<number | null>(null)
  const lastGameStateCommitAt = useRef(0)
  const localInputRef = useRef<PlayerInput>({ left: false, right: false, jump: false })
  const inputSequenceRef = useRef(0)
  const localInputListenerRef = useRef<LocalInputListener | null>(null)
  const [localInput, setLocalInput] = useState<PlayerInput>({ left: false, right: false, jump: false })
  const [nameDraft, setNameDraft] = useState('')
  const nameDraftPlayerRef = useRef<string | null>(null)
  const sessionStorageKey = 'party-platform-session'

  const publishGameState = useCallback((next: GameState | null, immediate = false) => {
    pendingGameStateRef.current = next
    const currentTime = performance.now()
    const elapsed = currentTime - lastGameStateCommitAt.current
    if (immediate || elapsed >= GAME_STATE_RENDER_INTERVAL_MS) {
      if (gameStateFlushTimerRef.current !== null) {
        window.clearTimeout(gameStateFlushTimerRef.current)
        gameStateFlushTimerRef.current = null
      }
      lastGameStateCommitAt.current = currentTime
      setGameState(next)
      return
    }
    if (gameStateFlushTimerRef.current === null) {
      gameStateFlushTimerRef.current = window.setTimeout(() => {
        gameStateFlushTimerRef.current = null
        lastGameStateCommitAt.current = performance.now()
        setGameState(pendingGameStateRef.current)
      }, Math.max(0, GAME_STATE_RENDER_INTERVAL_MS - elapsed))
    }
  }, [])

  const send = useCallback((message: ClientMessage) => {
    const socket = socketRef.current
    if (!socket || !socket.connected) {
      pendingMessages.current.push(message)
      return
    }
    socket.emit('client_message', message)
  }, [])

  const updateLocalInput = useCallback((input: PlayerInput, jumpPressed = false) => {
    const nextInput = { ...input }
    const sequence = inputSequenceRef.current + 1
    inputSequenceRef.current = sequence
    localInputRef.current = nextInput
    // Update local prediction and animation in the same pointer/keyboard
    // event, before React schedules the next render.
    localInputListenerRef.current?.(localPlayerId, nextInput, sequence, jumpPressed)
    setLocalInput(nextInput)
    send({ type: 'input', input: nextInput, sequence, jumpPressed })
  }, [localPlayerId, send])

  const connect = useCallback(() => {
    if (socketRef.current) return socketRef.current
    setConnectionState('connecting')
    const socket = io(SERVER_URL, {
      // Start with polling so a browser that blocks the initial WebSocket
      // handshake can still connect immediately; Socket.IO upgrades the
      // established session to WebSocket when the network permits it.
      transports: ['polling', 'websocket'],
      upgrade: true,
      tryAllTransports: true,
      forceNew: true,
      timeout: 20000,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: false,
    })
    socket.on('connect', () => {
      setConnectionState('online')
      setError('')
      const stored = window.sessionStorage.getItem(sessionStorageKey)
      if (stored) {
        try {
          const session = JSON.parse(stored) as SessionInfo
          if (session.type === 'session' && session.roomId && session.reconnectToken) {
            reconnectAttempted.current = true
            socket.emit('client_message', {
              type: 'reconnect',
              roomId: session.roomId,
              token: session.reconnectToken,
            })
            return
          }
        } catch {
          window.sessionStorage.removeItem(sessionStorageKey)
        }
      }
      for (const message of pendingMessages.current.splice(0)) socket.emit('client_message', message)
    })
    socket.on('disconnect', () => setConnectionState('offline'))
    socket.on('connect_error', (cause) => {
      setConnectionState('offline')
      setError(`无法连接游戏服务器（${cause.message || '网络超时'}）`)
    })
    socket.on('server_message', (message: ServerMessage) => {
      if (message.type === 'session') {
        reconnectAttempted.current = false
        setLocalPlayerId(message.playerId)
        window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(message))
        return
      }
      if (message.type === 'error') {
        setError(message.message)
        if (reconnectAttempted.current) {
          reconnectAttempted.current = false
          window.sessionStorage.removeItem(sessionStorageKey)
          setLocalPlayerId(null)
          setRoom(null)
          setGameState(null)
          setResult(null)
          setScreen('home')
          for (const pending of pendingMessages.current.splice(0)) socket.emit('client_message', pending)
        }
        return
      }
      if (message.type === 'kicked') {
        window.sessionStorage.removeItem(sessionStorageKey)
        reconnectAttempted.current = false
        setLocalPlayerId(null)
        setRoom(null)
        setGameState(null)
        setResult(null)
        setScreen('home')
        setError(message.message)
        return
      }
      if (message.type === 'room_state') {
        setRoom(message.state)
        publishGameState(message.state.gameState, true)
        setResult(message.state.lastResult)
        if (message.state.status === 'BUILDING') {
          setScreen('build')
        } else if (message.state.status === 'COUNTDOWN' || message.state.status === 'PLAYING') {
          setScreen('game')
        } else if (message.state.status === 'ROUND_RESULT') {
          if (message.state.lastResult?.final) setScreen('final')
          else if (message.state.lastResult) setScreen('result')
        } else if (message.state.status === 'FINAL_RESULT') {
          setScreen('final')
        } else {
          setScreen('lobby')
        }
        return
      }
      if (message.type === 'countdown') {
        setCountdown(message.value)
        if (message.value === 0) {
          window.setTimeout(() => setCountdown(null), 700)
        }
        return
      }
      if (message.type === 'game_state') {
        publishGameState(message.state, message.state.status !== 'PLAYING')
        if (message.state.status === 'PLAYING') setCountdown(null)
        setScreen('game')
        return
      }
      if (message.type === 'round_result') {
        setResult(message.result)
        setCountdown(null)
        setScreen(message.result.final ? 'final' : 'result')
      }
    })
    socketRef.current = socket
    socket.connect()
    return socket
  }, [publishGameState])

  useEffect(() => {
    if (window.sessionStorage.getItem(sessionStorageKey) || screen === 'home') connect()
  }, [connect, screen])

  useEffect(() => () => {
    socketRef.current?.disconnect()
    if (gameStateFlushTimerRef.current !== null) window.clearTimeout(gameStateFlushTimerRef.current)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (screen !== 'game' || gameState?.status !== 'PLAYING') return
    // Keep the authoritative input alive while a finger or key is held. This
    // also recovers quickly after a short mobile network stall without adding
    // React renders to the hot path.
    const timer = window.setInterval(() => {
      const socket = socketRef.current
      if (socket?.connected) {
        const sequence = inputSequenceRef.current + 1
        inputSequenceRef.current = sequence
        socket.emit('client_message', {
          type: 'input',
          input: localInputRef.current,
          sequence,
          jumpPressed: false,
        })
        localInputListenerRef.current?.(localPlayerId, localInputRef.current, sequence, false)
      }
    }, GAME_STATE_RENDER_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [screen, gameState?.status])

  useEffect(() => {
    if (screen !== 'game' || gameState?.status !== 'PLAYING') return
    const keyMap: Record<string, keyof PlayerInput> = {
      ArrowLeft: 'left',
      KeyA: 'left',
      a: 'left',
      A: 'left',
      ArrowRight: 'right',
      KeyD: 'right',
      d: 'right',
      D: 'right',
      Space: 'jump',
      ArrowUp: 'jump',
      KeyW: 'jump',
      w: 'jump',
      W: 'jump',
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const key = keyMap[event.key] || keyMap[event.code]
      if (!key) return
      event.preventDefault()
      if (localInputRef.current[key]) return
      updateLocalInput({ ...localInputRef.current, [key]: true }, key === 'jump')
    }
    const onKeyUp = (event: KeyboardEvent) => {
      const key = keyMap[event.key] || keyMap[event.code]
      if (!key) return
      event.preventDefault()
      if (!localInputRef.current[key]) return
      updateLocalInput({ ...localInputRef.current, [key]: false })
    }
    const releaseAll = () => {
      if (!Object.values(localInputRef.current).some(Boolean)) return
      updateLocalInput({ left: false, right: false, jump: false })
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', releaseAll)
    document.addEventListener('visibilitychange', releaseAll)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', releaseAll)
      document.removeEventListener('visibilitychange', releaseAll)
    }
  }, [screen, gameState?.status, updateLocalInput])

  useEffect(() => {
    if (screen === 'game' && gameState?.status === 'PLAYING') return
    localInputRef.current = { left: false, right: false, jump: false }
    localInputListenerRef.current?.(localPlayerId, localInputRef.current)
    setLocalInput({ left: false, right: false, jump: false })
  }, [screen, gameState?.status, localPlayerId])

  const resetSocketForNewSession = () => {
    socketRef.current?.disconnect()
    socketRef.current = null
    pendingMessages.current = []
    window.sessionStorage.removeItem(sessionStorageKey)
    reconnectAttempted.current = false
  }

  const createRoom = () => {
    setError('正在连接游戏服务器…')
    resetSocketForNewSession()
    connect()
    send({ type: 'create_room' })
  }

  const joinRoom = () => {
    const normalized = roomInput.trim()
    if (!normalized) {
      setError('请输入房间号')
      return
    }
    if (!/^\d{4}$/.test(normalized)) {
      setError('房间号是四位数字')
      return
    }
    setError('正在连接游戏服务器…')
    resetSocketForNewSession()
    connect()
    send({ type: 'join_room', roomId: normalized })
  }

  const randomJoin = () => {
    setError('正在连接游戏服务器…')
    resetSocketForNewSession()
    connect()
    send({ type: 'random_join' })
  }

  const leaveRoom = () => {
    socketRef.current?.disconnect()
    socketRef.current = null
    pendingMessages.current = []
    window.sessionStorage.removeItem(sessionStorageKey)
    reconnectAttempted.current = false
    setRoom(null)
    setGameState(null)
    setResult(null)
    setScreen('home')
    setConnectionState('offline')
  }

  const localPlayer = useMemo(
    () => room?.players.find((player) => player.id === localPlayerId) ?? null,
    [room?.players, localPlayerId],
  )
  useEffect(() => {
    if (!localPlayer || nameDraftPlayerRef.current === localPlayer.id) return
    nameDraftPlayerRef.current = localPlayer.id
    setNameDraft(localPlayer.label)
  }, [localPlayer])

  const saveName = () => {
    const name = nameDraft.replace(/\s+/g, ' ').trim()
    if (!name || Array.from(name).length > 16) {
      setError('名字需要为 1 到 16 个字符')
      return
    }
    setNameDraft(name)
    send({ type: 'set_name', name })
  }

  const isHost = Boolean(room && localPlayerId && room.hostId === localPlayerId)
  const canStart = Boolean(room && room.players.length >= 1 && room.players.length <= 4 && room.players.every((player) => player.ready && player.connected))
  const build = room?.buildState ?? null
  const buildSeconds = build ? Math.max(0, Math.ceil((build.endsAt - now) / 1000)) : 0
  const playSeconds = gameState?.phaseEndsAt
    ? Math.max(0, Math.ceil((gameState.phaseEndsAt - now) / 1000))
    : 30
  const pendingPlacement = build?.pendingPlacements.find((pending) => pending.playerId === localPlayerId) ?? null
  const localHasPlacedTrap = Boolean(localPlayerId && build?.placedPlayerIds.includes(localPlayerId))
  const selectedTrapOption = build?.options.find((option) => option.id === pendingPlacement?.trapId) ?? null
  const visibleBuildOptions = build?.options.filter((option) =>
    componentCategory === 'all' || option.category === componentCategory,
  ) ?? []
  const currentRotationIndex = pendingPlacement
    ? ROTATIONS.indexOf(pendingPlacement.rotation)
    : 0
  const canSelectTrap = Boolean(
    build &&
      !pendingPlacement &&
      !localHasPlacedTrap &&
      build.options.some((option) => option.claimedBy === null),
  )
  const selectedMap = room?.selectedMapId
    ? PDZZ_LEAGUE_MAP_CATALOG.find((map) => map.id === room.selectedMapId) ?? null
    : null

  return (
    <main className="party-shell">
      <div className="party-noise" />
      {(screen === 'build' || screen === 'game') && (
        <div
          className="pdzz-persistent-game-canvas"
          data-map-id={gameState?.level.mapId ?? ''}
        >
          <GameCanvas
            state={gameState}
            build={screen === 'build' ? build : null}
            countdown={screen === 'game' ? countdown : null}
            localPlayerId={localPlayerId}
            localInput={localInput}
            localInputListenerRef={localInputListenerRef}
            onPlace={(x, y) => send({ type: 'place_trap', x, y, rotation: pendingPlacement?.rotation ?? 0 })}
          />
        </div>
      )}
      {screen === 'home' && (
        <section className="home-screen">
          <div className="home-copy">
            <p className="eyebrow">LEAGUE SINGLE OR PARTY RUN</p>
            <h1>跳跳搭档</h1>
            <p className="home-tagline">选择机关、摆到地图里，五局比赛决定胜负。</p>
            <div className="home-actions">
              <button
                className="primary-button"
                onClick={createRoom}
              >{connectionState === 'connecting' ? '正在连接…' : '创建房间'}</button>
              <div className="join-line">
                <input
                  value={roomInput}
                  onChange={(event) => setRoomInput(event.target.value.replace(/\D/g, '').slice(0, 4))}
                  onKeyDown={(event) => event.key === 'Enter' && joinRoom()}
                  placeholder="输入四位房间号"
                  maxLength={4}
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  aria-label="房间号"
                />
                <button
                  className="secondary-button"
                  onClick={joinRoom}
                >加入房间</button>
              </div>
              <button
                className="random-join-button"
                onClick={randomJoin}
              >随机加入</button>
            </div>
            <div className="how-to-play">
              <span>建造</span><strong>20 秒</strong>
              <span>竞速</span><strong>30 秒</strong>
              <span>回合</span><strong>5 局</strong>
            </div>
          </div>
          <div className="home-art pdzz-home-art" aria-hidden="true">
            <div className="home-pdzz-grid" />
            <img className="home-pdzz-haystack" src="/game/assets/pdzz/maps/levelhaystack2/haystack.png" alt="" />
            <img className="home-pdzz-scarecrow" src="/game/assets/pdzz/maps/levelhaystack2/frames/scarecrow.png" alt="" />
            <div className="home-pdzz-avatar home-pdzz-rabbit">
              <img src="/game/assets/pdzz/characters/frames/rabbit2.png" alt="" />
            </div>
            <div className="home-pdzz-avatar home-pdzz-pig">
              <img src="/game/assets/pdzz/characters/frames/pig.png" alt="" />
            </div>
            <div className="home-pdzz-ground" />
          </div>
        </section>
      )}

      {screen === 'lobby' && room && (
        <section className="lobby-screen">
          <div className="lobby-topbar">
            <button className="icon-button" onClick={leaveRoom} aria-label="退出房间" title="退出房间">←</button>
            <div>
              <p className="eyebrow">ROOM LOBBY</p>
              <h1>准备出发</h1>
            </div>
            <div className={`connection-dot ${connectionState}`} title={connectionState === 'online' ? '已连接' : '连接中'} />
          </div>
          <div className="room-code-panel">
            <span>房间号</span>
            <strong>{room.roomId}</strong>
            <button
              className="copy-button"
              onClick={() => navigator.clipboard?.writeText(room.roomId)}
              title="复制房间号"
              aria-label="复制房间号"
            >⧉</button>
          </div>
          <div className="name-editor">
            <label htmlFor="player-name">我的名字</label>
            <input
              id="player-name"
              value={nameDraft}
              maxLength={16}
              onChange={(event) => setNameDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') saveName()
              }}
              placeholder="输入你的名字"
              aria-label="我的名字"
            />
            <button className="secondary-button name-save-button" onClick={saveName}>保存</button>
          </div>
          <div className="map-picker">
            <div className="map-picker-heading">
              <div>
                <strong>地图</strong>
                <span>
                  {room.activeMapId
                    ? `本局：${PDZZ_LEAGUE_MAP_CATALOG.find((map) => map.id === room.activeMapId)?.name ?? room.activeMapId}`
                    : selectedMap
                      ? `已选择：${selectedMap.name}`
                      : '房主可指定地图，也可以每局随机'}
                </span>
              </div>
              <span className="map-mode-label">{room.mapMode === 'random' ? '随机' : '指定'}</span>
            </div>
            <div className="map-choice-grid">
              <button
                className={`map-choice random-map-choice ${room.mapMode === 'random' ? 'selected' : ''}`}
                disabled={!isHost}
                onClick={() => send({ type: 'select_map', mapId: null })}
              >
                <span className="random-map-mark">?</span>
                <strong>随机地图</strong>
                <small>从 APK 地图池抽取</small>
              </button>
              {PDZZ_LEAGUE_MAP_CATALOG.map((map) => (
                <button
                  className={`map-choice ${room.selectedMapId === map.id ? 'selected' : ''}`}
                  disabled={!isHost}
                  key={map.id}
                  onClick={() => send({ type: 'select_map', mapId: map.id })}
                >
                  {map.thumbnailAsset
                    ? <img src={map.thumbnailAsset} alt="" aria-hidden="true" />
                    : <span className="map-thumb-fallback">{map.name.slice(0, 1)}</span>}
                  <strong>{map.name}</strong>
                  <small>{map.width}×{map.height}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="room-settings">
            <label className="room-setting-toggle">
              <input
                type="checkbox"
                checked={room.playerCollisionEnabled}
                disabled={!isHost || (room.status !== 'WAITING' && room.status !== 'READY')}
                onChange={(event) => send({ type: 'set_player_collision', enabled: event.target.checked })}
              />
              <span className="room-setting-copy">
                <strong>玩家间碰撞</strong>
                <small>{room.playerCollisionEnabled ? '开启：动物之间会互相阻挡' : '关闭：动物可以相互穿过'}</small>
              </span>
              {!isHost && <span className="room-setting-owner">房主设置</span>}
            </label>
          </div>
          <div className="player-grid">
            {[1, 2, 3, 4].map((slot) => {
              const player = room.players.find((item) => item.slot === slot)
              return (
                <div className={`player-board slot-${slot}`} key={slot}>
                  <div className="player-avatar">
                    {player?.characterAsset
                      ? <img src={player.characterAsset} alt="" aria-hidden="true" />
                      : <span>?</span>}
                  </div>
                  <div className="player-meta">
                    <strong>{player?.label ?? `Player ${slot}`}</strong>
                    <span>{player ? (player.connected ? player.ready ? '已准备' : '等待准备' : '断开连接') : '等待加入'}</span>
                  </div>
                  <div className={`ready-mark ${player?.ready ? 'is-ready' : ''}`}>{player?.ready ? '✓' : '·'}</div>
                  {isHost && player && player.id !== localPlayerId && (
                    <button
                      className="kick-button"
                      onClick={() => send({ type: 'kick_player', playerId: player.id })}
                      title={`踢出 ${player.label}`}
                    >
                      踢出
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <div className="lobby-footer">
            {!isHost && (
              <button className="secondary-button" onClick={() => send({ type: 'ready' })}>
                {localPlayer?.ready ? '取消准备' : '准备好了'}
              </button>
            )}
            {isHost && (
              <button className="primary-button" disabled={!canStart} onClick={() => send({ type: 'start_game' })}>
                {canStart ? '开始游戏' : '等待玩家准备'}
              </button>
            )}
          </div>
        </section>
      )}

      {screen === 'build' && (
        <section
          className="game-screen build-screen pdzz-build-screen"
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="game-hud build-hud">
            <div>
              <p className="eyebrow">ROUND {room?.round ?? 1} / BUILD</p>
              <strong className="phase-title">选择机关并放置</strong>
            </div>
            <div className="phase-timer">{String(buildSeconds).padStart(2, '0')}<small>s</small></div>
            <div className="round-badge">第{room?.round ?? 1}局 / 共5局</div>
          </div>
          <div className="build-layout">
            <aside className={`trap-drawer ${pendingPlacement ? 'placing' : ''}`}>
              <div className="drawer-heading">
                <strong>本回合机关</strong>
                <span>{pendingPlacement ? '先完成当前放置' : localHasPlacedTrap ? '本回合已放置一个机关' : canSelectTrap ? '抢一个未被拿走的' : '机关已被拿完'}</span>
              </div>
              <div className="pdzz-component-tabs" aria-label="组件分类">
                <button className={componentCategory === 'all' ? 'is-selected' : ''} type="button" aria-label="全部组件" onClick={() => setComponentCategory('all')}>
                  <img src="/game/assets/pdzz/ui/frames/ugc_icon_recent.png" alt="" aria-hidden="true" />
                </button>
                <button className={componentCategory === 'platform' ? 'is-selected' : ''} type="button" aria-label="平台" onClick={() => setComponentCategory('platform')}>
                  <img src="/game/assets/pdzz/ui/frames/ugc_icon_platform.png" alt="" aria-hidden="true" />
                </button>
                <button className={componentCategory === 'hazard' ? 'is-selected' : ''} type="button" aria-label="陷阱" onClick={() => setComponentCategory('hazard')}>
                  <img src="/game/assets/pdzz/ui/frames/ugc_icon_hazard.png" alt="" aria-hidden="true" />
                </button>
                <button className={componentCategory === 'special' ? 'is-selected' : ''} type="button" aria-label="机关" onClick={() => setComponentCategory('special')}>
                  <img src="/game/assets/pdzz/ui/frames/ugc_icon_gizmos.png" alt="" aria-hidden="true" />
                </button>
              </div>
              <div className="trap-option-grid">
                {visibleBuildOptions.map((option) => {
                  const claimedBy = room?.players.find((player) => player.id === option.claimedBy)
                  return (
                    <button
                      className={`trap-option ${option.claimedBy ? 'claimed' : ''} ${option.claimedBy === localPlayerId ? 'mine' : ''}`}
                      key={option.id}
                      disabled={!canSelectTrap || Boolean(option.claimedBy)}
                      onClick={() => send({ type: 'select_trap', trapId: option.id })}
                      style={{ '--trap-color': option.color } as React.CSSProperties}
                    >
                      <ComponentIcon option={option} />
                      <span>{option.name}</span>
                      <small>
                        {option.width}×{option.height} 格 · {pdzzTrapRequiresGroundSupport(option.id) ? '必须贴地' : '不能碰到地图地面'}
                      </small>
                      <small className="trap-option-description">{option.description}</small>
                      {claimedBy && <em>{claimedBy.id === localPlayerId ? '已拿' : 'P' + claimedBy.slot}</em>}
                    </button>
                  )
                })}
              </div>
              <section className="pdzz-component-guide" aria-label="原作机关说明">
                <div className="pdzz-component-guide-heading">
                  <strong>原作机关配置</strong>
                  <span>滑动查看全部 9 个</span>
                </div>
                <div className="pdzz-component-guide-list">
                  {PDZZ_LEAGUE_COMPONENT_GUIDE.map((guide) => {
                    // The drawer contains six random options; the reference
                    // strip must still describe all nine league components.
                    const option = build?.options.find((item) => item.id === guide.id)
                      ?? PDZZ_COMPONENTS.find((item) => item.id === guide.id)
                    return (
                      <article className="pdzz-component-guide-card" key={guide.id}>
                        {option && <ComponentIcon option={option} />}
                        <strong>{option?.name ?? guide.id}</strong>
                        <p>{guide.functionText}</p>
                        <small>{guide.configuration}</small>
                      </article>
                    )
                  })}
                </div>
              </section>
            <div className="build-note">
              <strong>格子规则</strong>
                <span>绿色格都是当前机关的合法位置；所有机关必须整格对齐，不能和地面或已有机关重叠。只有普通地刺需要贴地，其余机关可悬空放置。</span>
              </div>
              {pendingPlacement && pendingPlacement.playerId === localPlayerId && (
                <div className="placement-controls">
                  <div className="placement-card">
                    <ComponentIcon option={selectedTrapOption ?? {
                      glyph: '?',
                      iconCrop: null,
                    }} />
                    <div>
                      <strong>{selectedTrapOption?.name ?? '机关预览'}</strong>
                      <span>{pendingPlacement.width}×{pendingPlacement.height} 格 · {pendingPlacement.rotation}°</span>
                      <small>{selectedTrapOption?.description}</small>
                    </div>
                  </div>
                  <div className="placement-guide">
                    <span className={`placement-status ${pendingPlacement.valid ? 'valid' : 'invalid'}`}>
                      {pendingPlacement.valid ? '绿色预览：可以放置' : '红色预览：不能放置'}
                    </span>
                    <span>
                      {selectedTrapOption && pdzzTrapRequiresGroundSupport(selectedTrapOption.id)
                        ? '直接指向地面或平台顶边，机关会自动吸附在表面上方'
                        : '拖动地图中的预览，避开地图地面，整格吸附'}
                    </span>
                  </div>
                  <div className="placement-actions">
                    <button
                      className="placement-icon-button"
                      onClick={() => send({
                        type: 'rotate_trap',
                        rotation: ROTATIONS[(currentRotationIndex + 1) % ROTATIONS.length],
                      })}
                      title="旋转机关"
                      aria-label="旋转机关"
                    >
                      ↻
                    </button>
                    <button
                      className="placement-cancel-button"
                      onClick={() => send({ type: 'cancel_trap' })}
                      title="取消选择"
                      aria-label="取消选择"
                    >
                      ×
                    </button>
                    <button
                      className="placement-confirm-button"
                      disabled={!pendingPlacement.valid}
                      onClick={() => send({ type: 'confirm_build' })}
                      title={pendingPlacement.valid ? '确认放置机关' : '请先移动到绿色区域'}
                      aria-label="确认放置机关"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              )}
            </aside>
            <div className="game-frame build-frame">
              <div className="game-canvas" aria-hidden="true" />
            </div>
          </div>
        </section>
      )}

      {screen === 'game' && (
        <section
          className="game-screen pdzz-game-screen"
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="game-frame pdzz-game-frame">
            <TouchControls
              inputRef={localInputRef}
              onInput={updateLocalInput}
              disabled={gameState?.status !== 'PLAYING'}
            />
          </div>
        </section>
      )}

      {screen === 'result' && result && (
        <section className="result-screen">
          <p className="eyebrow">ROUND {result.round} COMPLETE</p>
          <h1>这一回合结束啦</h1>
          <p className="result-subtitle">{result.final ? '五回合完成，比赛结束' : '下一回合会保留本回合所有机关'}</p>
          <div className="result-list">
            {result.entries.map((entry) => (
              <div className={`result-row ${entry.playerId === result.winnerId ? 'winner' : ''}`} key={entry.playerId}>
                <span className="result-icon">{entry.outcome === 'finished' ? '🏁' : '💫'}</span>
                <div>
                  <strong>{entry.label}</strong>
                  <span>{entry.outcome === 'finished' ? `到达终点 · ${entry.finishTime ?? 0}s` : entry.outcome === 'timeout' ? '时间到，未到终点' : '掉入机关'}</span>
                  <small>基础 {entry.baseScore} · 机关奖励 {entry.trapBonus}</small>
                </div>
                <b>+{entry.roundScore}<small>总分 {entry.totalScore}</small></b>
              </div>
            ))}
          </div>
          <div className="result-actions">
            <span className="auto-round-note">下一回合会自动开始，机关继续保留</span>
            <button className="secondary-button" onClick={() => send({ type: 'return_to_room' })}>回到房间</button>
            <button className="text-button" onClick={leaveRoom}>回到首页</button>
          </div>
        </section>
      )}

      {screen === 'final' && result && (
        <section className="result-screen final-screen">
          <p className="eyebrow">FIVE ROUND FINAL</p>
          <h1>最终结算</h1>
          <p className="result-subtitle">五回合结束，看看谁先到达终点。</p>
          <div className="result-list">
            {[...result.entries]
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((entry, index) => (
                <div className={`result-row ${index === 0 ? 'winner' : ''}`} key={entry.playerId}>
                  <span className="result-icon">{index === 0 ? '✦' : index + 1}</span>
                  <div><strong>{entry.label}</strong><span>{index === 0 ? '本局冠军' : '完成五回合'}</span></div>
                  <b>{entry.totalScore}<small>总分</small></b>
                </div>
              ))}
          </div>
          <div className="result-actions">
            <button className="secondary-button" onClick={() => send({ type: 'return_to_room' })}>回到房间</button>
            <button className="primary-button" onClick={leaveRoom}>回到首页</button>
          </div>
        </section>
      )}

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button onClick={() => setError('')} aria-label="关闭提示">×</button>
        </div>
      )}
    </main>
  )
}

