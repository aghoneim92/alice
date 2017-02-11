import React, { ReactElement, PropTypes } from 'react'
import { once, dissoc } from 'ramda'
import { Link } from 'react-tiles'
import ClickOutside from 'react-click-outside'
import Markdown from 'react-markdown'

import { TEST } from '../../constants/index'

export const cssPrefix = 'os_menu'

let README = ''
const getReadme = once(
  () => require.ensure(
    [],
    (require: NodeRequire) => README = require('../../../README.md'),
    'README',
  )
)

export interface MenuProps {
  children?: PropTypes.node;
  FB?: any;
  onClickOutside: () => void;
  onFacebookLogin: () => void;
  visible?: boolean;
}

const Menu = ({
  children,
  FB,
  onClickOutside,
  onFacebookLogin,
  visible,
}: MenuProps): ReactElement => {
  if(!TEST) {
    getReadme()
  }

  return (
    <ClickOutside
      className={`${cssPrefix}${visible ? ` ${cssPrefix}-visible` : ''}`}
      {...{onClickOutside}}
    >
      <Markdown
        className={`${cssPrefix}_readme`}
        source={README}
        renderers={{
          Link: (props: { [key:string]: any; href: string; }) => (
            <Link
              to={props.href}
              wrapper="floating"
              {...dissoc('href', props)}
            />
          ),
        }}
        sourcePos
      />
      {children}
        {
          FB
      &&  (
            <div className="fb">
              <div className="fb-send"/>
              <div
                className="fb-login-button"
                data-max-rows="5"
                data-size="medium"
                data-show-faces="true"
                data-auto-logout-link="true"
              />
            </div>
          )
        }
    </ClickOutside>
  )
}

export default Menu
