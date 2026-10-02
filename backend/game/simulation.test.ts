import assert from 'node:assert/strict'
import {
  GameSimulation,
  levelForMap,
  isLegalTrapPlacement,
  TRAP_DEFINITIONS,
} from './simulation'
import type { PlacedTrap } from '../../shared/gameProtocol'

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
assert.equal(isLegalTrapPlacement('spike', 2, 24, 0, [], haystack), false)
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
haystackPlayer.x = 1800
haystackPlayer.y = 1200
haystackSimulation.tick(0.017)
assert.equal(haystackSimulation.snapshot('PLAYING').players[0].finished, true)

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

const selfIceSimulation = new GameSimulation(
  1,
  [{ id: 'p1', slot: 1, label: 'Player 1', score: 0 }],
  [supportedIce],
)
selfIceSimulation.setInput('p1', { left: false, right: true, jump: false })
selfIceSimulation.tick(1 / 30)
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
