import * as React from 'react'
import { StatelessComponent } from 'react'

System.import('./index.scss')

export const cssPrefix = 'os_desktop'

export interface DesktopProps {
}

export const Desktop: StatelessComponent<DesktopProps> = ({
  children,
}) => (
  <div className={cssPrefix} >
    {children}
  </div>
)
