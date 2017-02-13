import { identity } from 'ramda'
import { reactReduxFirebase } from 'react-redux-firebase/dist/index'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import { persistState } from 'redux-devtools'
import winston from 'winston'

import DevTools from '../components/DevTools/index'
import { FIREBASE_CONFIG, INITIAL_STATE } from '../constants/index'
import { rootReducer } from '../reducers/index'

const createStoreWithFirebase = compose(
  reactReduxFirebase(FIREBASE_CONFIG, { userProfile: 'users' }),
)(createStore)

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

const debugSessionKey = getDebugSessionKey()

const enhancer = compose(
  applyMiddleware(
    routerMiddleware(browserHistory),
    createLogger({
      duration: true,
      diff: true,
      logger: winston
    })
  ),
  DevTools.instrument(),
  debugSessionKey ?
    persistState(debugSessionKey)
  : identity
)

function configureStore() {
  const store = createStoreWithFirebase(rootReducer, INITIAL_STATE, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index'))
    );
  }

  return store;
}

export default configureStore()
