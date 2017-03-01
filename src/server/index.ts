import { PROD } from './../constants/env';
/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />
const nonNodeModules = /\.(scss|jpg)/
const System = {
  import: (name: string) => Promise.resolve(
    nonNodeModules.test(name) ? null : require(name)
  )
}
Object.assign(global, {
  System,
  __INITIAL_STATE__: {}
})

import * as convert from 'koa-convert'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as proxy from 'koa-proxy'
import * as serve from 'koa-static'

import { createRouter } from '../lib/router'
import * as enableDestroy from 'server-destroy'
// import { error } from '../lib/logging'
// import fetch from 'node-fetch'

// import * as admin from 'firebase-admin'

let app: Koa

// admin.initializeApp({
//   credential: admin.credential.cert(require('../../alice-3aa4c-firebase-adminsdk-u02qv-df1b954878.json')),
//   databaseURL: "https://alice-155621.firebaseio.com"
// })

function createServer() {
  const app = new Koa()
  app.use(convert(logger()))
     .use(createRouter())

  if(PROD) {
    app.use(serve('.'))
  } else {
    app.use(
      convert(
        proxy({
          host: 'http://localhost:8080',
          match: /^\/dist\//,
        })
      )
    )
  }


  return app
}

const PORT = 4000

export const startServer = () => {
  app = createServer()
  app.listen(PORT)
  enableDestroy(app)
}

export const restartServer = () => {
  const destroyable: any = app
  if(destroyable.destroy) {
    destroyable.destroy()
  }
  createServer()
}

startServer()
