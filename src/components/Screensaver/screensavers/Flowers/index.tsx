/// <reference path="./index.d.ts" />

import * as React from 'react'
import { APP_URL } from "../../../../constants"

System.import('./index.scss')

export const cssPrefix = 'os_screensaver_flowers'

let src = ''

System.import('./monkey.jpg').then(
  _src => src = _src
)

export const Flowers: FlowersComponent = () => (
  <div className={cssPrefix}>
    <div
      className={`${cssPrefix}_content`}
      style={{ backgroundImage: `url('${APP_URL}${src}')` }}
    />
  </div>
)

