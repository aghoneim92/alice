import React, { PropTypes} from 'react'

import Logo from './Logo/Logo'

import './navbar.scss'

const prefix = 'os_navbar'

const NavBar = ({ onLogoClick, menuVisible }) => (
  <div className={prefix}>
    <Logo onClick={onLogoClick} menuVisible={menuVisible}/>
  </div>
)

NavBar.propTypes = {
  onLogoClick: PropTypes.func,
  menuVisible: PropTypes.bool,
}

export default NavBar
