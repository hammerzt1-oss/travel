export type PlayerSlot = 1 | 2 | 3 | 4

export type RoomStatus =
  | 'WAITING'
  | 'READY'
  | 'BUILDING'
  | 'COUNTDOWN'
  | 'PLAYING'
  | 'ROUND_RESULT'
  | 'FINAL_RESULT'

export type MapMode = 'specific' | 'random'

export type Rotation = 0 | 90 | 180 | 270
export type AnimationState = 'idle' | 'run' | 'jump' | 'fall' | 'death' | 'win'
export type TrapEffect =
  | 'kill'
  | 'ice'
  | 'bounce'
  | 'knockback'
  | 'slow'
  | 'teleport'
  | 'wall'
  | 'boost'
  | 'wind'
  | 'reverse'
  | 'freeze'
  | 'magnet'
  | 'low-gravity'
  | 'swap'

export type PlayerInput = {
  left: boolean
  right: boolean
  jump: boolean
}

export type TrapDefinition = {
  id: string
  name: string
  description: string
  width: number
  height: number
  glyph: string
  color: string
  placement: 'free' | 'supported'
  effect: TrapEffect
  /** APK creator shape: platform collider, trigger collider, or both. */
  collisionMode?: 'solid' | 'trigger' | 'hybrid' | 'none'
  category?: string
  sourceType?: string
  componentType?: number
  viewWidth?: number
  viewHeight?: number
  cells?: number[][]
  defaultDir?: number
  rotateMode?: number
  snapToGround?: boolean
  fullrect?: boolean
  danToUnlock?: number
  isVip?: boolean
  available?: boolean
  maxCountInLevel?: number
  iconSource?: 'game' | 'component' | null
  iconFrame?: string | null
  iconAsset?: string | null
  iconCrop?: { x: number; y: number; width: number; height: number } | null
}

export type TrapOption = TrapDefinition & {
  claimedBy: string | null
}

export type PendingPlacement = {
  playerId: string
  instanceId: string
  trapId: string
  x: number
  y: number
  width: number
  height: number
  rotation: Rotation
  valid: boolean
  legalCells: Array<{ x: number; y: number }>
}

export type PlacedTrap = {
  instanceId: string
  trapId: string
  ownerId: string
  x: number
  y: number
  width: number
  height: number
  rotation: Rotation
  placedRound: number
  /** Original level-element connection (doors/switches/portals). */
  connectedTo?: string | null
  /** Server-authoritative visual/collision offset for moving components. */
  offsetX?: number
  offsetY?: number
  visualRotation?: number
  /** Runtime transform of a moving sub-entity (the APK horizontal saw blade). */
  movingOffsetX?: number
  movingOffsetY?: number
  movingRotation?: number
  /** Runtime state exposed for component-specific visual states. */
  active?: boolean
  phase?: 'idle' | 'warning' | 'active' | 'reverting'
}

export type PlayerSnapshot = {
  id: string
  slot: PlayerSlot
  label: string
  x: number
  y: number
  velocityX: number
  velocityY: number
  direction: -1 | 1
  animationState: AnimationState
  alive: boolean
  finished: boolean
  connected: boolean
  ready: boolean
  score: number
  characterId: string
  characterAsset: string | null
  /** Highest client input sequence already consumed by the authoritative tick. */
  lastProcessedInputSequence: number
  bot?: boolean
}

export type Platform = {
  id: string
  x: number
  y: number
  width: number
  height: number
  material?: 'normal' | 'ice' | 'mud'
  /** APK colliderType=1: collide only while falling onto the top face. */
  oneWay?: boolean
}

export type LevelHazard = {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  tag: string
  hazard: boolean
}

export type LevelDecoration = {
  id: string
  x: number
  y: number
  angle: number
  scale: number
  alpha: number
  flipX: boolean
  flipY: boolean
  sprite: string
  zOrder?: number
  isSliced?: boolean
  slicedWidth?: number
  slicedHeight?: number
}

