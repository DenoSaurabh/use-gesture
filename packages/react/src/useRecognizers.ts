/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  Controller,
  GenericOptions,
  GestureKey,
  InternalHandlers,
  NativeHandlers,
  ReactDOMAttributes
} from '@use-gesture/core'

type HookReturnType<Config extends GenericOptions> = Config['target'] extends object
  ? void
  : (...args: any[]) => ReactDOMAttributes

/**
 * Utility hook called by all gesture hooks and that will be responsible for
 * the internals.
 *
 * @param {InternalHandlers} handlers
 * @param {GenericOptions} config
 * @param {GestureKey} gestureKey
 * @param {NativeHandler} nativeHandlers
 * @returns nothing when config.target is set, a binding function when not.
 */
export function useRecognizers<Config extends GenericOptions>(
  handlers: InternalHandlers,
  config: Config | {} = {},
  gestureKey?: GestureKey,
  nativeHandlers?: NativeHandlers
): HookReturnType<Config> {
  const ctrl = React.useMemo(() => new Controller(handlers), [])
  ctrl.applyHandlers(handlers, nativeHandlers)
  ctrl.applyConfig(config, gestureKey)

  React.useEffect(ctrl.effect.bind(ctrl))

  React.useEffect(() => {
    return ctrl.clean.bind(ctrl)
  }, [])

  // When target is undefined we return the bind function of the controller which
  // returns prop handlers.
  // @ts-ignore
  if (config.target === undefined) {
    return ctrl.bind.bind(ctrl) as any
  }
  return undefined as any
}
