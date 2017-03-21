import { derive, track } from 'react-derive'
import { resolve } from 'react-resolver'

import { compose } from 'ramda'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import { pure, withState } from 'recompose'

import { Login } from '../Login'

import { connect } from './../../lib/connect'
import { error } from './../../lib/logging'
import { reselect } from '../../lib/reselect'
import selectors from '../../selectors'

import { CombinedProps, Enhancer, OSProps, StateCallbacks } from '.'

// Redirects to /login by default
const authWrapper = UserAuthWrapper({
  authSelector: (state: State) => {
    return selectors.firebase(state).auth
  },
  redirectAction: () => null, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  FailureComponent: Login
})

export const enhancer: Enhancer<OSProps, CombinedProps> = (compose as any)(
  connect,
  authWrapper,
  reselect,
  pure,
  resolve(
    'background',
    () =>
      System
        .import('../../background.jpg')
        .catch(error)
  ),
  resolve('README', () => System.import(__dirname + '/../../../README.md')),
  withState('dimensions', 'onDimensionsChanged', {
    width: 100,
    height: 100,
  }),
  withState('idle', 'setIdle', false),
  withState('FB', 'setFB', null),
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