export type LevelSnapshot = {
  mapId: string
  mapName: string
  /** Authored APK view/edit bounds, retained for camera and placement audits. */
  noFlag?: boolean
  sourceMinX?: number
  sourceMinY?: number
  /** Runtime coordinates of the APK finite-level view bounds. */
  viewBounds?: { minX: number; minY: number; width: number; height: number }
  editBounds?: { minX: number; minY: number; width: number; height: number }
  secondarySpawnPoints?: Array<{ x: number; y: number }>
  secondaryFinishPoints?: Array<{ x: number; y: number }>
  width: number
  height: number
  cellSize: number
  gridWidth: number
  gridHeight: number
  platforms: Platform[]
  hazards: LevelHazard[]
  decorations: LevelDecoration[]
  traps: PlacedTrap[]
  backgroundAsset: string | null
  thumbnailAsset: string | null
  spawnX: number
  spawnY: number
  finishX: number
  finishY: number
  finishRadius: number
  /** APK goal flag trigger is 1.5 cells wide by 2 cells high. */
  finishWidth?: number
  finishHeight?: number
}

export type GameState = {
  round: number
  status: RoomStatus
  level: LevelSnapshot
  players: PlayerSnapshot[]
  startedAt: number | null
  phaseEndsAt: number | null
}

export type BuildState = {
  round: number
  endsAt: number
  options: TrapOption[]
  pendingPlacements: PendingPlacement[]
  placedCount: number
  placedPlayerIds: string[]
}

export type RoomPlayer = {
  id: string
  slot: PlayerSlot
  label: string
  connected: boolean
  ready: boolean
  score: number
  characterId: string
  characterAsset: string | null
  bot?: boolean
}

export type RoomState = {
  roomId: string
  hostId: string
  /** Whether living players block each other during the race. Off by default. */
  playerCollisionEnabled: boolean
  status: RoomStatus
  round: number
  players: RoomPlayer[]
  selectedMapId: string | null
  mapMode: MapMode
  activeMapId: string | null
  buildState: BuildState | null
  gameState: GameState | null
  lastResult: RoundResult | null
}

export type RoundResultEntry = {
  playerId: string
  label: string
  outcome: 'finished' | 'dead' | 'timeout'
  placement: number
  finishTime: number | null
  baseScore: number
  trapBonus: number
  roundScore: number
  totalScore: number
  killedByTrapOwnerId: string | null
}

export type RoundResult = {
  round: number
  winnerId: string | null
  doubleBaseScore: boolean
  final: boolean
  entries: RoundResultEntry[]
}

export type ClientMessage =
  | { type: 'create_room' }
  | { type: 'join_room'; roomId: string }
  | { type: 'random_join' }
  | { type: 'reconnect'; roomId: string; token: string }
  | { type: 'set_name'; name: string }
  | { type: 'ready' }
  | { type: 'select_map'; mapId: string | null }
  | { type: 'set_player_collision'; enabled: boolean }
  | { type: 'start_game' }
  | { type: 'select_trap'; trapId: string }
  | { type: 'place_trap'; x: number; y: number; rotation: Rotation }
  | { type: 'rotate_trap'; rotation: Rotation }
  | { type: 'cancel_trap' }
  | { type: 'confirm_build' }
  | { type: 'input'; input: PlayerInput; sequence: number; jumpPressed: boolean }
  | { type: 'return_to_room' }
  | { type: 'kick_player'; playerId: string }

export type ServerMessage =
  | {
      type: 'session'
      playerId: string
      roomId: string
      reconnectToken: string
    }
  | { type: 'room_state'; state: RoomState }
  | { type: 'countdown'; value: number }
  | { type: 'game_state'; state: GameState }
  | { type: 'round_result'; result: RoundResult }
  | { type: 'player_left'; playerId: string }
  | { type: 'kicked'; message: string }
  | { type: 'error'; code: string; message: string }
