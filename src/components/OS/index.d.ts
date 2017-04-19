import { resolve } from 'react-resolver'
import { reselect } from './../../lib/reselect'
import { error } from './../../lib/logging'
import { connect } from './../../lib/connect'
import { compose, prop } from 'ramda'
import * as React from 'react'
import { ComponentClass } from 'react'
import { withState } from 'recompose'

import * as OS from '../OS'

declare module '../OS' {
  type Enhancer<P, E> = (component: ComponentClass<P>) => ComponentClass<E>

  type OSComponent = ComponentClass<OSProps>

  interface InternalState {
    dimensions: {
      width: number,
      height: number
    }
    idle: boolean
    FB: any
    kernel: any
  }

  interface StateCallbacks {
    setIdle: (idle: boolean) => void
    setFB: (FB: any) => void
    onDimensionsChanged: Function
    setKernel: (kernel: any) => void
  }

  interface OSProps {
  }

  interface DerivedProps {
    onActive: () => void
    onIdle: () => void
  }

  interface ResolvedProps {
    background: string
    README: string
    favicon: string
  }

  interface ReselectProps {
    currentWindow?: Map<string, any>
  }

  type CombinedProps = PropsFromState
    & ReselectProps
    & DispatchProps
    & DerivedProps
    & InternalState
    & ResolvedProps
    & StateCallbacks
    & OSProps

  type HandleWindowDrag = (
    id: string,
    _: Event,
    options: {
      deltaX?: number,
      deltaY?: number,
    }
  ) => void

  interface OSGetterArgs {
    React: typeof React
    auth: any
  }

  type ComponentGetter<A, P> = (args: A) => Promise<ComponentClass<P>>

  type OSGetter = ComponentGetter<OSGetterArgs, CombinedProps>
}
