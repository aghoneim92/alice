/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from "react"

export const cssPrefix = 'os_desktop'

const Desktop: StatelessComponent<DesktopProps> = ({
  children
}) => (
  <div className={cssPrefix}>
    {children}
  </div>
)

export default Desktop
