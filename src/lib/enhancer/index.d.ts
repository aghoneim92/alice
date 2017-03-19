import { ComponentClass, StatelessComponent } from 'react'

import { ReactType } from '../react'

import '.'

declare module '../enhancer' {
  type Enhancer<P, E> = (component: ReactType<E>) => ComponentClass<P>
}
