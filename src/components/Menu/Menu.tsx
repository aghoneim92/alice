/// <reference path="./menu.d.ts" />
import React, { ReactElement, StatelessComponent } from 'react'
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

interface LinkProps {
  [key:string]: any;
  href: string;
}

const MyLink: StatelessComponent<LinkProps> = props => (
  <Link
    to={props.href}
    wrapper="floating"
    {...dissoc('href', props)}
  />
)

type MenuContainer = (props: MenuProps) => (ReactElement<MenuProps> | null);

const Menu: MenuContainer = ({
  children,
  FB,
  onClickOutside,
  // onFacebookLogin,
  visible,
}) => {
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
          Link: MyLink,
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

export interface MenuProps extends React.Props<MenuContainer> {
  FB?: any;
  onClickOutside: () => void;
  // onFacebookLogin: () => void;
  visible?: boolean;
}

export default Menu
