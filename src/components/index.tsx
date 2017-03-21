/// <reference path="./index.d.ts" />

import * as react from 'react'
import { StatelessComponent } from 'react'
import { Provider } from 'react-redux'
import { AsyncComponentProvider } from 'react-async-component'

import * as admin from 'firebase-admin'

import { configureStore } from '../store/index'
import { getOS } from './OS'

import { error } from '../lib/logging'
import { WINDOW } from "../constants"

System.import('font-awesome/css/font-awesome.css')

export const createAlice: AliceCreator = (
  React,
  OS,
  store,
  ProviderComponent: typeof Provider
) => ({ children }) => (
  <AsyncComponentProvider>
    <ProviderComponent store={store}>
      <OS>
        {children}
      </OS>
    </ProviderComponent>
  </AsyncComponentProvider>
)

export async function getAlice(React: typeof react, auth?: admin.auth.DecodedIdToken): Promise<(StatelessComponent<any> | void)> {
  try {
    const OS = await getOS({
      React,
      auth,
    })

    const store = configureStore()

    if(WINDOW) {
      (window as any).store = store
    }

    const Alice: Alice = createAlice(React, OS, store, Provider)

    return Alice
  } catch(e) {
    error(e)
  }

  return
}
