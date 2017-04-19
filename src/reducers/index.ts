import * as reactReduxFirebase from 'react-redux-firebase'

const { firebaseStateReducer } = reactReduxFirebase

import { combineReducers } from 'redux'

import { currentWindowId } from './currentWindowId'
import { menuOpen } from './menuOpen'
import { sidebarOpen } from './sidebarOpen'
import { windows } from './windows'
import { documentTitle } from './documentTitle'

export const rootReducer = combineReducers({
  currentWindowId,
  documentTitle,
  firebase: firebaseStateReducer,
  menuOpen,
  sidebarOpen,
  windows,
})

