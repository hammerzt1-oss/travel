import assert from 'node:assert/strict'
import { RoomManager, type RoomEvent } from './roomManager'

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
