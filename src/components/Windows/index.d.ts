import { StatelessComponent } from 'react';
import { Functor } from "@types/ramda"

import { Map } from 'immutable'

import {
  BaseHandlers as TitleBaseHandlers,
  DerivedHandlers as TitleDerivedHandlers,
  Handlers as TitleHandlers,
} from '../Window/Title'

import { SizeDelta, WindowResizeHandler } from '../Window'

import '.'

declare module '.' {
  type WindowDragHandler = (deltaX: number, deltaY: number) => void

  interface BaseHandlers extends TitleBaseHandlers {
    onResize: WindowResizeHandler | (
      (
        id: string,
        direction: string,
        delta: SizeDelta,
      ) => void
    )
  }

  interface Handlers extends TitleHandlers {
    onResize: (
      id: string,
      direction: string,
      delta: SizeDelta,
    ) => void
  }

  interface DerivedHandlers extends TitleDerivedHandlers {
    onResize: WindowResizeHandler
  }

  type CloseClickHandler = () => void
  type ResizeHandler = WindowResizeHandler
  type ResizeClickHandler = WindowResizeHandler

  type DragClickHandler = (deltaX: number, deltaY: number) => void

  type Handler = CloseClickHandler | DragClickHandler | ResizeHandler | ResizeClickHandler

  interface WindowsProps {
    windows: ImMap
    handlers: Map<string, any>
    kernel: any
  }

  interface DerivedProps extends WindowsProps {
    handlers: Map<string, Map<string, Handler>>
  }

  type CombinedProps = DerivedProps

  type WindowsComponent = StatelessComponent<WindowsProps>
}
