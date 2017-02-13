import { last } from 'ramda'
import { PROD, DEV, TEST } from './nodeEnv'
import { Map } from 'immutable'

const {
  env: {
    BROWSERSYNC_PORT,
    KOA_PORT,
  },
} = process

export const INITIAL_STATE: State = {
  windows: Map<string, Map<string, any>>(),
  currentWindowId: null,
  firebase: {},
  routing: { locationBeforeTransitions: null },
}

export const APP_NAME = 'Alice'
export const APP_URL = PROD ? 'http://alice.services' : 'http://localhost:8080'

export const DEFAULT_EMOJI = '👸'

export { BROWSERSYNC_PORT, KOA_PORT, PROD, DEV, TEST }

const windowCheck = 'typeof window === "object"'
const processCheck = 'typeof window.process === "object"'
export const ELECTRON = eval(`${windowCheck} && ${processCheck}`)

export const FB_APP_ID = '111618562682872'

export const FIREBASE_API_KEY = 'AIzaSyAPTAo5gRc9wLSzZ9KztwZnqdZ_zWwb1C4'
export const FIREBASE_AUTH_DOMAIN = 'alice-155621.firebaseapp.com'
export const FIREBASE_DATABASE_URL = 'https://alice-155621.firebaseio.com'
export const FIREBASE_MESSAGING_SENDER_ID = '690687585287'
export const FIREBASE_PROJECT_ID = 'alice-155621'
export const FIREBASE_STORAGE_BUCKET = 'alice-155621.appspot.com'
export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
}

// export const GOOGLE_ACCESS_TOKEN = 'ya29.El_ZA9hFSioUuYAA_-uwKzL7XJmoOMA7d_Xj8Q_ptbEXrUBqd0V-cafs3Y7wRU9uUDJbEZoJ5z2DtaBtU6FxsrXJzB-lqi3dKTdJW5QPq-TFn-oRhlRUjFqy1avEb-vHdg'
export const GOOGLE_SPEECH_RECOGNIZE_URL = 'https://speech.googleapis.com/v1beta1/speech:syncrecognize'

export const IDLE_TIME = 30000

const { languages } = <any> navigator;

export const BS_CONFIG = 'config/bs-config.js'
export const BS_PORT = 3000

export const DIST = 'dist'

export const LANGUAGE = navigator.language
export const LANGUAGE2 = last(languages)

export const PORT = PROD ? 80 : 8080

export const REACT_COMPONENT = 'REACT_COMPONENT'

export const SAMPLE_RATE = 16000

export const WIT_AI_TOKEN = 'L5HFNE352IVEA7GRKRDQTMOIHCWJI33A'
