import * as react from 'react'
import { StatelessComponent } from 'react'

import { Provider } from 'react-redux'

import { Store } from 'redux'

import * as Alice from './index'

import { OSComponent } from './OS'


declare module './index' {
  interface AliceProps {}
  type Alice = StatelessComponent<AliceProps>
  
  type AliceCreator = (
    React: typeof react,
    OS: OSComponent,
    store: Store<State>,
    ProviderComponent: typeof Provider
  ) => Alice
  type aliceGetter = (React: typeof react) =>
    Promise<(StatelessComponent<any> | void)>
}
