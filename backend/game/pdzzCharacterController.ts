import type { Platform } from '../../shared/gameProtocol'

export type CharacterControllerInput = {
  x: number
  y: number
  width: number
  height: number
  deltaX: number
  deltaY: number
  wasGrounded: boolean
  ignoreOneWay: boolean
  platforms: Platform[]
  skinWidth?: number
  horizontalRays?: number
  verticalRays?: number
  jumpingThreshold?: number
}

export type CharacterControllerResult = {
  x: number
  y: number
  deltaX: number
  deltaY: number
  grounded: boolean
  hitCeiling: boolean
  hitLeft: boolean
  hitRight: boolean
  wallDirection: -1 | 1
  surface: Platform | null
}

type RayHit = {
  distance: number
  platform: Platform
  pointX: number
  pointY: number
}

const EPSILON = 0.001

function raycastVertical(
  originX: number,
  originY: number,
  direction: 1 | -1,
  distance: number,
  platform: Platform,
  ignoreOneWay: boolean,
) {
  if (distance <= EPSILON) return null
  if (platform.oneWay && (ignoreOneWay || direction < 0)) return null

  const withinX = originX >= platform.x - EPSILON && originX <= platform.x + platform.width + EPSILON
  if (!withinX) return null

  const targetY = originY + direction * distance
  if (direction > 0) {
    if (originY > platform.y + EPSILON || targetY < platform.y - EPSILON) return null
    return {
      distance: platform.y - originY,
      platform,
      pointX: originX,
      pointY: platform.y,
    } satisfies RayHit
  }

  const bottom = platform.y + platform.height
  if (originY < bottom - EPSILON || targetY > bottom + EPSILON) return null
  return {
    distance: originY - bottom,
    platform,
    pointX: originX,
    pointY: bottom,
  } satisfies RayHit
}

function raycastHorizontal(
  originX: number,
  originY: number,
  direction: 1 | -1,
  distance: number,
  platform: Platform,
) {
  if (distance <= EPSILON || platform.oneWay) return null
  const withinY = originY >= platform.y - EPSILON && originY <= platform.y + platform.height + EPSILON
  if (!withinY) return null

  const targetX = originX + direction * distance
  if (direction > 0) {
    if (originX > platform.x + EPSILON || targetX < platform.x - EPSILON) return null
    return {
      distance: platform.x - originX,
      platform,
      pointX: platform.x,
      pointY: originY,
    } satisfies RayHit
  }

  const right = platform.x + platform.width
  if (originX < right - EPSILON || targetX > right + EPSILON) return null
  return {
    distance: originX - right,
    platform,
    pointX: right,
    pointY: originY,
  } satisfies RayHit
}

function nearestHit(hits: Array<RayHit | null>) {
  return hits
    .filter((hit): hit is RayHit => hit !== null && hit.distance >= -EPSILON)
    .sort((a, b) => a.distance - b.distance)[0] ?? null
}

/**
 * Port of the APK CharacterController's axis-aligned ray movement.
 * The source uses linecast against a spatial hash; this pure implementation
 * keeps the same ray counts, skin correction, and one-way filtering while the
 * server supplies the already broad-phased platform list.
 */
export function moveCharacter(input: CharacterControllerInput): CharacterControllerResult {
  const skin = input.skinWidth ?? 0.02
  const horizontalRays = Math.max(2, input.horizontalRays ?? 5)
  const verticalRays = Math.max(2, input.verticalRays ?? 3)
  const rayOriginSkinMultiplier = 4
  const raySkin = skin * rayOriginSkinMultiplier
  const width = input.width
  const height = input.height
  let deltaX = input.deltaX
  let deltaY = input.deltaY
  let hitLeft = false
  let hitRight = false
  let hitCeiling = false
  let grounded = false
  let surface: Platform | null = null

  if (deltaX !== 0) {
    const direction = deltaX > 0 ? 1 : -1
    const distance = Math.abs(deltaX) + raySkin
    const edgeX = direction > 0 ? input.x + width - skin : input.x + skin
    const spacing = (height - 2 * skin) / (horizontalRays - 1)
    const hits: Array<RayHit | null> = []
    for (let index = 0; index < horizontalRays; index += 1) {
      const originY = input.y + height - skin - index * spacing
      hits.push(nearestHit(input.platforms.map((platform) =>
        raycastHorizontal(edgeX, originY, direction, distance, platform))))
    }
    const hit = nearestHit(hits)
    if (hit) {
      deltaX = hit.pointX - edgeX
      deltaX += direction > 0 ? -raySkin : raySkin
      if (direction > 0) hitRight = true
      else hitLeft = true
    }
  }

  // The source controller keeps side rays active independently of horizontal
  // velocity. Probe both sides after the horizontal sweep so a player that is
  // already flush with a wall remains in wall-cling when input is released or
  // points away from the wall.
  const probeDistance = Math.max(1, raySkin + skin)
  const wallProbeX = input.x + deltaX
  for (const direction of [-1, 1] as const) {
    const edgeX = direction > 0 ? wallProbeX + width - skin : wallProbeX + skin
    const spacing = (height - 2 * skin) / (horizontalRays - 1)
    const hits: Array<RayHit | null> = []
    for (let index = 0; index < horizontalRays; index += 1) {
      const originY = input.y + height - skin - index * spacing
      hits.push(nearestHit(input.platforms.map((platform) =>
        raycastHorizontal(edgeX, originY, direction, probeDistance, platform))))
    }
    if (nearestHit(hits)) {
      if (direction > 0) hitRight = true
      else hitLeft = true
    }
  }

  if (deltaY !== 0) {
    const direction = deltaY > 0 ? 1 : -1
    const distance = Math.abs(deltaY) + raySkin
    const startX = input.x + deltaX + skin
    const edgeY = direction > 0 ? input.y + height - skin : input.y + skin
    const spacing = (width - 2 * skin) / (verticalRays - 1)
    const hits: Array<RayHit | null> = []
    for (let index = 0; index < verticalRays; index += 1) {
      const originX = startX + index * spacing
      hits.push(nearestHit(input.platforms.map((platform) =>
        raycastVertical(originX, edgeY, direction, distance, platform, input.ignoreOneWay))))
    }
    const hit = nearestHit(hits)
    if (hit) {
      deltaY = hit.pointY - edgeY
      deltaY += direction > 0 ? -raySkin : raySkin
      if (direction > 0) {
        grounded = true
        surface = hit.platform
      } else {
        hitCeiling = true
      }
    }
  }

  return {
    x: input.x + deltaX,
    y: input.y + deltaY,
    deltaX,
    deltaY,
    grounded,
    hitCeiling,
    hitLeft,
    hitRight,
    // Wall-jump input points away from the contacted wall.
    wallDirection: hitLeft ? 1 : -1,
    surface,
  }
}
