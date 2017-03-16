import { createSelector } from 'reselect'
import { prop } from 'ramda'
import { Map } from 'immutable'

import * as ReactReduxFirebase from 'react-redux-firebase'

const { pathToJS } = ReactReduxFirebase

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')
const firebaseSelector = prop('firebase')

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
    (firebase: ImMap) => {
      const [ auth, authError, profile ] = ['auth', 'authError', 'profile'].map(
        (path: string) => pathToJS(firebase, path)
      )

      return {
        auth,
        authError,
        profile,
      }
    }
  )
}
