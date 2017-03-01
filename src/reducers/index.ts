import { firebaseStateReducer } from 'react-redux-firebase/dist/index'
import { combineReducers } from 'redux'

import { currentWindowId } from './currentWindowId'
import { menuOpen } from './menuOpen'
import { windows } from './windows'
import { documentTitle } from './documentTitle'

import { emoji } from './emoji'

export const rootReducer = combineReducers({
  currentWindowId,
  documentTitle,
  emoji,
  firebase: firebaseStateReducer,
  menuOpen,
  windows,
})

