import assert from 'node:assert/strict'
import {
  GameSimulation,
  levelForMap,
  isLegalTrapPlacement,
  TRAP_DEFINITIONS,
} from './simulation'
import type { PlacedTrap } from '../../shared/gameProtocol'
import { PDZZ_LEAGUE_COMPONENT_IDS } from '../../shared/pdzzConfig'

const supportedIce: PlacedTrap = {
  instanceId: 'ice-1',
  trapId: 'ice',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}

assert.equal(isLegalTrapPlacement('ice', 2, 11, 0, []), true)
assert.equal(isLegalTrapPlacement('ice', 2, 10, 0, []), false)
assert.equal(isLegalTrapPlacement('mud', 2, 11, 0, []), true)
assert.equal(isLegalTrapPlacement('spike', 2, 11, 0, []), true)
assert.equal(isLegalTrapPlacement('linearsaw', 2, 11, 0, []), true)
assert.equal(isLegalTrapPlacement('linearsaw', 2, 7, 90, []), true)
assert.equal(isLegalTrapPlacement('hunterguard', 2, 11, 0, []), true)
assert.equal(isLegalTrapPlacement('hunterguard', 2, 10, 0, []), false)

assert.ok(TRAP_DEFINITIONS.length >= 95)
assert.ok(TRAP_DEFINITIONS.some((definition) => definition.id === 'cannon'))

// These are the authored League single-player haystack coordinates. They are
// deliberately asserted against the runtime level, not only the imported
// catalog, so a future renderer change cannot silently move the physics.
const haystack = levelForMap('levelhaystack2')
assert.deepEqual(
  {
    width: haystack.width,
    height: haystack.height,
    spawnX: haystack.spawnX,
    spawnY: haystack.spawnY,
    finishX: haystack.finishX,
    finishY: haystack.finishY,
    finishWidth: haystack.finishWidth,
    finishHeight: haystack.finishHeight,
  },
  {
    width: 2150,
    height: 1700,
    spawnX: 343,
    spawnY: 1240,
    finishX: 1821,
    finishY: 1300,
    finishWidth: 75,
    finishHeight: 100,
  },
)
assert.deepEqual(
  haystack.platforms.map(({ x, y, width, height }) => ({ x, y, width, height })),
  [
    { x: -100, y: 1300, width: 2300, height: 400 },
    { x: 750, y: 1100, width: 600, height: 200 },
    { x: 800, y: 1000, width: 500, height: 100 },
  ],
)
assert.equal(isLegalTrapPlacement('spike', 2, 25, 0, [], haystack), true)
assert.equal(isLegalTrapPlacement('ice', 2, 25, 0, [], haystack), true)
assert.equal(isLegalTrapPlacement('mud', 2, 25, 0, [], haystack), true)
assert.equal(isLegalTrapPlacement('spike', 2, 24, 0, [], haystack), false)
assert.equal(isLegalTrapPlacement('ice', 2, 24, 0, [], haystack), false)
assert.equal(isLegalTrapPlacement('mud', 2, 24, 0, [], haystack), false)
assert.equal(isLegalTrapPlacement('spike', 0, 25, 0, [], haystack), false)
assert.equal(isLegalTrapPlacement('spike', 2, 28, 0, [], haystack), false)
assert.equal(isLegalTrapPlacement('spike3x1', 2, 25, 0, [], haystack), true)
assert.equal(
  isLegalTrapPlacement(
    'spike3x1',
    2,
    25,
    0,
    [],
    { ...haystack, platforms: [{ id: 'partial-support', x: 100, y: 1300, width: 100, height: 400 }] },
  ),
  false,
)

const collisionDisabledSimulation = new GameSimulation(
  1,
  [
    { id: 'collision-off-a', slot: 1, label: 'A', score: 0 },
    { id: 'collision-off-b', slot: 2, label: 'B', score: 0 },
  ],
  [],
  'levelhaystack2',
  false,
)
const collisionOffA = collisionDisabledSimulation.players.get('collision-off-a')
const collisionOffB = collisionDisabledSimulation.players.get('collision-off-b')
assert.ok(collisionOffA)
assert.ok(collisionOffB)
collisionOffB.x = collisionOffA.x
collisionDisabledSimulation.tick(0.017)
assert.equal(collisionOffA.x, collisionOffB.x)

const collisionEnabledSimulation = new GameSimulation(
  1,
  [
    { id: 'collision-on-a', slot: 1, label: 'A', score: 0 },
    { id: 'collision-on-b', slot: 2, label: 'B', score: 0 },
  ],
  [],
  'levelhaystack2',
  true,
)
const collisionOnA = collisionEnabledSimulation.players.get('collision-on-a')
const collisionOnB = collisionEnabledSimulation.players.get('collision-on-b')
assert.ok(collisionOnA)
assert.ok(collisionOnB)
collisionOnB.x = collisionOnA.x
collisionEnabledSimulation.tick(0.017)
assert.notEqual(collisionOnA.x, collisionOnB.x)
assert.equal(Math.abs(collisionOnA.x - collisionOnB.x), 30)

