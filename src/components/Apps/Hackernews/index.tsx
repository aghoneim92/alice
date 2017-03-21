import * as React from 'react'

export const cssPrefix = 'os_hackernews'

System.import('./index.scss')

export const Hackernews = () => (
  <div className={cssPrefix}>
    <iframe className={`${cssPrefix}_frame`} src="https://react-hn.appspot.com"/>
  </div>
)
