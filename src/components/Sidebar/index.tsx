import * as React from 'react'
import { StatelessComponent, MouseEventHandler } from 'react'

import { Map } from 'immutable'
import { AppLauncher } from './AppLauncher'

System.import('./index.scss')

export const cssPrefix = 'os_sidebar'

export interface SidebarProps {
  apps: ImMap
  onAppClick: (key: string) => MouseEventHandler<HTMLElement>
  onSetOpen: any
  open?: boolean
  docked?: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

export const Sidebar: StatelessComponent<SidebarProps> = ({
  apps,
  closeSidebar,
  docked = true,
  onAppClick,
  open,
}) => (
  <div
    className={`${cssPrefix}${
      open ? ` ${cssPrefix}-open` : ''
    }${
      docked ? ` ${cssPrefix}-docked` : ''
    }`}
    onMouseLeave={() => docked ? undefined : closeSidebar()}
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
)
