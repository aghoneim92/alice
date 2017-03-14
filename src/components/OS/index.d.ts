import { resolve } from 'react-resolver'
import { reselect } from './../../lib/reselect'
import { error } from './../../lib/logging'
import { connect } from './../../lib/connect'
import { compose, prop } from 'ramda'
import * as React from 'react'
import { EditorState } from 'draft-js'
import { ComponentClass } from 'react'
import { enhancer, withState } from 'recompose'

import * as OS from '../OS'

declare module '../OS' {
  type Enhancer<P, E> = (component: ComponentClass<P>) => ComponentClass<E>

  type OSComponent = ComponentClass<OSProps>

  interface InternalState {
    firebaseLogin: boolean
    dimensions: {
      width: number,
      height: number
    }
  }

  interface InternalCallbacks {
    onFirebaseLogin: Function
  }

  interface OSProps {}

  type CombinedProps = PropsFromState
    & DispatchProps
    & InternalState
    & InternalCallbacks
    & {
      background?: string
      currentWindow?: Map<string, any>
      done?: Function
      editor: any
      layout?: any
      onEditorChange: (editorState: EditorState) => void
      onDimensionsChanged: Function
      README: string
      router: any
      windows: Map<string, ImMap>
    }

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
    firebaseConnect: any
    withState: typeof withState
  }

  type ComponentGetter<A, P> = (args: A) => Promise<ComponentClass<P>>

  type OSGetter = ComponentGetter<OSGetterArgs, CombinedProps>
}
