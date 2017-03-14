import { ComponentClass } from 'react'

import { mapDispatchToProps } from './mapDispatchToProps'
import { identity } from 'ramda'
import { connect as reduxConnect } from 'react-redux'

export const connect: <P>(
  component: ComponentClass<P>
) => ComponentClass<P> = reduxConnect(
  identity,
  mapDispatchToProps,
)