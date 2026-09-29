import { randomBytes, randomUUID } from 'node:crypto'
import type {
  BuildState,
  ClientMessage,
  GameState,
  PendingPlacement,
  PlacedTrap,
  PlayerInput,
  PlayerSlot,
  RoomPlayer,
  RoomState,
  RoomStatus,
  Rotation,
  RoundResult,
} from '../../shared/gameProtocol'
import {
  GameSimulation,
  LEVEL_BASE,
  isLegalTrapPlacement,
  legalTrapCells,
  rotatedDimensions,
  trapDefinition,
  TRAP_DEFINITIONS,
} from './simulation'
import {
  PDZZ_LEAGUE_MAP_IDS,
  getPdzzCharacterForSlot,
} from '../../shared/pdzzConfig'

type RoomPlayerState = RoomPlayer & {
  reconnectToken: string
  socketId: string | null
  disconnectedAt: number | null
}

type BuildInternal = {
  endsAt: number
  options: ReturnType<typeof makeOptions>
  pendingPlacements: Map<string, PendingPlacement>
  placedPlayerIds: Set<string>
}

export type RoomEvent =
  | { type: 'room_state'; roomId: string; state: RoomState }
  | { type: 'countdown'; roomId: string; value: number }
  | { type: 'game_state'; roomId: string; state: GameState }
  | { type: 'round_result'; roomId: string; result: RoundResult }
  | { type: 'player_left'; roomId: string; playerId: string }
  | { type: 'kicked'; roomId: string; socketId: string; message: string }
  | { type: 'error'; socketId: string; code: string; message: string }

export type Session = {
  playerId: string
  roomId: string
  reconnectToken: string
}

type Room = {
  roomId: string
  hostId: string
  status: RoomStatus
  round: number
  players: Map<string, RoomPlayerState>
  selectedMapId: string | null
  mapMode: 'specific' | 'random'
  activeMapId: string | null
  simulation: GameSimulation | null
  placedTraps: PlacedTrap[]
  build: BuildInternal | null
  countdownEndsAt: number | null
  countdownValue: number | null
  phaseEndsAt: number | null
  roundResultEndsAt: number | null
  lastResult: RoundResult | null
  lastEmptyAt: number | null
  lastGameBroadcastAt: number
}

const MAX_PLAYERS = 4
const BUILD_DURATION_MS = 20_000
const COUNTDOWN_DURATION_MS = 3_000
const TOTAL_ROUNDS = 5
const DISCONNECT_GRACE_MS = 30_000
const EMPTY_ROOM_TTL_MS = 5 * 60_000
const GAME_STATE_BROADCAST_INTERVAL_MS = 50

function normalizeRoomId(value: unknown) {
  if (typeof value !== 'string') return ''
  const normalized = value.trim()
  return /^\d{4}$/.test(normalized) ? normalized : ''
}

function createRoomId() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function createToken() {
  return randomBytes(18).toString('base64url')
}

function clampInput(input: Partial<PlayerInput> | null | undefined): PlayerInput {
  return {
    left: Boolean(input?.left),
    right: Boolean(input?.right),
    jump: Boolean(input?.jump),
  }
}

function isRotation(value: unknown): value is Rotation {
  return value === 0 || value === 90 || value === 180 || value === 270
}

const FIXED_LEAGUE_TRAP_IDS = [
  'fortunecat',
  'gas',
  'triggerhazard',
  'spike3x1',
  'mud',
  'triggerspikes',
] as const

function makeOptions() {
  // Temporary league test pool. Keep the order stable while these six APK
  // components are validated against the extracted runtime behavior.
  return FIXED_LEAGUE_TRAP_IDS.map((id) => {
    const definition = TRAP_DEFINITIONS.find((item) => item.id === id)
    if (!definition) throw new Error(`Missing fixed league trap definition: ${id}`)
    return { ...definition, claimedBy: null as string | null }
  })
}

export class RoomManager {
  private rooms = new Map<string, Room>()
  private socketSessions = new Map<string, Session>()

  constructor(private readonly emit: (event: RoomEvent) => void) {}

