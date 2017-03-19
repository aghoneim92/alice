/// <reference path="../../../index.d.ts" />
/// <reference path="./index.d.ts" />

import * as React from 'react'
import { PureComponent } from 'react'

import Clock from 'react-clockwall'
import EventListener from 'react-event-listener'
import * as Helmet from 'react-helmet'

import { Map } from 'immutable'

import { WallpaperBlur } from '../WallpaperBlur'

import { SizeDelta } from '../Window'
import { Handlers as WindowHandlers } from '../Windows'

import { APP_URL } from '../../constants'
import { WINDOW, FB_APP_ID } from '../../constants'
import { PROD } from '../../constants/env'

import * as LoginModule from '../Login'

import * as capitalize from 'capitalize'

import { error } from '../../lib/logging'

import { getFirebase, firebaseConnect } from 'react-redux-firebase'

import { enhancer } from './enhancer'

System.import('./index.scss')
System.import('firebaseui/dist/firebaseui.css')

export const cssPrefix = 'os'

console.log('PROD:', PROD)

const loginClickHandler = (providerName: string) => {
  const firebase = getFirebase()
  const Provider = firebase.auth[`${capitalize(providerName)}AuthProvider`]
  const provider = new Provider()

  firebase.auth().signInWithRedirect(provider)
}

export const getOS: OSGetter = async () => {
  try {
    const { Apps } = await System.import(__dirname + '/../Apps')
    const { Desktop } = await System.import(__dirname + '/../Desktop')
    const { Logo } = await System.import(__dirname + '/../Logo')
    const { Login }: typeof LoginModule = await System.import(__dirname + '/../Login')
    const { NavBar } = await System.import(__dirname + '/../NavBar')
    const { Menu } = await System.import(__dirname + '/../Menu')
    const { Sidebar } = await System.import(__dirname + '/../Sidebar')
    const { Windows } = await System.import(__dirname + '/../Windows')
    const { Screensaver } = await System.import(__dirname + '/../Screensaver')
    const { Camera } = await System.import(__dirname + '/../Camera')

    const IdleTimer = WINDOW && require('react-idle-timer').default

    class OS extends PureComponent<CombinedProps, undefined>{
      tilesRef?: any

      componentDidMount() {
        this.handleDocumentResize()

        ;(window as any).fbAsyncInit = () => {
          FB.init({
            appId      : FB_APP_ID,
            xfbml      : true,
            version    : 'v2.8'
          });
          FB.AppEvents.logPageView();

          this.props.setFB(FB)
        };

        (function(d, s, id){
          var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s) as HTMLScriptElement; js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs!.parentNode!.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }

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
          deltaY = 0,
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
            },
            documentTitle,
            emoji,
            FB,
            firebase: {
              auth,
            },
            idle,
            menuOpen,
            onActive,
            onIdle,
            sidebarOpen,
            README,
            windows,
          },
        } = this

        return auth ? (
          <div
            className={`${
              cssPrefix
            }`}
            style={{
              backgroundImage: WINDOW ?
                `url('${
                  APP_URL
                }${
                  background
                }')`
              : ''
            }}
          >
          {
            idle && <Screensaver onClick={onActive}/>
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
            />
            <Helmet
              title={documentTitle}
              meta={[
                { name: 'charset', content: 'UTF-8' },
              ]}
            />
            <WallpaperBlur width={width} background={background}/>
            <NavBar>
              <Logo onClick={handleLogoClick} emoji={emoji}/>
              <Menu
                FB={FB}
                open={menuOpen}
                onClickOutside={handleMenuClickOutside}
                README={README}
              />
              <Camera onCapture={handleCameraCapture}/>
              <Clock config={{ timezone: 'Europe/Berlin', town: 'Berlin'}} />
            </NavBar>
            <Desktop>
              <Windows
                windows={windows}
                handlers={windowHandlersMap}
              />
            </Desktop>
            <Sidebar
              apps={Apps}
              onAppClick={handleAppIconClick}
              open={sidebarOpen}
              onSetOpen={openSidebar}
              {...{openSidebar, closeSidebar}}
            />
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
        ) : <Login onButtonClick={loginClickHandler}/>
      }
    }

    const enhanced = enhancer(OS)
    const firebaseConn = firebaseConnect([
      'public'
    ])

    return WINDOW ? firebaseConn(enhanced) : enhanced
  } catch(e) {
    error(e)
  }
}


