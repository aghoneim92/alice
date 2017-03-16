/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

const nonNodeModules = /\.(scss|jpg|css|png|less)/

const System = {
  import: function(name: string) {
    return Promise.resolve(
      nonNodeModules.test(name) ? null : require(name)
    )
  }
}
Object.assign(
  global, {
    System,
  }
)

import { createServer, startServer, stopServer } from './server'

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
