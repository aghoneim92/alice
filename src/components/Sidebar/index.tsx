import * as React from 'react'
import { StatelessComponent, MouseEventHandler } from 'react'
import ReactSidebar from 'react-sidebar'

import * as Tooltip from 'rc-tooltip'

import { Map } from 'immutable'

System.import('./index.scss')

export const cssPrefix = 'os_sidebar'

export interface SidebarIconProps {
  app: Map<string, any>
  onClick: MouseEventHandler<HTMLDivElement>
}

export const SidebarApp: StatelessComponent<SidebarIconProps> = ({ app, onClick }) => (
  <div
    className={`${cssPrefix}_app`}
    onClick={onClick}
  >
    <Tooltip placement="right" overlay={<p>{app.get('title')}</p>}>
    {
      app.get('icon')
    }
    </Tooltip>
  </div>
)

export interface SidebarProps {
  apps: ImMap
  onAppClick: (key: string) => MouseEventHandler<HTMLElement>
  onSetOpen: any
  open: boolean
}

export const Sidebar: StatelessComponent<SidebarProps> = ({
  apps,
  onAppClick,
  onSetOpen,
  open,
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
      <div style={{width: 50, height: '100%'}} className={`${cssPrefix}_content`}>
        {
          apps.map(
            (app: Map<string, any>) => (
              <SidebarApp
                key={app.get('id')}
                app={app}
                onClick={onAppClick(app.get('id'))}
              />
            )
          ).toArray()
        }
      </div>
    }
  >
    <div/>
  </ReactSidebar>
)
