import * as React from 'react'
import { ReactElement, StatelessComponent, MouseEventHandler } from 'react'

export const cssPrefix = 'os_logo'

System.import('./index.scss')

export interface LogoProps {
  onClick: MouseEventHandler<HTMLDivElement>
  src: string
}

export type LogoElement = ReactElement<LogoProps>

export const Logo: StatelessComponent<LogoProps> = ({
  onClick,
  src,
}) => (
  <div
    id="Logo"
    style={{
      backgroundImage: src,
    }}
    className={cssPrefix}
    onClick={onClick}
  />
)
