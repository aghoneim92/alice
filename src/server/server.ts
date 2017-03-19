import { PROD } from "./../constants/env"
import { ServerArgs } from "./index"

import * as Koa from "koa"

import { createRouter } from "../lib/router"

const PORT = process.env.PORT || 4000

export const createServer = ([
  Koa,
  convert,
  logger,
  proxy,
  serve,
]: ServerArgs): Koa => {
  const app = new Koa()

  app.use(logger())
    .use(createRouter())

  if (!PROD) {
    app.use(convert(
      proxy({
        host: "http://localhost:8080",
        match: /^\/dist\//,
      })
    ))
  }

  app.use(serve("."))

  return app
}

export const startServer = (app: any, enableDestroy: any) => {
  app.listen(PORT)
  enableDestroy(app)
}

export const stopServer = (app: Destroyable) => {
  if (app.destroy) {
    app.destroy()
  }
}

