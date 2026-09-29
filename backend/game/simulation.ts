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
  PDZZ_PHYSICS,
  getPdzzCharacterForSlot,
  getPdzzMap,
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
        return definition?.collisionMode !== 'none' && trapCellRects(trap, 0).some((rect) =>
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

function trapMotion(trap: PlacedTrap, elapsed: number) {
  const movingHorizontal = new Set(['moveplatform1x1', 'moveplatform2x1', 'moveplatform3x1', 'trackplatform', 'onedirblock', 'linearsaw'])
  const movingVertical = new Set(['doublelift', 'stomper', 'crumblingblock'])
  const rotating = new Set(['swingplatform', 'spinningplatform', 'spikeball', 'rotaryhazard', 'squaredplatform', 'spinningsaw', 'swingsaw'])
  const phase = (trap.placedRound * 0.71 + trap.x * 0.13 + trap.y * 0.17) % (Math.PI * 2)
  const wave = Math.sin(elapsed * (Math.PI * 2 / 3.6) + phase)
  return {
    offsetX: movingHorizontal.has(trap.trapId)
      ? trap.trapId === 'linearsaw' ? wave * 250 : wave * 150
      : 0,
    offsetY: movingVertical.has(trap.trapId) ? Math.max(0, wave) * 150 : 0,
    visualRotation: rotating.has(trap.trapId)
      ? trap.rotation + (trap.trapId === 'swingsaw' ? wave * 60 : wave * 25)
      : trap.rotation,
  }
}

function trapWorldRect(trap: PlacedTrap, elapsed: number) {
  const motion = trapMotion(trap, elapsed)
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
) {
  const definition = trapDefinition(trap.trapId)
  if (!definition) return []
  const motion = trapMotion(trap as PlacedTrap, elapsed)
  return rotatedCells(definition, trap.rotation).map((cell) => ({
    x: trap.x * CELL_SIZE + cell.x * CELL_SIZE + motion.offsetX,
    y: trap.y * CELL_SIZE + cell.y * CELL_SIZE + motion.offsetY,
    width: CELL_SIZE,
    height: CELL_SIZE,
    ...motion,
  }))
}

type TrapRect = { x: number; y: number; width: number; height: number }

function trapEntityCenter(trap: PlacedTrap, elapsed: number) {
  const motion = trapMotion(trap, elapsed)
  return {
    x: trap.x * CELL_SIZE + (trap.width * CELL_SIZE) / 2 + motion.offsetX,
    y: trap.y * CELL_SIZE + (trap.height * CELL_SIZE) / 2 + motion.offsetY,
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

function fortuneCatTriggerRect(trap: PlacedTrap, elapsed: number) {
  const center = trapEntityCenter(trap, elapsed)
  return orientedRect(center.x, center.y, 2.6 * CELL_SIZE, 0.8 * CELL_SIZE, 0, 0, trap.rotation)
}

function fortuneCatHazardRect(trap: PlacedTrap, elapsed: number) {
  const center = trapEntityCenter(trap, elapsed)
  const definition = trapDefinition('fortunecat')
  const localPlatformHeight = (definition?.height ?? 2) * CELL_SIZE
  return orientedRect(center.x, center.y, 2.6 * CELL_SIZE, 0.5 * CELL_SIZE, 0, 0.2 * localPlatformHeight, trap.rotation)
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

function cactusHazardRect(trap: PlacedTrap, elapsed: number, age: number) {
  const progress = cactusProgress(age)
  if (progress <= 0.5) return null
  const center = trapEntityCenter(trap, elapsed)
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

function trapTriggerRects(trap: PlacedTrap, elapsed: number) {
  const definition = trapDefinition(trap.trapId)
  if (!definition) return []
  const cells = trapCellRects(trap, elapsed)
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
      case 'spinningsaw':
      case 'swingsaw':
        return { ...cell, x: x + 5, y: y + 5, width: 40, height: 40 }
      default:
        return { ...cell }
    }
  })
  return rects
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

  if (definition.placement === 'supported') {
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
  private placedTraps: PlacedTrap[]
  private elapsed = 0
  private projectiles: Projectile[] = []
  private switchState = new Map<string, boolean>()
  private switchCooldowns = new Map<string, number>()
  private switchOccupants = new Set<string>()
  private crumbleStartedAt = new Map<string, number>()
  private finishTriggerOccupants = new Set<string>()
  private trapActivationAt = new Map<string, number>()
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
  ) {
    this.round = round
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
            onGround: false,
            onWall: false,
            wallDirection: 1 as const,
            surfaceMaterial: 'normal' as const,
            alive: true,
            finished: false,
            connected: true,
            ready: true,
            input: { left: false, right: false, jump: false },
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

  setInput(playerId: string, input: PlayerInput) {
    const player = this.players.get(playerId)
    if (!player || !player.alive || player.finished) return
    player.input = cloneInput(input)
  }

  tick(dt: number) {
    if (this.isComplete()) return
    this.elapsed = Math.min(PLAY_DURATION_SECONDS, this.elapsed + dt)
    this.updateSwitches()
    this.updateTrapStates()
    this.updateProjectiles(dt)
    for (const player of this.players.values()) {
      if (player.bot) this.updateBotInput(player)
      this.tickPlayer(player, dt)
    }
    this.resolvePlayerCollision()
    if (this.elapsed >= PLAY_DURATION_SECONDS) {
      for (const player of this.players.values()) {
        if (player.alive && !player.finished) this.kill(player, null, true)
      }
    }
  }

  isComplete() {
    return (
      Array.from(this.players.values()).every((player) => !player.alive || player.finished) ||
      this.elapsed >= PLAY_DURATION_SECONDS
    )
  }

  result(): RoundResult {
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
          ...trapMotion(trap, this.elapsed),
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
        const currentMotion = trapMotion(support, this.elapsed)
        const previousMotion = trapMotion(support, Math.max(0, this.elapsed - dt))
        player.x += currentMotion.offsetX - previousMotion.offsetX
        player.y += currentMotion.offsetY - previousMotion.offsetY
      }
    }

    const previousX = player.x
    const previousY = player.y
    // Mud is a grounded surface effect in the APK. It changes horizontal
    // speed, jump impulse, and wall-slide gravity only while the foot is on
    // the mud trigger, not merely while the body overlaps its cell.
    player.surfaceMaterial = player.iceUntil > this.elapsed ? 'ice' : 'normal'
    for (const trap of this.placedTraps) {
      if (trap.trapId !== 'mud') continue
      const mudRect = trapTriggerRects(trap, this.elapsed)[0]
      if (mudRect && player.onGround && overlaps(
        player.x + 4, player.y + PLAYER_HEIGHT - 4, PLAYER_WIDTH - 8, 8,
        mudRect.x, mudRect.y, mudRect.width, mudRect.height,
      )) {
        player.surfaceMaterial = 'mud'
        break
      }
    }
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
        player.surfaceMaterial === 'ice' || player.iceUntil > this.elapsed
          ? PHYSICS.player.iceHorizontalSpeed
          : player.surfaceMaterial === 'mud' || player.slowUntil > this.elapsed
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
      } else if (player.surfaceMaterial === 'ice' || player.iceUntil > this.elapsed) {
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

    if (player.input.jump) player.jumpBufferUntil = this.elapsed + 0.2
    else player.jumpConsumed = false
    if (player.jumpBufferUntil > this.elapsed && !player.jumpConsumed) {
      if (player.onGround) {
        player.velocityY = player.surfaceMaterial === 'mud'
          ? PHYSICS.playerDerived.mudJumpStartVelocity
          : PHYSICS.playerDerived.normalJumpStartVelocity
        player.onGround = false
        player.jumpBufferUntil = 0
        player.jumpConsumed = true
      } else if (wallClinging) {
        player.velocityY = PHYSICS.playerDerived.wallJumpStartVerticalVelocity
        player.extraHorizontalAirSpeed = player.wallDirection * PHYSICS.playerDerived.wallJumpStartHorizontalVelocity
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
          player.surfaceMaterial === 'ice'
            ? PHYSICS.player.iceWallGravityVariation
            : player.surfaceMaterial === 'mud'
              ? PHYSICS.player.mudWallGravityVariation
              : PHYSICS.player.wallGravityVariation
        )
      : player.fallingTime > 0
        ? PHYSICS.playerDerived.gravity * PHYSICS.player.fallGravityVariation
        : PHYSICS.playerDerived.gravity * (player.input.jump ? 1 : PHYSICS.player.jumpUpGravityVariation)
    player.velocityY = clamp(
      player.velocityY + gravity * dt,
      PHYSICS.player.maxUpSpeed,
      wallClinging
        ? player.surfaceMaterial === 'ice'
          ? PHYSICS.player.maxIceWallSlideSpeed
          : player.surfaceMaterial === 'mud'
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
      // Supported hazards, springs, ice and mud occupy the top edge of the
      // cell they are placed on. Wall/platform components are solid bodies.
      // This contact surface is what makes landing on a spike or spring
      // trigger it, matching the APK's CharacterController contact callback.
      const isSurface = definition.collisionMode === 'solid' || definition.collisionMode === 'hybrid'
      if (!isSurface) return []
      return trapCellRects(trap, this.elapsed).map((rect, index) => ({
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
      player.surfaceMaterial = landingPlatform?.material ?? 'normal'
      if (player.surfaceMaterial === 'ice') player.iceUntil = this.elapsed + 0.2
      if (player.surfaceMaterial === 'mud') player.slowUntil = this.elapsed + 0.2
      if (landingPlatform?.trap && landingPlatform.definition) {
        if (landingPlatform.trap.trapId === 'crumblingblock' && !this.crumbleStartedAt.has(landingPlatform.trap.instanceId)) {
          this.crumbleStartedAt.set(landingPlatform.trap.instanceId, this.elapsed)
        }
        if (landingPlatform.definition.collisionMode !== 'hybrid') {
          this.applyTrapEffect(player, landingPlatform.trap, landingPlatform.definition.effect)
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
    this.resolveTrapWalls(player, previousX)

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
      if (trap.trapId === 'gas') {
        const gasCell = trapCellRects(trap, this.elapsed)[0]
        if (gasCell) {
          const inner = {
            x: gasCell.x - CELL_SIZE * 0.25,
            y: gasCell.y - CELL_SIZE * 0.25,
            width: CELL_SIZE * 1.5,
            height: CELL_SIZE * 1.5,
          }
          const outer = {
            x: gasCell.x - CELL_SIZE * 0.5,
            y: gasCell.y - CELL_SIZE * 0.5,
            width: CELL_SIZE * 2,
            height: CELL_SIZE * 2,
          }
          const body = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
          if (overlaps(body.x, body.y, body.width, body.height, inner.x, inner.y, inner.width, inner.height)) {
            player.reverseUntil = this.elapsed + 0.1
            player.gasExitUntil = this.elapsed + 1.5
          } else if (overlaps(body.x, body.y, body.width, body.height, outer.x, outer.y, outer.width, outer.height)) {
            player.reverseUntil = Math.max(player.reverseUntil, player.gasExitUntil)
          }
        }
        continue
      }
      if (trap.trapId === 'fortunecat' || trap.trapId === 'triggerhazard' || trap.trapId === 'triggerspikes') {
        if (!this.isTrapHazardActive(trap)) continue
      }
      for (const rect of rects) {
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
          )
        ) {
          this.applyTrapEffect(player, trap, definition.effect)
          if (!player.alive || player.finished) return
        } else if (touchingTop && definition.placement === 'supported') {
          this.applyTrapEffect(player, trap, definition.effect)
          if (!player.alive || player.finished) return
        }
      }
      if (definition.effect === 'wind') {
        const fan = trapWorldRect(trap, this.elapsed)
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
      const insideFinish = overlaps(
        player.x,
        player.y,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
        finishTrigger.x,
        finishTrigger.y,
        finishTrigger.width,
        finishTrigger.height,
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
    player.input = {
      left: dx < -8,
      right: dx > 8,
      jump,
    }
  }

  private resolvePlatformWalls(player: SimPlayer, previousX: number, previousY: number) {
    for (const platform of this.level.platforms) {
      if (platform.oneWay) continue
      if (!overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, platform.x, platform.y, platform.width, platform.height)) {
        continue
      }
      if (previousY + PLAYER_HEIGHT <= platform.y) continue
      if (previousX + PLAYER_WIDTH <= platform.x) {
        player.x = platform.x - PLAYER_WIDTH
        player.onWall = !player.onGround
        // wallDirection is the impulse direction away from the wall. Keep
        // this convention identical to moveCharacter's raycast result.
        player.wallDirection = 1
      } else if (previousX >= platform.x + platform.width) {
        player.x = platform.x + platform.width
        player.onWall = !player.onGround
        player.wallDirection = -1
      } else if (player.y + PLAYER_HEIGHT > platform.y + 4) {
        player.y = platform.y + platform.height
        player.velocityY = Math.max(0, player.velocityY)
      }
      player.velocityX = 0
    }
  }

  private resolveTrapWalls(player: SimPlayer, previousX: number) {
    for (const trap of this.placedTraps) {
      const definition = trapDefinition(trap.trapId)
      if (!definition || (definition.collisionMode !== 'solid' && definition.collisionMode !== 'hybrid') || isOneWayComponent(trap.trapId) || this.isTrapDisabled(trap)) continue
      for (const rect of trapCellRects(trap, this.elapsed)) {
        const trapX = rect.x
        const trapY = rect.y
        const trapWidth = rect.width
        const trapHeight = rect.height
        if (!overlaps(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, trapX, trapY, trapWidth, trapHeight)) continue
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

  private applyTrapEffect(player: SimPlayer, trap: PlacedTrap, effect: TrapEffect) {
    const rect = trapWorldRect(trap, this.elapsed)
    const trapY = rect.y
    const cooldownUntil = player.trapCooldowns.get(trap.instanceId) ?? 0
    if (cooldownUntil > this.elapsed && effect !== 'ice' && effect !== 'slow') return

    switch (effect) {
      case 'kill':
        this.kill(player, trap.ownerId)
        return
      case 'ice':
        player.iceUntil = this.elapsed + 0.9
        if (player.input.left || player.input.right) {
          player.velocityX = (player.input.right ? 1 : -1) * PHYSICS.player.iceHorizontalSpeed
        }
        return
      case 'bounce':
        player.y = Math.min(player.y, trapY - PLAYER_HEIGHT)
        const springVelocity = PHYSICS.playerDerived.normalJumpStartVelocity * Math.sqrt(
          PHYSICS.componentMechanics.spring.jumpHeightMultiplier,
        )
        player.velocityY = trap.trapId === 'triggerspring'
          ? springVelocity * PHYSICS.componentMechanics.spring.triggerSpringVelocityMultiplier
          : springVelocity
        player.onGround = false
        player.trapCooldowns.set(trap.instanceId, this.elapsed + 0.55)
        return
      case 'slow':
        player.slowUntil = this.elapsed + 0.2
        if (player.surfaceMaterial !== 'mud') player.velocityX *= 0.35
        return
      case 'teleport':
        if (trap.trapId === 'portal') {
          const target = this.placedTraps.find((candidate) =>
            candidate.trapId === 'portal' && candidate.instanceId !== trap.instanceId,
          )
          if (target) {
            const targetRect = trapWorldRect(target, this.elapsed)
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
      const rects = trapCellRects(trap, this.elapsed)
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
        trapCellRects(object, this.elapsed).some((objectRect) => rects.some((rect) =>
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
    if (trap.trapId === 'triggerspikes') return age >= 0.55 && age < 3.55
    return false
  }

  private trapHazardRects(trap: PlacedTrap): TrapRect[] {
    if (trap.trapId === 'fortunecat') {
      return [fortuneCatHazardRect(trap, this.elapsed)]
    }
    if (trap.trapId === 'triggerhazard') {
      const started = this.trapActivationAt.get(trap.instanceId)
      if (started === undefined) return []
      const rect = cactusHazardRect(trap, this.elapsed, this.elapsed - started)
      return rect ? [rect] : []
    }
    return trapTriggerRects(trap, this.elapsed)
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

  private updateTrapStates() {
    for (const trap of this.placedTraps) {
      if (!['fortunecat', 'triggerhazard', 'triggerspikes'].includes(trap.trapId)) continue
      const started = this.trapActivationAt.get(trap.instanceId)
      if (started !== undefined) {
        const lifetime = trap.trapId === 'triggerspikes' ? 3.6 : trap.trapId === 'fortunecat' ? 1.8 : 2.1
        if (this.elapsed - started >= lifetime) this.trapActivationAt.delete(trap.instanceId)
        continue
      }
      const cells = trapCellRects(trap, this.elapsed)
      const cell = cells[0]
      if (!cell) continue
      const shouldActivate = Array.from(this.players.values()).some((player) => {
        if (!player.alive || player.finished) return false
        const body = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
        if (trap.trapId === 'fortunecat') {
          const trigger = trapActivationRect(trap, this.elapsed)
          return Boolean(trigger && overlaps(body.x, body.y, body.width, body.height, trigger.x, trigger.y, trigger.width, trigger.height))
        }
        if (trap.trapId === 'triggerhazard') {
          return circleOverlapsRect(
            cell.x + CELL_SIZE / 2,
            cell.y + CELL_SIZE / 2,
            CELL_SIZE / 2,
            body.x,
            body.y,
            body.width,
            body.height,
          )
        }
        // The APK triggers spring spikes from the matching collision face.
        switch (trap.rotation) {
          case 90:
            return body.x <= cell.x + CELL_SIZE + 2 && body.x >= cell.x + CELL_SIZE - 8 && body.y + body.height > cell.y && body.y < cell.y + trap.height * CELL_SIZE
          case 180:
            return body.y <= cell.y + CELL_SIZE + 2 && body.y >= cell.y + CELL_SIZE - 8 && body.x + body.width > cell.x && body.x < cell.x + trap.width * CELL_SIZE
          case 270:
            return body.x + body.width >= cell.x - 2 && body.x + body.width <= cell.x + 8 && body.y + body.height > cell.y && body.y < cell.y + trap.height * CELL_SIZE
          default:
            return body.y + body.height >= cell.y - 2 && body.y + body.height <= cell.y + 8 && body.x + body.width > cell.x && body.x < cell.x + trap.width * CELL_SIZE
        }
      })
      if (shouldActivate) this.trapActivationAt.set(trap.instanceId, this.elapsed)
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
      const rect = trapWorldRect(trap, this.elapsed)
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
      bot: player.bot,
    }
  }
}
