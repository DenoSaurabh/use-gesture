import { PinchEngine, convertAngle } from './PinchEngineCore'

PinchEngine.prototype.gestureStart = function (event) {
  if (event.cancelable) event.preventDefault()
  const state = this.state

  if (state._active) return

  this.start(event)
  state.values = [event.scale, event.rotation]
  state.origin = [event.clientX, event.clientY]
  this.compute(event)

  this.emit()
} as PinchEngine['gestureStart']

PinchEngine.prototype.gestureMove = function (event) {
  if (event.cancelable) event.preventDefault()

  if (!this.state._active) return

  const state = this.state
  state.values = [event.scale, event.rotation]
  state.origin = [event.clientX, event.clientY]
  state._movement = [event.scale - 1, convertAngle(this, event.rotation)]

  this.compute(event)
  this.emit()
} as PinchEngine['gestureMove']

PinchEngine.prototype.gestureEnd = function (event) {
  if (!this.state._active) return

  this.state._active = false

  this.compute(event)
  this.emit()
} as PinchEngine['gestureEnd']
