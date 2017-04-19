import { MENU_TOGGLE } from './../constants/ActionTypes'

export const menuOpen: IdReducer<boolean> = (
  state = false,
  action: Action<boolean>,
) => {
  if (action.type === MENU_TOGGLE) {
    return !state
  }

  return state
}
