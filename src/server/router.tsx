import * as React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import { Resolver } from 'react-resolver'

import * as Koa from 'koa'

import { debug } from '../lib/logging'

import { getAlice } from '../components'
import { Container } from '../components/Router'

const match = (url: string) => url === '/'

export const createRouter = (): Koa.Middleware => async (ctx, next) => {
  const { url }: Koa.Context & { cookie: any } = (ctx as any)

  debug('url:', url)
  if (match(url)) {
    const Alice = await getAlice(React, ctx.state.auth)

    if (Alice) {
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

          if (body) {
            ctx.body = body
          }
        }
      )
    }
  } else {
    await next()
  }
}

