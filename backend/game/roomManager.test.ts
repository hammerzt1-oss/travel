import assert from 'node:assert/strict'
import { RoomManager, type RoomEvent } from './roomManager'
import { PDZZ_LEAGUE_COMPONENT_IDS } from '../../shared/pdzzConfig'

const events: RoomEvent[] = []
const manager = new RoomManager((event) => events.push(event))

function lastRoomState(roomId: string) {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index]
    if (event.type === 'room_state' && event.roomId === roomId) return event
  }
  return undefined
}

function lastError(socketId: string) {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index]
    if (event.type === 'error' && event.socketId === socketId) return event
  }
  return undefined
}

const host = manager.handle('socket-host', { type: 'create_room' })
assert.ok(host)
assert.match(host.roomId, /^\d{4}$/)

const createdState = lastRoomState(host.roomId)
assert.ok(createdState)
assert.equal(createdState.state.players[0]?.ready, true)
assert.equal(createdState.state.playerCollisionEnabled, false)

manager.handle('socket-host', { type: 'set_player_collision', enabled: true })
const collisionEnabledState = lastRoomState(host.roomId)
assert.ok(collisionEnabledState)
assert.equal(collisionEnabledState.state.playerCollisionEnabled, true)

manager.handle('socket-host', { type: 'set_name', name: '房主昵称' })
const renamedState = lastRoomState(host.roomId)
assert.ok(renamedState)
assert.equal(renamedState.state.players[0]?.label, '房主昵称')

manager.handle('socket-host', { type: 'ready' })
const readyState = lastRoomState(host.roomId)
assert.ok(readyState)
assert.equal(readyState.state.status, 'READY')

const secondPlayer = manager.handle('socket-second', { type: 'random_join' })
assert.ok(secondPlayer)
assert.equal(secondPlayer.roomId, host.roomId)

const joinedState = lastRoomState(host.roomId)
assert.ok(joinedState)
assert.equal(joinedState.state.status, 'WAITING')
assert.equal(joinedState.state.players.length, 2)

manager.handle('socket-second', { type: 'set_player_collision', enabled: false })
const nonHostCollisionError = lastError('socket-second')
assert.ok(nonHostCollisionError)
assert.equal(nonHostCollisionError.code, 'NOT_HOST')
const stillCollisionEnabledState = lastRoomState(host.roomId)
assert.ok(stillCollisionEnabledState)
assert.equal(stillCollisionEnabledState.state.playerCollisionEnabled, true)

manager.handle('socket-host', { type: 'set_player_collision', enabled: false })
const collisionDisabledState = lastRoomState(host.roomId)
assert.ok(collisionDisabledState)
assert.equal(collisionDisabledState.state.playerCollisionEnabled, false)

const thirdPlayer = manager.handle('socket-third', { type: 'random_join' })
const fourthPlayer = manager.handle('socket-fourth', { type: 'random_join' })
assert.equal(thirdPlayer?.roomId, host.roomId)
assert.equal(fourthPlayer?.roomId, host.roomId)

const rejectedPlayer = manager.handle('socket-fifth', { type: 'random_join' })
assert.equal(rejectedPlayer, null)
const noOpenRoomError = lastError('socket-fifth')
assert.ok(noOpenRoomError)
assert.equal(noOpenRoomError.code, 'NO_OPEN_ROOMS')

const invalidRoom = manager.handle('socket-invalid', {
  type: 'join_room',
  roomId: '12345',
})
assert.equal(invalidRoom, null)

console.log('room manager tests passed')

const placementEvents: RoomEvent[] = []
const placementManager = new RoomManager((event) => placementEvents.push(event))
const placementHost = placementManager.handle('placement-host', { type: 'create_room' })
if (!placementHost) throw new Error('placement room was not created')
const placementHostSession = placementHost
const placementGuest = placementManager.handle('placement-guest', { type: 'join_room', roomId: placementHostSession.roomId })
if (!placementGuest) throw new Error('placement guest did not join')
placementManager.handle('placement-guest', { type: 'ready' })
placementManager.handle('placement-host', { type: 'start_game' })

function placementRoomState() {
  for (let index = placementEvents.length - 1; index >= 0; index -= 1) {
    const event = placementEvents[index]
    if (event.type === 'room_state' && event.roomId === placementHostSession.roomId) return event.state
  }
  return undefined
}

let placementState = placementRoomState()
assert.equal(placementState?.status, 'BUILDING')
assert.equal(placementState?.buildState?.options.length, 6)
assert.equal(new Set(placementState?.buildState?.options.map((option) => option.id)).size, 6)
assert.ok(placementState?.buildState?.options.every((option) => PDZZ_LEAGUE_COMPONENT_IDS.includes(option.id as typeof PDZZ_LEAGUE_COMPONENT_IDS[number])))
const firstOption = placementState?.buildState?.options[0]
assert.ok(firstOption)
placementManager.handle('placement-host', { type: 'select_trap', trapId: firstOption.id })
placementState = placementRoomState()
const firstPending = placementState?.buildState?.pendingPlacements.find((item) => item.playerId === placementHostSession.playerId)
assert.ok(firstPending)
placementManager.handle('placement-host', {
  type: 'place_trap',
  x: firstPending.x,
  y: firstPending.y,
  rotation: firstPending.rotation,
})
placementManager.handle('placement-host', { type: 'confirm_build' })

placementState = placementRoomState()
const secondOption = placementState?.buildState?.options.find((option) => !option.claimedBy)
assert.ok(secondOption)
placementManager.handle('placement-guest', { type: 'select_trap', trapId: secondOption.id })
placementState = placementRoomState()
const secondPending = placementState?.buildState?.pendingPlacements.find((item) => item.playerId === placementGuest.playerId)
assert.ok(secondPending)
placementManager.handle('placement-guest', {
  type: 'place_trap',
  x: secondPending.x,
  y: secondPending.y,
  rotation: secondPending.rotation,
})
placementManager.handle('placement-guest', { type: 'confirm_build' })
placementState = placementRoomState()
assert.equal(placementState?.status, 'COUNTDOWN')

console.log('all-player placement starts countdown')
