export const debug = console.log.bind(console)
export const error = (err: (string | Error)) => console.error('Error: ', err)
export const output = debug
export const warn = console.warn.bind(console)