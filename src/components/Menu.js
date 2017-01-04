import React, { PropTypes } from 'react'
import Markdown from 'react-markdown'

import './menu.scss'

const prefix = 'os_menu'

const Menu = ({ visible }) => (
  <div className={`${prefix}${visible ? ` ${prefix}-visible` : ''}`} >
    <Markdown source={require('../../dist/README.js')}/>
    <ul>
      <li>Hi</li>
    </ul>
  </div>
)

Menu.propTypes = {
  visible: PropTypes.bool,
}

export default Menu
