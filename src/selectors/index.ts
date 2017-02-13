import { createSelector } from 'reselect'
import { prop, unary } from 'ramda'
import { applyArray, safeCall } from '../lib/functional'
import { Map } from 'immutable'

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')
const firebaseSelector = prop('firebase')
const firebasePaths = ['auth', 'authError', 'profile'].map(unary(prop))

const applyFirebasePathsTo = applyArray(firebasePaths)

export default {
  currentWindow: createSelector(
    currentWindowIdSelector,
    windowsSelector,
    (
      currentWindowId: string,
      windows: Map<string, any>
    ) => windows.get(currentWindowId)
  ),
  firebase: createSelector(
    firebaseSelector,
    (firebase: KeyedObject) => {
      const [ auth, authError, profile ] = applyFirebasePathsTo(firebase).map(unary(safeCall))

      return {
        auth,
        authError,
        profile,
      }
    }
  )
}
