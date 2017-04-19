import { SIDEBAR_UPDATE_SUCCESS } from './../constants/ActionTypes'

export const sidebarOpen: IdReducer<boolean> = (
  state = true,
  action,
) => {
  if (action.type === SIDEBAR_UPDATE_SUCCESS && action.payload) {
    return !!action.payload.data
  }

  return state
}
