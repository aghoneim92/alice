import { Map } from 'immutable'
import { firebaseStateReducer } from 'react-redux-firebase/dist/index'

const firebaseReducer: Reducer = (
  state = Map<string, any>()
) => state.merge(
  firebaseStateReducer(state.toObject())
)

export default firebaseReducer