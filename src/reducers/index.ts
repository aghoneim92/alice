import { windowsReducer } from './windows';
import { currentWindowIdReducer } from './currentWindowId';
import { firebaseStateReducer } from 'react-redux-firebase/dist/index';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  currentWindowId: currentWindowIdReducer,
  windows: windowsReducer,
  routing: routerReducer,
  firebase: firebaseStateReducer,
})

export { INITIAL_STATE as initialState } from '../constants/index'
