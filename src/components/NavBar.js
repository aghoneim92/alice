import React, { PropTypes} from 'react'

import Logo from './Logo/Logo'

import './navbar.scss'

const prefix = 'os_navbar'

const NavBar = ({ onLogoClick, menuVisible, children }) => (
  <div className={prefix}>
    <Logo
      onClick={onLogoClick}
      menuVisible={menuVisible}
    />
      <div className={`${prefix}_children`}>
        {/* {children} */}
      </div>
  </div>
)

NavBar.propTypes = {
  children: PropTypes.node,
  onLogoClick: PropTypes.func,
  menuVisible: PropTypes.bool,
}

export default NavBar