// Wall cling is armed by the APK's airborne fallingTime, not by a separate
// wall-contact timer. The jump must therefore be unavailable through the
// first five 17ms slices and become available on the sixth slice.
const wallJumpSimulation = new GameSimulation(
  1,
  [{ id: 'wall-jump', slot: 1, label: 'Player 1', score: 0 }],
  [],
)
const wallJumpPlayer = wallJumpSimulation.players.get('wall-jump')
assert.ok(wallJumpPlayer)
wallJumpPlayer.x = -30
wallJumpPlayer.y = 560
wallJumpPlayer.velocityY = 200
wallJumpPlayer.onGround = false
wallJumpPlayer.onWall = true
// -1 means the contacted wall is on the right, so the jump impulse goes left.
wallJumpPlayer.wallDirection = -1
wallJumpSimulation.setInput('wall-jump', { left: false, right: false, jump: true }, undefined, true)
for (let index = 0; index < 5; index += 1) wallJumpSimulation.tick(0.017)
assert.equal(wallJumpPlayer.jumpConsumed, false)
assert.ok(wallJumpPlayer.velocityY > 0)
wallJumpSimulation.tick(0.017)
assert.equal(wallJumpPlayer.jumpConsumed, true)
assert.equal(wallJumpPlayer.velocityX, -838.8)
assert.equal(wallJumpPlayer.velocityY, -704.2175739719539)

// Holding the direction into the wall must not cancel the outward component.
// APK keeps the 250px/s input velocity separate from the wall-jump impulse.
const heldDirectionWallJumpSimulation = new GameSimulation(
  1,
  [{ id: 'held-wall-jump', slot: 1, label: 'Player 1', score: 0 }],
  [],
)
const heldDirectionWallJumpPlayer = heldDirectionWallJumpSimulation.players.get('held-wall-jump')
assert.ok(heldDirectionWallJumpPlayer)
heldDirectionWallJumpPlayer.x = -30
heldDirectionWallJumpPlayer.y = 560
heldDirectionWallJumpPlayer.velocityY = 200
heldDirectionWallJumpPlayer.onGround = false
heldDirectionWallJumpPlayer.onWall = true
heldDirectionWallJumpPlayer.wallDirection = -1
heldDirectionWallJumpSimulation.setInput('held-wall-jump', { left: false, right: true, jump: false }, 1)
for (let index = 0; index < 5; index += 1) heldDirectionWallJumpSimulation.tick(0.017)
heldDirectionWallJumpSimulation.setInput('held-wall-jump', { left: false, right: true, jump: true }, 2, true)
heldDirectionWallJumpSimulation.tick(0.017)
assert.equal(heldDirectionWallJumpPlayer.x, -40.8516)
assert.equal(heldDirectionWallJumpPlayer.velocityX, -634.8)
assert.equal(heldDirectionWallJumpPlayer.velocityY, -704.2175739719539)

const haystackSimulation = new GameSimulation(
  1,
  [{ id: 'haystack-player', slot: 1, label: '棒尼', score: 0 }],
  [],
  'levelhaystack2',
)
const haystackPlayer = haystackSimulation.players.get('haystack-player')
assert.ok(haystackPlayer)
assert.equal(haystackPlayer.x, 328)
assert.equal(haystackPlayer.y, 1240)

// The lower haystack collider is a solid wall beneath the raised platform.
// Walking right from the ground must stop at its left face instead of
// crossing through the visual wall.
const haystackWallSimulation = new GameSimulation(
  1,
  [{ id: 'haystack-wall', slot: 1, label: '棒尼', score: 0 }],
  [],
  'levelhaystack2',
)
const haystackWallPlayer = haystackWallSimulation.players.get('haystack-wall')
assert.ok(haystackWallPlayer)
haystackWallPlayer.x = 700
haystackWallPlayer.y = 1240
haystackWallPlayer.onGround = true
haystackWallSimulation.setInput('haystack-wall', { left: false, right: true, jump: false }, 1)
for (let index = 0; index < 30; index += 1) haystackWallSimulation.tick(0.017)
assert.ok(haystackWallPlayer.x <= 720)
assert.equal(haystackWallPlayer.onWall, true)

// If a frame ever starts inside the ground collider, recovery must place the
// collider on the grass top, never at the bottom of the map.
const haystackPenetrationSimulation = new GameSimulation(
  1,
  [{ id: 'haystack-penetration', slot: 1, label: '棒尼', score: 0 }],
  [],
  'levelhaystack2',
)
const haystackPenetrationPlayer = haystackPenetrationSimulation.players.get('haystack-penetration')
assert.ok(haystackPenetrationPlayer)
haystackPenetrationPlayer.y = 1250
haystackPenetrationPlayer.onGround = false
haystackPenetrationPlayer.velocityY = 50
haystackPenetrationSimulation.tick(0.017)
assert.equal(haystackPenetrationPlayer.y, 1240)
assert.equal(haystackPenetrationPlayer.onGround, true)
assert.equal(haystackPenetrationPlayer.alive, true)

// A jump tap is allowed in the first frame after the countdown. Spawn points
// are authored on the start platform, so the initial snapshot must already be
// grounded instead of reporting a transient fall state.
const openingJumpSimulation = new GameSimulation(
  1,
  [{ id: 'opening-jump', slot: 1, label: '棒尼', score: 0 }],
  [],
  'levelhaystack2',
)
const openingJumpPlayer = openingJumpSimulation.players.get('opening-jump')
assert.ok(openingJumpPlayer)
assert.equal(openingJumpPlayer.onGround, true)
openingJumpSimulation.setInput('opening-jump', { left: false, right: false, jump: true }, undefined, true)
openingJumpSimulation.tick(1 / 60)
assert.equal(openingJumpPlayer.jumpConsumed, true)
assert.ok(openingJumpPlayer.velocityY < 0)

