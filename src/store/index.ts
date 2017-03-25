/// <reference path="../../index.d.ts" />

import { compose as _compose } from 'ramda'

import * as ReactReduxFirebase from 'react-redux-firebase'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import { FIREBASE_CONFIG, INITIAL_STATE, WINDOW } from '../constants'
import { PROD } from '../constants/env'
import { rootReducer } from '../reducers'
import { saga } from '../sagas'

const { reactReduxFirebase } = ReactReduxFirebase

const compose = WINDOW ? composeWithDevTools : _compose

const createStoreWithFirebase =
  reactReduxFirebase(
    FIREBASE_CONFIG,
    {
      userProfile: 'users',
      enableLogging: !PROD,
      updateProfileOnLogin: true,
      
    }
  )(createStore)

const sagaMiddleware = createSagaMiddleware()

const baseMiddleware = [sagaMiddleware]

const middleware = (WINDOW && !PROD ? [createLogger({
  duration: true,
  diff: true,
})] : []).concat(baseMiddleware)

const enhancer = compose(
  applyMiddleware(...middleware),
)

export function configureStore(
) {
  const initialState = INITIAL_STATE

  const args = [rootReducer, initialState, enhancer]
  const store = WINDOW ?
    createStoreWithFirebase(...args)
  : createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(saga)

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index'))
    );
  }

  return store
}
