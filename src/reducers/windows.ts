import { APPS } from './../constants/index';
/// <reference path="../../index.d.ts" />

import { APP_ICON_CLICK } from './../constants/ActionTypes';
import { mergeImmutable } from './../lib/immutableHelpers';
import { WINDOW_CHANGE } from '../constants/ActionTypes'

import { Map } from 'immutable'

import { genId } from '../lib/genId'

export type ActionHandler<T> = (state: T, data: T) => T

export type CreateOrUpdate = (
  data: ImMap,
  options: {
    from: ImMap,
    fromIdField: string,
  }
) => ImMap

const createOrUpdate: CreateOrUpdate = (
  data: ImMap,
  options,
) => {
  const from: ImMap = options.from

  if(from) {
    const fromId: string = from.get('id')
    const fromSansId = from.remove('id')
    const fromIdField: string = options.fromIdField
    const oldDatum = data.find(
      datum => datum.contains(fromIdField || 'id')
    )
    if(oldDatum) {
      return data.set(oldDatum.get('id'), oldDatum.merge(fromSansId))
    }

    const id = genId()
    return data.set(id, Map({
      id,
      [fromIdField]: fromId,
    }).merge(fromSansId))
  }

  return data
}

const handleAppIconClick: ActionHandler<ImMap> = (windows, data) => {
  const from = APPS.get(data.get('id'))

  console.log(from);

  return createOrUpdate(windows, { from, fromIdField: 'appId' })
}

const actionHandlers: ({ [key: string]: ActionHandler<ImMap> }) = {
  [WINDOW_CHANGE]: (state: ImMap, data: ImMap) => state.update(
    data.get('id'),
    data,
    mergeImmutable(data)
  ),
  [APP_ICON_CLICK]: handleAppIconClick
}

export const windows: Reducer<ImMap> = (
  state = Map<string, any>(),
  action,
) => {
  const { type, payload } = action
  const data = payload && payload.data

  const handler: ActionHandler<ImMap> = actionHandlers[type]
  if(handler && data) {
    return handler(state, data)
  }

  return state
}
