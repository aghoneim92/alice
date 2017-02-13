import { merge } from '../lib/immutableHelpers'
import { WINDOW_CHANGE } from '../constants/ActionTypes'
import { Map } from 'immutable'

const windowReducer: Reducer = (
  state = Map<string, any>(),
  action,
) => {
  const { type, payload } = action
  const newWindow = payload && payload.data

  return type === WINDOW_CHANGE && newWindow ?
    merge(
      state,
      state.updateIn([
        'windows',
        newWindow.get('id')
      ],
        (window: ImMap) => window.merge(newWindow)
      )
    )
  : state
}

export default windowReducer