  handle(socketId: string, message: ClientMessage) {
    switch (message.type) {
      case 'create_room':
        return this.createRoom(socketId)
      case 'join_room':
        return this.joinRoom(socketId, message.roomId)
      case 'random_join':
        return this.randomJoin(socketId)
      case 'reconnect':
        return this.reconnect(socketId, message.roomId, message.token)
      case 'ready':
        return this.setReady(socketId)
      case 'select_map':
        return this.selectMap(socketId, message.mapId)
      case 'start_game':
        return this.startGame(socketId)
      case 'select_trap':
        return this.selectTrap(socketId, message.trapId)
      case 'place_trap':
        return this.placeTrap(socketId, message.x, message.y, message.rotation)
      case 'rotate_trap':
        return this.rotateTrap(socketId, message.rotation)
      case 'cancel_trap':
        return this.cancelTrap(socketId)
      case 'confirm_build':
        return this.confirmBuild(socketId)
      case 'input':
        return this.setInput(socketId, message.input)
      case 'return_to_room':
        return this.returnToRoom(socketId)
      case 'kick_player':
        return this.kickPlayer(socketId, message.playerId)
      default:
        return this.fail(socketId, 'UNKNOWN_MESSAGE', '不支持的消息类型')
    }
  }

  tick(dt: number) {
    const now = Date.now()
    for (const room of this.rooms.values()) {
      this.expireDisconnected(room, now)

      if (room.status === 'BUILDING' && room.build && now >= room.build.endsAt) {
        this.finishBuild(room)
      }

      if (room.status === 'COUNTDOWN' && room.countdownEndsAt) {
        const secondsLeft = Math.max(1, Math.ceil((room.countdownEndsAt - now) / 1000))
        if (secondsLeft !== room.countdownValue) {
          room.countdownValue = secondsLeft
          this.emit({ type: 'countdown', roomId: room.roomId, value: secondsLeft })
        }
        if (now >= room.countdownEndsAt) {
          this.startPlaying(room)
        }
      }

      if (room.status === 'PLAYING' && room.simulation) {
        room.simulation.tick(dt)
        if (room.simulation.isComplete()) {
          this.finishRound(room)
        } else if (now - room.lastGameBroadcastAt >= GAME_STATE_BROADCAST_INTERVAL_MS) {
          this.broadcastGame(room)
          room.lastGameBroadcastAt = now
        }
      }

      if (room.lastEmptyAt && now - room.lastEmptyAt > EMPTY_ROOM_TTL_MS) {
        this.rooms.delete(room.roomId)
      }
    }
  }

  disconnect(socketId: string) {
    const session = this.socketSessions.get(socketId)
    if (!session) return
    this.socketSessions.delete(socketId)
    const room = this.rooms.get(session.roomId)
    if (!room) return
    const player = room.players.get(session.playerId)
    if (!player) return
    player.connected = false
    player.socketId = null
    player.disconnectedAt = Date.now()
    room.lastEmptyAt = Array.from(room.players.values()).every((item) => !item.connected) ? Date.now() : null
    if (room.hostId === player.id) {
      const nextHost = Array.from(room.players.values()).find((item) => item.connected)
      if (nextHost) room.hostId = nextHost.id
    }
    if (room.simulation) room.simulation.setConnected(player.id, false)
    if (room.status === 'BUILDING') {
      room.build?.pendingPlacements.delete(player.id)
      this.recomputePendingPlacements(room)
    }
    this.emit({ type: 'player_left', roomId: room.roomId, playerId: player.id })
    this.broadcastRoom(room)
  }

  getSession(socketId: string) {
    return this.socketSessions.get(socketId)
  }

  sync(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    this.emit({ type: 'room_state', roomId: context.room.roomId, state: this.roomState(context.room) })
  }

  private createRoom(socketId: string): Session {
    let roomId = createRoomId()
    while (this.rooms.has(roomId)) roomId = createRoomId()
    const playerId = randomUUID()
    const reconnectToken = createToken()
    const character = getPdzzCharacterForSlot(1)
    const room: Room = {
      roomId,
      hostId: playerId,
      status: 'WAITING',
      round: 1,
      players: new Map([
        [
          playerId,
          {
            id: playerId,
            slot: 1,
            label: `Player 1 · ${character.name}`,
            connected: true,
            ready: false,
            score: 0,
            characterId: character.refID,
            characterAsset: character.imageAsset,
            reconnectToken,
            socketId,
            disconnectedAt: null,
          },
        ],
      ]),
      simulation: null,
      selectedMapId: null,
      mapMode: 'random',
      activeMapId: null,
      placedTraps: [],
      build: null,
      countdownEndsAt: null,
      countdownValue: null,
      phaseEndsAt: null,
      roundResultEndsAt: null,
      lastResult: null,
      lastEmptyAt: null,
      lastGameBroadcastAt: 0,
    }
    this.rooms.set(roomId, room)
    const session = { playerId, roomId: room.roomId, reconnectToken }
    this.socketSessions.set(socketId, session)
    this.emit({ type: 'room_state', roomId: room.roomId, state: this.roomState(room) })
    return session
  }

