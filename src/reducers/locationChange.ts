import { LOCATION_CHANGE } from '../constants/ActionTypes'
import { StateRecord, initialState } from '../types/State'

const locationChange = (
  state: StateRecord = initialState,
  action: Action
) => action.type === LOCATION_CHANGE ?
  state.set('locationBeforeTransitions', action.payload)
: state

export default locationChange
