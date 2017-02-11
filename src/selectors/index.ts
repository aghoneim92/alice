import { createSelector } from 'reselect'
import { curry, flip, merge } from 'ramda'
import { getIn, prop } from '../lib/immutableHelpers'
import { helpers } from 'react-redux-firebase'

const pathToJS = flip( curry( helpers.pathToJS ) )
const flippedMap = flip(map)

const currentWindowSelectors = ['currentWindowId', 'windows'].map(prop)
const currentWindowIdSelector = prop('currentWindowId')
const propSelectors = ['windows'].map(prop)
const firebaseSelector = getIn(['firebase', 'firebaseMutable'])
const mapFirebaseProps = flippedMap(['auth', 'authError', 'profile'])
const firebasePropsToPathToJS = mapFirebaseProps(pathToJS)
const mapPathToJSTo = flippedMap(firebasePropsToPathToJS)
const firebaseSelectors = compose(mapPathToJSTo, call)

export default {
  currentWindow: createSelector(
    currentWindowSelectors,
    (currentWindowId, windows) => windows.get(currentWindowId)
  ),
  firebase: createSelector(
    firebaseSelectors,
    (auth, authError, profile) => merge(
      firebase,
      {
        auth,
        authError,
        profile,
      }
    )
  )
}
