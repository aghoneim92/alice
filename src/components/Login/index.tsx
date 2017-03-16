/// <reference path="./index.d.ts" />

import * as React from 'react'
import * as SocialButton from 'react-social-button'

import * as capitalize from 'capitalize'

export const cssPrefix = 'os_login'

System.import('./index.scss')
System.import('bootstrap/less/bootstrap.less').then(
  () => System.import('bootstrap-social/bootstrap-social.css')
)

const providers = ['facebook', 'google', 'twitter']

export const Login: LoginComponent = ({
  onButtonClick,
}) => (
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
              onClick: () => onButtonClick(provider),
              block: true,
            }}
          />
        )
      )
    }
    </div>
  </div>
)