  private joinRoom(socketId: string, rawRoomId: string): Session | null {
    const roomId = normalizeRoomId(rawRoomId)
    const room = this.rooms.get(roomId)
    if (!room) return this.fail(socketId, 'ROOM_NOT_FOUND', '房间不存在')
    const existing = Array.from(room.players.values()).find((player) => player.socketId === socketId)
    if (existing) return this.fail(socketId, 'ALREADY_IN_ROOM', '你已经在房间里')
    if (room.players.size >= MAX_PLAYERS) return this.fail(socketId, 'ROOM_FULL', '房间已满')
    if (room.status !== 'WAITING' && room.status !== 'READY') {
      return this.fail(socketId, 'GAME_STARTED', '本局游戏已经开始')
    }

    return this.addPlayerToRoom(socketId, room)
  }

  private randomJoin(socketId: string): Session | null {
    if (this.socketSessions.has(socketId)) {
      return this.fail(socketId, 'ALREADY_IN_ROOM', '你已经在房间里')
    }

    const availableRooms = Array.from(this.rooms.values()).filter(
      (room) =>
        (room.status === 'WAITING' || room.status === 'READY') &&
        room.players.size < MAX_PLAYERS,
    )
    if (availableRooms.length === 0) {
      return this.fail(socketId, 'NO_OPEN_ROOMS', '暂时没有可加入的房间，请先创建一个')
    }

    const room = availableRooms[Math.floor(Math.random() * availableRooms.length)]
    return this.addPlayerToRoom(socketId, room)
  }

  private addPlayerToRoom(socketId: string, room: Room): Session {
    const playerId = randomUUID()
    const reconnectToken = createToken()
    const usedSlots = new Set(Array.from(room.players.values()).map((player) => player.slot))
    const slot = ([1, 2, 3, 4] as PlayerSlot[]).find((candidate) => !usedSlots.has(candidate)) ?? 4
    const character = getPdzzCharacterForSlot(slot)
    const session = { playerId, roomId: room.roomId, reconnectToken }
    room.players.set(playerId, {
      id: playerId,
      slot,
      label: `Player ${slot} · ${character.name}`,
      connected: true,
      ready: false,
      score: 0,
      characterId: character.refID,
      characterAsset: character.imageAsset,
      reconnectToken,
      socketId,
      disconnectedAt: null,
    })
    room.status = 'WAITING'
    room.lastEmptyAt = null
    this.socketSessions.set(socketId, session)
    this.emit({ type: 'room_state', roomId: room.roomId, state: this.roomState(room) })
    return session
  }

  private reconnect(socketId: string, rawRoomId: string, token: string): Session | null {
    const room = this.rooms.get(normalizeRoomId(rawRoomId))
    if (!room) return this.fail(socketId, 'ROOM_NOT_FOUND', '房间不存在')
    const player = typeof token === 'string'
      ? Array.from(room.players.values()).find((item) => item.reconnectToken === token)
      : undefined
    if (!player || player.connected || !player.disconnectedAt || Date.now() - player.disconnectedAt > DISCONNECT_GRACE_MS) {
      return this.fail(socketId, 'RECONNECT_FAILED', '重连凭证已失效')
    }
    player.connected = true
    player.socketId = socketId
    player.disconnectedAt = null
    room.lastEmptyAt = null
    if (room.simulation) room.simulation.setConnected(player.id, true)
    const session = { playerId: player.id, roomId: room.roomId, reconnectToken: player.reconnectToken }
    this.socketSessions.set(socketId, session)
    this.emit({ type: 'room_state', roomId: room.roomId, state: this.roomState(room) })
    return session
  }

