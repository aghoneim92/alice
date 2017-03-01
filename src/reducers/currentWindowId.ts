// import { debug } from './../lib/logging';

import { CURRENT_WINDOW_ID } from '../constants/ActionTypes'

export const currentWindowId: Reducer<string> = (
  state = '',
  { type, payload }
) => type === CURRENT_WINDOW_ID
  && payload
  && payload.data ?
     payload.data
  :  state

