// import { WindowManager } from 'ventus'
import React, { PureComponent } from 'react'
import { firebaseConnect } from 'react-redux-firebase/dist/index'
import Helmet from 'react-helmet'
import Tiles from 'react-tiles'
import resolver from '../lib/react-router-resolver'

import connect from '../lib/connect'
import derive from '../lib/derive'
import { debug } from '../lib/logging'
import './os.scss'

import { APP_NAME, APP_URL } from '../constants/index'

// const { isLoaded, isEmpty, dataToJS } = helpers

interface Auth {
  currentUser?: any;
}

interface Firebase {
  auth?: Auth;
  authError?: any;
  profile?: any;
}

export interface OSProps {
  currentWindow?: Window;
  firebase: Firebase;
  layout?: any;
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
      debug(tilesRef)
      // wm.createWindow()
    }
  }

  handleTilesRef = (ref: any) => this.tilesRef = ref

  render() {
    const {
      handleTilesRef,
      props: {
        firebase: {
          auth,
          authError,
          profile,
        },
        currentWindow,
      },
    } = this;

    debug('auth', auth, 'authError', authError, 'currentWindow', currentWindow, 'profile', profile)

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
        <Tiles ref={handleTilesRef} resolver = { resolver } {...this.props}/>
      </div>
    )
  }
}

export default connect(OS)
