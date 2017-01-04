import React, { PropTypes } from 'react'
import FocusTrap from 'focus-trap-react'
import WebView from './WebView'

import './windows.scss'

const windowComponents = {
  WebView,
}

const cssPrefix = 'os_windows'

const Windows = ({
  windows = [],
}) => (
  <div className={cssPrefix} >
    {
      windows.map(
        ({
          type,
          id,
          ...rest
        }) =>
          <FocusTrap focusTrapOptions={{
            fallbackFocus: '.os',
          }} key={id}>
            {React.createElement(
              windowComponents[type],
              rest
            )}
          </FocusTrap>
      )
    }
  </div>
)

Windows.propTypes = {
  windows: PropTypes.array,
}

export default Windows
