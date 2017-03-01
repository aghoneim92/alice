/// <reference path="../../index.d.ts" />
/// <reference path="./OS.d.ts" />

// import { WindowManager } from 'ventus'

import * as Solitaire from '../../react-solitaire'

import * as React from 'react'
import { PureComponent } from 'react'
import {
  firebaseConnect,
  // getFirebase,
} from 'react-redux-firebase/dist/index'
import { WallpaperBlur } from './WallpaperBlur/index'

import * as Helmet from 'react-helmet'

import { withState } from 'recompose'

import { EditorState, RichUtils } from 'draft-js'

// import Navigo from 'navigo'

import connect from '../lib/connect'
import derive from '../lib/derive'

import { APPS, APP_URL, BS_URL } from '../constants/index'
// import { DRAFT_EDITOR } from '../constants/WindowTypes'
import { WINDOW } from '../constants/index'
import { PROD } from '../constants/env'

import { Desktop } from './Desktop/index'
// import { Editor } from './Editor/index'
import { Logo } from './Logo/index'
import { NavBar } from './NavBar/index'
import { Menu } from './Menu/index'
import { Sidebar } from './Sidebar/index'
import { Windows } from './Windows/index'
// import { FirebaseLogin } from './FirebaseLogin/index'
import { Screensaver } from './Screensaver/index'

import { resolve } from 'react-resolver'

import EventListener from 'react-event-listener'

import Clock from 'react-clockwall'

console.log('PROD:', PROD)

System.import('./os.scss')

import { Map } from 'immutable'

export interface InternalState {
  sidebarOpen: boolean
  firebaseLogin: boolean
  dimensions: {
    width: number,
    height: number
  }
}

export interface InternalCallbacks {
  toggleSidebar: Function;
  onFirebaseLogin: Function
}

export type OSProps = PropsFromState
  & DispatchProps
  & InternalState
  & InternalCallbacks
  & {
    background?: string
    currentWindow?: Map<string, any>
    done?: Function
    editor: any
    layout?: any
    onEditorChange: (editorState: EditorState) => void
    onDimensionsChanged: Function
    README: string
    router: any
    windows: Map<string, ImMap>
  }

export const cssPrefix = 'os'

@derive
@resolve('background', () => System.import('../background.jpg'))
@resolve('README', () => System.import('../../README.md'))
@withState('dimensions', 'onDimensionsChanged', {
  width: 100,
  height: 100,
})
@withState('editor', 'onEditorChange', EditorState.createEmpty())
@withState('sidebarOpen', 'toggleSidebar', true)
@withState('firebaseLogin', 'onFirebaseLogin', false)
class OS extends PureComponent<OSProps, undefined>{
  tilesRef?: any

  componentDidMount() {
    // const wm = new WindowManager()
    this.handleWindowResize()
  }

  componentDidUpdate({ layout }: { layout: any }) {
    const { props, tilesRef } = this
    if(!layout && props.layout && tilesRef) {
      // debug(tilesRef)
      // wm.createWindow()
    }
  }

  componentWillUnMount() {
  }

  handleAppIconClick = (key: string) => () =>
    this.props.onAppIconClick(key)
 && this.props.toggleSidebar()

  handleBoldClick = () => this.props.onEditorChange(
    RichUtils.toggleInlineStyle(
      this.props.editor,
      'BOLD'
    )
  )

  handleEditorTab = (e: any) =>
    this.props.onEditorChange(
      RichUtils.onTab(
        e,
        this.props.editor,
        4
      )
    );

  handleFirebaseAuthSuccess = () => this.props.onFirebaseLogin(false)

  handleLogoClick = () => this.props.toggleMenuOpen()

  handleMenuClickOutside = () => this.props.menuOpen && this.props.toggleMenuOpen()

  handleTilesRef = (ref: any) => this.tilesRef = ref

  handleWindowResize = () => this.props.onDimensionsChanged({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  render() {
    const {
      // handleTilesRef,
      handleAppIconClick,
      // handleBoldClick,
      // handleEditorTab,
      // handleFirebaseAuthSuccess,
      handleLogoClick,
      handleMenuClickOutside,
      handleWindowResize,
      props: {
        background,
        children,
        dimensions: {
          width,
          // height
        },
        documentTitle,
        // editor,
        emoji,
        // firebaseLogin,
        menuOpen,
        // onEditorChange,
        sidebarOpen,
        toggleSidebar,
        README,
        windows,
        // currentWindow,
        firebase,
      },
    } = this
    const { auth = null, authError = null, profile = null } = firebase || {}
    // let auth, authError, profile
    // if(firebase){
    //   let {auth, authError, profile} = firebase
    // }

    console.log('auth', auth, 'authError', authError, 'profile', profile)
    // const tiles = Tiles ?
    //     <Tiles ref={handleTilesRef} resolver = { resolver } {...this.props}/>
    //   : null

    return (
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
        <Solitaire/>
        <EventListener
          target="window"
          onResize={handleWindowResize}
        />
        <Helmet
          title={documentTitle}
          meta={[
            { name: 'charset', content: 'UTF-8' },
          ]}
          script={
            PROD ? [] : [
            { src: BS_URL, async: true },
          ]}
        />
        <Screensaver/>
        <WallpaperBlur width={width} background={background}/>
          <NavBar>
          <Logo onClick={handleLogoClick} emoji={emoji}/>
          <Menu open={menuOpen} onClickOutside={handleMenuClickOutside} README={README}/>
          <Clock config={{ timezone: 'Europe/Berlin', town: 'Berlin'}} />
        </NavBar>
        <Sidebar
          apps={APPS}
          onAppClick={handleAppIconClick}
          open={sidebarOpen}
          onSetOpen={toggleSidebar}
        />
        <Desktop>
          <Windows windows={windows}/>
        </Desktop>
        {children}
      </div>
    )
  }
}

const connected = connect(OS)
const firebaseConn = firebaseConnect([
  'public'
])

export default WINDOW ? firebaseConn(connected) : connected
