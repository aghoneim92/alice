import * as ReactReduxFirebase from 'react-redux-firebase'

import { prop } from 'ramda'

import { createSelector } from 'reselect'

const getFirebase = prop('firebase')

const { pathToJS } = ReactReduxFirebase

export const firebaseSelector = createSelector(
  getFirebase,
  (firebase: ImMap) => {
    const [auth, authError, profile] = ['auth', 'authError', 'profile'].map(
      (path: string) => pathToJS(firebase, path)
    )

    return {
      auth,
      authError,
      profile,
    }
  }
)
