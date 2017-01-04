import React, { PropTypes } from 'react'
import ElectronWebView from 'react-electron-web-view'

import './webview.scss'

export const cssPrefix = 'os_webview'

const WebView = ({
  source,
}) => (
  <div className={cssPrefix}>
    <ElectronWebView {...{source}} />
  </div>
)

WebView.propTypes = {
  source: PropTypes.string,
}

export default WebView
