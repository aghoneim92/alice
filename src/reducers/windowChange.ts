import { merge } from '../lib/immutableHelpers'
import State from '../types/State'
import Action from '../types/Action'
import { initialState } from './index'

export default (
  state: State = initialState,
  action: Action,
) => action.has('window') ?
  merge(
    state,
    state.updateIn([
      'windows',
      action.getIn(['window', 'id'])
    ],
      window => window.merge(
        action.get('window')
      )
    )
  )
: state
