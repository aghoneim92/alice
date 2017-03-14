/// <reference path="./index.d.ts" />

import * as react from 'react'
import { StatelessComponent } from 'react'

import { Provider } from 'react-redux'

import { configureStore } from '../store/index'

import { error } from '../lib/logging'

export const createAlice: AliceCreator = (
  React,
  OS,
  store,
  ProviderComponent: typeof Provider
) => ({ children }) => (
  <ProviderComponent store={store}>
    <OS>
      {children}
    </OS>
  </ProviderComponent>
)

export async function getAlice(React: typeof react): Promise<(StatelessComponent<any> | void)> {
  try {
    const { Provider } = await System.import('react-redux')
    const { getOS } = await System.import(__dirname + '/OS/index.tsx')
    const OS = await getOS()
    const store = configureStore()
    const Alice: Alice = createAlice(React, OS, store, Provider)

    return Alice
  } catch(e) {
    error(e)
  }

  return
}
