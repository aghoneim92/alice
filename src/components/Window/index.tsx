/// <reference path="./index.d.ts" />
/// <reference path="../../types/index.d.ts" />
/// <reference path="../../../index.d.ts" />

import * as React from 'react'
import { StatelessComponent } from 'react'

import * as Draggable from 'react-draggable'
import * as Resizable from 'react-resizable-box'

import { Title } from './Title'

import { decorate } from './decorator'

import { Apps } from '../Apps'

System.import('./index.scss')

export const cssPrefix = 'os_window'

export const WindowComponent: StatelessComponent<DerivedProps> = ({
  components: {
    Window: DesktopWindow,
    TitleBar,
  },
  handlers,
  window: {
    appId,
    className = '',
    fullScreen,
    id = '',
    maximized,
    minimized,
    title = '',
    titleBarFocused,
    width = 100,
    height = 100,
    x = 0,
    y = 0,
  },
}) => (
  <Draggable
    axis="both"
    handle={`.${cssPrefix}_title_${id}`}
    onDrag={handlers.onDrag}
    onStart={handlers.onDragStart}
    onStop={handlers.onDragStop}
    position={
      fullScreen ?
      { x: 0, y: -20 }
    : maximized ?
      { x: 0, y: 0 }
    : minimized ?
      { x: 50, y: height }
    : { x, y }
    }
    minWidth={200}
    minHeight={50}
  >
    <div
      style={fullScreen ? { top: 0, left: 0, right: 0, bottom: 0 } : {}}
      className={`${
        cssPrefix
      }${
        fullScreen ? ` ${cssPrefix}-fullScreen` : ''
      }${
        titleBarFocused ? ` ${cssPrefix}-title-hover` : ''
      }${
        maximized ? ` ${cssPrefix}-maximized` : ''
      }${
        minimized ? ` ${cssPrefix}-minimized` : ''
      }${
        className
      }`}
    >
      <Resizable
        width={
          fullScreen || maximized || minimized ?
            '100%'
          : width
        }
        height={
          fullScreen || maximized || minimized ?
            '100%'
          : height
        }
        customClass={
          `${
            cssPrefix
          }_resizable${
            fullScreen ? ` ${cssPrefix}_resizable-fullScreen` : ''
          }`
        }
        onResize={handlers.onResize}
        isResizable={
          fullScreen ?
            {
              top: false,
              topRight: false,
              topLeft: false,
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
              left: false,
              right: false
            }
          : undefined
        }
      >
        <DesktopWindow
          className={`${cssPrefix}_desktopWindow`}
          padding = {0}
        >
          <div className={`os_window_title os_window_title_${id}`}>
            <Title
              {...{title, TitleBar}}
              fullScreen={fullScreen}
              inset={minimized}
              transparent={minimized}
              handlers={handlers}
            />
          </div>
          <div
            className={`${
              cssPrefix
            }_title_capture${
              fullScreen ?
                ` ${cssPrefix}_title_capture-fullScreen`
              : ''
            }`}
            onMouseEnter={handlers.onMouseEnter}
            onMouseLeave={handlers.onMouseLeave}
          />
          <div className={`${cssPrefix}_content`}>
          {
            React.createElement(Apps.getIn([appId, 'Component'], 'div'))
          }
          </div>
        </DesktopWindow>
      </Resizable>
    </div>
  </Draggable>
)

export const Window: StatelessComponent<WindowProps> = decorate(
  WindowComponent
) as any

export default Window
