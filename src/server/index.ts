/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

import './bootstrap'

import * as admin from 'firebase-admin'

import { createServer, startServer, stopServer } from './server'

const { env: { HOME } } = process
const FIREBASE_ADMIN_KEY_FILENAME = 'alice-65dad-firebase-adminsdk-xh6ct-cc85956454'

const serviceAccount = require(`${HOME}/alice-keys/${FIREBASE_ADMIN_KEY_FILENAME}.json`)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alice-65dad.firebaseio.com"
})

let app: any

const start = async () => {
  const modules: any = await Promise.all([
    System.import('koa'),
    System.import('koa-convert'),
    System.import('koa-logger'),
    System.import('koa-proxy'),
    System.import('koa-static'),
    System.import('server-destroy')
  ])
  const app = createServer(modules)

  startServer(app, modules[5])

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
