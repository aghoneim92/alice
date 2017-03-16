/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

import { screensavers } from './screensavers'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

System.import('./index.scss')

export const cssPrefix = 'os_screensaver'

export const Screensaver: StatelessComponent<ScreensaverProps> = ({
  screensaver = 'Rings',
  onClick,
}) => (
  <ReactCSSTransitionGroup
    transitionName={{
      appear: 'fadeIn',
      appearActive: 'fadeIn',
      leave: 'fadeOut',
      leaveActive: 'fadeOut',
    }}
    transitionAppearTimeout={500}
    transitionLeaveTimeout={500}
    transitionAppear
    transitionEnter={false}
  >
    <div
      className={cssPrefix}
      onClick={onClick}
    >
    {
      React.createElement(screensavers[screensaver])
    }
    </div>
  </ReactCSSTransitionGroup>
)
