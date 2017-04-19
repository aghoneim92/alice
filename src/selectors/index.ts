import { createSelector } from 'reselect'
import { prop } from 'ramda'
import { Map } from 'immutable'

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')

export default {
  currentWindow: createSelector(
    currentWindowIdSelector,
    windowsSelector,
    (
      currentWindowId: string,
      windows: Map<string, any>
    ) => windows.get(currentWindowId)
  )
}
