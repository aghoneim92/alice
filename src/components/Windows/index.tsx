/// <reference path="./index.d.ts" />

import React, { StatelessComponent } from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { decorate } from './decorator'

import { Window } from '../Window'

System.import('./index.scss')

export const WindowsComponent: StatelessComponent<CombinedProps> = ({
  windows,
  handlers,
}) => (
  <div className='os_windows'>
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionAppearTimeout={5000}
      transitionEnterTimeout={5000}
      transitionLeaveTimeout={5000}
      transitionAppear
    >
    {
      windows.map(
        window => ({
          key: window.get('id'),
          window,
        })
      )
      .map(
        ({
          key,
          window,
        }) => ({
          key,
          window,
          handlers: handlers.get(key),
        })
      )
      .map(
        props => (
          <div key={props.key} className="os_window_wrapper">
            <Window {...props}/>
          </div>
        )
      ).toArray()
    }
    </ReactCSSTransitionGroup>
  </div>
)

export const Windows: StatelessComponent<WindowsProps> = decorate(WindowsComponent) as any
