import * as React from 'react'

import { renderToString, renderToStaticMarkup } from 'react-dom/server'

// import { AsyncSubject } from '@reactivex/rxjs'
// import * as Navigo from 'navigo'
import * as Koa from 'koa'

import { debug } from './logging'

import { getAlice } from '../components/index'
import { Container } from '../components/Router'

export function createRouter(): Koa.Middleware {
  return async (ctx, next) => {
    const { url } = ctx

    debug('url:', url)
    if(url.includes('dist') || url.includes('hextris')) {
      await next()
    } else {
      const Alice = await getAlice(React)

      if(Alice) {
        const toRender = (
          <Alice/>
        )
        const toRenderStatic = (
          <Container>
            <div id="Alice" dangerouslySetInnerHTML={{ __html: renderToString(toRender) }}/>
          </Container>
        )

        const body = toRenderStatic && renderToStaticMarkup(toRenderStatic)

        if(body) {
          ctx.body = body
        }

        return
      }

      await next()
    }
  }
}
