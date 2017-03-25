/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

import './bootstrap'

import * as admin from 'firebase-admin'

import { createServer, startServer, stopServer } from './server'

const { env: { FIREBASE_ADMIN_KEY_FILENAME } } = process

const serviceAccount = require(`../../alice-keys/${FIREBASE_ADMIN_KEY_FILENAME}.json`)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://alice-65dad.firebaseio.com'
})

let app: any

const start = async function () {
  const modules: ServerArgs = (await Promise.all([
    System.import('koa'),
    System.import('koa-logger'),
    System.import('koa-static'),
  ])) as any
  const app = createServer(modules)

  const enableDestroy = await System.import('server-destroy')
  startServer(app, enableDestroy)

  return app
}

const stop = (app: any) => stopServer(app)

const kill = () =>
  process.kill(process.pid, 'SIGUSR2')

process.once('SIGUSR2', () => {
  stop(app)
  kill()
})

app = start()
