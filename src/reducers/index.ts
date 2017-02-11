import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import locationChange from './locationChange'
import windowChange from './windowChange'
import State from '../types/State'

export const initialState = new State()

const initReducer = (state = initialState) => state

export const rootReducer = combineReducers({
  initReducer,
  locationChange,
  windowChange,
  routing: routerReducer,
});
