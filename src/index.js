import React from 'react'
import { render } from 'react-dom'

import OS from './components/OS'

const div = document.createElement('div')
document.querySelector('body').appendChild(div)

render(
  <OS/>,
  div
)
