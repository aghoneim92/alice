/// <reference path="./index.d.ts" />

import * as React from 'react'
import { Component, ComponentClass } from 'react'

import { derive, track } from 'react-derive'

import * as Tooltip from 'rc-tooltip'

import { withState } from 'recompose'

export const cssPrefix = 'os_sidebar_app'

@withState('launching', 'setLaunching', false)
@derive({
  onClick: track('setLaunching', 'onClick')(
    ({
      setLaunching,
      onClick,
    }: DerivedProps) =>
      () => {
        setLaunching(true)
        onClick(null as any)
      }
  ),
})
class Launcher extends Component<DerivedProps, any> {
    render() {
      const {
        props: {
          app,
          launching,
          onClick,
        },
      } = this

      return (
        <Tooltip
          placement="right"
          overlayClassName="os_tooltip"
          overlay={<span>{app.get('title')}</span>}
        >
          <div
            className={`${
              cssPrefix
            }${
              launching ? ' animated bounce' : ''
            }`}
            onClick={onClick}
          >
          {
            app.get('icon')
          }
          </div>
        </Tooltip>
      )
    }
  }

export const AppLauncher: ComponentClass<AppLauncherProps> = (Launcher as any)
