import { DEFAULT_EMOJI } from './../constants/index'
import { EMOJI_CHANGE } from '../constants/ActionTypes'

export const emoji: IdReducer<string> = (
  state = DEFAULT_EMOJI,
  action: Action<string>
) => {
  const { payload, type } = action

  if(type === EMOJI_CHANGE && payload && payload.data) {
    return payload.data
  }

  return state
}
