/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

import { derive, track } from 'react-derive'

import { compose } from 'ramda'

import * as Tooltip from 'rc-tooltip'

import { withState } from 'recompose'

export const cssPrefix = 'os_sidebar_app'

const Launcher: StatelessComponent<DerivedProps> = ({
  app,
  launching,
  onClick,
}) => (
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

const enhancer = compose(
  withState('launching', 'setLaunching', false),
  derive({
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
)



export const AppLauncher: StatelessComponent<AppLauncherProps> = enhancer(
  Launcher
) as any
