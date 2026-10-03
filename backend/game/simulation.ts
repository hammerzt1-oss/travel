import type {
  AnimationState,
  GameState,
  LevelHazard,
  LevelSnapshot,
  PlacedTrap,
  PlayerInput,
  PlayerSnapshot,
  PlayerSlot,
  Platform,
  Rotation,
  RoundResult,
  TrapDefinition,
  TrapEffect,
} from '../../shared/gameProtocol'
import {
  PDZZ_COMPONENTS,
  PDZZ_LEAGUE_COMPONENT_IDS,
  PDZZ_PHYSICS,
  getPdzzCharacterForSlot,
  getPdzzMap,
  pdzzTrapRequiresGroundSupport,
} from '../../shared/pdzzConfig'
import { moveCharacter } from './pdzzCharacterController'

type SimPlayer = {
  id: string
  slot: PlayerSlot
  label: string
  characterId: string
  characterAsset: string | null
  x: number
  y: number
  velocityX: number
  velocityY: number
  /** APK keeps wall-jump impulse separate from the player input speed. */
  extraHorizontalAirSpeed: number
  direction: -1 | 1
  onGround: boolean
  onWall: boolean
  wallDirection: -1 | 1
  surfaceMaterial: 'normal' | 'ice' | 'mud'
  alive: boolean
  finished: boolean
  connected: boolean
  ready: boolean
  score: number
  input: PlayerInput
  /** A queued jump edge. It is consumed once by the next physics tick. */
  jumpPressed: boolean
  pendingInputSequence: number
  lastProcessedInputSequence: number
  jumpConsumed: boolean
  jumpBufferUntil: number
  /** APK's fallingTime: accumulated descending air time, not wall contact time. */
  fallingTime: number
  supportId: string | null
  finishedAt: number | null
  deadAt: number | null
  timedOut: boolean
  killedByTrapOwnerId: string | null
  slowUntil: number
  iceUntil: number
  boostUntil: number
  trapCooldowns: Map<string, number>
  reverseUntil: number
  gasExitUntil: number
  freezeUntil: number
  lowGravityUntil: number
  inIce: boolean
  inMud: boolean
  springJump: boolean
  bot: boolean
}

type Projectile = {
  id: string
  ownerId: string
  trapId: string
  x: number
  y: number
  velocityX: number
  velocityY: number
  ttl: number
  radius: number
}

const PHYSICS = PDZZ_PHYSICS as typeof PDZZ_PHYSICS
export const CELL_SIZE = 50
export const PLAY_DURATION_SECONDS = 30
export const PLAYER_WIDTH = PHYSICS.characterController.colliderWidth
export const PLAYER_HEIGHT = PHYSICS.characterController.colliderHeight

type Surface = Platform & { trap?: PlacedTrap; definition?: TrapDefinition }

const componentEffect = (effect: string): TrapEffect => {
  if (
    effect === 'kill' ||
    effect === 'ice' ||
    effect === 'bounce' ||
    effect === 'slow' ||
    effect === 'teleport' ||
    effect === 'wall' ||
    effect === 'boost' ||
    effect === 'wind' ||
    effect === 'reverse'
  ) {
    return effect
  }
  return 'wall'
}

export const TRAP_DEFINITIONS: TrapDefinition[] = PDZZ_COMPONENTS.map((component) => ({
  id: component.id,
  name: component.name,
  description: component.description,
  width: component.width,
  height: component.height,
  viewWidth: component.viewWidth,
  viewHeight: component.viewHeight,
  cells: component.cells,
  glyph: component.glyph,
  color: component.color,
  placement: component.placement,
  effect: componentEffect(component.effect),
  collisionMode: component.collisionMode,
  category: component.category,
  sourceType: component.sourceType,
  componentType: component.componentType,
  defaultDir: component.defaultDir,
  rotateMode: component.rotateMode,
  snapToGround: component.snapToGround,
  fullrect: component.fullrect,
  danToUnlock: component.danToUnlock,
  isVip: component.isVip,
  available: component.available,
  maxCountInLevel: component.maxCountInLevel,
  iconSource: component.iconSource,
  iconFrame: component.iconFrame,
  iconAsset: component.iconAsset,
  iconCrop: component.iconCrop,
}))

const legacyLevel: LevelSnapshot = {
  mapId: 'legacy',
  mapName: '兼容测试地图',
  width: 3200,
  height: 700,
  cellSize: CELL_SIZE,
  gridWidth: 64,
  gridHeight: 14,
  platforms: [
    { id: 'ground-a', x: 0, y: 600, width: 600, height: 100 },
    { id: 'step-a', x: 650, y: 550, width: 300, height: 50 },
    { id: 'ground-b', x: 1000, y: 600, width: 450, height: 100 },
    { id: 'ledge-b', x: 1450, y: 500, width: 250, height: 50 },
    { id: 'ground-c', x: 1750, y: 600, width: 450, height: 100 },
    { id: 'step-c', x: 2200, y: 550, width: 250, height: 50 },
    { id: 'finish-ground', x: 2550, y: 600, width: 650, height: 100 },
  ],
  hazards: [],
  decorations: [],
  traps: [],
  backgroundAsset: null,
  thumbnailAsset: null,
  spawnX: 96,
  spawnY: 540,
  finishX: 3000,
  finishY: 540,
  finishRadius: 120,
  finishWidth: 90,
  finishHeight: 120,
  viewBounds: { minX: 0, minY: 0, width: 3200, height: 700 },
  editBounds: { minX: 0, minY: 0, width: 3200, height: 700 },
}

export const LEVEL_BASE = legacyLevel

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function overlaps(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

type CollisionRect = { x: number; y: number; width: number; height: number }

/**
 * Test the complete movement segment against a rectangle expanded by the
 * player's collider. Thin APK trigger strips are easy to cross between two
 * fixed snapshots, especially when the client is recovering from a mobile
 * network stall. The source controller's swept ray pass still sees that
 * contact, so the authoritative simulation must keep the same continuity.
 */
function sweptPlayerOverlapsRect(
  previousX: number,
  previousY: number,
  currentX: number,
  currentY: number,
  rect: CollisionRect,
) {
  if (
    overlaps(previousX, previousY, PLAYER_WIDTH, PLAYER_HEIGHT, rect.x, rect.y, rect.width, rect.height) ||
    overlaps(currentX, currentY, PLAYER_WIDTH, PLAYER_HEIGHT, rect.x, rect.y, rect.width, rect.height)
  ) return true

  const minX = rect.x - PLAYER_WIDTH
  const maxX = rect.x + rect.width
  const minY = rect.y - PLAYER_HEIGHT
  const maxY = rect.y + rect.height
  const deltaX = currentX - previousX
  const deltaY = currentY - previousY
  let enter = 0
  let exit = 1

  const clipAxis = (start: number, delta: number, min: number, max: number) => {
    if (Math.abs(delta) < 0.000001) return start >= min && start <= max
    let first = (min - start) / delta
    let last = (max - start) / delta
    if (first > last) [first, last] = [last, first]
    enter = Math.max(enter, first)
    exit = Math.min(exit, last)
    return enter <= exit
  }

  return clipAxis(previousX, deltaX, minX, maxX) && clipAxis(previousY, deltaY, minY, maxY)
}

function sweptPlayerOverlapsCircle(
  previousX: number,
  previousY: number,
  currentX: number,
  currentY: number,
  centerX: number,
  centerY: number,
  radius: number,
) {
  const distance = Math.hypot(currentX - previousX, currentY - previousY)
  const steps = Math.max(1, Math.ceil(distance / 4))
  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps
    const x = previousX + (currentX - previousX) * progress
    const y = previousY + (currentY - previousY) * progress
    if (circleOverlapsRect(centerX, centerY, radius, x, y, PLAYER_WIDTH, PLAYER_HEIGHT)) return true
  }
  return false
}

function circleOverlapsRect(
  centerX: number,
  centerY: number,
  radius: number,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const closestX = clamp(centerX, x, x + width)
  const closestY = clamp(centerY, y, y + height)
  const dx = centerX - closestX
  const dy = centerY - closestY
  return dx * dx + dy * dy <= radius * radius
}

function sourceToWorld(map: NonNullable<ReturnType<typeof getPdzzMap>>, x: number, y: number) {
  // Level JSON uses the authored view-bounds origin. Keep that transform
  // identical for scenery, colliders, spawn points, and finish points.
  return { x: x - map.minX, y: y - map.minY }
}

function mapPlatformMaterial(tag: string, sprite: string): Platform['material'] {
  const value = `${tag} ${sprite}`.toLowerCase()
  if (value.includes('ice')) return 'ice'
  if (value.includes('mud') || value.includes('slime')) return 'mud'
  return 'normal'
}

function buildMapLevel(mapId: string): LevelSnapshot {
  const map = getPdzzMap(mapId)
  if (!map) return { ...legacyLevel, traps: [] }

  const platforms: Platform[] = []
  const hazards: LevelHazard[] = []
  const decorations = map.elements
    .filter((element) => element.extension.sprite)
    .map((element) => {
      const spriteX = element.id === 'scene' || element.id === 'bg'
        ? element.position.x
        : element.position.x + element.extension.spriteX
      const spriteY = element.id === 'scene' || element.id === 'bg'
        ? element.position.y
        : element.position.y + element.extension.spriteY
      const position = sourceToWorld(map, spriteX, spriteY)
      return {
        id: `${map.id}-decor-${element.index}`,
        x: position.x,
        y: position.y,
        angle: element.angle,
        scale: element.extension.scale,
        alpha: element.extension.alpha,
        flipX: element.extension.flipX,
        flipY: element.extension.flipY,
        sprite: element.extension.sprite,
        zOrder: element.extension.zOrder,
        isSliced: element.extension.isSliced,
        slicedWidth: element.extension.slicedWidth,
        slicedHeight: element.extension.slicedHeight,
      }
    })

  for (const element of map.elements) {
    if (!element.collider) continue
    // Map colliders in the APK are authored as left/bottom boxes. Scene
    // sprites keep their centered transform, but physics must use the
    // collider's bottom edge so spawnY=0 sits on the grass line.
    const colliderPosition = sourceToWorld(map, element.position.x, element.position.y)
    const collider = element.collider
    const width = collider.shape === 'circle'
      ? Math.max(20, (collider.radius ?? 20) * 2)
      : Math.max(20, collider.width ?? CELL_SIZE)
    const height = collider.shape === 'circle'
      ? Math.max(20, (collider.radius ?? 20) * 2)
      : Math.max(20, collider.height ?? CELL_SIZE)
    const hazard = Boolean(collider.hazard)

    // APK BoxCollider(width, height, 0, -height) is anchored at the
    // element's bottom edge. Types 2 and 3 are editor-only occupancy modes.
    if (collider.colliderType === 2 || collider.colliderType === 3) continue

    if (hazard) {
      const hazardX = collider.shape === 'circle'
        ? colliderPosition.x - width / 2
        : colliderPosition.x
      const hazardY = collider.shape === 'circle'
        ? colliderPosition.y - height / 2
        : colliderPosition.y - height
      hazards.push({
        id: `${map.id}-hazard-${element.index}`,
        x: hazardX,
        y: hazardY,
        width,
        height,
        rotation: collider.rotation,
        tag: element.extension.tag || element.semanticKey,
        hazard: true,
      })
      continue
    }

    if (collider.shape === 'box') {
      platforms.push({
        id: `${map.id}-platform-${element.index}`,
        x: colliderPosition.x,
        y: colliderPosition.y - height,
        width,
        height,
        material: mapPlatformMaterial(element.extension.tag, element.semanticKey),
        oneWay: collider.colliderType === 1,
      })
    } else {
      platforms.push({
        id: `${map.id}-platform-${element.index}`,
        x: colliderPosition.x - width / 2,
        y: colliderPosition.y - height / 2,
        width,
        height,
        material: mapPlatformMaterial(element.extension.tag, element.semanticKey),
      })
    }
  }

  const spawn = sourceToWorld(map, map.spawnX, map.spawnY)
  const finish = sourceToWorld(map, map.finishX, map.finishY)

  return {
    mapId: map.id,
    mapName: map.name,
    noFlag: map.noFlag,
    sourceMinX: map.minX,
    sourceMinY: map.minY,
    viewBounds: { minX: 0, minY: 0, width: map.width, height: map.height },
    editBounds: {
      minX: (map.editMinX ?? map.minX) - map.minX,
      minY: (map.editMinY ?? map.minY) - map.minY,
      width: map.editWidth ?? map.width,
      height: map.editHeight ?? map.height,
    },
    secondarySpawnPoints: (map.secondarySpawnPoints ?? []).map((point) => sourceToWorld(map, point.x, point.y)),
    secondaryFinishPoints: (map.secondaryFinishPoints ?? []).map((point) => sourceToWorld(map, point.x, point.y)),
    width: map.width,
    height: map.height,
    cellSize: CELL_SIZE,
    gridWidth: Math.max(1, Math.ceil(map.width / CELL_SIZE)),
    gridHeight: Math.max(1, Math.ceil(map.height / CELL_SIZE)),
    platforms,
    hazards,
    decorations,
    traps: [],
    backgroundAsset: map.backgroundAsset,
    thumbnailAsset: map.thumbnailAsset,
    spawnX: spawn.x,
    spawnY: spawn.y - PLAYER_HEIGHT,
    finishX: finish.x,
    finishY: finish.y,
    // GoalArea.createFlag() in the APK uses BoxCollider(1.5 cells, 2 cells)
    // with a local offset of (0, -2 cells), and the player collider is a
    // 30x60 box anchored at the foot center.
    finishRadius: 0,
    finishWidth: CELL_SIZE * 1.5,
    finishHeight: CELL_SIZE * 2,
  }
}

