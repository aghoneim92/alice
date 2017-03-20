/// <reference path="./index.d.ts" />
import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'

import * as react from 'react'
import { Resolver } from 'react-resolver'

import { prop } from 'ramda'

import { error } from '../lib/logging'

import { aliceGetter, Alice } from '../components/index'

const root = document.getElementById('Alice')

const createEl = (React: typeof react, Alice: Alice) => (
  <AppContainer>
    <Alice/>
  </AppContainer>
)

const doRender: Renderer = ({
  React,
  Alice,
}) => {
  Resolver.render(
    () => createEl(React, Alice),
    root
  )
}

const getGetAlice: getGetAlice = (React: typeof react) =>
  System.import('../components/index')
        .then(prop('getAlice'))
        .then( (getAlice: aliceGetter) => getAlice(React) )

async function boot() {
  try {
    const React = await System.import('react')
    const { render } = await System.import('react-dom')
    const Alice = await getGetAlice(React)

    doRender({
      Alice,
      React,
      render,
    })

    if (module.hot) {
      module.hot.accept(
        '../components/index',
        boot
      )
    }
  } catch(e) {
    error(e)
  }
}

boot()
