import Koa from 'koa'

interface System {
  import: (module: string) => Promise<any>;
}

declare global {
  interface Global {
    System: System;
    require: NodeRequire;
  }
  interface Destroyable {
    destroy?: () => void;
  }
  interface IKoa extends Koa, Destroyable {}
  var System: System;
  var require: NodeRequire;
}

declare module "firebase-admin"

// interface Destroyable {
//   destroy: Function;
// }


// declare module 'koa!*' {
//   const Koa: IKoa & Destroyable;
//   export default Koa;
// }
