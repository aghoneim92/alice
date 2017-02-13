/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="src/types/index.d.ts" />

declare module "react-bash/src/component"
declare module "react-click-outside"
declare module "react-derive"
declare module "react-markdown"
declare module "react-redux"
declare module "react-redux-firebase"
declare module "react-tiles"
declare module "react-tiles/src/react-router-resovler"
declare module "react-transmit"

declare module "redux-devtools-log-monitor"
declare module "redux-devtools-dock-monitor"
declare module "redux-immutable"

declare module "ventus"

declare module "winston" {
  export function debug(...args: any[]): void;
  export function log(...args: any[]): void;
  export function error(...args: any[]): void;
}
