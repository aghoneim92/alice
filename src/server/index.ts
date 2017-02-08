// import * as Koa from 'koa'
// import * as serve from 'koa-static'
//
// const browserSync = require('koa-browser-sync')
//
// const convert = require('koa-convert')
// const nodemon = require('nodemon')
// const logger = require('koa-logger')
// import { exec } from 'child_process'
//
// import * as logging from '../lib/logging'
// import * as constants from '../constants'
// const {
//   BS_CONFIG = 'bs-config.js',
//   BS_PORT = 3000,
//   DIST = 'dist',
//   KOA_PORT = 8080,
// } = constants
//
// const app = new Koa()
//
// app.use(convert(serve('.')))
// app.use(logger())
//
// nodemon({
//   config: 'config/webpack/nodemon.json',
// })
//
// app.use(browserSync({
//   init: true,
//   files: DIST,
//   config: BS_CONFIG,
//   port: BS_PORT,
// }))
//
// exec(
//   `browser-sync start --server files ${
//     DIST
//   } --config ${
//     BS_CONFIG
//   } --port ${
//     BS_PORT
//   }`,
//   (
//     err: Error,
//     stdout: string,
//     stderr: string
//   ) => {
//     if (err) {
//       logging.stderr(err)
//     } else {
//       logging.stdout(stdout)
//
//       if (stderr) {
//         logging.stderr(stderr)
//       }
//     }
//   }
// )
//
// app.listen(KOA_PORT)
