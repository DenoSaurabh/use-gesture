import {
  registerEngine,
  DragEngine,
  PinchEngine,
  ScrollEngine,
  WheelEngine,
  MoveEngine,
  HoverEngine,
  parseMergedHandlers,
  GestureHandlers,
  UserGestureConfig,
  dragConfigResolver,
  hoverConfigResolver,
  moveConfigResolver,
  pinchConfigResolver,
  scrollConfigResolver,
  wheelConfigResolver
} from '@use-gesture/core'
import { Recognizer } from './Recognizer'

interface GestureConstructor {
  new (target: HTMLElement, _handlers: GestureHandlers, _config: UserGestureConfig): Gesture
}

export interface Gesture extends Recognizer {}

export const Gesture: GestureConstructor = function (
  target: HTMLElement,
  _handlers: GestureHandlers,
  _config: UserGestureConfig | {} = {}
) {
  registerEngine('drag', DragEngine, dragConfigResolver)
  registerEngine('pinch', PinchEngine, pinchConfigResolver)
  registerEngine('scroll', ScrollEngine, scrollConfigResolver)
  registerEngine('wheel', WheelEngine, wheelConfigResolver)
  registerEngine('move', MoveEngine, moveConfigResolver)
  registerEngine('hover', HoverEngine, hoverConfigResolver)

  const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
  return new Recognizer(target, handlers, config, undefined, nativeHandlers)
} as any
