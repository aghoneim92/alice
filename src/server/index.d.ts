import * as Koa from 'koa'
import * as convert from 'koa-convert'
import * as logger from 'koa-logger'
import * as serve from 'koa-static'
import * as proxy from 'koa-proxy'

import './index'

declare module './index' {
  var importScripts: Function
  var importWorker: Function
  interface ServerArgs extends Array<any> {
    0: typeof Koa
    1: typeof convert
    2: typeof logger
    3: typeof proxy
    4: typeof serve
  }
}


declare global {
  interface Destroyable {
    destroy?: () => void
  }
  interface IKoa extends Koa, Destroyable {}
  var require: NodeRequire
}

declare module 'firebase-admin'

// interface Destroyable {
//   destroy: Function
// }


// declare module 'koa!*' {
//   const Koa: IKoa & Destroyable
//   export default Koa
// }
