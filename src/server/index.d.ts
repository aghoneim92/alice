import * as serve from 'koa-static'
import * as Koa from 'koa'
import * as convert from 'koa-convert'
import * as logger from 'koa-logger'

import '.'

declare module '.' {
  var importScripts: Function
  var importWorker: Function
  interface ServerArgs extends Array<any> {
    0: typeof Koa
    1: typeof logger
    2: typeof serve
  }
  interface Destroyable {
    destroy?: () => void
  }
  interface IKoa extends Koa, Destroyable {}
}

declare module 'firebase-admin'
