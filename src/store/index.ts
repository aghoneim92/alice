import { reactReduxFirebase } from 'react-redux-firebase/dist/index'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import { persistState } from 'redux-devtools'
import winston from 'winston'
import DevTools from '../components/DevTools/index'
import { rootReducer } from '../reducers/index'
import { INITIAL_STATE, FIREBASE_CONFIG } from '../constants/index'
import { fromJS } from 'immutable'

const createStoreWithFirebase = compose(
  reactReduxFirebase(FIREBASE_CONFIG, { userProfile: 'users' }),
)(createStore)

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : 'default';
}

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
  persistState(getDebugSessionKey())
)

function configureStore() {
  const store = createStoreWithFirebase(rootReducer, fromJS(INITIAL_STATE), enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index'))
    );
  }

  return store;
}

export default configureStore()
