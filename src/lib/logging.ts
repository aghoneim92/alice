type Logger = (...args: any[]) => void

export const debug = console.log.bind(console)
export const error: Logger = (...args: any[]) =>
  console.error('Error: ', ...args)
export const info = console.info.bind(console)
console.exception
export const log = console.log.bind(console)
export const output = debug
export const time = console.time.bind(console)
export const timeEnd = console.time.bind(console)
export const warn = console.warn.bind(console)
