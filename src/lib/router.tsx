import * as React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import { Resolver } from 'react-resolver'

import * as Koa from 'koa'

import { debug } from './logging'

import { getAlice } from '../components/index'
import { Container } from '../components/Router'
import { readFileSync } from "fs";

export function createRouter(): Koa.Middleware {
  return async (ctx, next) => {
    const { url } = ctx

    debug('url:', url)
    if(url.includes('dist')) {
      await next()
    } else if (url.includes('.well-known')) {
      ctx.body = readFileSync(url.substring(1, url.length))

      await next()
    } else {
      const Alice = await getAlice(React)

      if(Alice) {
        await Resolver.resolve(
          () => <Alice/>
        )
        .then(
          ({ Resolved, data }: any): any => {
            const toRenderStatic = (
              <Container data={data}>
                <div
                  id="Alice"
                  dangerouslySetInnerHTML={{ __html: renderToString(<Resolved/>) }}
                />
              </Container>
            )

            const body = toRenderStatic && renderToStaticMarkup(toRenderStatic)


            if(body) {
              ctx.body = body
            }
          }
        )
      }
    }
  }
}
