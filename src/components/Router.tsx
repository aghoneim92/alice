/// <reference path="../../index.d.ts"/>

import * as React from 'react'
import { StatelessComponent } from 'react'
import * as Helmet from 'react-helmet'

import { PROD } from '../constants/env'

export const Container: StatelessComponent<any> = ({
  children,
  data,
}) => {
  const head = Helmet.rewind()
  const attrs = head.htmlAttributes.toComponent()

  const mainjs = `dist/${ PROD ? require('../../dist/push_manifest.json')['main.js'] : 'main.js'}`

  return (
    <html {...attrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.script.toComponent()}
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html:
          `window.__REACT_RESOLVER_PAYLOAD__ = JSON.parse('${JSON.stringify(data)}')`
        }}/>
        <script src="node_modules/browsix/dist/fs/boot/kernel.js"/>
        <script src={mainjs} async={true} defer={true}/>
      </body>
    </html>
  )
}
