import { cookie } from 'browser-cookie-lite'

import * as Firebase from 'firebase'

// import { Map } from 'immutable'

import { getFirebase } from 'react-redux-firebase'
import { call, takeEvery } from 'redux-saga/effects'

import { WINDOW } from '../constants/'
// import { APP_ICON_CLICK } from './../constants/ActionTypes'

import { error } from '../lib/logging'

const ONE_YEAR = 365 * 24 * 60 * 60

// export type ActionHandler = (state: ImMap, data: any) => ImMap

// export type CreateOrUpdate = (
//   windows: ImMap,
//   options: {
//     from: ImMap,
//     fromIdField: string,
//   }
// ) => ImMap

// const createOrUpdate: CreateOrUpdate = (
//   windows,
//   options,
// ) => {
//   const from: ImMap = options.from

//   if(from) {
//     const firebase = getFirebase()
//     const uid = firebase.auth().currentUser.uid
//     const fromIdField: string = options.fromIdField

//     const fromId: string = from.get(fromIdField)
//     const id: string = from.get('id')
//     const fromSansId = from.remove('id')

//     const oldDatum = windows.find(
//       window => !!window && window.get(fromIdField) === fromId
//     )
//     const newWindow = oldDatum ? oldDatum.merge(fromSansId) : Map({
//       id,
//       [fromIdField]: fromId
//     }).merge(fromSansId)

//     firebase.set(`/windows/${id}`, newWindow.remove('Component').remove('icon').toJS())
//     firebase.set(`/users/${uid}/windows/${id}`, true)
//   }

//   return windows
// }

// const handleAppIconClick = ({ payload: { data } }: any) => {
//   try {
//     const { windows } = (window as any).store.getState()
//     const appId = data.get('appId')
//     const id = data.get('id')

//     const x = 0.05 * window.innerWidth
//     const y = 0.05 * (window.innerHeight - 20)

//     const from = Map({
//       id,
//       appId,
//       theme: 'macOs',
//       width: window.innerWidth - (2 * x),
//       height: 0.9 * (window.innerHeight - 20),
//       x,
//       y,
//     })
//     createOrUpdate(windows, { from, fromIdField: 'appId' })
//   }
//   catch(e) {
//     error(e)
//   }
// }

// function* addWindow() {
//   yield takeEvery(APP_ICON_CLICK, handleAppIconClick)
// }

function* setCookies() {
  yield takeEvery('@@reactReduxFirebase/LOGIN', async () => {
    try {
      const firebase: typeof Firebase = getFirebase()
      const accessToken = await firebase.auth().currentUser!.getToken(true)

      if(WINDOW && cookie('accessToken') !== accessToken) {
        cookie('accessToken', accessToken, ONE_YEAR)
      }
    } catch(e) {
      error(e)
    }
  })
}

const sagas = [setCookies]

export function* saga() {
  yield sagas.map(call)
}
