/// <reference path="../../index.d.ts" />

import { Map } from 'immutable'

import { APP_ICON_CLICK } from './../constants/ActionTypes'
import { mergeImmutable } from './../lib/immutableHelpers'
import { error } from './../lib/logging'
import { Apps } from '../components/Apps'
import {
  WINDOW_DELETE_SUCCESS,
  WINDOW_MOVE,
  WINDOW_TOGGLE_FULLSCREEN,
  WINDOW_UPDATE_SUCCESS,
} from '../constants/ActionTypes'

import { WindowConfig } from '../components/Window/index'

export type ActionHandler = (state: ImMap, data: any) => ImMap

export type CreateOrUpdate = (
  data: ImMap,
  options: {
    from: ImMap,
    fromIdField: string,
  }
) => ImMap

const createOrUpdate: CreateOrUpdate = (
  windows: ImMap,
  options,
) => {
  const from: ImMap = options.from

  if (from) {
    const fromIdField: string = options.fromIdField

    const fromId: string = from.get(fromIdField)
    const id: string = from.get('id')
    const fromSansId = from.remove('id')

    const oldDatum = windows.find(
      window => window.get(fromIdField) === fromId
    )

    if (oldDatum) {
      return windows.update(oldDatum.get('id'), window => window.merge(fromSansId))
    }

    return windows.set(
      id, Map({
        id,
        [fromIdField]: fromId,
      })
      .merge(fromSansId)
    )
  }

  return windows
}

const handleAppIconClick: ActionHandler = (windows, data) => {
  const appId = data.get('appId')
  const app = Apps.get(appId)
  const id = data.get('id')

  const x = 0.05 * window.innerWidth
  const y = 0.05 * (window.innerHeight - 20)

  if (app) {
    const from = app.merge(
      Map({
        id,
        appId,
        theme: 'macOs',
        width: window.innerWidth - (2 * x),
        height: 0.9 * (window.innerHeight - 20),
        x,
        y,
      })
    )

    return createOrUpdate(windows, { from, fromIdField: 'appId' })
  }

  error(`App with id ${appId} not found`)

  return windows
}

const handleWindowDelete = (state: ImMap, { id } : WindowConfig) =>
  state.delete(id)

const handleWindowFullScreen = (
  state: ImMap,
  { id }: WindowConfig
) => {
  const window: ImMap = state.get(id)
  const fullScreen: boolean = !window.get('fullScreen')
  const titlebarFocused = fullScreen ? false : window.get('titlebarFocused')

  return state.update(
    id,
    window => window.set('fullScreen', fullScreen).set('titlebarFocused', titlebarFocused)
  )
}

const handleWindowMove = (
  state: ImMap,
  { id, deltaX, deltaY }: { id: string, deltaX: number, deltaY: number }
) => state.update(
  id,
  window => window.update(
    'x',
    (x: number) => x + deltaX
  )
  .update(
    'y',
    (y: number) => y + deltaY
  )
)

const actionHandlers: ({ [key: string]: ActionHandler }) = {
  [WINDOW_UPDATE_SUCCESS]: (state: ImMap, data: ImMap) => state.update(
    data.get('id'),
    data,
    mergeImmutable(data)
  ),
  [APP_ICON_CLICK]: handleAppIconClick,
  [WINDOW_DELETE_SUCCESS]: handleWindowDelete,
  [WINDOW_MOVE]: handleWindowMove,
  [WINDOW_TOGGLE_FULLSCREEN]: handleWindowFullScreen
}

export const windows: IdReducer<ImMap> = (
  state = Map<string, any>(),
  { type, payload },
) => {
  const data = payload && payload.data

  const handler: ActionHandler = actionHandlers[type]
  if (handler && data) {
    return handler(state, data)
  }

  return state
}
