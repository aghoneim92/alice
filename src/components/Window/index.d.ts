import { DraggableEventHandler } from 'react-draggable'
import * as Window from './index'
import { ReactNode, ComponentClass } from 'react'

import { Map } from 'immutable'

import * as MacOSDesktop from 'react-desktop/macOs'
import * as WindowsDesktop from 'react-desktop/windows'

import { Handlers as TitleHandlers } from './Title'

import { DerivedHandlers, Handler, Handlers } from '../Windows'

declare module './index' {
  type DragHandler = (
    _: any,
    arg2: any
  ) => void

  type ResizeEventHandler = (
    direction: string,
    _: any,
    __: any,
    delta: SizeDelta
  ) => void

  interface SizeDelta {
    width: number
    height: number
  }

  interface WindowConfig {
    app?: ReactNode
    className?: string
    dragging?: boolean
    fullScreen?: boolean
    id: string
    minimized?: boolean
    maximized?: boolean
    title?: string
    titleBarFocused?: boolean
    theme?: string
    width?: number
    height?: number
    x?: number
    y?: number
  }

  interface WindowDeriver {}

  export type WindowResizeHandler = (
    direction: string,
    delta: SizeDelta
  ) => void

  type GetComponents = ({
    theme
  }: DerivedProps) => NodeModule
  type WindowToObject = (props: WindowProps) => any

  

  interface BaseProps {
    handlers: Map<string, Handler> | DerivedHandlers
  }

  interface WindowProps extends BaseProps {
    window: ImMap
    handlers: Map<string, Handler>
  }

  interface DerivedProps extends BaseProps {
    components: {
      Window: ComponentClass<any>
      TitleBar: ComponentClass<any>
    }
    theme: string
    window: WindowConfig
    handlers: DerivedHandlers
  }
}
