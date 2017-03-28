import { checkNodeEnv } from '../lib/env'

export const DEV = checkNodeEnv('development')
export const TEST = checkNodeEnv('test')
export const PROD = checkNodeEnv('production')

const {
  env: {
    TS_COMPILER = JSON.stringify({
      target: 'es6',
      module: 'commonjs',
    }),
  },
} = process

const {
  env: {
    BROWSERSYNC_PORT,
    KOA_PORT,
    TS_OPTIONS = '-P src/server',
  },
} = process

export {
  BROWSERSYNC_PORT,
  KOA_PORT,
  TS_COMPILER,
  TS_OPTIONS,
}
