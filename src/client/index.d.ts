import * as React from 'react'
import { createElement, StatelessComponent } from 'react'
import { render } from 'react-dom'

import { Alice } from '../components/index'

import * as index from './index'

declare module './index' {
  interface BootArgs {
    React: typeof React
    render: typeof render
  }

  type boot = (args: BootArgs) => Promise<void>

  type getGetAlice = (react: typeof React) => Promise<Alice>

  interface RendererArgs {
    Alice: StatelessComponent<any>
    React: typeof React
    render: typeof render
  }
  type Renderer = (args: RendererArgs) => void
}

