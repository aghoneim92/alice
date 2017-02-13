import { curry } from 'ramda'

export const applyTo = (arg: any) => (fn: Function) => fn(arg)
export const applyArray = curry(
  (arr: Function[], arg: any) => arr.map(applyTo(arg))
)

export const safeCall = curry(
  (fn?: Function, ...args: any[]) => fn && fn(...args)
)
