import { verifyToken } from './verifyToken'
import { readFileSync } from 'fs'
import { DEPLOYED, PROD } from './../constants/env'
import { ServerArgs, Destroyable } from '.'

import * as https from 'https'
import * as http from 'http'

import * as Koa from 'koa'
import cookie from 'koa-cookie'
import * as serverpush from 'koa-server-push'

import * as enforceHttps from 'koa-sslify'

import { createRouter } from './router'
import { resolve } from 'path'

const HTTP_PORT = 80
const HTTPS_PORT = DEPLOYED ? 443 : PROD ? 8080 : 4000

export const createServer = ([
  Koa,
  logger,
  serve,
]: ServerArgs): Koa => {
  const app = new Koa()

  app
    .use(
      enforceHttps({
        port: HTTPS_PORT
      })
    )
    .use(logger())

  app
    .use(cookie())
    .use(verifyToken())
    .use(createRouter())

  if (PROD) {
    app.use(serverpush())
    app.use(serve('.'))
  }

  return app
}

const options = {
  key: readFileSync(resolve(__dirname, `../../alice-keys/${DEPLOYED ? 'alice.key' : 'local.key'}`)),
  cert: readFileSync(resolve(__dirname, `../../alice-keys/${DEPLOYED ? 'alice.crt' : 'local.crt'}`))
}

export const startServer = (app: any, enableDestroy: any) => {
  if (DEPLOYED) {
    http.createServer(app.callback()).listen(HTTP_PORT)
  }
  https.createServer(options, app.callback()).listen(HTTPS_PORT)

  enableDestroy(app)
}

export const stopServer = (app: Destroyable) => {
  if (app.destroy) {
    app.destroy()
  }
}
