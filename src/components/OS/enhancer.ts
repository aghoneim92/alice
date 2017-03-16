import { derive, track } from 'react-derive';
import { connect } from './../../lib/connect'
import { withState } from 'recompose'
import { resolve } from 'react-resolver'
import { reselect } from './../../lib/reselect'
import { error } from './../../lib/logging'
import { compose } from 'ramda'

import { CombinedProps, Enhancer, OSProps, StateCallbacks } from '.'

export const enhancer: Enhancer<OSProps, CombinedProps> = (compose as any)(
  connect,
  reselect,
  resolve(
    'background',
    () =>
      System
        .import('../../background.jpg')
        .catch(error)
  ),
  resolve('README', () => System.import('../../../README.md')),
  withState('dimensions', 'onDimensionsChanged', {
    width: 100,
    height: 100,
  }),
  withState('idle', 'setIdle', false),
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
