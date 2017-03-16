/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

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
      transitionName={{
        enter: 'fadeIn',
        enterActive: 'fadeIn',
        leave: 'fadeOut',
        leaveActive: 'fadeOut',
      }}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
    {
      windows.map(
        window => ({
          key: window.get('id'),
          window,
        }) as any
      )
      .map(
        ({
          key,
          window,
        }) => ({
          key,
          window,
          handlers: handlers.get(key) as any,
        }) as any
      )
      .map(
        props => (
          <div key={props.key} className="os_window_wrapper animated">
            <Window {...props}/>
          </div>
        )
      ).toArray()
    }
    </ReactCSSTransitionGroup>
  </div>
)

export const Windows: StatelessComponent<WindowsProps> = decorate(WindowsComponent) as any
