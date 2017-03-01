import * as React from 'react'
import { ReactElement, StatelessComponent, MouseEventHandler } from 'react'

export const cssPrefix = 'os_logo'

System.import('./index.scss')

export interface LogoProps {
  emoji: string
  onClick: MouseEventHandler<HTMLDivElement>
}

export type LogoElement = ReactElement<LogoProps>

export const Logo: StatelessComponent<LogoProps> = ({
  children,
  emoji,
  onClick,
}) => (
  <div id="Logo" className={cssPrefix} onClick={onClick}>
    <span>
      {emoji}
    </span>
    { children }
  </div>
)

// force >= 0.1 && force < 0.2 ?
// <div className={`${cssPrefix}_clickHalo`} >
//   <Circle
//     strokeWidth="2"
//     percent={(force - 0.1) * 100 / 0.1}
//   />
// </div> : null