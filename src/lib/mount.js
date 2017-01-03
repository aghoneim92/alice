import React from 'react'
import { mount } from 'enzyme'
import { spy } from 'sinon'

export default ({
  Component,
  props,
  options: {
    spies = [],
  } = { spies: [] },
}) => ({ context }) => {
  const { document } = context
  global.document = document
  global.window = document.defaultView
  global.window.document = document
  const propSpies = spies.map(
    fnName => ({
      [fnName]: spy(() => null),
    })
  )
  .reduce(
    (a, b) => ({
      ...a,
      ...b,
    }), {}
  )
  context.wrapper = mount(
    <Component {...props} {...propSpies}/>
  )
  context.spies = propSpies
}
