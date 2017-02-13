import { createSelector } from 'reselect'
import { call, curry, flip } from 'ramda'
import { prop } from '../lib/immutableHelpers'
import { helpers } from 'react-redux-firebase/dist/index'
import { Map } from 'immutable'

const pathToJS = flip( curry( helpers.pathToJS ) )

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')
const firebaseSelector = prop('firebase')
const firebasePaths = ['auth', 'authError', 'profile'].map(pathToJS)

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
    (firebase: any) => {
      const [ auth, authError, profile ] = firebasePaths.map(call(firebase))

      return {
        auth,
        authError,
        profile,
      }
    }
  )
}
