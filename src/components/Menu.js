import React, { PropTypes } from 'react'

import './menu.scss'

const prefix = 'os_menu'

const Menu = ({ visible }) => (
  <div className={`${prefix}${visible ? ` ${prefix}-visible` : ''}`} >
    <ul>
      <li>Hi</li>
    </ul>
  </div>
)

Menu.propTypes = {
  visible: PropTypes.bool,
}

export default Menu
