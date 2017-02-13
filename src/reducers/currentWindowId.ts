import { merge } from 'ramda';
import { initialState } from './index'

import { CURRENT_WINDOW_ID } from '../constants/ActionTypes'

export const currentWindowIdReducer: Reducer = (
  state = initialState,
  { type, payload }
) => type === CURRENT_WINDOW_ID
  && payload
  && payload.data ?
    merge(
      state, {
        currentWindowId: payload.data
      }
    )
  : state

