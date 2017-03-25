/// <reference path="./index.d.ts" />
import { spawn } from 'child_process'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { findAndTerminate } from './src/server/util'
import { WEBPACK_SERVER_PID_FILE } from './src/constants'

process.once('SIGUSR2', () => {
  findAndTerminate(WEBPACK_SERVER_PID_FILE)

  process.kill(process.pid, 'SIGUSR2')
})

const webpackServer = spawn(
  'webpack-dev-server',
  ['--https', `--cert=${
    resolve(__dirname, './alice-keys/local.crt')
  }`, `--key=${resolve(__dirname, './alice-keys/local.key')}`],
  { stdio: 'inherit' }
)

writeFileSync(WEBPACK_SERVER_PID_FILE, `${webpackServer.pid}
`)
