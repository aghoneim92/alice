/// <reference path="./index.d.ts" />

import * as React from 'react'
import * as SocialButton from 'react-social-button'

import { getFirebase } from 'react-redux-firebase'

import * as capitalize from 'capitalize'

import { error } from '../../lib/logging'

export const cssPrefix = 'os_login'

const providers = ['facebook', 'google', 'twitter']

const loginClickHandler = (providerName: string) => () => {
  const firebase = getFirebase()
  const Provider = firebase.auth[`${capitalize(providerName)}AuthProvider`]
  const provider = new Provider()
  try {
    firebase.auth().signInWithRedirect(provider)
  } catch(e) {
    error(e)
  }
}

const Login = () => (
  <div className={cssPrefix}>
    <div className={`${cssPrefix}_content`}>
    {
      providers.map(
        (provider, index) => (
          <SocialButton
            key={index}
            social={provider}
            text={`Login with ${capitalize(provider)}`}
            btnProps={{
              onClick: loginClickHandler(provider),
              block: true,
            }}
          />
        )
      )
    }
    </div>
  </div>
)

export default Login