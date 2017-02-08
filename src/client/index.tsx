/// <reference path="../index.d.ts"/>
import * as React from 'react'
import { render } from 'react-dom'
import getHotReloadStore from '../lib/getHotReloadStore'

import { OS } from '../components/OS'

const state = getHotReloadStore('state', () => ({
  div: document.createElement('div'),
}))

document.querySelector('body')!.appendChild(state.div)

render(
  <OS/>,
  state.div
)
