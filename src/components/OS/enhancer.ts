import { connect } from './../../lib/connect'
import { withState } from 'recompose'
import { resolve } from 'react-resolver'
import { reselect } from './../../lib/reselect'
import { error } from './../../lib/logging'
import { EditorState } from 'draft-js'
import { compose } from 'ramda'

import { OSProps, CombinedProps, Enhancer } from '.'

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
  withState('editor', 'onEditorChange', EditorState.createEmpty()),
  withState('firebaseLogin', 'onFirebaseLogin', true)
)