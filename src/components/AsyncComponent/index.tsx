import * as React from 'react'
import { ComponentClass, ReactElement } from 'react'

import { resolve } from 'react-resolver'

import { path } from 'ramda'

interface AsyncProps<ComponentProps> {
  componentProps: ComponentProps
  Component: ComponentClass<ComponentProps>
  children: () => Promise<NodeModule>
  pathInModule: string[]
}

function Async<ComponentProps>(
  props: AsyncProps<ComponentProps>
): ReactElement<AsyncProps<ComponentProps>> {
  const { Component, componentProps } = props

  return <Component {...componentProps}/>
}

function createResolver<ComponentProps>() {
  return resolve({
    Component: ({
      pathInModule,
      children,
    }: AsyncProps<ComponentProps>) =>
      children().then(path(pathInModule))
  })
}

const resolver = createResolver()

export const AsyncComponent = resolver(Async)
