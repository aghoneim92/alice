import { derive, track } from 'react-derive'
import { compose } from 'ramda'

import { pure } from 'recompose'

import { WindowsComponent, WindowsProps } from '.'

const convertHandler = (id: string) => (handler: Function) =>
  (...args: any[]) =>
    handler(id, ...args)

const handlerDeriver = derive({
  handlers: track('handlers', 'windows')(({
    handlers,
    windows,
  }: WindowsProps) => windows.map(
    window => {
      const id: string = window.get('id')
      const convertedHandlers = handlers.map(convertHandler(id))

      return convertedHandlers
    }
  )),
})

export const decorate = compose(
  (comp: WindowsComponent) => pure(comp),
  handlerDeriver,
)

