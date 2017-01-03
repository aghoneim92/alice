import React, { PropTypes } from 'react'

import Menu from '../Menu'

import './logo.scss'

import handleLogoClick from './handleLogoClick'

export const cssPrefix = 'os_logo'

const Logo = ({ onClick, menuVisible }) => (
  <div className={cssPrefix}>
    <div onClick={handleLogoClick({ onClick })}>OS</div>
    <Menu visible={menuVisible}/>
  </div>
)

Logo.propTypes = {
  onClick: PropTypes.func,
  menuVisible: PropTypes.bool,
}

export default Logo
