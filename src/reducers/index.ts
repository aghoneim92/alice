import * as reactReduxFirebase from '../../react-redux-firebase/es/index'

const { firebaseStateReducer } = reactReduxFirebase

import { combineReducers } from 'redux'

import { currentWindowId } from './currentWindowId'
import { menuOpen } from './menuOpen'
import { sidebarOpen } from './sidebarOpen'
import { windows } from './windows'
import { documentTitle } from './documentTitle'

import { emoji } from './emoji'

export const rootReducer = combineReducers({
  currentWindowId,
  documentTitle,
  emoji,
  firebase: firebaseStateReducer,
  menuOpen,
  sidebarOpen,
  windows,
})

