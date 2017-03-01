/// <reference path="../../index.d.ts"/>
import * as React from 'react'
import { StatelessComponent } from 'react'
import * as Helmet from 'react-helmet'

export const Container: StatelessComponent<any> = ({
  children
}) => {
  const head = Helmet.rewind()
  const attrs = head.htmlAttributes.toComponent()

  return (
    <html {...attrs}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.script.toComponent()}
      </head>
      <body>
        {children}
        {/*<script dangerouslySetInnerHTML={{
          __html: `
            window.__INITIAL_STATE__ = JSON.parse('${JSON.stringify(state)}');
          `
        }} />*/}
        <script src="dist/main.js"/>
      </body>
    </html>
  )
}
