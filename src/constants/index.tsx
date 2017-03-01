/// <reference path="../../index.d.ts" />
import * as React from 'react'
import { merge, last } from 'ramda'
import { Map } from 'immutable'
import { PROD } from './env'
import { DRAFT_EDITOR } from './WindowTypes'

// import { resolve } from 'react-resolver'

import { genId } from '../lib/genId'

export const APP_NAME = 'Alice'
export const APP_URL = PROD ?
  'http://alice.services'
: 'http://localhost:4000'

const editorId = genId()
const editor = Map({
  id: editorId,
  icon: (
    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  ),
  title: 'Editor',
  type: DRAFT_EDITOR,
})

// const snakeId = genId()
// const snake = Map({
//   id: snakeId,
//   icon: (
//     <img src="../../snake.ico"/>
//   ),
//   title: 'Snake',
//   type: SNAKE,
// })
// const nesId = genId()
// const nes = Map({
//   id: nesId,
//   icon: resolve('img', 'onImgChange', null)((
//     ({
//       img,
//     }) => (
//       <img src={img}/>
//     )
//   )as (({img}: {img: string}) => any)),
//   type: NES,
// })

export const APPS = Map<ImMap>({
  [editorId]: editor,
  // [nesId]: nes,
  // [snakeId]: snake
})

export const BS_CONFIG = 'config/bs-config.js'
export const BS_HOST = 'localhost'
export const BS_PORT = 3000
export const BS_URL = `http://${BS_HOST}:${BS_PORT}/browser-sync/browser-sync-client.js`

export const DIST = 'dist'

const SERVER_WATCH = 'src/server/index.tsx'
export const SERVER_CMD = `ttab node_modules/.bin/nodemon --watch ${
  SERVER_WATCH
} --exec npm run start-server`

const DEFAULT_TITLE = APP_NAME

export const DEFAULT_EMOJI = '👸'

const DEFAULT_INITIAL_STATE: State = {
  currentWindowId: null,
  documentTitle: DEFAULT_TITLE,
  emoji: DEFAULT_EMOJI,
  menuOpen: false,
  // firebase: {},
  windows: Map<string, ImMap>(),
}

const globalInitialState = typeof __INITIAL_STATE__ === 'object' ?
  __INITIAL_STATE__
: {}

export const INITIAL_STATE = merge(
  DEFAULT_INITIAL_STATE,
  globalInitialState
)

const windowCheck = 'typeof window === "object"'
const processCheck = 'typeof window.process === "object"'
export const ELECTRON = eval(`${windowCheck} && ${processCheck}`)

export const FB_APP_ID = '111618562682872'

export const FIREBASE_API_KEY = 'AIzaSyAo7NjwAU_bcy_j0vi85z_t4s0VEBkh-ko'
export const FIREBASE_AUTH_DOMAIN = PROD ?
  'alice-3aa4c.firebaseapp.com'
: 'localhost'
export const FIREBASE_DATABASE_URL = 'https://alice-3aa4c.firebaseio.com'
export const FIREBASE_MESSAGING_SENDER_ID = '88278176113'
export const FIREBASE_PROJECT_ID = 'alice-3aa4c'
export const FIREBASE_STORAGE_BUCKET = 'alice-3aa4c.appspot.com'
export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
}

// export const GOOGLE_ACCESS_TOKEN = 'ya29.El_ZA9hFSioUuYAA_-uwKzL7XJmoOMA7d_Xj8Q_ptbEXrUBqd0V-cafs3Y7wRU9uUDJbEZoJ5z2DtaBtU6FxsrXJzB-lqi3dKTdJW5QPq-TFn-oRhlRUjFqy1avEb-vHdg'
export const GOOGLE_SPEECH_RECOGNIZE_URL = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize'

export const WINDOW = typeof window !== 'undefined' && ! (window as GlobalWindow).isJsDOM

export const IDLE_TIME = 30000
const navigator = (WINDOW && window.navigator) as any || {}

const { language, languages = [] } = navigator
export const LANGUAGE = language
export const LANGUAGE2 = last(languages)

export const PORT = PROD ? 80 : 8080

export const REACT_COMPONENT = 'REACT_COMPONENT'

export const SAMPLE_RATE = 16000

export const WEBPACK_SERVER_PID_FILE = 'webpack-dev-server.pid'
export const WIT_AI_TOKEN = 'L5HFNE352IVEA7GRKRDQTMOIHCWJI33A'
