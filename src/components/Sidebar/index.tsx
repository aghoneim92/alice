import * as React from 'react'
import { StatelessComponent, MouseEventHandler } from 'react'
import ReactSidebar from 'react-sidebar'

import { Map } from 'immutable'
import { AppLauncher } from './AppLauncher'

System.import('./index.scss')

export const cssPrefix = 'os_sidebar'

export interface SidebarProps {
  apps: ImMap
  onAppClick: (key: string) => MouseEventHandler<HTMLElement>
  onSetOpen: any
  open?: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

export const Sidebar: StatelessComponent<SidebarProps> = ({
  apps,
  onAppClick,
  onSetOpen,
  open,
  // openSidebar,
  closeSidebar,
}) => (
  <ReactSidebar
    open={open}
    onSetOpen={onSetOpen}
    rootClassName={`${cssPrefix}${open ? ` ${cssPrefix}-open` : ''}`}
    overlayClassName={`${cssPrefix}_overlay`}
    styles={{
      overlay: {
        right: 'inherit',
        width: '60px',
      },
    }}
    sidebar={
      <div
        style={{width: 50, height: '100%'}}
        className={`${cssPrefix}_content`}
        onMouseLeave={closeSidebar}
      >
        {
          apps.map(
            (app: Map<string, any>) => (
              <AppLauncher
                key={app.get('id')}
                app={app}
                onClick={onAppClick(app.get('id'))}
                disableTooltip={!open}
              />
            )
          ).toArray()
        }
      </div>
    }
    transitions
    touch={false}
  >
    <div/>
  </ReactSidebar>
)
