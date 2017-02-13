import { LOCATION_CHANGE } from '../constants/ActionTypes'
import { Map } from 'immutable'

const locationReducer: Reducer = (
  state = Map<string, any>(),
  action
) => console.log('state', state, 'action', action) || action.type === LOCATION_CHANGE ?
  state.set('locationBeforeTransitions', action.payload)
: state

export default locationReducer
