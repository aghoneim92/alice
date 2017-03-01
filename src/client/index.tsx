/// <reference path="./index.d.ts" />
import 'react-hot-loader/patch'

import { prop } from 'ramda'

import * as React from 'react'
import { StatelessComponent } from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { error } from '../lib/logging'

const root = document.getElementById('Alice')

type Renderer = (Alice: StatelessComponent<any>) => void

const doRender: Renderer = Alice => {
  const el = (
    <AppContainer>
      <Alice/>
    </AppContainer>
  )

  if(el) {
    render(el, root)
  }
}

const getRoutes: (() => Promise<any>) = () =>
  System.import('../components/Alice')
        .then(prop('getAlice'))
        .then( (getAlice: Function) => getAlice() )

if (module.hot) {
  module.hot.accept(
    '../components/Alice',
    () =>
      getRoutes().then(doRender)
                 .catch(error)
  )
}

getRoutes().then(doRender)
