/// <reference path="./node_modules/@types/node/index.d.ts" />
/// <reference path="./node_modules/immutable/type-definitions/immutable.d.ts" />

type Id = string;

interface Kernel {
  fs?: any;
}

interface NodeModule {
  hot?: {
    accept: Function;
  };
}

interface NodeRequire {
  context: (regex: RegExp) => (
    ((value: string, index: number, array: string[]) => Object)
  & { keys: string[]; });
  ensure: (
    arr: string[],
    cb: (require: NodeRequire) => void,
    name?: string
  ) => void;
}

declare module "react-bash"
declare module "react-click-outside"
declare module "react-derive"
declare module "react-markdown"
declare module "react-redux"
declare module "react-redux-firebase"
declare module "react-tiles"
declare module "react-tiles/src/react-router-resovler"

declare module "redux-immutable"

declare var System: {
  import: (module: string) => Promise<any>;
};

declare module "ventus"

declare module "winston" {
  export function debug(...args: any[]): void;
  export function log(...args: any[]): void;
  export function error(...args: any[]): void;
}
