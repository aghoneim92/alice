import * as React from 'react'
import { StatelessComponent } from 'react'

export const cssPrefix = 'os_navbar'

System.import('./navbar.scss')

interface NavbarProps {
  // currentWindow: ImMap;
  // navbar: ImMap;
}

export const NavBar: StatelessComponent<NavbarProps> = ({
  children,
  // currentWindow,
  // navbar,
  // force,
  // onEmojiChange,
  // onPickerClickOutside,
  // pickerVisible,
}) => {
  return (
    <div className={cssPrefix}>
      <div className={`${cssPrefix}_content`}>
        {children}
      </div>
    </div>
  )
}
/*{
        {/*<Logo
          {...{
            force,
            emoji,
            pickerVisible,
            onPickerClickOutside,
            onEmojiChange,
          }}
        />*/

      /*<EmojiPicker
        onClickOutside={onPickerClickOutside}
        {...{onEmojiChange}}
        visible={force >= 0.2 && pickerVisible}
      />*/
      /*{menu}*/
      /*{
        currentWindowName
     && <WindowControls
         forName={currentWindowName}
       />
      }*/