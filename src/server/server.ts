// import { merge } from 'ramda'
import { verifyToken } from './verifyToken'
import { readFileSync } from 'fs'
import { PROD } from '../constants/env'
import { ServerArgs, Destroyable } from '.'

import * as https from 'https'
import * as http from 'http'

import * as Koa from 'koa'
import cookie from 'koa-cookie'
import * as serverpush from 'koa-server-push'

import * as enforceHttps from 'koa-sslify'

import { createRouter } from './router'
import { resolve } from 'path'

const {
  env: {
    HTTP_PORT = PROD ? 80 : 4000,
    HTTPS_PORT = 443,
    DISABLE_HTTPS,
  },
} = process

const ENABLE_HTTPS = !DISABLE_HTTPS

export const createServer = ([
  Koa,
  logger,
  serve,
]: ServerArgs): Koa => {
  const app = new Koa()

  app

  if (PROD && ENABLE_HTTPS) {
    app.use(
      enforceHttps({
        port: HTTPS_PORT
      })
    )
  }

  app.use(logger())

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
  key: readFileSync(resolve(__dirname, `../../alice-keys/alice.key`)),
  cert: readFileSync(resolve(__dirname, `../../alice-keys/alice.services.chain.crt`)),
  ca: [
    readFileSync(resolve(__dirname, '../../alice-keys/AddTrustExternalCARoot.crt')),
    readFileSync(resolve(__dirname, '../../alice-keys/COMODORSAAddTrustCA.crt')),
    readFileSync(resolve(__dirname, '../../alice-keys/COMODORSADomainValidationSecureServerCA.crt')),
  ],
}

export const startServer = (app: any, enableDestroy: any) => {
  http.createServer(app.callback()).listen(HTTP_PORT)

  if (PROD && ENABLE_HTTPS) {
    https.createServer(options, app.callback()).listen(HTTPS_PORT)
  }

  enableDestroy(app)
}

export const stopServer = (app: Destroyable) => {
  if (app.destroy) {
    app.destroy()
  }
}
