import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import firebase from './firebase'
import location from './location'
import windows from './windows'
import currentWindowId from './currentWindowId'

export const rootReducer = combineReducers({
  currentWindowId,
  location,
  windows,
  routing: routerReducer,
  firebase,
});
