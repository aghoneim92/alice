import { readFileSync } from 'fs';
import { PROD } from './../constants/env'
import { ServerArgs } from './index'

import * as https from 'https'
import * as http from 'http'

import * as Koa from 'koa'
import cookie from 'koa-cookie'
import * as serverpush from 'koa-server-push'

import * as enforceHttps from 'koa-sslify'

import { createRouter } from '../lib/router'
import { HOME } from '../constants'

const PORT = process.env.PORT || 4000

export const createServer = ([
  Koa,
  convert,
  logger,
  proxy,
  serve,
]: ServerArgs): Koa => {
  const app = new Koa()

  if (PROD) {
    app.use(enforceHttps())
  }

  app.use(logger())
     .use(cookie())
     .use(createRouter())

  if (!PROD) {
    app.use(convert(
      proxy({
        host: 'http://localhost:8080',
        match: /^\/dist\//,
      })
    ))
  }

  app.use(serverpush())
  app.use(serve('.'))

  return app
}

const options = {
  key: readFileSync(`${HOME}/alice-keys/ssl_cert/alice.key`),
  cert: readFileSync(`${HOME}/alice-keys/ssl_cert/alice_services/alice_services.crt`)
}

export const startServer = (app: any, enableDestroy: any) => {
  if (PROD) {
    http.createServer(app.callback()).listen(80)
    https.createServer(options, app.callback()).listen(PORT)
  } else {
    app.listen(PORT)
  }

  enableDestroy(app)
}

export const stopServer = (app: Destroyable) => {
  if (app.destroy) {
    app.destroy()
  }
}
