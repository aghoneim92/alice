import { firebaseSelector } from '../../selectors/firebase'
import { derive, track } from 'react-derive'
import { resolve } from 'react-resolver'

import { compose } from 'ramda'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import { pure, withState } from 'recompose'

import { Login } from '../Login'

import { connect } from './../../lib/connect'
import { error } from './../../lib/logging'
import { reselect } from '../../lib/reselect'

import { CombinedProps, Enhancer, OSProps, StateCallbacks } from '.'

// Redirects to /login by default
const authWrapper = UserAuthWrapper({
  authSelector: (state: State) => {
    return firebaseSelector(state).auth
  },
  redirectAction: () => undefined, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  FailureComponent: Login
})

interface StateConfig {
  key: string
  cbName: string
  initialValue: any
}

const withStateConfig = (stateConfig: StateConfig[]) => stateConfig.map(
  ({
    key,
    cbName,
    initialValue,
  }) => withState(key, cbName, initialValue)
)

export const enhancer: Enhancer<OSProps, CombinedProps> = (compose as any)(
  connect,
  authWrapper,
  reselect,
  pure,
  resolve({
    favicon: () => System.import('../Logo/logo-compact.png'),
    background: () => System
        .import('../../background.jpg')
        .catch(error),
    README: () => System.import(__dirname + '/../../../README.md')
  }),
  ...withStateConfig([{
    key: 'dimensions',
    cbName: 'onDimensionsChanged',
    initialValue: {
      width: 100,
      height: 100,
    },
  }, {
    key: 'idle',
    cbName: 'setIdle',
    initialValue: false,
  }, {
    key: 'FB',
    cbName: 'setFB',
    initialValue: undefined,
  }, {
    key: 'kernel',
    cbName: 'setKernel',
    initialValue: undefined,
  }]),
  derive({
    onActive: track('setIdle')(
      ({
        setIdle,
      }: StateCallbacks) =>
        () => setIdle(false)
    ),
    onIdle: track('setIdle')(
      ({
        setIdle,
      }: StateCallbacks) =>
        () => setIdle(true)
    ),
  }),
)
