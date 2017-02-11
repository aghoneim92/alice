import { createSelector } from 'reselect'
import { prop } from '../lib/immutableHelpers'

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')

export default {
  currentWindowSelector: createSelector(
    currentWindowIdSelector,
    windowsSelector,
    (currentWindowId, windows) => windows.get(currentWindowId)
  )
}