export function levelForMap(mapId: string | null | undefined) {
  return mapId ? buildMapLevel(mapId) : { ...legacyLevel, traps: [] }
}

type AiPathNode = { x: number; y: number; platformId: string; jump: boolean }

/**
 * The original league bot walks a 50px cell graph produced from landable
 * platform cells and uses A*. Keep that graph server-side so the bot consumes
 * the same collision geometry as the human controller instead of a timer
 * driven jump pattern.
 */
function buildAiPath(level: LevelSnapshot, traps: PlacedTrap[] = []) {
  const nodes: AiPathNode[] = []
  const nodeByKey = new Map<string, AiPathNode>()
  const bounds = level.viewBounds ?? { minX: 0, minY: 0, width: level.width, height: level.height }

  for (const platform of level.platforms) {
    const firstCell = Math.floor((platform.x - bounds.minX) / CELL_SIZE)
    const lastCell = Math.ceil((platform.x + platform.width - bounds.minX) / CELL_SIZE) - 1
    for (let cell = firstCell; cell <= lastCell; cell += 1) {
      const x = bounds.minX + cell * CELL_SIZE + CELL_SIZE / 2
      const y = platform.y
      const body = { x: x - PLAYER_WIDTH / 2, y: y - PLAYER_HEIGHT, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
      const occupied = level.platforms.some((other) =>
        other.id !== platform.id && overlaps(body.x, body.y, body.width, body.height, other.x, other.y, other.width, other.height),
      ) || traps.some((trap) => {
        const definition = trapDefinition(trap.trapId)
        return definition?.collisionMode !== 'none' && trap.trapId !== 'hunterguard' && trapCellRects(trap, 0).some((rect) =>
          overlaps(body.x, body.y, body.width, body.height, rect.x, rect.y, rect.width, rect.height),
        )
      })
      if (occupied) continue
      const key = `${Math.round(x)}:${Math.round(y)}`
      if (!nodeByKey.has(key)) {
        const node = { x, y, platformId: platform.id, jump: false }
        nodes.push(node)
        nodeByKey.set(key, node)
      }
    }
  }

  if (nodes.length === 0) return []
  const startX = level.spawnX + PLAYER_WIDTH / 2
  const startY = level.spawnY + PLAYER_HEIGHT
  const goalX = level.finishX
  const goalY = level.finishY
  const nearest = (x: number, y: number) => nodes.reduce((best, node) => {
    const score = Math.abs(node.x - x) + Math.abs(node.y - y) * 1.5
    const bestScore = Math.abs(best.x - x) + Math.abs(best.y - y) * 1.5
    return score < bestScore ? node : best
  })
  const start = nearest(startX, startY)
  const goal = nearest(goalX, goalY)
  const open = [start]
  const cameFrom = new Map<AiPathNode, AiPathNode>()
  const gScore = new Map<AiPathNode, number>([[start, 0]])
  const fScore = new Map<AiPathNode, number>([[start, Math.abs(start.x - goal.x) / CELL_SIZE]])
  const closed = new Set<AiPathNode>()

  const neighbors = (node: AiPathNode) => nodes.filter((candidate) => {
    if (candidate === node || closed.has(candidate)) return false
    const dx = Math.abs(candidate.x - node.x)
    const dy = candidate.y - node.y
    const adjacent = node.y === candidate.y && dx <= CELL_SIZE + 1
    const jumpReachable = dx <= PHYSICS.player.jumpWidth + CELL_SIZE && dy <= 350 && dy >= -260
    return adjacent || jumpReachable
  })

  while (open.length > 0) {
    open.sort((left, right) => (fScore.get(left) ?? Infinity) - (fScore.get(right) ?? Infinity))
    const current = open.shift()!
    if (current === goal) {
      const path: AiPathNode[] = [current]
      let cursor = current
      while (cameFrom.has(cursor)) {
        cursor = cameFrom.get(cursor)!
        path.unshift(cursor)
      }
      return path.map((node, index) => ({
        x: node.x,
        y: node.y,
        jump: index > 0 && (node.y !== path[index - 1].y || Math.abs(node.x - path[index - 1].x) > CELL_SIZE + 1),
      }))
    }
    closed.add(current)
    for (const candidate of neighbors(current)) {
      const distance = Math.abs(candidate.x - current.x) / CELL_SIZE + Math.abs(candidate.y - current.y) / CELL_SIZE
      const tentative = (gScore.get(current) ?? Infinity) + distance + (candidate.y !== current.y ? 3 : 0)
      if (tentative >= (gScore.get(candidate) ?? Infinity)) continue
      cameFrom.set(candidate, current)
      gScore.set(candidate, tentative)
      fScore.set(candidate, tentative + Math.abs(candidate.x - goal.x) / CELL_SIZE + Math.abs(candidate.y - goal.y) / CELL_SIZE)
      if (!open.includes(candidate)) open.push(candidate)
    }
  }

  return [{ x: goalX, y: goalY, jump: false }]
}

export function trapDefinition(trapId: string) {
  return TRAP_DEFINITIONS.find((trap) => trap.id === trapId) ?? null
}

function isOneWayComponent(trapId: string) {
  return trapId === 'onewayplatform' || trapId === 'onewayplatformstatic' || trapId === 'onewayblock'
}

function trapRequiresGroundSupport(trapId: string, definition: TrapDefinition) {
  const isLeagueTrap = (PDZZ_LEAGUE_COMPONENT_IDS as readonly string[]).includes(trapId)
  return isLeagueTrap ? pdzzTrapRequiresGroundSupport(trapId) : definition.placement === 'supported'
}

const LINEAR_SAW_SPEED = PDZZ_PHYSICS.componentMechanics.linearSaw.speed
const LINEAR_SAW_MAX_OFFSET = PDZZ_PHYSICS.componentMechanics.linearSaw.travelPixels
const LINEAR_SAW_SPIN_DEGREES_PER_SECOND = PDZZ_PHYSICS.componentMechanics.linearSaw.spinDegreesPerSecond
const HUNTER_GUARD_SPEED = PDZZ_PHYSICS.componentMechanics.hunterGuard.speed

function linearSawPingPong(elapsed: number) {
  // APK Cf mover: pingPong(elapsed * speed / offset, 1), then sineInOut.
  const cycle = ((elapsed * LINEAR_SAW_SPEED / LINEAR_SAW_MAX_OFFSET) % 2 + 2) % 2
  const pingPong = cycle <= 1 ? cycle : 2 - cycle
  return 0.5 - 0.5 * Math.cos(Math.PI * pingPong)
}

function linearSawMotion(trap: PlacedTrap, elapsed: number) {
  const offset = linearSawPingPong(elapsed) * LINEAR_SAW_MAX_OFFSET
  const spin = (elapsed * LINEAR_SAW_SPIN_DEGREES_PER_SECOND) % 360
  switch (trap.rotation) {
    case 90:
      return { x: 45, y: -100 + offset, rotation: 90 + spin }
    case 180:
      return { x: 100 - offset, y: 45, rotation: 180 + spin }
    case 270:
      return { x: -45, y: 100 - offset, rotation: -90 + spin }
    default:
      return { x: -100 + offset, y: -45, rotation: spin }
  }
}

type HorizontalGroundSegment = { left: number; right: number; groundY: number }

function stableTrapSeed(instanceId: string) {
  let hash = 2166136261
  for (let index = 0; index < instanceId.length; index += 1) {
    hash ^= instanceId.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function horizontalGroundSegments(level: LevelSnapshot, groundY: number): HorizontalGroundSegment[] {
  const platforms = level.platforms
    .filter((platform) => Math.abs(platform.y - groundY) <= 0.5 && platform.width > 0)
    .sort((left, right) => left.x - right.x)
  const segments: HorizontalGroundSegment[] = []
  for (const platform of platforms) {
    const previous = segments[segments.length - 1]
    const right = platform.x + platform.width
    if (previous && platform.x <= previous.right + 0.5) {
      previous.right = Math.max(previous.right, right)
    } else {
      segments.push({ left: platform.x, right, groundY })
    }
  }
  return segments
}

function hunterGuardMotion(trap: PlacedTrap, elapsed: number, level: LevelSnapshot) {
  const groundY = trap.y * CELL_SIZE + trap.height * CELL_SIZE
  const segments = horizontalGroundSegments(level, groundY)
  const trapLeft = trap.x * CELL_SIZE
  const trapRight = trapLeft + trap.width * CELL_SIZE
  const segment = segments.find((candidate) =>
    trapLeft >= candidate.left - 0.5 && trapRight <= candidate.right + 0.5,
  )
  if (!segment) return { x: 0, y: 0, rotation: trap.rotation }

  const minX = segment.left
  const maxX = Math.max(minX, segment.right - trap.width * CELL_SIZE)
  const span = maxX - minX
  if (span <= 0) return { x: minX - trapLeft, y: 0, rotation: trap.rotation }

  const phase = ((elapsed * HUNTER_GUARD_SPEED) % (span * 2) + span * 2) % (span * 2)
  const forwardDistance = phase <= span ? phase : span * 2 - phase
  const initialDirection = (stableTrapSeed(`${trap.instanceId}:${trap.placedRound}`) & 1) === 0 ? 1 : -1
  const distance = initialDirection === 1 ? forwardDistance : span - forwardDistance
  return {
    x: minX + distance - trapLeft,
    y: 0,
    rotation: trap.rotation,
  }
}

function trapMotion(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const movingHorizontal = new Set(['moveplatform1x1', 'moveplatform2x1', 'moveplatform3x1', 'trackplatform', 'onedirblock'])
  const movingVertical = new Set(['doublelift', 'stomper', 'crumblingblock'])
  const rotating = new Set(['swingplatform', 'spinningplatform', 'spikeball', 'rotaryhazard', 'squaredplatform', 'spinningsaw', 'swingsaw'])
  const phase = (trap.placedRound * 0.71 + trap.x * 0.13 + trap.y * 0.17) % (Math.PI * 2)
  const wave = Math.sin(elapsed * (Math.PI * 2 / 3.6) + phase)
  const saw = trap.trapId === 'linearsaw' ? linearSawMotion(trap, elapsed) : null
  const hunter = trap.trapId === 'hunterguard' ? hunterGuardMotion(trap, elapsed, level) : null
  return {
    offsetX: hunter?.x ?? (movingHorizontal.has(trap.trapId)
      ? wave * 150
      : 0),
    offsetY: hunter?.y ?? (movingVertical.has(trap.trapId) ? Math.max(0, wave) * 150 : 0),
    visualRotation: hunter?.rotation ?? (rotating.has(trap.trapId)
      ? trap.rotation + (trap.trapId === 'swingsaw' ? wave * 60 : wave * 25)
      : trap.rotation),
    movingOffsetX: saw?.x ?? 0,
    movingOffsetY: saw?.y ?? 0,
    movingRotation: saw?.rotation ?? trap.rotation,
  }
}

function trapWorldRect(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const motion = trapMotion(trap, elapsed, level)
  return {
    x: trap.x * CELL_SIZE + motion.offsetX,
    y: trap.y * CELL_SIZE + motion.offsetY,
    width: trap.width * CELL_SIZE,
    height: trap.height * CELL_SIZE,
    ...motion,
  }
}

export function rotatedDimensions(definition: TrapDefinition, rotation: Rotation) {
  return rotation === 90 || rotation === 270
    ? { width: definition.height, height: definition.width }
    : { width: definition.width, height: definition.height }
}

type TrapCell = { x: number; y: number }

function definitionCells(definition: TrapDefinition): TrapCell[] {
  return (definition.cells?.length ? definition.cells : [[0, 0]])
    .map(([x, y]) => ({ x: Number(x), y: Number(y) }))
}

function rotatedCells(definition: TrapDefinition, rotation: Rotation): TrapCell[] {
  const width = definition.width
  const height = definition.height
  return definitionCells(definition).map(({ x, y }) => {
    switch (rotation) {
      case 90:
        return { x: height - 1 - y, y: x }
      case 180:
        return { x: width - 1 - x, y: height - 1 - y }
      case 270:
        return { x: y, y: width - 1 - x }
      default:
        return { x, y }
    }
  })
}

function trapCellRects(
  trap: Pick<PlacedTrap, 'trapId' | 'x' | 'y' | 'rotation'>,
  elapsed: number,
  level: LevelSnapshot = LEVEL_BASE,
) {
  const definition = trapDefinition(trap.trapId)
  if (!definition) return []
  const motion = trapMotion(trap as PlacedTrap, elapsed, level)
  return rotatedCells(definition, trap.rotation).map((cell) => ({
    x: trap.x * CELL_SIZE + cell.x * CELL_SIZE + motion.offsetX,
    y: trap.y * CELL_SIZE + cell.y * CELL_SIZE + motion.offsetY,
    width: CELL_SIZE,
    height: CELL_SIZE,
    ...motion,
  }))
}

/**
 * vv does not use one collider per editor cell. Its platform entity is one
 * rotated 2x1 BoxCollider (100x50 up/down, 50x100 left/right). The editor
 * footprint is already rotated before it reaches the server, so its world
 * bounds are the exact collider bounds for the placed component.
 */
function springPlatformRects(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE): TrapRect[] {
  const motion = trapMotion(trap, elapsed, level)
  return [{
    x: trap.x * CELL_SIZE + motion.offsetX,
    y: trap.y * CELL_SIZE + motion.offsetY,
    width: trap.width * CELL_SIZE,
    height: trap.height * CELL_SIZE,
  }]
}

function trapOccupiedBounds(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const cells = trapCellRects(trap, elapsed, level)
  if (cells.length === 0) return null
  const left = Math.min(...cells.map((cell) => cell.x))
  const top = Math.min(...cells.map((cell) => cell.y))
  const right = Math.max(...cells.map((cell) => cell.x + cell.width))
  const bottom = Math.max(...cells.map((cell) => cell.y + cell.height))
  return { x: left, y: top, width: right - left, height: bottom - top }
}

type TrapRect = { x: number; y: number; width: number; height: number }

/**
 * The occupied-cell body is the physical obstacle of every placed league
 * component. Damage/trigger rectangles are resolved separately below, so a
 * trap can both block the character and still apply its effect.
 */
function trapBodyRects(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE): TrapRect[] {
  const definition = trapDefinition(trap.trapId)
  const isLeagueTrap = (PDZZ_LEAGUE_COMPONENT_IDS as readonly string[]).includes(trap.trapId)
  if (!isLeagueTrap || !definition || definition.collisionMode === 'none') return []
  if (trap.trapId === 'hunterguard') return []
  return trap.trapId === 'spring'
    ? springPlatformRects(trap, elapsed, level)
    : trapCellRects(trap, elapsed, level)
}

function trapEntityCenter(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const motion = trapMotion(trap, elapsed, level)
  return {
    x: trap.x * CELL_SIZE + (trap.width * CELL_SIZE) / 2 + motion.offsetX,
    y: trap.y * CELL_SIZE + (trap.height * CELL_SIZE) / 2 + motion.offsetY,
  }
}

function linearSawWorldCenter(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const center = trapEntityCenter(trap, elapsed, level)
  const motion = trapMotion(trap, elapsed, level)
  return {
    x: center.x + motion.movingOffsetX,
    y: center.y + motion.movingOffsetY,
  }
}

function rotateOffset(x: number, y: number, rotation: Rotation) {
  switch (rotation) {
    case 90: return { x: -y, y: x }
    case 180: return { x: -x, y: -y }
    case 270: return { x: y, y: -x }
    default: return { x, y }
  }
}

function orientedRect(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  localX: number,
  localY: number,
  rotation: Rotation,
): TrapRect {
  const offset = rotateOffset(localX, localY, rotation)
  const rotated = rotation === 90 || rotation === 270
    ? { width: height, height: width }
    : { width, height }
  return {
    x: centerX + offset.x - rotated.width / 2,
    y: centerY + offset.y - rotated.height / 2,
    width: rotated.width,
    height: rotated.height,
  }
}

function fortuneCatTriggerRect(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const center = trapEntityCenter(trap, elapsed, level)
  return orientedRect(center.x, center.y, 2.6 * CELL_SIZE, 0.8 * CELL_SIZE, 0, 0, trap.rotation)
}

function fortuneCatHazardRect(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const center = trapEntityCenter(trap, elapsed, level)
  // Ov's source code uses `0.2 * gridHeight` for the hazard offset. The
  // component is two cells tall, so this is 20px / 0.4 authored cell.
  const componentHeight = (trapDefinition('fortunecat')?.height ?? 2) * CELL_SIZE
  return orientedRect(center.x, center.y, 2.6 * CELL_SIZE, 0.5 * CELL_SIZE, 0, 0.2 * componentHeight, trap.rotation)
}

function bounceIn(value: number) {
  const t = clamp(value, 0, 1)
  const bounceOut = (progress: number) => {
    if (progress < 1 / 2.75) return 7.5625 * progress * progress
    if (progress < 2 / 2.75) {
      const adjusted = progress - 1.5 / 2.75
      return 7.5625 * adjusted * adjusted + 0.75
    }
    if (progress < 2.5 / 2.75) {
      const adjusted = progress - 2.25 / 2.75
      return 7.5625 * adjusted * adjusted + 0.9375
    }
    const adjusted = progress - 2.625 / 2.75
    return 7.5625 * adjusted * adjusted + 0.984375
  }
  return 1 - bounceOut(1 - t)
}

function cactusProgress(age: number) {
  if (age < 0.3 || age >= 2.1) return 0
  if (age < 0.8) return bounceIn((age - 0.3) / 0.5)
  if (age < 1.6) return 1
  return bounceIn((2.1 - age) / 0.5)
}

function cactusHazardRect(trap: PlacedTrap, elapsed: number, age: number, level: LevelSnapshot = LEVEL_BASE) {
  const progress = cactusProgress(age)
  if (progress <= 0.5) return null
  const center = trapEntityCenter(trap, elapsed, level)
  const epsilon = 0.001
  return orientedRect(
    center.x,
    center.y,
    CELL_SIZE - epsilon,
    CELL_SIZE * progress,
    0,
    CELL_SIZE / 2 - (CELL_SIZE * progress) / 2,
    trap.rotation,
  )
}

function trapTriggerRects(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE) {
  const definition = trapDefinition(trap.trapId)
  if (!definition) return []
  const cells = trapCellRects(trap, elapsed, level)
  const rects = cells.map((cell) => {
    const x = cell.x
    const y = cell.y
    switch (trap.trapId) {
      case 'triggerspikes':
        switch (trap.rotation) {
          case 90: return { ...cell, x: x - 20, y: y + 2.5, width: 20, height: 45 }
          case 180: return { ...cell, x: x + 2.5, y: y + 50, width: 45, height: 20 }
          case 270: return { ...cell, x: x + 50, y: y + 2.5, width: 20, height: 45 }
          default: return { ...cell, x: x + 2.5, y: y - 20, width: 45, height: 20 }
        }
      case 'spike':
      case 'spike3x1':
        switch (trap.rotation) {
          case 90: return { ...cell, x: x + 35, y: y + 5, width: 15, height: 40 }
          case 180: return { ...cell, x: x + 5, y, width: 40, height: 15 }
          case 270: return { ...cell, x, y: y + 5, width: 15, height: 40 }
          default: return { ...cell, x: x + 5, y: y + 35, width: 40, height: 15 }
        }
      case 'ice':
      case 'ice3x1':
        switch (trap.rotation) {
          case 90: return { ...cell, x: x + 35, y, width: 15, height: 50 }
          case 180: return { ...cell, x, y, width: 50, height: 15 }
          case 270: return { ...cell, x, y, width: 15, height: 50 }
          default: return { ...cell, x, y: y + 35, width: 50, height: 15 }
        }
      case 'mud':
        switch (trap.rotation) {
          case 90: return { ...cell, x: x + 35, y: y + 5, width: 15, height: 40 }
          case 180: return { ...cell, x: x + 5, y, width: 40, height: 15 }
          case 270: return { ...cell, x, y: y + 5, width: 15, height: 40 }
          default: return { ...cell, x: x + 5, y: y + 35, width: 40, height: 15 }
        }
      case 'spikeball':
        return { ...cell, x: x + 7.5, y: y + 7.5, width: 35, height: 35 }
      case 'gas':
        return { ...cell, x: x - 0.5 * CELL_SIZE, y: y - 0.5 * CELL_SIZE, width: 2 * CELL_SIZE, height: 2 * CELL_SIZE }
      case 'linearsaw':
        return { ...cell }
      case 'spinningsaw':
      case 'swingsaw':
        return { ...cell, x: x + 5, y: y + 5, width: 40, height: 40 }
      default:
        return { ...cell }
    }
  })
  return rects
}

function springSpikesHazardRect(trap: PlacedTrap, elapsed: number, level: LevelSnapshot = LEVEL_BASE): TrapRect | null {
  const bounds = trapOccupiedBounds(trap, elapsed, level)
  if (!bounds) return null
  const inset = 5
  const thickness = CELL_SIZE * 0.4
  switch (trap.rotation) {
    case 90:
      return {
        x: bounds.x + bounds.width,
        y: bounds.y + inset,
        width: thickness,
        height: Math.max(0, bounds.height - inset * 2),
      }
    case 180:
      return {
        x: bounds.x + inset,
        y: bounds.y + bounds.height,
        width: Math.max(0, bounds.width - inset * 2),
        height: thickness,
      }
    case 270:
      return {
        x: bounds.x - thickness,
        y: bounds.y + inset,
        width: thickness,
        height: Math.max(0, bounds.height - inset * 2),
      }
    default:
      return {
        x: bounds.x + inset,
        y: bounds.y - thickness,
        width: Math.max(0, bounds.width - inset * 2),
        height: thickness,
      }
  }
}

function trapActivationRect(trap: PlacedTrap, elapsed: number) {
  if (trap.trapId === 'fortunecat') return fortuneCatTriggerRect(trap, elapsed)
  return null
}

function trapBottomCells(definition: TrapDefinition, rotation: Rotation) {
  const cells = rotatedCells(definition, rotation)
  return cells.filter((cell) => !cells.some((other) => other.x === cell.x && other.y === cell.y + 1))
}

function rectsOverlapCells(
  x: number,
  y: number,
  width: number,
  height: number,
  trap: PlacedTrap,
  elapsed: number,
) {
  return trapCellRects(trap, elapsed).some((cell) => overlaps(x, y, width, height, cell.x, cell.y, cell.width, cell.height))
}

export function isLegalTrapPlacement(
  trapId: string,
  x: number,
  y: number,
  rotation: Rotation,
  existingTraps: PlacedTrap[],
  level: LevelSnapshot = LEVEL_BASE,
) {
  const definition = trapDefinition(trapId)
  if (!definition || !Number.isInteger(x) || !Number.isInteger(y)) return false
  const dimensions = rotatedDimensions(definition, rotation)
  const worldX = x * CELL_SIZE
  const worldY = y * CELL_SIZE
  const cells = rotatedCells(definition, rotation)
  if (
    x < 0 ||
    y < 0 ||
    x + dimensions.width > level.gridWidth ||
    y + dimensions.height > level.gridHeight
  ) {
    return false
  }

  // The editor uses editBounds, while the player controller uses viewBounds.
  // They are intentionally different in the APK (the haystack map is the
  // concrete example), so a placement must be inside the authored editor
  // rectangle instead of merely fitting the translated view grid.
  const editBounds = level.editBounds ?? {
    minX: 0,
    minY: 0,
    width: level.width,
    height: level.height,
  }
  const insideEditBounds = cells.every((cell) => {
    const cellX = worldX + cell.x * CELL_SIZE
    const cellY = worldY + cell.y * CELL_SIZE
    return (
      cellX >= editBounds.minX &&
      cellY >= editBounds.minY &&
      cellX + CELL_SIZE <= editBounds.minX + editBounds.width &&
      cellY + CELL_SIZE <= editBounds.minY + editBounds.height
    )
  })
  if (!insideEditBounds) return false

  const overlapsPlatform = cells.some((cell) => level.platforms.some((platform) =>
    overlaps(
      worldX + cell.x * CELL_SIZE,
      worldY + cell.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
      platform.x,
      platform.y,
      platform.width,
      platform.height,
    ),
  ))
  if (overlapsPlatform) return false

  if (trapRequiresGroundSupport(trapId, definition)) {
    const bottomCells = trapBottomCells(definition, rotation)
    const hasSupport = bottomCells.every((cell) => {
      const cellX = worldX + cell.x * CELL_SIZE
      const cellBottom = worldY + (cell.y + 1) * CELL_SIZE
      return level.platforms.some((platform) =>
        Math.abs(cellBottom - platform.y) <= CELL_SIZE * 0.3 &&
        cellX + CELL_SIZE > platform.x &&
        cellX < platform.x + platform.width,
      )
    })
    if (!hasSupport) return false
  }

  return cells.every((cell) => existingTraps.every((trap) => {
    const trapDefinitionValue = trapDefinition(trap.trapId)
    if (!trapDefinitionValue) return true
    const cellX = worldX + cell.x * CELL_SIZE
    const cellY = worldY + cell.y * CELL_SIZE
    return !trapCellRects(trap, 0).some((occupiedCell) =>
      overlaps(cellX, cellY, CELL_SIZE, CELL_SIZE, occupiedCell.x, occupiedCell.y, occupiedCell.width, occupiedCell.height),
    )
  }))
}

export function legalTrapCells(
  trapId: string,
  rotation: Rotation,
  existingTraps: PlacedTrap[],
  level: LevelSnapshot = LEVEL_BASE,
) {
  const definition = trapDefinition(trapId)
  if (!definition) return []
  const dimensions = rotatedDimensions(definition, rotation)
  const cells: Array<{ x: number; y: number }> = []
  for (let y = 0; y <= level.gridHeight - dimensions.height; y += 1) {
    for (let x = 0; x <= level.gridWidth - dimensions.width; x += 1) {
      if (isLegalTrapPlacement(trapId, x, y, rotation, existingTraps, level)) {
        cells.push({ x, y })
      }
    }
  }
  return cells
}

function cloneInput(input: PlayerInput): PlayerInput {
  return {
    left: Boolean(input.left),
    right: Boolean(input.right),
    jump: Boolean(input.jump),
  }
}

function approach(value: number, target: number, amount: number) {
  if (value < target) return Math.min(value + amount, target)
  if (value > target) return Math.max(value - amount, target)
  return target
}

export class GameSimulation {
  readonly round: number
  readonly players: Map<string, SimPlayer>
  readonly level: LevelSnapshot
  readonly playerCollisionEnabled: boolean
  private placedTraps: PlacedTrap[]
  private elapsed = 0
  private projectiles: Projectile[] = []
  private switchState = new Map<string, boolean>()
  private switchCooldowns = new Map<string, number>()
  private switchOccupants = new Set<string>()
  private crumbleStartedAt = new Map<string, number>()
  private finishTriggerOccupants = new Set<string>()
  private trapActivationAt = new Map<string, number>()
  /** Last collision normal for each player/spring pair, matching vv's enter/stay state. */
  private springContacts = new Map<string, Rotation>()
  /** Gas keeps an entered player in its inner-state until the outer box exits. */
  private gasOccupants = new Set<string>()
  /** Ice and mud are maintained by trigger enter/exit, like the APK model. */
  private iceOccupants = new Set<string>()
  private mudOccupants = new Set<string>()
  /** Trigger components fire on enter; staying inside must not retrigger them. */
  private trapTriggerOccupants = new Set<string>()
  private readonly aiPaths = new Map<string, Array<{ x: number; y: number; jump: boolean }>>()

  constructor(
    round: number,
    players: Array<{
      id: string
      slot: PlayerSlot
      label: string
      score: number
      characterId?: string
      characterAsset?: string | null
      bot?: boolean
    }>,
    placedTraps: PlacedTrap[],
    mapId: string | null = null,
    playerCollisionEnabled = false,
  ) {
    this.round = round
    this.playerCollisionEnabled = Boolean(playerCollisionEnabled)
    this.level = levelForMap(mapId)
    this.placedTraps = placedTraps.map((trap) => ({ ...trap }))
    this.players = new Map(
      players.map((player) => {
        const character = getPdzzCharacterForSlot(player.slot)
        return [
          player.id,
          {
            ...player,
            characterId: player.characterId ?? character.refID,
            characterAsset: player.characterAsset ?? character.imageAsset,
            bot: Boolean(player.bot),
             // The APK spawnpoint is the character entity's foot-center.
             // Server snapshots store the collider's top-left instead.
            // League AI Battle exposes a 10px spawn distance. The entity
            // origin is the foot center, so convert both the authored point
            // and the inter-player distance to collider top-left coordinates.
            x: this.level.spawnX - PLAYER_WIDTH / 2 + (player.slot - 1) * 10,
            y: this.level.spawnY,
            velocityX: 0,
            velocityY: 0,
            extraHorizontalAirSpeed: 0,
            direction: 1 as const,
            // Spawn points are authored on the top face of the start
            // platform. Mark the controller grounded in the first snapshot;
            // otherwise a tap during the opening frames is rejected before
            // the first fixed physics tick has a chance to settle it.
            onGround: true,
            onWall: false,
            wallDirection: 1 as const,
            surfaceMaterial: 'normal' as const,
            alive: true,
            finished: false,
            connected: true,
            ready: true,
            input: { left: false, right: false, jump: false },
            jumpPressed: false,
            pendingInputSequence: 0,
            lastProcessedInputSequence: 0,
            jumpConsumed: false,
            jumpBufferUntil: 0,
            fallingTime: 0,
            supportId: null,
            finishedAt: null,
            deadAt: null,
            timedOut: false,
            killedByTrapOwnerId: null,
            slowUntil: 0,
            iceUntil: 0,
            boostUntil: 0,
            trapCooldowns: new Map(),
            reverseUntil: 0,
            gasExitUntil: 0,
            freezeUntil: 0,
            lowGravityUntil: 0,
            inIce: false,
            inMud: false,
            springJump: false,
          } satisfies SimPlayer,
        ]
      }),
    )
    for (const player of this.players.values()) {
      if (player.bot) this.aiPaths.set(player.id, buildAiPath(this.level))
    }
  }

  setPlacedTraps(placedTraps: PlacedTrap[]) {
    this.placedTraps = placedTraps.map((trap) => ({ ...trap }))
    for (const player of this.players.values()) {
      if (player.bot) this.aiPaths.set(player.id, buildAiPath(this.level, this.placedTraps))
    }
  }

  setConnected(playerId: string, connected: boolean) {
    const player = this.players.get(playerId)
    if (player) player.connected = connected
  }

  markDead(playerId: string) {
    const player = this.players.get(playerId)
    if (player && player.alive && !player.finished) this.kill(player)
  }

  setInput(playerId: string, input: PlayerInput, sequence?: number, jumpPressed = false) {
    const player = this.players.get(playerId)
    if (!player || !player.alive || player.finished) return
    const nextSequence = sequence === undefined
      ? player.pendingInputSequence + 1
      : Number.isFinite(sequence)
        ? Math.max(0, Math.floor(sequence))
        : player.pendingInputSequence
    if (nextSequence <= player.pendingInputSequence) return
    player.input = cloneInput(input)
    player.pendingInputSequence = nextSequence
    // Keep a press edge queued even when the following 33ms heartbeat has
    // already released the button before the next physics tick.
    if (jumpPressed) player.jumpPressed = true
  }

  tick(dt: number) {
    if (this.isComplete()) return
    this.elapsed = Math.min(PLAY_DURATION_SECONDS, this.elapsed + dt)
    this.updateSwitches()
    this.updateSurfaceStates()
    this.updateGasStates()
    this.updateProjectiles(dt)
    const previousPositions = new Map<string, { x: number; y: number }>()
    for (const player of this.players.values()) {
      if (player.bot) this.updateBotInput(player)
      previousPositions.set(player.id, { x: player.x, y: player.y })
      player.lastProcessedInputSequence = player.pendingInputSequence
      this.tickPlayer(player, dt)
    }
    // Trigger components receive the same movement segment as the character
    // controller. This catches an enter event even when the body crossed the
    // trigger between two fixed snapshots.
    this.updateTrapStates(previousPositions)
    this.resolvePlayerCollision()
    if (this.elapsed >= PLAY_DURATION_SECONDS) {
      for (const player of this.players.values()) {
        if (player.alive && !player.finished) this.kill(player, null, true)
      }
    }
  }

  isComplete() {
    const humanPlayers = Array.from(this.players.values()).filter((player) => !player.bot)
    const playersToFinish = humanPlayers.length > 0 ? humanPlayers : Array.from(this.players.values())
    return (
      playersToFinish.every((player) => !player.alive || player.finished) ||
      this.elapsed >= PLAY_DURATION_SECONDS
    )
  }

  result(): RoundResult {
    // In League single-player the AI opponent is only a race target. A human
    // death or finish ends that run immediately; close an unfinished bot as a
    // timeout so it cannot block the result or be reported as trap-killed.
    const humanPlayers = Array.from(this.players.values()).filter((player) => !player.bot)
    if (humanPlayers.length > 0 && humanPlayers.every((player) => !player.alive || player.finished)) {
      for (const player of this.players.values()) {
        if (!player.bot || !player.alive || player.finished) continue
        player.alive = false
        player.timedOut = true
        player.deadAt = this.elapsed
        player.velocityX = 0
        player.velocityY = 0
      }
    }
    const ordered = Array.from(this.players.values()).sort((a, b) => {
      if (a.finished !== b.finished) return a.finished ? -1 : 1
      const aTime = a.finishedAt ?? a.deadAt ?? Number.MAX_SAFE_INTEGER
      const bTime = b.finishedAt ?? b.deadAt ?? Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
    const firstFinisher = ordered.find((player) => player.finished) ?? null
    // League single-player (_k.getIsDoubleScoreRound) doubles only the final
    // round's base score. This is independent of the trap bonus.
    const doubleBaseScore = this.round === 5
    const entries = ordered.map((player, index) => {
      const baseBeforeMultiplier =
        !player.finished
          ? 0
          : player.id === firstFinisher?.id
            ? 110
            : 100
      const baseScore = doubleBaseScore ? baseBeforeMultiplier * 2 : baseBeforeMultiplier
      const earnedTrapBonus =
        player.finished &&
        Array.from(this.players.values()).some((other) => other.killedByTrapOwnerId === player.id)
          ? 5
          : 0
      const roundScore = baseScore + earnedTrapBonus
      const outcome = player.finished
        ? ('finished' as const)
        : player.timedOut
          ? ('timeout' as const)
          : ('dead' as const)
      return {
        playerId: player.id,
        label: player.label,
        outcome,
        placement: index + 1,
        finishTime: player.finishedAt === null ? null : Math.round(player.finishedAt * 10) / 10,
        baseScore,
        trapBonus: earnedTrapBonus,
        roundScore,
        totalScore: player.score + roundScore,
        killedByTrapOwnerId: player.killedByTrapOwnerId,
      }
    })

    return {
      round: this.round,
      winnerId: firstFinisher?.id ?? null,
      doubleBaseScore,
      final: this.round === 5,
      entries,
    }
  }

  snapshot(status: GameState['status'], phaseEndsAt: number | null = null): GameState {
    return {
      round: this.round,
      status,
      level: {
        ...this.level,
        platforms: this.level.platforms.map((platform) => ({ ...platform })),
        hazards: this.level.hazards.map((hazard) => ({ ...hazard })),
        decorations: this.level.decorations.map((decoration) => ({ ...decoration })),
        traps: this.placedTraps.map((trap) => ({
          ...trap,
          ...trapMotion(trap, this.elapsed, this.level),
          active: this.isTrapHazardActive(trap),
          phase: this.trapPhase(trap),
        })),
      },
      startedAt: this.elapsed > 0 ? Date.now() - Math.round(this.elapsed * 1000) : null,
      phaseEndsAt,
      players: Array.from(this.players.values()).map((player) => this.snapshotPlayer(player)),
    }
  }

  private tickPlayer(player: SimPlayer, dt: number) {
    if (!player.alive || player.finished) return

    // Moving platforms carry the character by the same transform delta used
    // by their collision cells. This happens before input and gravity.
    if (player.onGround && player.supportId) {
      const support = this.placedTraps.find((trap) => trap.instanceId === player.supportId)
      if (support) {
        const currentMotion = trapMotion(support, this.elapsed, this.level)
        const previousMotion = trapMotion(support, Math.max(0, this.elapsed - dt), this.level)
        player.x += currentMotion.offsetX - previousMotion.offsetX
        player.y += currentMotion.offsetY - previousMotion.offsetY
      }
    }

    const previousX = player.x
    const previousY = player.y
    // The APK separates "inside the trigger" from "grounded on the face".
    // Ice/mud can affect wall physics while airborne, but their horizontal
    // speed and jump start only apply when the foot is on an upward surface.
    const groundedIce = player.onGround && this.hasGroundedSurfaceContact(player, 'ice')
    const groundedMud = player.onGround && this.hasGroundedSurfaceContact(player, 'mud')
    player.surfaceMaterial = groundedIce ? 'ice' : groundedMud ? 'mud' : 'normal'
    const inputHorizontal = (player.input.right ? 1 : 0) - (player.input.left ? 1 : 0)
    const horizontal = player.reverseUntil > this.elapsed ? -inputHorizontal : inputHorizontal
    const previousExtraHorizontalAirSpeed = player.extraHorizontalAirSpeed
    const wasGrounded = player.onGround
    let inputVelocityX = player.velocityX - previousExtraHorizontalAirSpeed

    // This mirrors CharacterController.applyCollisionStatesAndGravity().
    // fallingTime is measured from the start of the descent and continues
    // while airborne, even before the player reaches a wall. The old code
    // incorrectly started this clock on wall contact, delaying wall jumps.
    if (wasGrounded) {
      player.fallingTime = 0
      if (player.velocityY >= 0) player.extraHorizontalAirSpeed = 0
    } else if (player.velocityY > 0) {
      player.fallingTime += dt
    } else {
      player.fallingTime = 0
    }
    const wallClinging = !wasGrounded && player.onWall && player.fallingTime > 0.085
    if (
      wallClinging &&
      player.extraHorizontalAirSpeed * player.wallDirection < 0
    ) {
      player.extraHorizontalAirSpeed = 0
    }

    if (player.freezeUntil > this.elapsed) {
      inputVelocityX = 0
      player.extraHorizontalAirSpeed = 0
    } else {
      const speed =
        player.surfaceMaterial === 'ice'
          ? PHYSICS.player.iceHorizontalSpeed
          : player.surfaceMaterial === 'mud'
            ? PHYSICS.player.mudHorizontalSpeed
            : player.boostUntil > this.elapsed
              ? PHYSICS.player.normalHorizontalSpeed * 1.68
              : PHYSICS.player.normalHorizontalSpeed
      if (horizontal !== 0) {
        inputVelocityX = approach(
          inputVelocityX,
          horizontal * speed,
          PHYSICS.player.horizontalInputAcceleration * dt,
        )
        player.direction = horizontal as -1 | 1
      } else if (player.surfaceMaterial === 'ice') {
        // Ice retains momentum, but the source controller applies 0.2x
        // acceleration as friction when horizontal input is released.
        inputVelocityX = approach(
          inputVelocityX,
          0,
          PHYSICS.player.horizontalInputAcceleration * 0.2 * dt,
        )
      } else {
        // Normal and mud surfaces use the immediate release path.
        inputVelocityX = 0
      }
    }

    if (player.jumpPressed) {
      player.jumpBufferUntil = this.elapsed + 0.2
      player.jumpConsumed = false
      player.jumpPressed = false
    }
    if (player.jumpBufferUntil > this.elapsed && !player.jumpConsumed) {
      if (player.onGround) {
        player.springJump = false
        player.velocityY = player.surfaceMaterial === 'mud'
          ? PHYSICS.playerDerived.mudJumpStartVelocity
          : PHYSICS.playerDerived.normalJumpStartVelocity
        player.onGround = false
        player.jumpBufferUntil = 0
        player.jumpConsumed = true
      } else if (wallClinging) {
        player.springJump = false
        const wallJumpVariation = player.inMud ? 0.65 : 1
        player.velocityY = PHYSICS.playerDerived.wallJumpStartVerticalVelocity * wallJumpVariation
        player.extraHorizontalAirSpeed = player.wallDirection * PHYSICS.playerDerived.wallJumpStartHorizontalVelocity * wallJumpVariation
        player.direction = player.wallDirection
        player.jumpBufferUntil = 0
        player.jumpConsumed = true
      }
    }

    // The original calculates jump/fall gravity before applying velocity. A
    // held jump uses normal gravity during ascent; after the apex it switches
    // to fall gravity. Wall gravity only begins once wall cling is armed.
    const gravity = player.lowGravityUntil > this.elapsed
      ? PHYSICS.playerDerived.gravity * 0.22
      : wallClinging
        ? PHYSICS.playerDerived.gravity * (
          player.inIce
            ? PHYSICS.player.iceWallGravityVariation
            : player.inMud
              ? PHYSICS.player.mudWallGravityVariation
              : PHYSICS.player.wallGravityVariation
        )
      : player.fallingTime > 0
        ? PHYSICS.playerDerived.gravity * PHYSICS.player.fallGravityVariation
        : PHYSICS.playerDerived.gravity * (
          player.springJump
            ? PHYSICS.player.springJumpUpGravityVariation
            : player.input.jump
              ? 1
              : PHYSICS.player.jumpUpGravityVariation
        )
    player.velocityY = clamp(
      player.velocityY + gravity * dt,
      PHYSICS.player.maxUpSpeed,
      wallClinging
        ? player.inIce
          ? PHYSICS.player.maxIceWallSlideSpeed
          : player.inMud
            ? PHYSICS.player.maxMudWallSlideSpeed
            : PHYSICS.player.maxWallSlideSpeed
        : PHYSICS.player.maxFallSpeed,
    )

    // applyHorizontalVelocity() decays the wall-jump impulse in the same
    // fixed step in which the jump is created.
    player.extraHorizontalAirSpeed = approach(
      player.extraHorizontalAirSpeed,
      0,
      PHYSICS.playerDerived.wallJumpAirHorizontalForce * dt,
    )
    player.velocityX = inputVelocityX + player.extraHorizontalAirSpeed
    const trapSurfaces: Surface[] = this.placedTraps.flatMap((trap) => {
      const definition = trapDefinition(trap.trapId)
      if (!definition) return []
      if (this.isTrapDisabled(trap)) return []
      // Every selected league component contributes an occupied body. Its
      // trigger/hazard effect is checked separately after movement.
      const isSurface = definition.collisionMode !== 'none'
      if (!isSurface) return []
      const rects = trapBodyRects(trap, this.elapsed, this.level)
      return rects.map((rect, index) => ({
        id: `trap-surface-${trap.instanceId}-${index}`,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        material: definition.effect === 'ice' ? 'ice' : definition.effect === 'slow' ? 'mud' : 'normal',
        trap,
        definition,
      } satisfies Surface))
    })

    // Keep the intersection type here so a landing on a placed component can
    // carry its trigger metadata through the same contact path as map ground.
    const supportSurfaces: Surface[] = [...this.level.platforms, ...trapSurfaces]
    const movement = moveCharacter({
      x: player.x,
      y: player.y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      deltaX: player.velocityX * dt,
      deltaY: player.velocityY * dt,
      wasGrounded: player.onGround,
      ignoreOneWay: player.velocityY < 0,
      platforms: supportSurfaces,
      skinWidth: PHYSICS.characterController.skinWidth,
      horizontalRays: PHYSICS.characterController.horizontalRays,
      verticalRays: PHYSICS.characterController.verticalRays,
      jumpingThreshold: PHYSICS.characterController.jumpingThreshold,
    })
    const viewBounds = this.level.viewBounds ?? {
      minX: 0,
      minY: 0,
      width: this.level.width,
      height: this.level.height,
    }
    // The source controller does not clamp the horizontal entity to the view
    // rectangle. It allows a small overshoot and lets the out-of-bounds check
    // below kill the player after the authored 50px margin.
    player.x = movement.x
    player.y = movement.y
    player.onGround = movement.grounded
    player.onWall = movement.hitLeft || movement.hitRight
    if (movement.hitLeft || movement.hitRight) player.wallDirection = movement.wallDirection
    if (movement.grounded) {
      player.velocityY = 0
      player.fallingTime = 0
      const landingPlatform = movement.surface as Surface | null
      player.supportId = landingPlatform?.trap?.instanceId ?? landingPlatform?.id ?? null
      player.springJump = false
      player.surfaceMaterial = landingPlatform?.material ?? 'normal'
      if (this.hasGroundedSurfaceContact(player, 'ice')) player.surfaceMaterial = 'ice'
      else if (this.hasGroundedSurfaceContact(player, 'mud')) player.surfaceMaterial = 'mud'
      if (landingPlatform?.trap && landingPlatform.definition) {
        if (landingPlatform.trap.trapId === 'crumblingblock' && !this.crumbleStartedAt.has(landingPlatform.trap.instanceId)) {
          this.crumbleStartedAt.set(landingPlatform.trap.instanceId, this.elapsed)
        }
        if (landingPlatform.definition.collisionMode !== 'hybrid') {
          // vv only reacts to a collision normal matching its face. A top
          // landing is therefore a spring hit only for the upward rotation.
          if (landingPlatform.trap.trapId === 'spring') {
            // Spring effects are driven by the collision normal below. A
            // downward-facing spring is still solid, but a top landing is
            // not its matching face and must not bounce.
            if (landingPlatform.trap.rotation !== 0) {
              player.springJump = false
            }
          } else {
            this.applyTrapEffect(player, landingPlatform.trap, landingPlatform.definition.effect)
          }
        }
        if (!player.alive || player.finished) return
      }
    } else {
      player.supportId = null
      player.surfaceMaterial = 'normal'
    }
    player.velocityX = inputVelocityX + player.extraHorizontalAirSpeed
    if (movement.hitCeiling && player.velocityY < 0) player.velocityY = 0

    // Resolve contacts when a frame starts inside a collider or crosses a
    // thin collider at high speed, matching the source penetration pass.
    this.resolvePlatformWalls(player, previousX, previousY)
    this.applySpringFromMovement(player, movement)
    this.resolveTrapWalls(player, previousX)
    player.velocityX = inputVelocityX + player.extraHorizontalAirSpeed

    for (const hazard of this.level.hazards) {
      if (overlaps(player.x + 4, player.y + 5, PLAYER_WIDTH - 8, PLAYER_HEIGHT - 5, hazard.x, hazard.y, hazard.width, hazard.height)) {
        this.kill(player)
        return
      }
    }

    for (const trap of this.placedTraps) {
      const definition = trapDefinition(trap.trapId)
      if (!definition) continue
      if (this.isTrapDisabled(trap)) continue
      const rects = this.trapHazardRects(trap)
      if (['cannon', 'crossbow', 'ballooncannon', 'lasershooter'].includes(trap.trapId)) continue
      if (trap.trapId === 'gas') continue
      if (trap.trapId === 'fortunecat' || trap.trapId === 'triggerhazard' || trap.trapId === 'triggerspikes') {
        if (!this.isTrapHazardActive(trap)) continue
      }
      // Springs are solid platforms. Their effect is driven by the contacted
      // collision face, so body overlap must not trigger them a second time.
      if (trap.trapId === 'spring') continue
      if (trap.trapId === 'spikeball') {
        const center = trapEntityCenter(trap, this.elapsed, this.level)
        const spikeballBounds = {
          x: center.x - 17.5,
          y: center.y - 17.5,
          width: 35,
          height: 35,
        }
        if (circleOverlapsRect(
          center.x,
          center.y,
          17.5,
          player.x,
          player.y,
          PLAYER_WIDTH,
          PLAYER_HEIGHT,
        ) || sweptPlayerOverlapsRect(previousX, previousY, player.x, player.y, spikeballBounds)) {
          this.kill(player, trap.ownerId)
          return
        }
        continue
      }
      if (trap.trapId === 'linearsaw') {
        const center = linearSawWorldCenter(trap, this.elapsed, this.level)
        const sawBounds = {
          x: center.x - PDZZ_PHYSICS.componentMechanics.linearSaw.bladeRadius,
          y: center.y - PDZZ_PHYSICS.componentMechanics.linearSaw.bladeRadius,
          width: PDZZ_PHYSICS.componentMechanics.linearSaw.bladeRadius * 2,
          height: PDZZ_PHYSICS.componentMechanics.linearSaw.bladeRadius * 2,
        }
        if (circleOverlapsRect(
          center.x,
          center.y,
          PDZZ_PHYSICS.componentMechanics.linearSaw.bladeRadius,
          player.x,
          player.y,
          PLAYER_WIDTH,
          PLAYER_HEIGHT,
        ) || sweptPlayerOverlapsRect(previousX, previousY, player.x, player.y, sawBounds)) {
          this.kill(player, trap.ownerId)
          return
        }
        continue
      }
      for (const rect of rects) {
        const sweptContact = sweptPlayerOverlapsRect(
          previousX,
          previousY,
          player.x,
          player.y,
          rect,
        )
        const touchingTop =
          player.y + PLAYER_HEIGHT >= rect.y &&
          player.y + PLAYER_HEIGHT <= rect.y + rect.height + 4 &&
          player.x + PLAYER_WIDTH > rect.x &&
          player.x < rect.x + rect.width
        if (
          overlaps(
            player.x + 4,
            player.y + 5,
            PLAYER_WIDTH - 8,
            PLAYER_HEIGHT - 5,
            rect.x,
            rect.y,
            rect.width,
            rect.height,
          ) || sweptContact
        ) {
          this.applyTrapEffect(player, trap, definition.effect)
          if (!player.alive || player.finished) return
        } else if (touchingTop && trapRequiresGroundSupport(trap.trapId, definition)) {
          this.applyTrapEffect(player, trap, definition.effect)
          if (!player.alive || player.finished) return
        }
      }
      if (definition.effect === 'wind') {
        const fan = trapWorldRect(trap, this.elapsed, this.level)
        const range = PDZZ_PHYSICS.playerDerived.fanRangePixels
        const inRange = trap.rotation === 90
          ? overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, fan.x + CELL_SIZE, fan.y, range, CELL_SIZE)
          : trap.rotation === 180
            ? overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, fan.x, fan.y + CELL_SIZE, CELL_SIZE, range)
            : trap.rotation === 270
              ? overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, fan.x - range, fan.y, range, CELL_SIZE)
              : overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, fan.x, fan.y - range, CELL_SIZE, range)
        if (inRange) {
          this.applyTrapEffect(player, trap, definition.effect)
          if (!player.alive || player.finished) return
        }
      }
    }

    // CharacterController.getIsOutOfBounds checks the entity foot position
    // against viewBounds.bottom + 50. player.y is the collider top edge.
    const footX = player.x + PLAYER_WIDTH / 2
    const footY = player.y + PLAYER_HEIGHT
    if (
      footY > viewBounds.minY + viewBounds.height + 50 ||
      footX < viewBounds.minX - 50 ||
      footX > viewBounds.minX + viewBounds.width + 50
    ) {
      this.kill(player)
      return
    }

    // GoalArea owns a player trigger in the APK. The trigger is only allowed
    // to settle a player on enter, and levels marked noFlag do not create the
    // initial goal area at all.
    if (!this.level.noFlag) {
      const finishWidth = this.level.finishWidth ?? CELL_SIZE * 1.5
      const finishHeight = this.level.finishHeight ?? CELL_SIZE * 2
      const finishTrigger = {
        x: this.level.finishX - finishWidth / 2,
        y: this.level.finishY - finishHeight,
        width: finishWidth,
        height: finishHeight,
      }
      const insideFinish = sweptPlayerOverlapsRect(
        previousX,
        previousY,
        player.x,
        player.y,
        finishTrigger,
      )
      const wasInsideFinish = this.finishTriggerOccupants.has(player.id)
      if (insideFinish) this.finishTriggerOccupants.add(player.id)
      else this.finishTriggerOccupants.delete(player.id)

      if (insideFinish && !wasInsideFinish) {
        // League single-player's canReachFlag has no star requirement. Keep
        // this explicit so a future mode can add the same gate at this point.
        const canReachFlag = true
        if (canReachFlag) {
          player.finished = true
          player.finishedAt = this.elapsed
          player.velocityX = 0
          player.velocityY = 0
        }
      }
    }
  }

  private updateBotInput(player: SimPlayer) {
    // League AI follows the same cell-node path controller as the APK. The
    // path is built from landable platform cells, so a bot jumps only when
    // the next reachable node is on another platform or a gap is ahead.
    if (!player.alive || player.finished) return
    const path = this.aiPaths.get(player.id) ?? []
    const footX = player.x + PLAYER_WIDTH / 2
    const footY = player.y + PLAYER_HEIGHT
    let target = path.find((node) => node.x > footX + 8 || Math.abs(node.y - footY) > 24)
    if (!target) target = { x: this.level.finishX, y: this.level.finishY, jump: false }
    const dx = target.x - footX
    const jump = Boolean(target.jump && player.onGround && Math.abs(dx) < 115)
    const wasJumping = player.input.jump
    player.input = {
      left: dx < -8,
      right: dx > 8,
      jump,
    }
    if (jump && !wasJumping) player.jumpPressed = true
  }

  private resolvePlatformWalls(player: SimPlayer, previousX: number, previousY: number) {
    for (const platform of this.level.platforms) {
      if (platform.oneWay) continue
      if (!overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, platform.x, platform.y, platform.width, platform.height)) {
        continue
      }
      const cameFromAbove = previousY + PLAYER_HEIGHT <= platform.y + PHYSICS.characterController.skinWidth
      const cameFromBelow = previousY >= platform.y + platform.height - PHYSICS.characterController.skinWidth
      const cameFromLeft = previousX + PLAYER_WIDTH <= platform.x + PHYSICS.characterController.skinWidth
      const cameFromRight = previousX >= platform.x + platform.width - PHYSICS.characterController.skinWidth

      // A missed ray or a large frame can leave the body a few pixels inside
      // a platform. Recover to the contacted face. The old code always used
      // platform.y + platform.height here, which pushed a falling player to
      // the bottom of the ground and looked like the animal sank underground.
      if (cameFromAbove) {
        player.y = platform.y - PLAYER_HEIGHT
        player.velocityY = 0
        player.onGround = true
        player.fallingTime = 0
        player.supportId = platform.id
      } else if (cameFromBelow) {
        player.y = platform.y + platform.height
        if (player.velocityY < 0) player.velocityY = 0
      } else if (cameFromLeft) {
        player.x = platform.x - PLAYER_WIDTH
        player.onWall = !player.onGround
        // wallDirection is the impulse direction away from the wall. Keep
        // this convention identical to moveCharacter's raycast result.
        player.wallDirection = 1
      } else if (cameFromRight) {
        player.x = platform.x + platform.width
        player.onWall = !player.onGround
        player.wallDirection = -1
      } else {
        // The body started inside the collider. Resolve along the shallowest
        // penetration instead of choosing the collider's bottom blindly.
        const pushTop = Math.abs(player.y + PLAYER_HEIGHT - platform.y)
        const pushBottom = Math.abs(platform.y + platform.height - player.y)
        if (pushTop <= pushBottom) {
          player.y = platform.y - PLAYER_HEIGHT
          player.velocityY = 0
          player.onGround = true
          player.fallingTime = 0
          player.supportId = platform.id
        } else {
          player.y = platform.y + platform.height
          if (player.velocityY < 0) player.velocityY = 0
        }
      }
      player.velocityX = 0
    }
  }

  private resolveTrapWalls(
    player: SimPlayer,
    previousX: number,
  ) {
    for (const trap of this.placedTraps) {
      const definition = trapDefinition(trap.trapId)
      if (!definition || definition.collisionMode === 'none' || isOneWayComponent(trap.trapId) || this.isTrapDisabled(trap)) continue
      // The APK linearsaw base is a platform collider. The character
      // controller already resolves its top face; a penetration correction
      // here must not turn a top landing into a horizontal wall hit.
      // Springs are handled by the same ray result as map platforms. Running
      // a second cell-sized wall pass after the spring impulse would erase
      // the side-launch position and velocity.
      if (trap.trapId === 'linearsaw' || trap.trapId === 'spring') continue
      for (const rect of trapBodyRects(trap, this.elapsed, this.level)) {
        const trapX = rect.x
        const trapWidth = rect.width
        if (!overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, trapX, rect.y, trapWidth, rect.height)) continue
        if (previousX + PLAYER_WIDTH <= trapX) {
          player.x = trapX - PLAYER_WIDTH
          } else if (previousX >= trapX + trapWidth) {
          player.x = trapX + trapWidth
        } else {
          player.x = player.x < trapX + trapWidth / 2 ? trapX - PLAYER_WIDTH : trapX + trapWidth
        }
        player.velocityX = 0
      }
    }
  }

  private applySpringFromMovement(
    player: SimPlayer,
    movement: ReturnType<typeof moveCharacter>,
  ) {
    const activeContacts = new Set<string>()
    for (const trap of this.placedTraps) {
      if (trap.trapId !== 'spring') continue
      const rects = springPlatformRects(trap, this.elapsed)
      for (const rect of rects) {
        const verticalOverlap = player.y + PLAYER_HEIGHT > rect.y && player.y < rect.y + rect.height
        const horizontalOverlap = player.x + PLAYER_WIDTH > rect.x && player.x < rect.x + rect.width
        const faceTolerance = 3
        let contact: Rotation | null = null
        // Check the directional faces first. A player can be grounded on the
        // lower edge of a vertical spring while simultaneously entering its
        // active side; treating that frame as a top landing loses the spring
        // impulse and leaves the player glued to the collider.
        if (movement.hitRight && trap.rotation === 90 && verticalOverlap &&
          Math.abs(player.x + PLAYER_WIDTH - rect.x) <= faceTolerance) {
          contact = 90
        } else if (movement.hitLeft && trap.rotation === 270 && verticalOverlap &&
          Math.abs(player.x - (rect.x + rect.width)) <= faceTolerance) {
          contact = 270
        } else if (movement.hitCeiling && trap.rotation === 180 && horizontalOverlap &&
          Math.abs(player.y - (rect.y + rect.height)) <= faceTolerance) {
          contact = 180
        } else if (movement.grounded && movement.surface &&
          (movement.surface as Surface).trap?.instanceId === trap.instanceId &&
          horizontalOverlap) {
          contact = 0
        }

        const key = `${trap.instanceId}:${player.id}`
        if (contact === null) {
          this.springContacts.delete(key)
          continue
        }
        activeContacts.add(key)
        const previousContact = this.springContacts.get(key)
        this.springContacts.set(key, contact)
        // vv fires on enter when the normal already matches, and on stay only
        // after the normal changes to the matching face. It does not bounce a
        // player again every fixed tick while the body remains touching.
        if (contact === trap.rotation && previousContact !== contact) {
          this.applySpringEffect(player, trap, rect)
        }
        break
      }
    }
    for (const key of this.springContacts.keys()) {
      if (!key.endsWith(`:${player.id}`) || activeContacts.has(key)) continue
      this.springContacts.delete(key)
    }
  }

  private applySpringEffect(player: SimPlayer, trap: PlacedTrap, contactedRect?: TrapRect) {
    const cooldownUntil = player.trapCooldowns.get(trap.instanceId) ?? 0
    if (cooldownUntil > this.elapsed) return

    // vv in the APK derives its spring jump from a 1.5x jump height, then
    // applies a direction-specific impulse from the contacted face.
    const springVelocity = PHYSICS.playerDerived.normalJumpStartVelocity * Math.sqrt(
      PHYSICS.componentMechanics.spring.jumpHeightMultiplier,
    )
    switch (trap.rotation) {
      case 180:
        player.velocityY = -springVelocity / 2
        player.onGround = false
        break
      case 90:
        player.extraHorizontalAirSpeed = -springVelocity * PHYSICS.componentMechanics.spring.triggerSpringVelocityMultiplier
        player.onGround = false
        break
      case 270:
        player.extraHorizontalAirSpeed = springVelocity
        player.onGround = false
        break
      default:
        player.y = Math.min(
          player.y,
          (contactedRect?.y ?? springPlatformRects(trap, this.elapsed, this.level)[0]?.y ?? trapWorldRect(trap, this.elapsed, this.level).y) - PLAYER_HEIGHT,
        )
        player.velocityY = springVelocity
        player.springJump = true
        player.onGround = false
        break
    }
    player.supportId = null
    player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.05)
  }

  private applyTrapEffect(player: SimPlayer, trap: PlacedTrap, effect: TrapEffect) {
    const rect = trapWorldRect(trap, this.elapsed, this.level)
    const trapY = rect.y
    const cooldownUntil = player.trapCooldowns.get(trap.instanceId) ?? 0
    if (cooldownUntil > this.elapsed && effect !== 'ice' && effect !== 'slow') return

    switch (effect) {
      case 'kill':
        this.kill(player, trap.ownerId)
        return
      case 'ice':
        // Maintained by updateSurfaceStates() until the trigger exit event.
        return
      case 'bounce':
        if (trap.trapId === 'spring') this.applySpringEffect(player, trap)
        else {
          player.y = Math.min(player.y, trapY - PLAYER_HEIGHT)
          const springVelocity = PHYSICS.playerDerived.normalJumpStartVelocity * Math.sqrt(
            PHYSICS.componentMechanics.spring.jumpHeightMultiplier,
          )
          player.velocityY = trap.trapId === 'triggerspring'
            ? springVelocity * PHYSICS.componentMechanics.spring.triggerSpringVelocityMultiplier
            : springVelocity
          player.onGround = false
          player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.55)
        }
        return
      case 'slow':
        // Maintained by updateSurfaceStates() until the trigger exit event.
        return
      case 'teleport':
        if (trap.trapId === 'portal') {
          const target = this.placedTraps.find((candidate) =>
            candidate.trapId === 'portal' && candidate.instanceId !== trap.instanceId,
          )
          if (target) {
            const targetRect = trapWorldRect(target, this.elapsed, this.level)
            player.x = targetRect.x + targetRect.width / 2 - PLAYER_WIDTH / 2
            player.y = targetRect.y + targetRect.height / 2 - PLAYER_HEIGHT / 2
          } else {
            player.x = this.level.spawnX - PLAYER_WIDTH / 2
            player.y = this.level.spawnY
          }
        } else {
          player.x = this.level.spawnX - PLAYER_WIDTH / 2
          player.y = this.level.spawnY
        }
        player.velocityX = 0
        player.velocityY = 0
        player.onGround = false
        player.trapCooldowns.set(trap.instanceId, this.elapsed + 1.2)
        return
      case 'boost':
        if (trap.trapId === 'checkpoint' || trap.trapId === 'respawnpoint') return
        if (trap.trapId === 'airjump') {
          player.velocityY = PHYSICS.playerDerived.normalJumpStartVelocity
          player.onGround = false
          player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.2)
          return
        }
        player.boostUntil = this.elapsed + 0.8
        player.velocityX = (player.direction || 1) * PHYSICS.player.normalHorizontalSpeed * 1.68
        player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.8)
        return
      case 'wall':
        return
      case 'wind': {
        const direction = trap.rotation === 90 || trap.rotation === 180 ? -1 : 1
        player.velocityX += direction * PHYSICS.playerDerived.fanHorizontalPushPerTick
        player.velocityY -= PHYSICS.playerDerived.gravity * PHYSICS.playerDerived.fanVerticalPushGravityMultiplier[0] * 0.017
        player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.22)
        return
      }
      case 'reverse':
        if (trap.trapId === 'onoffswitch' || trap.trapId === 'pressureswitch' || trap.trapId === 'gas') return
        player.reverseUntil = this.elapsed + 2
        player.trapCooldowns.set(trap.instanceId, this.elapsed + 2)
        return
      case 'freeze':
        player.freezeUntil = this.elapsed + 1.2
        return
      default:
        return
    }
  }

  private updateSwitches() {
    for (const trap of this.placedTraps) {
      if (trap.trapId !== 'onoffswitch' && trap.trapId !== 'pressureswitch') continue
      const rects = trapCellRects(trap, this.elapsed, this.level)
      const occupiedByPlayer = Array.from(this.players.values()).some((player) =>
        player.alive && rects.some((rect) => overlaps(
          player.x,
          player.y,
          PLAYER_WIDTH,
          PLAYER_HEIGHT,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
        )),
      )
      const occupiedByObject = this.placedTraps.some((object) =>
        object.instanceId !== trap.instanceId &&
        ['pushableplatform', 'bomb', 'bombsmall', 'superblock'].includes(object.trapId) &&
        trapCellRects(object, this.elapsed, this.level).some((objectRect) => rects.some((rect) =>
          overlaps(objectRect.x, objectRect.y, objectRect.width, objectRect.height, rect.x, rect.y, rect.width, rect.height),
        )),
      )
      const occupied = occupiedByPlayer || occupiedByObject
      if (trap.trapId === 'pressureswitch') {
        this.switchState.set(trap.instanceId, occupied)
        continue
      }
      const occupantKey = `${trap.instanceId}:occupied`
      const cooldown = this.switchCooldowns.get(trap.instanceId) ?? 0
      if (occupied && !this.switchOccupants.has(occupantKey) && cooldown <= this.elapsed) {
        this.switchState.set(trap.instanceId, !(this.switchState.get(trap.instanceId) ?? false))
        this.switchCooldowns.set(trap.instanceId, this.elapsed + 0.25)
      }
      if (occupied) this.switchOccupants.add(occupantKey)
      else this.switchOccupants.delete(occupantKey)
    }
  }

  private isTrapHazardActive(trap: PlacedTrap) {
    const started = this.trapActivationAt.get(trap.instanceId)
    if (started === undefined) return false
    const age = this.elapsed - started
    if (trap.trapId === 'triggerhazard') return cactusProgress(age) > 0.5
    if (trap.trapId === 'fortunecat') return age >= 0.8 && age < 1.8
    if (trap.trapId === 'triggerspikes') return age >= 0.55 && age < 3.6
    return false
  }

  private trapHazardRects(trap: PlacedTrap): TrapRect[] {
    if (trap.trapId === 'fortunecat') {
      return [fortuneCatHazardRect(trap, this.elapsed, this.level), ...trapBodyRects(trap, this.elapsed, this.level)]
    }
    if (trap.trapId === 'triggerhazard') {
      const started = this.trapActivationAt.get(trap.instanceId)
      if (started === undefined) return []
      const rect = cactusHazardRect(trap, this.elapsed, this.elapsed - started, this.level)
      return rect ? [rect, ...trapBodyRects(trap, this.elapsed, this.level)] : []
    }
    if (trap.trapId === 'triggerspikes') {
      const rect = springSpikesHazardRect(trap, this.elapsed, this.level)
      return rect ? [rect, ...trapBodyRects(trap, this.elapsed, this.level)] : []
    }
    return trapTriggerRects(trap, this.elapsed, this.level)
  }

  private trapPhase(trap: PlacedTrap): PlacedTrap['phase'] {
    const started = this.trapActivationAt.get(trap.instanceId)
    if (started === undefined) return 'idle'
    const age = this.elapsed - started
    if (trap.trapId === 'triggerhazard') {
      if (age < 0.8) return 'warning'
      if (age < 1.6) return 'active'
      return 'reverting'
    }
    if (trap.trapId === 'fortunecat') return age < 0.8 ? 'warning' : 'active'
    if (trap.trapId === 'triggerspikes') {
      if (age < 0.55) return 'warning'
      if (age < 3.55) return 'active'
      return 'reverting'
    }
    return 'idle'
  }

  private updateTrapStates(previousPositions: Map<string, { x: number; y: number }>) {
    for (const trap of this.placedTraps) {
      if (!['fortunecat', 'triggerhazard', 'triggerspikes'].includes(trap.trapId)) continue
      const started = this.trapActivationAt.get(trap.instanceId)
      if (started !== undefined) {
        const lifetime = trap.trapId === 'triggerspikes' ? 3.6 : trap.trapId === 'fortunecat' ? 1.8 : 2.1
        if (this.elapsed - started >= lifetime) this.trapActivationAt.delete(trap.instanceId)
        continue
      }
      const cells = trapCellRects(trap, this.elapsed, this.level)
      const cell = cells[0]
      if (!cell) continue
      let shouldActivate = false
      for (const player of this.players.values()) {
        if (!player.alive || player.finished) continue
        const body = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
        const key = `${trap.instanceId}:${player.id}`
        let inside = false
        if (trap.trapId === 'fortunecat') {
          const trigger = trapActivationRect(trap, this.elapsed)
          inside = Boolean(trigger && sweptPlayerOverlapsRect(
            previousPositions.get(player.id)?.x ?? player.x,
            previousPositions.get(player.id)?.y ?? player.y,
            player.x,
            player.y,
            trigger,
          ))
        }
        if (trap.trapId === 'triggerhazard') {
          inside = circleOverlapsRect(
            cell.x + CELL_SIZE / 2,
            cell.y + CELL_SIZE / 2,
            CELL_SIZE / 2,
            body.x,
            body.y,
            body.width,
            body.height,
          ) || sweptPlayerOverlapsCircle(
            previousPositions.get(player.id)?.x ?? player.x,
            previousPositions.get(player.id)?.y ?? player.y,
            player.x,
            player.y,
            cell.x + CELL_SIZE / 2,
            cell.y + CELL_SIZE / 2,
            CELL_SIZE / 2,
          )
          || sweptPlayerOverlapsRect(
            previousPositions.get(player.id)?.x ?? player.x,
            previousPositions.get(player.id)?.y ?? player.y,
            player.x,
            player.y,
            cell,
          )
        }
        if (trap.trapId === 'triggerspikes') {
          // The APK triggers spring spikes from the matching collision face.
          const bounds = trapOccupiedBounds(trap, this.elapsed, this.level)
          if (!bounds) continue
          const spikeFace = springSpikesHazardRect(trap, this.elapsed, this.level)
          inside = Boolean(spikeFace && sweptPlayerOverlapsRect(
            previousPositions.get(player.id)?.x ?? player.x,
            previousPositions.get(player.id)?.y ?? player.y,
            player.x,
            player.y,
            spikeFace,
          ))
        }
        if (inside) {
          if (!this.trapTriggerOccupants.has(key)) shouldActivate = true
          this.trapTriggerOccupants.add(key)
        } else {
          this.trapTriggerOccupants.delete(key)
        }
      }
      if (shouldActivate) this.trapActivationAt.set(trap.instanceId, this.elapsed)
    }
  }

  private updateSurfaceStates() {
    for (const player of this.players.values()) {
      if (!player.alive || player.finished) continue
      const body = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
      const nextIce = this.placedTraps.some((trap) =>
        trap.trapId === 'ice' && trapTriggerRects(trap, this.elapsed, this.level).some((rect) =>
          overlaps(body.x, body.y, body.width, body.height, rect.x, rect.y, rect.width, rect.height),
        ),
      )
      const nextMud = this.placedTraps.some((trap) =>
        trap.trapId === 'mud' && trapTriggerRects(trap, this.elapsed, this.level).some((rect) =>
          overlaps(body.x, body.y, body.width, body.height, rect.x, rect.y, rect.width, rect.height),
        ),
      )
      if (nextIce) this.iceOccupants.add(player.id)
      else this.iceOccupants.delete(player.id)
      if (nextMud) this.mudOccupants.add(player.id)
      else this.mudOccupants.delete(player.id)
      player.inIce = this.iceOccupants.has(player.id)
      player.inMud = this.mudOccupants.has(player.id)
    }
  }

  private hasGroundedSurfaceContact(player: SimPlayer, trapId: 'ice' | 'mud') {
    return this.placedTraps.some((trap) => {
      // pv/_v only report grounded material when the component faces up.
      if (trap.trapId !== trapId || trap.rotation !== 0) return false
      return trapTriggerRects(trap, this.elapsed, this.level).some((rect) =>
        overlaps(
          player.x + 4,
          player.y + PLAYER_HEIGHT - 4,
          PLAYER_WIDTH - 8,
          8,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
        ),
      )
    })
  }

  private updateGasStates() {
    const previousGasPlayers = new Set<string>()
    for (const key of this.gasOccupants) {
      const separator = key.indexOf(':')
      if (separator >= 0) previousGasPlayers.add(key.slice(separator + 1))
    }

    for (const trap of this.placedTraps) {
      if (trap.trapId !== 'gas') continue
      const motion = trapMotion(trap, this.elapsed, this.level)
      // zy creates child colliders from the component origin. The extracted
      // APK uses local offsets (-1,-1) for the 2x2 outer box and
      // (-0.75,-0.75) for the 1.5x1.5 inner box; these are not centered from
      // the occupied cell rectangle.
      const originX = trap.x * CELL_SIZE + motion.offsetX
      const originY = trap.y * CELL_SIZE + motion.offsetY
      const outer = {
        x: originX - CELL_SIZE,
        y: originY - CELL_SIZE,
        width: CELL_SIZE * 2,
        height: CELL_SIZE * 2,
      }
      const inset = CELL_SIZE * 0.75
      const inner = {
        x: originX - inset,
        y: originY - inset,
        width: CELL_SIZE * 1.5,
        height: CELL_SIZE * 1.5,
      }
      for (const player of this.players.values()) {
        if (!player.alive || player.finished) continue
        const body = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
        const key = `${trap.instanceId}:${player.id}`
        const insideInner = overlaps(body.x, body.y, body.width, body.height, inner.x, inner.y, inner.width, inner.height)
        const insideOuter = overlaps(body.x, body.y, body.width, body.height, outer.x, outer.y, outer.width, outer.height)

        // APK enterGas is an enter event. Staying inside the inner box must
        // never refresh the effect on every fixed tick.
        if (insideInner) this.gasOccupants.add(key)
        // APK exitGas is attached to the 2x2 outer trigger. Once that trigger
        // is left, this gas is removed from the player's active gas list.
        else if (!insideOuter) this.gasOccupants.delete(key)
      }
    }

    for (const player of this.players.values()) {
      const active = Array.from(this.gasOccupants).some((key) => key.endsWith(`:${player.id}`))
      const wasActive = previousGasPlayers.has(player.id)
      if (active) {
        player.reverseUntil = Number.POSITIVE_INFINITY
        player.gasExitUntil = Number.POSITIVE_INFINITY
      } else if (wasActive) {
        // The source controller keeps the reverse indicator for two seconds
        // after the final outer trigger exit, then stopReverse() clears it.
        player.gasExitUntil = this.elapsed + 2
        player.reverseUntil = player.gasExitUntil
      } else if (player.gasExitUntil > 0 && player.gasExitUntil <= this.elapsed) {
        player.reverseUntil = 0
        player.gasExitUntil = 0
      }
    }
  }

  private isTrapDisabled(trap: PlacedTrap) {
    if (trap.trapId === 'door' || trap.trapId === 'rotarydoor' || trap.trapId === 'movabledoor') {
      return Boolean(trap.connectedTo && this.switchState.get(trap.connectedTo))
    }
    if (trap.trapId === 'crumblingblock') {
      const started = this.crumbleStartedAt.get(trap.instanceId)
      return started !== undefined && this.elapsed - started >= 0.7
    }
    return false
  }

  private updateProjectiles(dt: number) {
    const shooterSettings = new Map<string, { speed: number; interval: number; range: number }>([
      ['cannon', {
        speed: PHYSICS.componentMechanics.cannon.projectileSpeed,
        interval: PHYSICS.componentMechanics.cannon.intervalSeconds,
        range: PHYSICS.componentMechanics.cannon.rangeCells * CELL_SIZE,
      }],
      ['crossbow', { speed: 240, interval: 2.5, range: 15 * CELL_SIZE }],
      ['lasershooter', { speed: 360, interval: 3, range: 20 * CELL_SIZE }],
      ['ballooncannon', {
        speed: PHYSICS.componentMechanics.balloonCannon.projectileSpeed,
        interval: PHYSICS.componentMechanics.balloonCannon.intervalSeconds,
        range: 15 * CELL_SIZE,
      }],
    ])
    for (const trap of this.placedTraps) {
      const settings = shooterSettings.get(trap.trapId)
      if (!settings || this.isTrapDisabled(trap)) continue
      const nextFire = this.switchCooldowns.get(`projectile:${trap.instanceId}`) ?? PHYSICS.componentMechanics.cannon.startCooldownSeconds
      if (this.elapsed < nextFire) continue
      const rect = trapWorldRect(trap, this.elapsed, this.level)
      const angle = (trap.rotation * Math.PI) / 180 - Math.PI / 2
      this.projectiles.push({
        id: `${trap.instanceId}:${this.elapsed.toFixed(3)}`,
        ownerId: trap.ownerId,
        trapId: trap.trapId,
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
        velocityX: Math.cos(angle) * settings.speed,
        velocityY: Math.sin(angle) * settings.speed,
        ttl: settings.range / settings.speed,
        radius: trap.trapId === 'lasershooter' ? 8 : 12,
      })
      this.switchCooldowns.set(`projectile:${trap.instanceId}`, this.elapsed + settings.interval)
    }

    const nextProjectiles: Projectile[] = []
    for (const projectile of this.projectiles) {
      projectile.x += projectile.velocityX * dt
      projectile.y += projectile.velocityY * dt
      projectile.ttl -= dt
      let hit = false
      for (const player of this.players.values()) {
        if (!player.alive || player.finished) continue
        if (overlaps(
          player.x,
          player.y,
          PLAYER_WIDTH,
          PLAYER_HEIGHT,
          projectile.x - projectile.radius,
          projectile.y - projectile.radius,
          projectile.radius * 2,
          projectile.radius * 2,
        )) {
          this.kill(player, projectile.ownerId)
          hit = true
          break
        }
      }
      if (!hit && projectile.ttl > 0) nextProjectiles.push(projectile)
    }
    this.projectiles = nextProjectiles
  }

  private kill(player: SimPlayer, killerOwnerId: string | null = null, timedOut = false) {
    player.alive = false
    player.deadAt = this.elapsed
    player.timedOut = timedOut
    player.killedByTrapOwnerId = killerOwnerId && killerOwnerId !== player.id ? killerOwnerId : null
    player.velocityX = 0
    player.velocityY = 0
    player.input = { left: false, right: false, jump: false }
  }

  private resolvePlayerCollision() {
    if (!this.playerCollisionEnabled) return
    const players = Array.from(this.players.values()).filter((player) => player.alive && !player.finished)
    if (players.length < 2) return
    for (let i = 0; i < players.length; i += 1) {
      for (let j = i + 1; j < players.length; j += 1) {
        const a = players[i]
        const b = players[j]
        if (!overlaps(a.x, a.y, PLAYER_WIDTH, PLAYER_HEIGHT, b.x, b.y, PLAYER_WIDTH, PLAYER_HEIGHT)) continue
        const overlap = a.x < b.x ? a.x + PLAYER_WIDTH - b.x : b.x + PLAYER_WIDTH - a.x
        const push = Math.max(1, overlap / 2)
        if (a.x < b.x) {
          a.x = Math.max(0, a.x - push)
          b.x = Math.min(this.level.width - PLAYER_WIDTH, b.x + push)
        } else {
          b.x = Math.max(0, b.x - push)
          a.x = Math.min(this.level.width - PLAYER_WIDTH, a.x + push)
        }
      }
    }
  }

  private snapshotPlayer(player: SimPlayer): PlayerSnapshot {
    let animationState: AnimationState = 'idle'
    if (!player.alive) animationState = 'death'
    else if (player.finished) animationState = 'win'
    else if (!player.onGround && player.velocityY < 0) animationState = 'jump'
    else if (!player.onGround && player.velocityY >= 0) animationState = 'fall'
    else if (Math.abs(player.velocityX) > 0) animationState = 'run'

    return {
      id: player.id,
      slot: player.slot,
      label: player.label,
      x: Math.round(player.x),
      y: Math.round(player.y),
      velocityX: Math.round(player.velocityX),
      velocityY: Math.round(player.velocityY),
      direction: player.direction,
      animationState,
      alive: player.alive,
      finished: player.finished,
      connected: player.connected,
      ready: player.ready,
      score: player.score,
      characterId: player.characterId,
      characterAsset: player.characterAsset,
      lastProcessedInputSequence: player.lastProcessedInputSequence,
      bot: player.bot,
    }
  }
}
