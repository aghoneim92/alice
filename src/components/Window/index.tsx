/// <reference path="../../types/index.d.ts" />
/// <reference path="./index.d.ts" />
import * as React from 'react'
import { StatelessComponent } from 'react'

import * as Draggable from 'react-draggable'
import * as MacOSDesktop from 'react-desktop/macOs'
import * as WindowsDesktop from 'react-desktop/windows'

System.import('./index.scss')

export const cssPrefix = 'os_window'

interface TitleProps {
  id: string
  fullScreen: boolean
  title: string
  TitleBar: any;
}

export const WindowTitle: StatelessComponent<TitleProps> = ({
  id,
  title,
  fullScreen,
  TitleBar,
}) => (
  <div className={`${cssPrefix}_title ${cssPrefix}_title_${id}`}>
    <TitleBar
      title={title}
      controls
      isFullscreen={fullScreen}
    />
  </div>
)

export interface WindowProps {
  window: ImMap;
  onDragStop?: Function;
}

export const Window: StatelessComponent<WindowProps> = ({
  window,
  onDragStop,
}) => {
  const {
    title = '',
    app = null,
    className = '',
    id = '',
    maximized = false,
    theme = 'macOS',
    fullScreen = false,
    titleBarFocused = true,
  } = window.toObject()

  const {
    Window: DesktopWindow,
    TitleBar,
  } = theme.includes('mac') ? MacOSDesktop : WindowsDesktop

  return (
    <Draggable
      axis="both"
      handle={`.${cssPrefix}_title_${id}`}
      onStop={onDragStop}
      position={ maximized ? { x: 0, y: 0 } : null }
    >
      <div
        style={fullScreen ? { top: 0, left: 0, right: 0, bottom: 0 } : {}}
        className={`${cssPrefix}${
          fullScreen ? ` ${cssPrefix}-fullScreen` : ''
        }${titleBarFocused ? ` ${cssPrefix}_title-hover` : ''}${
          maximized ? ` ${cssPrefix}-maximized` : ''
        }${
          className
        }`}
      >
        <DesktopWindow
          className={`${cssPrefix}_desktopWindow`}
          padding = {0}
        >
          <WindowTitle {...{id, fullScreen, title, TitleBar}}/>
          {app}
        </DesktopWindow>
      </div>
    </Draggable>
  )
}


// onMouseEnter={onTitleBarMouseEnter}
//            onMouseLeave={onTitleBarMouseLeave}
//            onDoubleClick={onMaximizeClick}
 //           {...{
   //           onCloseClick,
  //            onMinimizeClick,
  //            onMaximizeClick,
  //            onResizeClick,
   //         } */