import * as React from 'react'
import { StatelessComponent } from 'react'
import { Provider } from 'react-redux'

import OS from './OS'

import { configureStore } from '../store/index'

import { error } from '../lib/logging'

// import { WINDOW } from '../constants/index'

export const getAlice = (): StatelessComponent<any> => {
  let store = {}

  try {
    store = configureStore(
      // router,
    )
  } catch(e) {
    error(e)
  }

  const Alice = ({ children }: { children: any }) => (
    <Provider store={store}>
      <OS>
        {children}
      </OS>
    </Provider>
  )

  return Alice
}
