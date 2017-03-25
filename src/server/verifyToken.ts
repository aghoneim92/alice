import * as Koa from 'koa'
import * as admin from 'firebase-admin'

import { error } from '../lib/logging'

export const verifyToken = (): Koa.Middleware => async (ctx, next) => {
  const { query: { token }, url } = ctx
  const { cookie } = (ctx as any)

  if (url.includes('verifyToken')) {
    try {
      const auth = await admin.auth().verifyIdToken(token)

      if (auth) {
        ctx.body = {
          verified: true
        }
      } else {
        throw new Error()
      }
    } catch (e) {
      ctx.body = {
        verified: false
      }
    }
  } else {
    if (typeof cookie === 'object') {
      const { accessToken } = cookie

      if (accessToken) {
        try {
          ctx.state.auth = await admin.auth().verifyIdToken(accessToken)
        } catch (e) {
          error(e)
        }
      }
    }

    await next()
  }
}