  private setReady(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    if (room.status !== 'WAITING' && room.status !== 'READY') {
      return this.fail(socketId, 'INVALID_PHASE', '当前阶段不能修改准备状态')
    }
    player.ready = !player.ready
    room.status = Array.from(room.players.values()).every((item) => item.ready && item.connected) ? 'READY' : 'WAITING'
    this.broadcastRoom(room)
  }

  private startGame(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    if (room.hostId !== player.id) return this.fail(socketId, 'NOT_HOST', '只有房主可以开始游戏')
    if (
      room.players.size < 1 ||
      room.players.size > MAX_PLAYERS ||
      !Array.from(room.players.values()).every((item) => item.ready && item.connected)
    ) {
      return this.fail(socketId, 'NOT_READY', '玩家准备后才能开始')
    }
    this.beginBuild(room)
  }

  private selectMap(socketId: string, mapId: string | null) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    if (room.hostId !== player.id) return this.fail(socketId, 'NOT_HOST', '只有房主可以选择地图')
    if (room.status !== 'WAITING' && room.status !== 'READY') {
      return this.fail(socketId, 'INVALID_PHASE', '只有等待房间可以选择地图')
    }
    if (mapId !== null && !PDZZ_LEAGUE_MAP_IDS.includes(mapId)) {
      return this.fail(socketId, 'MAP_NOT_FOUND', '地图不存在或暂不可用')
    }
    room.selectedMapId = mapId
    room.mapMode = mapId ? 'specific' : 'random'
    room.activeMapId = null
    this.broadcastRoom(room)
  }

  private beginBuild(room: Room) {
    const players = Array.from(room.players.values()).sort((a, b) => a.slot - b.slot)
    const simulationPlayers = players.map((item) => ({
      id: item.id,
      slot: item.slot,
      label: item.label,
      score: item.score,
      characterId: item.characterId,
      characterAsset: item.characterAsset,
      bot: false,
    }))
    if (players.length === 1) {
      const bot = getPdzzCharacterForSlot(2)
      simulationPlayers.push({
        id: `league-bot-${room.roomId}`,
        slot: 2,
        label: `联赛对手 · ${bot.name}`,
        score: 0,
        characterId: bot.refID,
        characterAsset: bot.imageAsset,
        bot: true,
      })
    }
    room.status = 'BUILDING'
    room.countdownEndsAt = null
    room.countdownValue = null
    room.phaseEndsAt = null
    room.roundResultEndsAt = null
    room.lastResult = null
    if (!room.activeMapId) {
      room.activeMapId = room.mapMode === 'specific' && room.selectedMapId
        ? room.selectedMapId
        : PDZZ_LEAGUE_MAP_IDS[Math.floor(Math.random() * PDZZ_LEAGUE_MAP_IDS.length)]
    }
    room.build = {
      endsAt: Date.now() + BUILD_DURATION_MS,
      options: makeOptions(),
      pendingPlacements: new Map(),
      placedPlayerIds: new Set(),
    }
    room.simulation = new GameSimulation(
      room.round,
      simulationPlayers,
      room.placedTraps,
      room.activeMapId,
    )
    this.broadcastRoom(room)
  }

  private selectTrap(socketId: string, trapId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    const build = room.build
    if (room.status !== 'BUILDING' || !build) return this.fail(socketId, 'INVALID_PHASE', '当前不是机关选择阶段')
    if (build.placedPlayerIds.has(player.id)) return this.fail(socketId, 'ALREADY_PLACED', '本回合每位玩家只能放置一个机关')
    if (build.pendingPlacements.has(player.id)) return this.fail(socketId, 'PLACE_FIRST', '请先放置或取消当前机关')
    const option = build.options.find((item) => item.id === trapId)
    if (!option) return this.fail(socketId, 'TRAP_NOT_AVAILABLE', '这个机关不在本回合选项中')
    if (option.claimedBy) return this.fail(socketId, 'TRAP_CLAIMED', '这个机关已经被另一位玩家选走')
    const definition = trapDefinition(trapId)
    if (!definition) return this.fail(socketId, 'TRAP_NOT_FOUND', '机关不存在')
    option.claimedBy = player.id
    const legalCells = legalTrapCells(trapId, 0, this.occupiedTraps(room, player.id), room.simulation?.level ?? LEVEL_BASE)
    const firstLegalCell = legalCells[0] ?? { x: 0, y: 0 }
    build.pendingPlacements.set(player.id, {
      playerId: player.id,
      instanceId: randomUUID(),
      trapId,
      x: firstLegalCell.x,
      y: firstLegalCell.y,
      width: definition.width,
      height: definition.height,
      rotation: 0,
      valid: legalCells.length > 0,
      legalCells,
    })
    this.recomputePendingPlacements(room)
    this.broadcastRoom(room)
  }

  private placeTrap(socketId: string, x: number, y: number, rotation: Rotation) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    const build = room.build
    const pending = build?.pendingPlacements.get(player.id)
    if (room.status !== 'BUILDING' || !build || !pending) {
      return this.fail(socketId, 'NO_TRAP_SELECTED', '请先选择一个机关')
    }
    if (!Number.isInteger(x) || !Number.isInteger(y) || !isRotation(rotation)) {
      return this.fail(socketId, 'INVALID_PLACEMENT', '机关位置无效')
    }
    const definition = trapDefinition(pending.trapId)
    if (!definition) return this.fail(socketId, 'TRAP_NOT_FOUND', '机关不存在')
    const dimensions = rotatedDimensions(definition, rotation)
    pending.x = x
    pending.y = y
      pending.rotation = rotation
    pending.width = dimensions.width
    pending.height = dimensions.height
    pending.valid = isLegalTrapPlacement(
      pending.trapId,
      x,
      y,
      rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    pending.legalCells = legalTrapCells(
      pending.trapId,
      rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    this.recomputePendingPlacements(room)
    this.broadcastRoom(room)
  }

  private rotateTrap(socketId: string, rotation: Rotation) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    const pending = room.build?.pendingPlacements.get(player.id)
    if (room.status !== 'BUILDING' || !pending) return this.fail(socketId, 'NO_TRAP_SELECTED', '请先选择一个机关')
    if (!isRotation(rotation)) return this.fail(socketId, 'INVALID_ROTATION', '旋转角度无效')
    const definition = trapDefinition(pending.trapId)
    if (!definition) return this.fail(socketId, 'TRAP_NOT_FOUND', '机关不存在')
    const dimensions = rotatedDimensions(definition, rotation)
    pending.rotation = rotation
    pending.width = dimensions.width
    pending.height = dimensions.height
    pending.valid = isLegalTrapPlacement(
      pending.trapId,
      pending.x,
      pending.y,
      rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    pending.legalCells = legalTrapCells(
      pending.trapId,
      rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    this.recomputePendingPlacements(room)
    this.broadcastRoom(room)
  }

  private cancelTrap(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    const build = room.build
    const pending = build?.pendingPlacements.get(player.id)
    if (room.status !== 'BUILDING' || !build || !pending) return
    const option = build.options.find((item) => item.id === pending.trapId)
    if (option) option.claimedBy = null
    build.pendingPlacements.delete(player.id)
    this.recomputePendingPlacements(room)
    this.broadcastRoom(room)
  }

  private confirmBuild(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player } = context
    const build = room.build
    const pending = build?.pendingPlacements.get(player.id)
    if (room.status !== 'BUILDING' || !build || !pending) return this.fail(socketId, 'NO_TRAP_SELECTED', '请先选择一个机关')
    pending.valid = isLegalTrapPlacement(
      pending.trapId,
      pending.x,
      pending.y,
      pending.rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    pending.legalCells = legalTrapCells(
      pending.trapId,
      pending.rotation,
      this.occupiedTraps(room, player.id),
      room.simulation?.level ?? LEVEL_BASE,
    )
    if (!pending.valid) return this.fail(socketId, 'INVALID_PLACEMENT', '机关必须对齐网格、满足放置规则且不能重叠')

    const placedTrap = {
      instanceId: pending.instanceId,
      trapId: pending.trapId,
      ownerId: pending.playerId,
      x: pending.x,
      y: pending.y,
      width: pending.width,
      height: pending.height,
      rotation: pending.rotation,
      placedRound: room.round,
    }
    room.placedTraps.push(placedTrap)
    build.placedPlayerIds.add(player.id)
    this.autoConnectSwitchable(room, placedTrap)
    room.simulation?.setPlacedTraps(room.placedTraps)
    build.pendingPlacements.delete(player.id)
    this.recomputePendingPlacements(room)
    if (build.options.every((option) => option.claimedBy)) {
      this.finishBuild(room)
      return
    }
    this.broadcastRoom(room)
  }

  private setInput(socketId: string, input: PlayerInput) {
    const context = this.context(socketId)
    if (!context || !context.room.simulation) return
    if (context.room.status !== 'PLAYING') return
    context.room.simulation.setInput(context.player.id, clampInput(input))
  }

  private autoConnectSwitchable(room: Room, placedTrap: PlacedTrap) {
    const switches = new Set(['onoffswitch', 'pressureswitch'])
    const doors = new Set(['door', 'rotarydoor', 'movabledoor'])
    const isSwitch = switches.has(placedTrap.trapId)
    const isDoor = doors.has(placedTrap.trapId)
    if (!isSwitch && !isDoor) return
    const candidate = room.placedTraps.find((trap) => {
      if (trap.instanceId === placedTrap.instanceId || trap.connectedTo) return false
      return isSwitch ? doors.has(trap.trapId) : switches.has(trap.trapId)
    })
    if (!candidate) return
    placedTrap.connectedTo = candidate.instanceId
    candidate.connectedTo = placedTrap.instanceId
  }

  private returnToRoom(socketId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room } = context
    if (room.status !== 'ROUND_RESULT' && room.status !== 'FINAL_RESULT') {
      return this.fail(socketId, 'INVALID_PHASE', '当前不能返回房间')
    }

    room.status = 'WAITING'
    room.round = 1
    room.players.forEach((player) => {
      player.ready = false
      player.score = 0
    })
    room.simulation = null
    room.placedTraps = []
    room.build = null
    room.countdownEndsAt = null
    room.countdownValue = null
    room.phaseEndsAt = null
    room.roundResultEndsAt = null
    room.lastResult = null
    room.activeMapId = null
    this.broadcastRoom(room)
  }

  private kickPlayer(socketId: string, playerId: string) {
    const context = this.context(socketId)
    if (!context) return
    const { room, player: host } = context
    if (room.hostId !== host.id) return this.fail(socketId, 'NOT_HOST', '只有房主可以踢人')
    if (room.status !== 'WAITING' && room.status !== 'READY') {
      return this.fail(socketId, 'INVALID_PHASE', '只有房间大厅可以踢人')
    }
    if (playerId === host.id) return this.fail(socketId, 'INVALID_PLAYER', '不能踢出自己')
    const target = room.players.get(playerId)
    if (!target) return this.fail(socketId, 'PLAYER_NOT_FOUND', '玩家不存在')

    room.players.delete(target.id)
    if (target.socketId) {
      this.socketSessions.delete(target.socketId)
      this.emit({
        type: 'kicked',
        roomId: room.roomId,
        socketId: target.socketId,
        message: '你已被房主移出房间',
      })
    }
    this.emit({ type: 'player_left', roomId: room.roomId, playerId: target.id })
    this.broadcastRoom(room)
  }

  private finishBuild(room: Room) {
    if (room.status !== 'BUILDING') return
    if (room.build) {
      room.build.pendingPlacements.clear()
    }
    room.simulation?.setPlacedTraps(room.placedTraps)
    room.status = 'COUNTDOWN'
    room.countdownEndsAt = Date.now() + COUNTDOWN_DURATION_MS
    room.countdownValue = 3
    room.phaseEndsAt = null
    this.emit({ type: 'countdown', roomId: room.roomId, value: 3 })
    this.broadcastRoom(room)
  }

  private startPlaying(room: Room) {
    if (room.status !== 'COUNTDOWN' || !room.simulation) return
    room.status = 'PLAYING'
    room.countdownEndsAt = null
    room.countdownValue = null
    room.phaseEndsAt = Date.now() + 30_000
    room.lastGameBroadcastAt = 0
    this.emit({ type: 'countdown', roomId: room.roomId, value: 0 })
    this.broadcastGame(room)
    this.broadcastRoom(room)
  }

  private finishRound(room: Room) {
    if (room.status !== 'PLAYING' || !room.simulation) return
    room.phaseEndsAt = null
    const result = room.simulation.result()
    for (const entry of result.entries) {
      const player = room.players.get(entry.playerId)
      if (player) player.score = entry.totalScore
    }
    room.roundResultEndsAt = null
    if (room.round >= TOTAL_ROUNDS) {
      room.status = 'FINAL_RESULT'
      const finalResult = result.final ? result : { ...result, final: true }
      room.lastResult = finalResult
      this.emit({ type: 'round_result', roomId: room.roomId, result: finalResult })
      this.broadcastRoom(room)
      return
    }

    // Intermediate rounds return directly to the build drawer. Scores are
    // already written above, and the next build keeps all placed traps.
    room.round += 1
    this.beginBuild(room)
  }

  private recomputePendingPlacements(room: Room) {
    const build = room.build
    if (!build) return
    for (const pending of build.pendingPlacements.values()) {
      const definition = trapDefinition(pending.trapId)
      if (!definition) continue
      const dimensions = rotatedDimensions(definition, pending.rotation)
      pending.width = dimensions.width
      pending.height = dimensions.height
      pending.valid = isLegalTrapPlacement(
        pending.trapId,
        pending.x,
        pending.y,
        pending.rotation,
      this.occupiedTraps(room, pending.playerId),
        room.simulation?.level ?? LEVEL_BASE,
      )
      pending.legalCells = legalTrapCells(
        pending.trapId,
        pending.rotation,
      this.occupiedTraps(room, pending.playerId),
        room.simulation?.level ?? LEVEL_BASE,
      )
    }
  }

  private occupiedTraps(room: Room, excludePlayerId: string) {
    const pending = room.build
      ? Array.from(room.build.pendingPlacements.values())
          .filter((placement) => placement.playerId !== excludePlayerId && placement.valid)
          .map((placement): PlacedTrap => ({
            instanceId: placement.instanceId,
            trapId: placement.trapId,
            ownerId: placement.playerId,
            x: placement.x,
            y: placement.y,
            width: placement.width,
            height: placement.height,
            rotation: placement.rotation,
            placedRound: room.round,
          }))
      : []
    return [...room.placedTraps, ...pending]
  }

  private context(socketId: string) {
    const session = this.socketSessions.get(socketId)
    if (!session) {
      this.fail(socketId, 'NOT_IN_ROOM', '请先创建或加入房间')
      return null
    }
    const room = this.rooms.get(session.roomId)
    const player = room?.players.get(session.playerId)
    if (!room || !player) {
      this.fail(socketId, 'ROOM_NOT_FOUND', '房间不存在')
      return null
    }
    return { room, player }
  }

  private roomState(room: Room): RoomState {
    const gameState = room.simulation?.snapshot(room.status, room.phaseEndsAt) ?? null
    const buildState: BuildState | null = room.build && room.status === 'BUILDING'
      ? {
          round: room.round,
          endsAt: room.build.endsAt,
          options: room.build.options.map((option) => ({ ...option })),
          pendingPlacements: Array.from(room.build.pendingPlacements.values()).map((pending) => ({ ...pending })),
          placedCount: room.placedTraps.length,
          placedPlayerIds: Array.from(room.build.placedPlayerIds),
        }
      : null
    return {
      roomId: room.roomId,
      hostId: room.hostId,
      status: room.status,
      round: room.round,
      players: Array.from(room.players.values()).map(({ reconnectToken, socketId, disconnectedAt, ...player }) => player),
      selectedMapId: room.selectedMapId,
      mapMode: room.mapMode,
      activeMapId: room.activeMapId,
      buildState,
      gameState,
      lastResult: room.lastResult,
    }
  }

  private broadcastRoom(room: Room) {
    this.emit({ type: 'room_state', roomId: room.roomId, state: this.roomState(room) })
  }

  private broadcastGame(room: Room) {
    if (!room.simulation) return
    this.emit({
      type: 'game_state',
      roomId: room.roomId,
      state: room.simulation.snapshot(room.status, room.phaseEndsAt),
    })
  }

  private expireDisconnected(room: Room, now: number) {
    for (const player of Array.from(room.players.values())) {
      if (player.connected || !player.disconnectedAt || now - player.disconnectedAt <= DISCONNECT_GRACE_MS) continue
      room.simulation?.markDead(player.id)
      room.players.delete(player.id)
      room.build?.pendingPlacements.delete(player.id)
    }
    if (room.players.size === 0) room.lastEmptyAt ??= now
  }

  private fail(socketId: string, code: string, message: string): null {
    this.emit({ type: 'error', socketId, code, message })
    return null
  }
}
