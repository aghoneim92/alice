import { ComponentClass, StatelessComponent } from 'react'

import { Enhancer } from '../../../../lib/enhancer'

import '.'

declare module '../Flowers' {
  type FlowersComponent = StatelessComponent<undefined>
}