// The APK linearsaw keeps its 5x1 base collider fixed while its separate
// saw entity travels 200px at 100px/s with a sineInOut ping-pong curve.
const linearSaw: PlacedTrap = {
  instanceId: 'linearsaw-1',
  trapId: 'linearsaw',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 5,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const linearSawMotionSimulation = new GameSimulation(
  1,
  [{ id: 'linearsaw-motion', slot: 1, label: 'Player 1', score: 0 }],
  [linearSaw],
)
const linearSawMotionPlayer = linearSawMotionSimulation.players.get('linearsaw-motion')
assert.ok(linearSawMotionPlayer)
linearSawMotionPlayer.x = 1000
linearSawMotionPlayer.y = 540
let linearSawSnapshot = linearSawMotionSimulation.snapshot('PLAYING').level.traps[0]
assert.equal(linearSawSnapshot.offsetX, 0)
assert.equal(linearSawSnapshot.movingOffsetX, -100)
assert.equal(linearSawSnapshot.movingOffsetY, -45)
for (let index = 0; index < 60; index += 1) linearSawMotionSimulation.tick(1 / 60)
linearSawSnapshot = linearSawMotionSimulation.snapshot('PLAYING').level.traps[0]
assert.ok(Math.abs((linearSawSnapshot.movingOffsetX ?? 0) - 0) < 0.001)
for (let index = 0; index < 60; index += 1) linearSawMotionSimulation.tick(1 / 60)
linearSawSnapshot = linearSawMotionSimulation.snapshot('PLAYING').level.traps[0]
assert.ok(Math.abs((linearSawSnapshot.movingOffsetX ?? 0) - 100) < 0.001)

// The APK resets the saw's local transform for each quarter turn. These
// values are deliberately checked independently from the motion curve because
// rotating the 5x1 base must not rotate the saw around the wrong pivot.
const linearSawDirectionExpectations = [
  { rotation: 0 as const, x: -100, y: -45, endX: 100, endY: -45, sawRotation: 0 },
  { rotation: 90 as const, x: 45, y: -100, endX: 45, endY: 100, sawRotation: 90 },
  { rotation: 180 as const, x: 100, y: 45, endX: -100, endY: 45, sawRotation: 180 },
  { rotation: 270 as const, x: -45, y: 100, endX: -45, endY: -100, sawRotation: -90 },
]
for (const expected of linearSawDirectionExpectations) {
  const directionSimulation = new GameSimulation(
    1,
    [{ id: `linearsaw-direction-${expected.rotation}`, slot: 1, label: 'Player 1', score: 0 }],
    [{ ...linearSaw, instanceId: `linearsaw-${expected.rotation}`, rotation: expected.rotation }],
  )
  const directionPlayer = directionSimulation.players.get(`linearsaw-direction-${expected.rotation}`)
  assert.ok(directionPlayer)
  directionPlayer.x = 1000
  let directionSnapshot = directionSimulation.snapshot('PLAYING').level.traps[0]
  assert.equal(directionSnapshot.movingOffsetX, expected.x)
  assert.equal(directionSnapshot.movingOffsetY, expected.y)
  assert.equal(directionSnapshot.movingRotation, expected.sawRotation)
  for (let index = 0; index < 120; index += 1) directionSimulation.tick(1 / 60)
  directionSnapshot = directionSimulation.snapshot('PLAYING').level.traps[0]
  assert.ok(Math.abs((directionSnapshot.movingOffsetX ?? 0) - expected.endX) < 0.1)
  assert.ok(Math.abs((directionSnapshot.movingOffsetY ?? 0) - expected.endY) < 0.1)
}

const linearSawHitSimulation = new GameSimulation(
  1,
  [{ id: 'linearsaw-hit', slot: 1, label: 'Player 1', score: 0 }],
  [linearSaw],
)
const linearSawHitPlayer = linearSawHitSimulation.players.get('linearsaw-hit')
assert.ok(linearSawHitPlayer)
// At t=0 the saw centre is the component centre plus (-100,-45).
linearSawHitPlayer.x = 110
linearSawHitPlayer.y = 500
linearSawHitPlayer.onGround = false
linearSawHitPlayer.velocityY = 0
linearSawHitSimulation.tick(1 / 60)
assert.equal(linearSawHitPlayer.alive, false)

// The hunter guard is a 1x1 moving hazard. It resolves the complete
// same-height platform run containing its placement, but never crosses a
// horizontal gap into another run.
const hunterGuard: PlacedTrap = {
  instanceId: 'hunterguard-gap-test',
  trapId: 'hunterguard',
  ownerId: 'p1',
  x: 20,
  y: 11,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const hunterGuardSimulation = new GameSimulation(
  1,
  [{ id: 'hunterguard-motion', slot: 1, label: 'Player 1', score: 0 }],
  [hunterGuard],
)
const hunterGuardPlayer = hunterGuardSimulation.players.get('hunterguard-motion')
assert.ok(hunterGuardPlayer)
let hunterGuardSnapshot = hunterGuardSimulation.snapshot('PLAYING').level.traps[0]
let hunterGuardWorldX = hunterGuardSnapshot.x * 50 + (hunterGuardSnapshot.offsetX ?? 0)
assert.ok(hunterGuardWorldX >= 1000)
assert.ok(hunterGuardWorldX <= 1400)
for (let index = 0; index < 600; index += 1) hunterGuardSimulation.tick(1 / 60)
hunterGuardSnapshot = hunterGuardSimulation.snapshot('PLAYING').level.traps[0]
hunterGuardWorldX = hunterGuardSnapshot.x * 50 + (hunterGuardSnapshot.offsetX ?? 0)
assert.ok(hunterGuardWorldX >= 1000)
assert.ok(hunterGuardWorldX <= 1400)

// A player intersecting the moving 1x1 guard is killed by the guard itself,
// while the guard remains non-solid and therefore is not a platform.
const hunterGuardHitSimulation = new GameSimulation(
  1,
  [{ id: 'hunterguard-hit', slot: 1, label: 'Player 1', score: 0 }],
  [{ ...hunterGuard, instanceId: 'hunterguard-hit-trap', x: 2 }],
)
const hunterGuardHitPlayer = hunterGuardHitSimulation.players.get('hunterguard-hit')
assert.ok(hunterGuardHitPlayer)
hunterGuardSnapshot = hunterGuardHitSimulation.snapshot('PLAYING').level.traps[0]
hunterGuardHitPlayer.x = hunterGuardSnapshot.x * 50 + (hunterGuardSnapshot.offsetX ?? 0)
hunterGuardHitPlayer.y = 540
hunterGuardHitPlayer.onGround = false
hunterGuardHitSimulation.tick(1 / 60)
assert.equal(hunterGuardHitPlayer.alive, false)

// Network packets can arrive after a newer input packet has already been
// applied. The authoritative controller must keep the newest sequence and
// expose it in snapshots so the client never reconciles against old input.
const inputSequenceSimulation = new GameSimulation(
  1,
  [{ id: 'input-sequence', slot: 1, label: 'Player 1', score: 0 }],
  [],
  'levelhaystack2',
)
inputSequenceSimulation.setInput('input-sequence', { left: false, right: true, jump: false }, 7)
inputSequenceSimulation.setInput('input-sequence', { left: true, right: false, jump: false }, 6)
assert.equal(inputSequenceSimulation.snapshot('PLAYING').players[0].lastProcessedInputSequence, 0)
inputSequenceSimulation.tick(1 / 60)
const inputSequenceSnapshot = inputSequenceSimulation.snapshot('PLAYING').players[0]
assert.equal(inputSequenceSnapshot.lastProcessedInputSequence, 7)
assert.ok(inputSequenceSnapshot.velocityX > 0)

// A held jump and its release are not new jump commands. Only the press edge
// from sequence 1 may launch the player; the player must remain grounded after
// that arc completes until another jumpPressed=true packet arrives.
const jumpEdgeSimulation = new GameSimulation(
  1,
  [{ id: 'jump-edge', slot: 1, label: 'Player 1', score: 0 }],
  [],
  'levelhaystack2',
)
const jumpEdgePlayer = jumpEdgeSimulation.players.get('jump-edge')
assert.ok(jumpEdgePlayer)
jumpEdgeSimulation.setInput('jump-edge', { left: false, right: false, jump: true }, 1, true)
jumpEdgeSimulation.tick(1 / 60)
assert.equal(jumpEdgePlayer.jumpConsumed, true)
for (let sequence = 2; sequence <= 30; sequence += 1) {
  jumpEdgeSimulation.setInput('jump-edge', { left: false, right: false, jump: true }, sequence, false)
  jumpEdgeSimulation.tick(1 / 60)
}
jumpEdgeSimulation.setInput('jump-edge', { left: false, right: false, jump: false }, 31, false)
for (let index = 0; index < 100; index += 1) jumpEdgeSimulation.tick(1 / 60)
assert.equal(jumpEdgePlayer.onGround, true)
assert.equal(jumpEdgePlayer.velocityY, 0)
for (let index = 0; index < 20; index += 1) jumpEdgeSimulation.tick(1 / 60)
assert.equal(jumpEdgePlayer.onGround, true)
assert.equal(jumpEdgePlayer.velocityY, 0)

haystackSimulation.tick(0.017)
assert.equal(haystackSimulation.snapshot('PLAYING').players[0].y, 1240)
// The goal is an AABB trigger around the authored flag point. Merely being
// near the finish platform must not complete the round.
haystackPlayer.x = 1740
haystackPlayer.y = 1200
haystackSimulation.tick(0.017)
assert.equal(haystackSimulation.snapshot('PLAYING').players[0].finished, false)
haystackPlayer.x = 1800
haystackPlayer.y = 1200
haystackSimulation.tick(0.017)
assert.equal(haystackSimulation.snapshot('PLAYING').players[0].finished, true)

// Finishing is also continuous: crossing the flag trigger in one movement
// step must count even when the final body is already beyond its far edge.
const sweptFinishSimulation = new GameSimulation(
  1,
  [{ id: 'swept-finish-player', slot: 1, label: 'Player 1', score: 0 }],
  [],
  'levelhaystack2',
)
const sweptFinishPlayer = sweptFinishSimulation.players.get('swept-finish-player')
assert.ok(sweptFinishPlayer)
sweptFinishPlayer.x = 1700
sweptFinishPlayer.y = 1240
sweptFinishPlayer.velocityX = 250
sweptFinishSimulation.setInput('swept-finish-player', { left: false, right: true, jump: false }, 1)
sweptFinishSimulation.tick(1)
assert.equal(sweptFinishPlayer.finished, true)

// League single-player runs include an AI opponent for presentation, but the
// human result must not wait for that opponent to reach the flag.
const singlePlayerLeagueSimulation = new GameSimulation(
  1,
  [
    { id: 'league-human', slot: 1, label: 'Player 1', score: 0 },
    { id: 'league-bot', slot: 2, label: '联赛对手', score: 0, bot: true },
  ],
  [],
  'levelhaystack2',
)
const leagueHuman = singlePlayerLeagueSimulation.players.get('league-human')
assert.ok(leagueHuman)
leagueHuman.x = 1800
leagueHuman.y = 1240
singlePlayerLeagueSimulation.tick(0.017)
assert.equal(singlePlayerLeagueSimulation.isComplete(), true)
const leagueResult = singlePlayerLeagueSimulation.result()
assert.equal(leagueResult.entries.find((entry) => entry.playerId === 'league-human')?.outcome, 'finished')
assert.equal(leagueResult.entries.find((entry) => entry.playerId === 'league-bot')?.outcome, 'timeout')

// Every round creates a fresh simulation, so a player starts at the same
// authored spawn point instead of carrying the previous round's finish pose.
const secondRoundSimulation = new GameSimulation(
  2,
  [{ id: 'second-round', slot: 1, label: '棒尼', score: 110 }],
  [],
  'levelhaystack2',
)
const secondRoundPlayer = secondRoundSimulation.players.get('second-round')
assert.ok(secondRoundPlayer)
assert.equal(secondRoundPlayer.x, haystack.spawnX - 15)
assert.equal(secondRoundPlayer.y, haystack.spawnY)
assert.equal(secondRoundPlayer.finished, false)

const outOfBoundsSimulation = new GameSimulation(
  1,
  [{ id: 'out-of-bounds', slot: 1, label: 'Player 1', score: 0 }],
  [],
  'levelhaystack2',
)
const outOfBoundsPlayer = outOfBoundsSimulation.players.get('out-of-bounds')
assert.ok(outOfBoundsPlayer)
outOfBoundsPlayer.y = outOfBoundsSimulation.level.height - 9
outOfBoundsSimulation.tick(0.017)
assert.equal(outOfBoundsSimulation.snapshot('PLAYING').players[0].alive, false)

const selfSpike: PlacedTrap = {
  instanceId: 'spike-1',
  trapId: 'spike',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const selfDamageSimulation = new GameSimulation(
  1,
  [{ id: 'p1', slot: 1, label: 'Player 1', score: 0 }],
  [selfSpike],
)
selfDamageSimulation.tick(1 / 30)
assert.equal(selfDamageSimulation.snapshot('PLAYING').players[0].alive, false)

// The full occupied spike cell blocks a fast horizontal step before the
// exposed 15px damage strip can be crossed.
const sweptSpikeSimulation = new GameSimulation(
  1,
  [{ id: 'swept-spike-player', slot: 1, label: 'Player 1', score: 0 }],
  [{ ...selfSpike, instanceId: 'swept-spike', x: 2, y: 11 }],
)
const sweptSpikePlayer = sweptSpikeSimulation.players.get('swept-spike-player')
assert.ok(sweptSpikePlayer)
sweptSpikePlayer.x = 20
sweptSpikePlayer.y = 540
sweptSpikePlayer.velocityX = 250
sweptSpikeSimulation.setInput('swept-spike-player', { left: false, right: true, jump: false }, 1)
sweptSpikeSimulation.tick(1)
assert.equal(sweptSpikePlayer.alive, true)
assert.ok(sweptSpikePlayer.x <= 170.1)

const cat: PlacedTrap = {
  instanceId: 'cat-1',
  trapId: 'fortunecat',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 1,
  height: 2,
  rotation: 0,
  placedRound: 1,
}
const catSimulation = new GameSimulation(
  1,
  [{ id: 'cat-player', slot: 1, label: 'Player 1', score: 0 }],
  [cat],
)
const catPlayer = catSimulation.players.get('cat-player')
assert.ok(catPlayer)
// Enter the cat trigger from the side, then stay on the floor below it. The
// source component kills already-overlapping players when the claw enables.
catPlayer.x = 60
catPlayer.y = 500
catSimulation.tick(1 / 60)
assert.equal(catSimulation.snapshot('PLAYING').players[0].alive, true)
for (let index = 0; index < 60; index += 1) catSimulation.tick(1 / 60)
assert.equal(catSimulation.snapshot('PLAYING').players[0].alive, false)

// Gas is an enter/exit state, not a per-frame stun. Staying inside the inner
// box keeps reversal active without extending a new timer on every tick.
const gas: PlacedTrap = {
  instanceId: 'gas-1',
  trapId: 'gas',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const gasSimulation = new GameSimulation(
  1,
  [{ id: 'gas-player', slot: 1, label: 'Player 1', score: 0 }],
  [gas],
)
const gasPlayer = gasSimulation.players.get('gas-player')
assert.ok(gasPlayer)
gasPlayer.x = 110
gasPlayer.y = 500
gasSimulation.tick(1 / 60)
assert.equal(gasPlayer.reverseUntil, Number.POSITIVE_INFINITY)
for (let index = 0; index < 30; index += 1) gasSimulation.tick(1 / 60)
assert.equal(gasPlayer.reverseUntil, Number.POSITIVE_INFINITY)
gasPlayer.x = 0
gasSimulation.tick(1 / 60)
assert.ok(gasPlayer.reverseUntil > gasSimulation.snapshot('PLAYING').phaseEndsAt! || gasPlayer.reverseUntil > 0)
for (let index = 0; index < 125; index += 1) gasSimulation.tick(1 / 60)
assert.equal(gasPlayer.reverseUntil, 0)

// Trigger-only league components still occupy a physical body. The player
// must stop at the gas cell instead of walking through its sprite.
const gasWallSimulation = new GameSimulation(
  1,
  [{ id: 'gas-wall-player', slot: 1, label: 'Player 1', score: 0 }],
  [{ ...gas, instanceId: 'gas-wall', x: 4, y: 8 }],
)
const gasWallPlayer = gasWallSimulation.players.get('gas-wall-player')
assert.ok(gasWallPlayer)
gasWallPlayer.x = 150
gasWallPlayer.y = 390
gasWallPlayer.onGround = false
gasWallSimulation.setInput('gas-wall-player', { left: false, right: true, jump: false })
for (let index = 0; index < 60; index += 1) gasWallSimulation.tick(1 / 60)
assert.ok(gasWallPlayer.x <= 170.1)

// Every league option gets the same occupied-cell body. It must also hold for
// the two ground-spike options: the exposed spike strip is a damage trigger,
// while the occupied cell is still a solid obstacle for the character.
for (const trapId of PDZZ_LEAGUE_COMPONENT_IDS) {
  const definition = TRAP_DEFINITIONS.find((item) => item.id === trapId)
  assert.ok(definition)
  const bodySimulation = new GameSimulation(
    1,
    [{ id: `body-${trapId}`, slot: 1, label: 'Player 1', score: 0 }],
    [{
      instanceId: `body-${trapId}`,
      trapId,
      ownerId: 'p1',
      x: 4,
      y: 10,
      width: definition.width,
      height: definition.height,
      rotation: 0,
      placedRound: 1,
    }],
  )
  const bodyPlayer = bodySimulation.players.get(`body-${trapId}`)
  assert.ok(bodyPlayer)
  bodyPlayer.x = 150
  bodyPlayer.y = 540
  bodyPlayer.onGround = true
   bodySimulation.setInput(`body-${trapId}`, { left: false, right: true, jump: false })
   for (let index = 0; index < 30 && bodyPlayer.alive; index += 1) bodySimulation.tick(1 / 60)
   if (trapId === 'hunterguard') {
     assert.equal(bodyPlayer.alive, false, 'hunterguard should kill on contact')
   } else {
     assert.ok(bodyPlayer.x <= 170.1, `${trapId} allowed the player inside its body`)
   }
 }

const groundSpikeCollisionSimulation = new GameSimulation(
  1,
  [{ id: 'ground-spike-wall-player', slot: 1, label: 'Player 1', score: 0 }],
  [{
    instanceId: 'ground-spike-wall',
    trapId: 'spike',
    ownerId: 'p1',
    x: 4,
    y: 11,
    width: 1,
    height: 1,
    rotation: 0,
    placedRound: 1,
  }],
)
const groundSpikeWallPlayer = groundSpikeCollisionSimulation.players.get('ground-spike-wall-player')
assert.ok(groundSpikeWallPlayer)
groundSpikeWallPlayer.x = 150
groundSpikeWallPlayer.y = 540
groundSpikeWallPlayer.onGround = true
groundSpikeCollisionSimulation.setInput('ground-spike-wall-player', { left: false, right: true, jump: false })
for (let index = 0; index < 60 && groundSpikeWallPlayer.alive; index += 1) {
  groundSpikeCollisionSimulation.tick(1 / 60)
}
assert.ok(groundSpikeWallPlayer.alive)
assert.ok(groundSpikeWallPlayer.x <= 170.1, 'ground spike allowed the player inside its blocking body')

// Jf is three native spike colliders. Touching the third cell is enough to
// die, even though the bundle itself is represented by one placed option.
const spikeBundle: PlacedTrap = {
  instanceId: 'spike3-1',
  trapId: 'spike3x1',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 3,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const spikeBundleSimulation = new GameSimulation(
  1,
  [{ id: 'spike3-player', slot: 1, label: 'Player 1', score: 0 }],
  [spikeBundle],
)
const spikeBundlePlayer = spikeBundleSimulation.players.get('spike3-player')
assert.ok(spikeBundlePlayer)
spikeBundlePlayer.x = 210
spikeBundlePlayer.y = 540
spikeBundleSimulation.tick(1 / 60)
assert.equal(spikeBundlePlayer.alive, false)

// The fourth component uses the APK's circular 17.5px hazard, so a player
// beside the ball survives while a player whose collider reaches the circle
// dies.
const spikeBall: PlacedTrap = {
  instanceId: 'spikeball-1',
  trapId: 'spikeball',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const spikeBallSimulation = new GameSimulation(
  1,
  [{ id: 'spikeball-player', slot: 1, label: 'Player 1', score: 0 }],
  [spikeBall],
)
const spikeBallPlayer = spikeBallSimulation.players.get('spikeball-player')
assert.ok(spikeBallPlayer)
spikeBallPlayer.x = 150
spikeBallPlayer.y = 540
spikeBallSimulation.tick(1 / 60)
assert.equal(spikeBallPlayer.alive, true)
spikeBallPlayer.x = 110
spikeBallSimulation.tick(1 / 60)
assert.equal(spikeBallPlayer.alive, false)

// The regular spring uses the 1.5x jump-height impulse from vv when landed
// from above, instead of merely behaving as a normal solid platform.
const spring: PlacedTrap = {
  instanceId: 'spring-1',
  trapId: 'spring',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 2,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const springSimulation = new GameSimulation(
  1,
  [{ id: 'spring-player', slot: 1, label: 'Player 1', score: 0 }],
  [spring],
)
const springPlayer = springSimulation.players.get('spring-player')
assert.ok(springPlayer)
springPlayer.x = 110
springPlayer.y = 440
springPlayer.onGround = false
springPlayer.velocityY = 0
springSimulation.tick(1 / 60)
assert.equal(springPlayer.onGround, false)
assert.ok(springPlayer.velocityY < -1000)

// vv maps 90 degrees to the right-facing spring and 270 degrees to the
// left-facing spring. A right-facing spring is entered from its left face;
// a left-facing spring is entered from its right face. Only the matching
// side contact may create the impulse, and the impulse must survive the wall
// penetration pass on the same tick.
const rightSpring: PlacedTrap = {
  instanceId: 'spring-right-1',
  trapId: 'spring',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 1,
  height: 2,
  rotation: 90,
  placedRound: 1,
}
const rightSpringSimulation = new GameSimulation(
  1,
  [{ id: 'spring-right-player', slot: 1, label: 'Player 1', score: 0 }],
  [rightSpring],
)
const rightSpringPlayer = rightSpringSimulation.players.get('spring-right-player')
assert.ok(rightSpringPlayer)
rightSpringPlayer.x = 70
rightSpringPlayer.y = 500
rightSpringPlayer.onGround = false
rightSpringPlayer.velocityX = 300
rightSpringSimulation.setInput('spring-right-player', { left: false, right: true, jump: false })
rightSpringSimulation.tick(1 / 60)
assert.ok(rightSpringPlayer.velocityX > 800)

// A vertical spring may share its lower edge with the ground. The APK still
// uses the side collision normal in that frame; a grounded result from the
// floor must not mask the spring face contact.
const groundedSideSpringSimulation = new GameSimulation(
  1,
  [{ id: 'grounded-side-spring-player', slot: 1, label: 'Player 1', score: 0 }],
  [rightSpring],
)
const groundedSideSpringPlayer = groundedSideSpringSimulation.players.get('grounded-side-spring-player')
assert.ok(groundedSideSpringPlayer)
groundedSideSpringPlayer.x = 70
groundedSideSpringPlayer.y = 540
groundedSideSpringPlayer.onGround = true
groundedSideSpringSimulation.setInput('grounded-side-spring-player', { left: false, right: true, jump: false })
groundedSideSpringSimulation.tick(1 / 60)
assert.ok(groundedSideSpringPlayer.velocityX > 800)
assert.equal(groundedSideSpringPlayer.onGround, false)

const leftSpring: PlacedTrap = {
  instanceId: 'spring-left-1',
  trapId: 'spring',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 1,
  height: 2,
  rotation: 270,
  placedRound: 1,
}
const leftSpringSimulation = new GameSimulation(
  1,
  [{ id: 'spring-left-player', slot: 1, label: 'Player 1', score: 0 }],
  [leftSpring],
)
const leftSpringPlayer = leftSpringSimulation.players.get('spring-left-player')
assert.ok(leftSpringPlayer)
leftSpringPlayer.x = 150
leftSpringPlayer.y = 500
leftSpringPlayer.onGround = false
leftSpringPlayer.velocityX = -300
leftSpringSimulation.setInput('spring-left-player', { left: true, right: false, jump: false })
leftSpringSimulation.tick(1 / 60)
assert.ok(leftSpringPlayer.velocityX < -800)

const downSpring: PlacedTrap = {
  instanceId: 'spring-down-1',
  trapId: 'spring',
  ownerId: 'p1',
  x: 2,
  y: 4,
  width: 2,
  height: 1,
  rotation: 180,
  placedRound: 1,
}
const downSpringSimulation = new GameSimulation(
  1,
  [{ id: 'spring-down-player', slot: 1, label: 'Player 1', score: 0 }],
  [downSpring],
)
const downSpringPlayer = downSpringSimulation.players.get('spring-down-player')
assert.ok(downSpringPlayer)
downSpringPlayer.x = 110
downSpringPlayer.y = 250
downSpringPlayer.onGround = false
downSpringPlayer.velocityY = -300
downSpringSimulation.tick(1 / 60)
assert.ok(downSpringPlayer.velocityY > 400)

// A down-facing spring is still a solid platform, but its upward collision
// normal is not the spring face. Landing on it must not bounce.
const downSpringTopSimulation = new GameSimulation(
  1,
  [{ id: 'spring-down-top-player', slot: 1, label: 'Player 1', score: 0 }],
  [downSpring],
)
const downSpringTopPlayer = downSpringTopSimulation.players.get('spring-down-top-player')
assert.ok(downSpringTopPlayer)
downSpringTopPlayer.x = 110
downSpringTopPlayer.y = 140
downSpringTopPlayer.onGround = false
downSpringTopPlayer.velocityY = 300
downSpringTopSimulation.tick(1 / 60)
assert.equal(downSpringTopPlayer.onGround, true)
assert.equal(downSpringTopPlayer.velocityY, 0)

// The up-facing spring must not trigger when the player hits its underside.
const upSpringBottomSimulation = new GameSimulation(
  1,
  [{ id: 'spring-up-bottom-player', slot: 1, label: 'Player 1', score: 0 }],
  [{ ...spring, instanceId: 'spring-up-bottom', y: 8 }],
)
const upSpringBottomPlayer = upSpringBottomSimulation.players.get('spring-up-bottom-player')
assert.ok(upSpringBottomPlayer)
upSpringBottomPlayer.x = 110
upSpringBottomPlayer.y = 450
upSpringBottomPlayer.onGround = false
upSpringBottomPlayer.velocityY = -300
upSpringBottomSimulation.tick(1 / 60)
assert.equal(upSpringBottomPlayer.onGround, false)
assert.ok(upSpringBottomPlayer.velocityY > -400)

const cactus: PlacedTrap = {
  instanceId: 'cactus-1',
  trapId: 'triggerhazard',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const cactusSimulation = new GameSimulation(
  1,
  [{ id: 'cactus-player', slot: 1, label: 'Player 1', score: 0 }],
  [cactus],
)
const cactusPlayer = cactusSimulation.players.get('cactus-player')
assert.ok(cactusPlayer)
cactusPlayer.x = 110
cactusPlayer.y = 500
cactusSimulation.tick(1 / 60)
assert.equal(cactusSimulation.snapshot('PLAYING').players[0].alive, true)
for (let index = 0; index < 20; index += 1) cactusSimulation.tick(1 / 60)
assert.equal(cactusSimulation.snapshot('PLAYING').players[0].alive, true)
for (let index = 0; index < 40; index += 1) cactusSimulation.tick(1 / 60)
assert.equal(cactusSimulation.snapshot('PLAYING').players[0].alive, false)

// Iv has a disabled trigger during its 0.55s warning animation. The hazard
// only appears on the outward face after the spring-spikes have extended.
const springSpikes: PlacedTrap = {
  instanceId: 'spring-spikes-1',
  trapId: 'triggerspikes',
  ownerId: 'p1',
  x: 2,
  y: 10,
  width: 4,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const springSpikesSimulation = new GameSimulation(
  1,
  [{ id: 'spring-spikes-player', slot: 1, label: 'Player 1', score: 0 }],
  [springSpikes],
)
const springSpikesPlayer = springSpikesSimulation.players.get('spring-spikes-player')
assert.ok(springSpikesPlayer)
springSpikesPlayer.x = 110
springSpikesPlayer.y = 440
springSpikesPlayer.onGround = false
springSpikesSimulation.tick(1 / 60)
assert.equal(springSpikesSimulation.snapshot('PLAYING').level.traps[0].phase, 'warning')
assert.equal(springSpikesPlayer.alive, true)
for (let index = 0; index < 35; index += 1) springSpikesSimulation.tick(1 / 60)
assert.equal(springSpikesPlayer.alive, false)

const supportedMud: PlacedTrap = {
  instanceId: 'mud-1',
  trapId: 'mud',
  ownerId: 'p1',
  x: 2,
  y: 11,
  width: 1,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const mudSimulation = new GameSimulation(
  1,
  [{ id: 'mud-player', slot: 1, label: 'Player 1', score: 0 }],
  [supportedMud],
)
const mudPlayer = mudSimulation.players.get('mud-player')
assert.ok(mudPlayer)
mudSimulation.setInput('mud-player', { left: false, right: true, jump: false })
for (let index = 0; index < 10; index += 1) mudSimulation.tick(1 / 60)
assert.ok(mudPlayer.surfaceMaterial === 'mud' || mudPlayer.velocityX <= 100)

const selfIceSimulation = new GameSimulation(
  1,
  [{ id: 'p1', slot: 1, label: 'Player 1', score: 0 }],
  [supportedIce],
)
selfIceSimulation.setInput('p1', { left: false, right: true, jump: false })
for (let index = 0; index < 10; index += 1) selfIceSimulation.tick(1 / 60)
assert.ok(selfIceSimulation.snapshot('PLAYING').players[0].velocityX > 300)

const movingLift: PlacedTrap = {
  instanceId: 'lift-1',
  trapId: 'doublelift',
  ownerId: 'p1',
  x: 1,
  y: 1,
  width: 5,
  height: 1,
  rotation: 0,
  placedRound: 1,
}
const movingSimulation = new GameSimulation(
  1,
  [{ id: 'p1', slot: 1, label: 'Player 1', score: 0 }],
  [movingLift],
)
const liftAtStart = movingSimulation.snapshot('PLAYING').level.traps[0]
movingSimulation.tick(0.9)
const liftInMotion = movingSimulation.snapshot('PLAYING').level.traps[0]
assert.notEqual(liftAtStart.offsetY, liftInMotion.offsetY)

console.log('simulation tests passed')
