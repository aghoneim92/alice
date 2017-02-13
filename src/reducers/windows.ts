import { initialState } from './index';
import { merge } from 'ramda'
import { mergeImmutable } from '../lib/immutableHelpers'
import { WINDOW_CHANGE } from '../constants/ActionTypes'

export const windowsReducer: Reducer = (
  state = initialState,
  action,
) => {
  const { type, payload } = action
  const newWindow = payload && payload.data

  return type === WINDOW_CHANGE && newWindow ?
    merge(
      state,
      {
        windows: state.windows.update(
          newWindow.get('id'),
          mergeImmutable(newWindow)
        )
      }
    )
  : state
}
