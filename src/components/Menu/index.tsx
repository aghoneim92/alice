/// <reference path="./menu.d.ts" />
import * as React from 'react'
import { ReactElement, StatelessComponent } from 'react'
import LazyLoad from 'react-lazy-load'
// import { Link } from 'react-tiles'
import ClickOutside from 'react-click-outside'
import Markdown from 'react-markdown'

System.import('./index.scss')

export const cssPrefix = 'os_menu'

interface LinkProps {
  [key:string]: any;
  href: string;
}

const MyLink: StatelessComponent<LinkProps> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
  >
    {children}
  </a>
)

export type MenuElement = ReactElement<MenuProps>

export const Menu: StatelessComponent<MenuProps> = ({
  children,
  FB,
  onClickOutside,
  open,
  README,
}) => {
  return (
    <ClickOutside
      className={`${cssPrefix}${open ? ` ${cssPrefix}-visible` : ''}`}
      {...{onClickOutside}}
    >
      <LazyLoad
        onContentVisible = {() => console.log('look ma I have been lazyloaded!')}
      >
        <Markdown
          className={`${cssPrefix}_readme`}
          source={README}
          renderers={{
            Link: MyLink,
          }}
          sourcePos
        />
      </LazyLoad>
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

export interface MenuProps {
  FB?: any;
  onClickOutside: () => void;
  open?: boolean;
  README: string;
}

export default Menu
