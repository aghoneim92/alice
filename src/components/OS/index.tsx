/// <reference path="../../../index.d.ts" />
/// <reference path="./index.d.ts" />

import { PureComponent } from 'react'

import Clock from 'react-clockwall'
import EventListener from 'react-event-listener'
import * as Helmet from 'react-helmet'
import * as Favicon from 'react-favicon'

import { HotKeys } from 'react-hotkeys'

import { firebaseConnect } from 'react-redux-firebase'

import { merge } from 'ramda'

import { withProps } from 'recompose'

import { Map } from 'immutable'

import { Desktop } from '../Desktop'
import { Logo } from '../Logo'
import { WallpaperBlur } from '../WallpaperBlur'
import { SizeDelta } from '../Window'
import { Handlers as WindowHandlers } from '../Windows'

import { WINDOW, FB_APP_ID } from '../../constants'

import { error } from '../../lib/logging'

import { enhancer } from './enhancer'
import { PROD } from '../../constants/env'

export const cssPrefix = 'os'

export const getOS: OSGetter = async ({ React, auth }) => {
  try {
    const { Apps } = await System.import(__dirname + '/../Apps')
    const { NavBar } = await System.import(__dirname + '/../NavBar')
    const { Menu } = await System.import(__dirname + '/../Menu')
    const { Sidebar } = await System.import(__dirname + '/../Sidebar')
    const { Windows } = await System.import(__dirname + '/../Windows')
    const { Screensaver } = await System.import(__dirname + '/../Screensaver')
    const { Camera } = await System.import(__dirname + '/../Camera')

    const IdleTimer = WINDOW && require('react-idle-timer').default

    class OS extends PureComponent<CombinedProps, undefined> {
      tilesRef?: any

      componentWillMount() {
        System.import('./index.scss')
        System.import('firebaseui/dist/firebaseui.css')
      }

      componentDidMount() {
        this.handleDocumentResize()

          // tslint:disable:semicolon
          ; (window as any).fbAsyncInit = () => {
            FB.init({
              appId: FB_APP_ID,
              xfbml: true,
              version: 'v2.8'
            });
            FB.AppEvents.logPageView();

            this.props.setFB(FB)
          };

        (function (d, s, id) {
          let js: HTMLScriptElement
          const fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s) as HTMLScriptElement; js.id = id;
          js.src = '//connect.facebook.net/en_US/sdk.js';
          fjs!.parentNode!.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
      // tslint:enable:semicolon

      handleAppIconClick = (key: string) => () =>
        this.props.onAppIconClick(key)
        && this.props.toggleSidebarOpen()

      handleLogoClick = () => this.props.toggleMenuOpen()

      handleMenuClickOutside = () =>
        this.props.menuOpen
        && this.props.toggleMenuOpen()

      handleTilesRef = (ref: any) => this.tilesRef = ref

      handleTitleBarMouseEnter = (id: string) => this.props.onWindowChange({
        id,
        titleBarFocused: true,
      })

      handleTitleBarMouseLeave = (id: string) => this.props.onWindowChange({
        id,
        titleBarFocused: false,
      })

      handleDocumentResize = () => this.props.onDimensionsChanged({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      handleWindowCloseClick = (id: string) =>
        this.props.onWindowDestroy(id)

      handleWindowDrag: HandleWindowDrag = (
        id,
        _,
        {
          deltaX = 0,
          deltaY = 0
        }
      ) => this.props.onWindowMove(
        id,
        deltaX,
        deltaY,
        )

      handleWindowDragStart = (id: string) => this.props.onWindowChange({
        id,
        dragging: true,
      })

      handleWindowDragEnd = (id: string) => this.props.onWindowChange({
        id,
        dragging: false,
      })

      handleWindowFullScreen = (id: string) =>
        this.props.toggleWindowFullScreen(id)

      handleWindowMinimizeClick = (id: string) => this.props.onWindowChange({
        id,
        minimized: true,
      })

      handleWindowResize = (
        id: string,
        direction: string,
        delta: SizeDelta
      ) => console.log('id', id, 'direction', direction, 'delta', delta)

      handleWindowMaximizeClick = (id: string) => this.props.onWindowChange({
        id,
        maximized: true,
      })

      windowHandlers: WindowHandlers = {
        onCloseClick: this.handleWindowCloseClick,
        onDrag: this.handleWindowDrag,
        onDragStart: this.handleWindowDragStart,
        onDragEnd: this.handleWindowDragEnd,
        onMouseEnter: this.handleTitleBarMouseEnter,
        onMouseLeave: this.handleTitleBarMouseLeave,
        onResize: this.handleWindowResize,
        onResizeClick: this.handleWindowFullScreen,
        onMinimizeClick: this.handleWindowMinimizeClick,
        onMaximizeClick: this.handleWindowMaximizeClick,
      }

      windowHandlersMap = Map<string, any>(this.windowHandlers)

      openSidebar = () => this.props.setSidebarOpen(true)
      closeSidebar = () => this.props.setSidebarOpen(false)

      handleCameraCapture = (image: string) => {
        image = ''
      }

      render() {
        const {
          handleAppIconClick,
          handleCameraCapture,
          handleDocumentResize,
          handleLogoClick,
          handleMenuClickOutside,
          windowHandlersMap,
          openSidebar,
          closeSidebar,
          props: {
            background,
            children,
            dimensions: {
              width,
              height,
            },
            documentTitle,
            favicon,
            FB,
            idle,
            menuOpen,
            onActive,
            onIdle,
            sidebarOpen,
            README,
            windows,
          },
        } = this

        return (
          <HotKeys
            handlers={{
              'command+up': () => console.log('hiii')
            }}
          >
            <div
              className={`${
                cssPrefix
                }`}
              style={{
                backgroundImage: WINDOW ?
                  `url('${
                  background
                  }')`
                  : ''
              }}
            >
              {
                idle && <Screensaver onClick={onActive} />
              }
              {
                IdleTimer
                && <IdleTimer
                  element={document}
                  idleAction={onIdle}
                  timeout={120000}
                />
              }
              <EventListener
                target="window"
                onResize={handleDocumentResize}
                onKeyPress={
                  (key) => console.log(key)
                }
              />
              <Helmet
                title={documentTitle}
                meta={[
                  { name: 'charset', content: 'UTF-8' },
                ]}
                link={
                  PROD ? [{
                    rel: 'shortcut icon', href: 'favicon.png'
                  }] : []
                }
              />
              <Favicon url={[favicon]} />
              <WallpaperBlur {...{ width, height, background }} />
              <NavBar>
                <Logo onClick={handleLogoClick} />
                <Menu
                  FB={FB}
                  open={menuOpen}
                  onClickOutside={handleMenuClickOutside}
                  README={README}
                />
                <Camera onCapture={handleCameraCapture} />
                <Clock config={{ timezone: 'Europe/Berlin', town: 'Berlin' }} />
              </NavBar>
              <Sidebar
                apps={Apps}
                onAppClick={handleAppIconClick}
                open={sidebarOpen}
                onSetOpen={openSidebar}
                {...{ openSidebar, closeSidebar }}
              />
              <Desktop>
                <Windows
                  windows={windows}
                  handlers={windowHandlersMap}
                />
              </Desktop>
              <div
                className={`${
                  cssPrefix
                  }_sidebar_capture${
                  sidebarOpen ? ` ${cssPrefix}_sidebar_capture-open` : ''
                  }`}
                onMouseEnter={openSidebar}
              />
              {children}
            </div>
          </HotKeys>
        )
      }
    }

    const enhanced = enhancer(OS)
    const firebaseConn = firebaseConnect([
      '/'
    ])

    return WINDOW ? firebaseConn(enhanced) : withProps(
      (props: OSProps): CombinedProps => merge(
        props, {
          firebase: {
            auth,
          },
        } as CombinedProps
      )
    )(enhanced)
  } catch (e) {
    error(e)
  }
}

