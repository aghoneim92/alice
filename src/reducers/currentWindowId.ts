import { Map } from 'immutable'

import { CURRENT_WINDOW_ID } from '../constants/ActionTypes'

const currentWindowIdReducer: Reducer = (
  state = Map<string, any>(),
  { type, payload }
) => 
    type === CURRENT_WINDOW_ID
 && payload
 && payload.data ?
    state.set('currentWindowId', payload.data)
:   state

export default currentWindowIdReducer
