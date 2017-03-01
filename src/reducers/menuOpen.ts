import { TOGGLE_MENU } from './../constants/ActionTypes'

export const menuOpen: Reducer<boolean> = (
  state = false,
  action: Action<boolean>,
) => {
  if(action.type === TOGGLE_MENU) {
    return !state
  }

  return state
}
