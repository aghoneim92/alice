/// <reference path="../../index.d.ts" />

import { last } from 'ramda'
import { Map } from 'immutable'
import { PROD } from './env'

export const APP_NAME = 'Alice'
export const APP_URL = PROD ?
  'http://alice.services'
: 'http://localhost:4000'

export const BS_CONFIG = 'config/bs-config.js'
export const BS_HOST = 'localhost'
export const BS_PORT = 3000
export const BS_URL = `http://${BS_HOST}:${BS_PORT}/browser-sync/browser-sync-client.js`

export const DIST = 'dist'

export const HOME = process.env.HOME

const SERVER_WATCH = 'src/server/index.tsx'
export const SERVER_CMD = `ttab node_modules/.bin/nodemon --watch ${
  SERVER_WATCH
} --exec npm run start-server`

const DEFAULT_TITLE = APP_NAME

export const DEFAULT_EMOJI = '👸'

export const INITIAL_STATE: Partial<State> = {
  currentWindowId: null,
  documentTitle: DEFAULT_TITLE,
  emoji: DEFAULT_EMOJI,
  menuOpen: false,
  windows: Map<string, any>()
}

const windowCheck = 'typeof window === "object"'
const processCheck = 'typeof window.process === "object"'
export const ELECTRON = eval(`${windowCheck} && ${processCheck}`)

export const FB_APP_ID = '111618562682872'

export const FIREBASE_API_KEY = 'AIzaSyDbSqOdJIJT8vgdpV4AX55ot7JYsSpB358'
export const FIREBASE_AUTH_DOMAIN = 'alice-65dad.firebaseapp.com'
export const FIREBASE_DATABASE_URL = 'https://alice-65dad.firebaseio.com'
export const FIREBASE_MESSAGING_SENDER_ID = '1045855855378'
export const FIREBASE_PROJECT_ID = 'alice-65dad'
export const FIREBASE_STORAGE_BUCKET = 'alice-65dad.appspot.com'
export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
}

// export const GOOGLE_ACCESS_TOKEN = 'ya29.El_ZA9hFSioUuYAA_-uwKzL7XJmoOMA7d_Xj8Q_ptbEXrUBqd0V-cafs3Y7wRU9uUDJbEZoJ5z2DtaBtU6FxsrXJzB-lqi3dKTdJW5QPq-TFn-oRhlRUjFqy1avEb-vHdg'
export const GOOGLE_SPEECH_RECOGNIZE_URL = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize'

export const WINDOW = eval("typeof window !== 'undefined'")

export const IDLE_TIME = 30000
const navigator = WINDOW ? (window.navigator as any) : {}

const { language = 'en-US', languages = [] } = navigator
export const LOCALE = language
export const LANGUAGE = language
export const LANGUAGE2 = last(languages)

export const PORT = PROD ? 80 : 8080

export const REACT_COMPONENT = 'REACT_COMPONENT'

export const SAMPLE_RATE = 16000

export const WEBPACK_SERVER_PID_FILE = 'webpack-dev-server.pid'
export const WIT_AI_TOKEN = 'L5HFNE352IVEA7GRKRDQTMOIHCWJI33A'
