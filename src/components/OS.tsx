/// <reference path="./os.d.ts" />
// import { WindowManager } from 'ventus'
import React, { PureComponent } from 'react'
import { firebaseConnect } from 'react-redux-firebase/dist/index'
import Helmet from 'react-helmet'
// import resolver from 'react-tiles/src/react-router-resovler'
import Tiles from 'react-tiles'

import connect from '../lib/connect'
import derive from '../lib/derive'
import { log } from '../lib/logging'
import './os.scss'

import { APP_NAME, APP_URL } from '../constants/index'

// const { isLoaded, isEmpty, dataToJS } = helpers

export interface OSProps {
  currentWindow?: Window;
  auth?: any;
  authError?: any;
  layout?: any;
  profile?: any;
}

export const cssPrefix = 'os'

@firebaseConnect([
  '/'
])
@derive
class OS extends PureComponent<OSProps, undefined>{
  tilesRef?: any;

  componentDidMount() {
    // const wm = new WindowManager()
  }

  componentDidUpdate({ layout }: { layout: any; }) {
    const { props, tilesRef } = this
    if(!layout && props.layout && tilesRef) {
      log(tilesRef)
      // wm.createWindow()
    }
  }

  handleTilesRef = (ref: any) => this.tilesRef = ref

  render() {
    const {
      handleTilesRef,
      props: {
        auth,
        authError,
        currentWindow,
        profile,
      },
    } = this;

    log('auth', auth, 'authError', authError, 'currentWindow', currentWindow, 'profile', profile)

    return (
      <div
        className={`${
          cssPrefix
        }`}
        style={{
          backgroundImage: `url('${
            APP_URL
          }${
            require('../../img/background.jpg')
          }')`,
        }}
      >
        <Helmet
          title={`${APP_NAME}${currentWindow ? `| ${currentWindow.name}` : ''}`}
        />
        <Tiles ref={handleTilesRef} resolver = {null} {...this.props}/>
      </div>
    )
  }
}

export default connect(OS)
