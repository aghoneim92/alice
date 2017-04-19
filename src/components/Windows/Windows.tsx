/// <reference path="./index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Window } from '../Window'
import { CombinedProps } from '.'

System.import('./index.scss')

export const Windows: StatelessComponent<CombinedProps> = ({
  windows,
  handlers,
  kernel,
}) => (
  <div className="os_windows">
    <ReactCSSTransitionGroup
      transitionName={{
        enter: 'fadeIn',
        enterActive: 'fadeIn',
        leave: 'fadeOut',
        leaveActive: 'fadeOut',
      }}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
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
              kernel,
              handlers: handlers.get(key) as any,
            }) as any
          )
          .map(
          props => (
            <div key={props.key} className="os_window_wrapper animated">
              <Window {...props} />
            </div>
          )
          ).toArray()
      }
    </ReactCSSTransitionGroup>
  </div>
)

