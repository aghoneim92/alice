/*/// <reference path="../../index.d.ts"/>
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as Bluebird from 'bluebird'
import * as Koa from 'koa'

import { debug, error } from './logging'
import router from './router'

import { getAlice } from '../components/Alice'

// import { Container, routes } from '../components/Router'

const handleMatch = (
  ctx: Koa.Context,
  cb: Function,
  html: string,
  state: any
) => {
  try {
    const container = (

    )
    const body = container && renderToStaticMarkup(container)

    ctx.body = body
    ctx.status = 200
    cb()
  } catch(e) {
    cb(e)
  }
}

interface Res {
  html: string
  state: any
}

const handleRes = (
  ctx: any,
  { html, state }: Res
): Bluebird<any> => {
  const Promise = Bluebird

  return new Promise(
    (resolve, reject) =>
      handleMatch(
        ctx,
        (err: Error) =>
          err ?
            reject(err)
          : resolve(),
        html,
        state
      )
  )
  .catch(
    (err: Error) => {
      error(err)

      return err
    }
  )
}

export const routerMiddleware: Koa.Middleware = async ctx => {


  const 



  const res: Res = await renderToString(toRender)

  try {
    if(context.url) {
      ctx.redirect(context.url)
    } else {
      await handleRes(ctx, res)
    }

  } catch(e) {
    error(e)
    ctx.throw(e)
  }
}*/
