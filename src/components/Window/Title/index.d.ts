import * as Title from './index'

declare module './index' {
  type IdHandler = (str: string) => void
  type VoidHandler = () => void

  type TitleDragHandler = (deltaX: number, deltaY: number) => void

  type DragIdHandler =  (id: string, _: Event, args: {deltaX: number, deltaY: number}) => void

  interface BaseHandlers {
    onCloseClick: IdHandler | VoidHandler
    onDrag: DragIdHandler | TitleDragHandler
    onMouseEnter: IdHandler | VoidHandler
    onResizeClick: IdHandler | VoidHandler
  }

  interface Handlers extends BaseHandlers {
    onCloseClick: IdHandler
    onDrag: DragIdHandler
    onDragStart: IdHandler
    onDragEnd: IdHandler
    onMinimizeClick: IdHandler
    onMaximizeClick: IdHandler
    onMouseEnter: IdHandler
    onMouseLeave: IdHandler
    onResizeClick: IdHandler
  }

  interface DerivedHandlers extends BaseHandlers {
    onCloseClick: VoidHandler
    onDrag: TitleDragHandler
    onDragStart: VoidHandler
    onDragStop: VoidHandler
    onMouseEnter: VoidHandler
    onMouseLeave: VoidHandler
    onResizeClick: VoidHandler
  }

  interface TitleProps {
    fullScreen?: boolean
    inset?: boolean
    transparent?: boolean
    handlers: DerivedHandlers
    title: string
    TitleBar: any
  }
}
