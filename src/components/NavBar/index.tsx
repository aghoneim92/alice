import * as React from 'react'
import { StatelessComponent } from 'react'

export const cssPrefix = 'os_navbar'

System.import('./index.scss')

export const NavBar: StatelessComponent<undefined> = ({
  children,
}) => {
  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}_content`}>
        {children}
      </div>
    </div>
  )
}
