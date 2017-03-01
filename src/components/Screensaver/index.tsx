import * as React from 'react'
import { StatelessComponent } from 'react'

System.import('./index.scss')

export const cssPrefix = 'os_screensaver'

export interface ScreensaverProps {
  disabled?: boolean
  entered?: boolean
  visible?: boolean
}

export const Screensaver: StatelessComponent<ScreensaverProps> = ({
  children,
  disabled,
  entered,
  visible,
}) => (
  <div
    className={
      `${
        cssPrefix
      }${
        visible ? ` ${cssPrefix}-visible` : ''
      }${
        disabled ? ` ${cssPrefix}-invisible` : ''
      }${
        entered ? ` ${cssPrefix}-entered` : ''
      }`
    }
  >
    {/*<Particles
      {...{width, height}}
    />*/}
    <canvas className={`${cssPrefix}_canvas`}/>
    {children}
  </div>
)

/*particles={{
        particlesNumber: 150,
        linkDist: 100,
        createLinkDist: 150,
        disableLinks: false,
        disableMouse: false,
        background: 'rgba(255, 255, 255, 0.5)',
        color: '#ffffff',
        linksWidth: 1,
      }}*/
