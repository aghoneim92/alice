/// <reference path="./index.d.ts" />
import { writeFileSync } from 'fs'
import { spawn } from 'child_process'

import browserSyncInit from './bs-init'
import { findAndTerminate } from './src/server/util'
import { WEBPACK_SERVER_PID_FILE } from './src/constants/index'

browserSyncInit()

findAndTerminate(WEBPACK_SERVER_PID_FILE)

const webpackServer = spawn('webpack-dev-server', [], { stdio: 'inherit' })

writeFileSync(WEBPACK_SERVER_PID_FILE, `${webpackServer.pid}
`)
