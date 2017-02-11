import { firebaseStateReducer } from 'react-redux-firebase'
import { Map } from 'immutable'

export default (
  state: State,
  action: Action,
): State => state.update(
  'firebase',
  ( firebase: (Map<string, any> | undefined) ): Map<string, any> => {
    const firebaseMutable = action.data ? action.data.firebase : null

    return firebaseMutable && firebase ?
      ['auth', 'authError', 'profile'].map()
      firebase.set('firebaseMutable', firebaseMutable)
    : firebase ?
      firebase
    : Map<string, any>()
  }
)
