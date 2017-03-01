/// <reference path="./index.d.ts" />
import { once } from 'ramda'

import * as React from 'react'
import { PureComponent } from 'react'

import * as firebase from 'firebase'

System.import('./index.scss')

export const cssPrefix = 'os_firebaseLogin'

const {
  auth: {
    AuthProvider,
    EmailAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
  },
}: { auth: any } = firebase

interface FirebaseLoginProps {
  auth: typeof AuthProvider
  onAuthSuccess: Function
}

export class FirebaseLogin extends PureComponent<FirebaseLoginProps, any> {
  state = {}

  componentDidMount() {
    const {
      props: {
        auth,
      },
      initAuth,
    } = this

    if(auth) {
      initAuth(auth)
    }
  }

  comopnentDidUpdate: (nextProps: any) => any = ({
    auth,
  }) => auth && this.initAuth(auth)

  initAuth = once(
    (auth: any) => {
      const firebaseui = require('../../../firebaseui-web/dist/npm')
      const ui = new firebaseui.auth.AuthUI(auth)

      ui.start(
        `.firebase-auth-container`,
        {
          callbacks: {
            uiShown: () => this.setState({appear: true}),
            signInSuccess: this.props.onAuthSuccess,
          },
          signInSuccessUrl: 'localhost:4000',
          signInOptions: [
            FacebookAuthProvider.PROVIDER_ID,
            GithubAuthProvider.PROVIDER_ID,
            GoogleAuthProvider.PROVIDER_ID,
            TwitterAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
          ],
          signInFlow: 'popup',
          // tosUrl: '<your-tos-url>'
        }
      )
    }
  )

  render () {
    const {
      state: {
        appear,
      },
    }: {
      state: any
    } = this

    return (
      <div
        className={
          `${cssPrefix}${appear ? ` ${cssPrefix}-visible` : ''}`
        }
      >
        <div className="firebase-auth-container"/>
        {
          appear ?
          null
          : <div className="loader"/>
        }
      </div>
    )
  }
}
