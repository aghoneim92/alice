import checkNodeEnv from '../lib/checkNodeEnv'

export const DEV = checkNodeEnv('development')
export const TEST = checkNodeEnv('test')
export const PROD = checkNodeEnv('production')
