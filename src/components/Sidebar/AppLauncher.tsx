/// <reference path="./index.d.ts" />

import * as React from 'react'
import { Component, ComponentClass } from 'react'

import { derive, track } from 'react-derive'

import * as Tooltip from 'rc-tooltip'

import { withState } from 'recompose'

export const cssPrefix = 'os_sidebar_app'

const LAUNCH_ANIMATION_PERIOD = 5000


@withState('launching', 'setLaunching', false)
@derive({
  onClick: track('setLaunching')(
    ({
      setLaunching,
    }: DerivedProps) =>
      () => setLaunching(true)
  ),
})

class Launcher extends Component<DerivedProps, any> {
    timer?: any

    disableAnimation = () => this.props.setLaunching(false)

    handleClick = () => {
      if(!this.timer) {
        this.timer = setTimeout(
          this.disableAnimation,
          LAUNCH_ANIMATION_PERIOD
        )
      }
    }

    componentWillUnMount() {
      if(this.timer) {
        clearTimeout(this.timer)
      }
    }

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