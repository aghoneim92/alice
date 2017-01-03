import React, { PropTypes } from 'react'

import Menu from './Menu'

import './logo.scss'

const handleLogoClick = ({ onClick }) => () => onClick()

const Logo = ({ onClick, menuVisible }) => (
  <div className="os_logo">
    <div onClick={handleLogoClick({ onClick })}>OS</div>
    <Menu visible={menuVisible}/>
  </div>
)

Logo.propTypes = {
  onClick: PropTypes.func,
  menuVisible: PropTypes.bool,
}

export default Logo
