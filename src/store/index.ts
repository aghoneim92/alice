/// <reference path="../../index.d.ts" />
import { compose as _compose } from 'ramda'

import * as ReactReduxFirebase from 'react-redux-firebase'
import { createStore, applyMiddleware } from 'redux'
import * as createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import { FIREBASE_CONFIG, INITIAL_STATE, WINDOW } from '../constants/index'
import { rootReducer } from '../reducers/index'

const { reactReduxFirebase } = ReactReduxFirebase

const compose = WINDOW ? composeWithDevTools : _compose

const createStoreWithFirebase =
  reactReduxFirebase(
    FIREBASE_CONFIG,
    {
      userProfile: 'users',
      enableLogging: true,
      updateProfileOnLogin: true,
      
    }
  )(createStore)

// function getDebugSessionKey() {
//   const matches = WINDOW && window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
//   return (matches && matches.length > 0)? matches[1] : null;
// }

// const debugSessionKey = getDebugSessionKey()

const middleware = WINDOW ? [createLogger({
  duration: true,
  diff: true,
})] : []

const enhancer = compose(
  applyMiddleware(...middleware),
)


// const historyAction: ActionCreator = ({
//   action,
//   location,
// }): Action => ({
//   type: action,
//   payload: {
//     data: Map({location}),
//   }
// })

export function configureStore(
) {
  const initialState = INITIAL_STATE

  const args = [rootReducer, initialState, enhancer]
  const store = WINDOW ?
    createStoreWithFirebase(...args)
  : createStore(rootReducer, initialState, enhancer);

  // const state: any = store.getState()

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index'))
    );
  }

  // if(!(state && state.firebase && state.firebase.auth)) {
  //   router.navigate('/intro')
  // }

  return store
}
