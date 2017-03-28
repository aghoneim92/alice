import { map } from 'ramda'

import { StylesActions } from './styles'

export const EditorActions = map(
  action => `editor/${action}`,
  StylesActions
)
