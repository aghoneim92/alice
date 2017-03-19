import { ComponentClass, StatelessComponent } from 'react'

import '.'

declare module '.' {
  type ReactType<P> = ComponentClass<P> | StatelessComponent<P>
}
