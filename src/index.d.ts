/* eslint-disable */
declare module "winston" {
  export function debug(...args: any[]): void;
  export function log(...args: any[]): void;
  export function error(...args: any[]): void;
}

// declare module "inline-worker" {
//   export default class InlineWorker {
//     constructor(
//       fn: (self: { onmessage: Function, bark: Function }) => void,
//       ctx: {}
//     );
//     onmessage: Function;
//     postMessage: Function;
//   }
// }

declare module "browsix" {
  export const Boot: Function;
}
