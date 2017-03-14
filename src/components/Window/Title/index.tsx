/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

export const Title: StatelessComponent<TitleProps> = ({
  fullScreen,
  handlers,
  inset,
  title,
  TitleBar,
  transparent,
}) => (
  <TitleBar
    {...{inset, title, transparent}}
    controls
    isFullscreen={fullScreen}
    {...handlers}
  />
)
