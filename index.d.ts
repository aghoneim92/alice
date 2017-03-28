/// <reference path='node_modules/@types/node/index.d.ts' />
/// <reference path='src/types/index.d.ts' />

declare module 'annyang'

declare module 'browser-cookie-lite'

declare module 'b_'

declare module 'capitalize'

declare module 'codemirror'

declare module 'browser-sync'

declare module 'firepad/lib/firepad'

declare module 'fbgraph'

declare module 'is-running'

declare module 'koa-cookie'
declare module 'koa-convert'
declare module 'koa-proxy'
declare module 'koa-sslify'
declare module 'koa-server-push'

declare module 'navigo'

declare module 'nodemon'

declare module 'offline-plugin/runtime'

declare module 'preload-js'

declare module 'react-async-component'
declare module 'react-addons-css-transition-group'
declare module 'react-bash/src/component'
declare module 'react-click-outside'
declare module 'react-clockwall'
declare module 'react-derive'
declare module 'react-desktop'
declare module 'react-desktop/macOs'
declare module 'react-desktop/windows'
declare module 'react-draggable'
declare module 'react-favicon'
declare module 'react-idle-timer'
declare module 'react-lazy-load'
declare module 'react-markdown'
declare module 'react-popover'
declare module 'react-redux-firebase'
declare module 'react-redux-firebase/dist/react-redux-firebase'
declare module 'react-resizable-box'
declare module 'react-resolver'
declare module 'react-router'
declare module 'react-router-server'
declare module 'react-scene'
declare module 'react-social-button'
declare module 'react-speech'
declare module 'react-toggle'
declare module 'react-transmit'
declare module 'react-typewriter'
declare module 'react-voice-components'
declare module 'react-webcam'

declare module 'redux-auth-wrapper'
declare module 'redux-devtools-extension'
declare module 'redux-devtools-log-monitor'
declare module 'redux-devtools-dock-monitor'
declare module 'redux-immutable'

declare module 'rivescript'
declare module 'rivescript/lib/rivescript'

declare module 'server-destroy'
declare module 'secure-random'

declare module 'stats-webpack-plugin'

declare module 'talkify'

declare module 'terminate'

declare module 'tiny-worker'

declare module 'ventus'

declare module 'webworker-threads'

declare module 'winston' {
  export function debug(...args: any[]): void;
  export function log(...args: any[]): void;
  export function error(...args: any[]): void;
}

declare var __INITIAL_STATE__: any;

declare module 'zombie'

interface System {
  import: (module: string) => Promise<any>
}
declare var System: System
declare var FB: any
