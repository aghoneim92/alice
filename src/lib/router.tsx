/*import * as React from 'react'
import { ComponentClass, ReactElement } from 'react'
import { Module } from 'react-router-server'

import { getDefault } from './modules'

type ModuleCb = (nextProps: any) => (module: NodeModule) => Promise<any>

const moduleCb: ModuleCb = nextProps => module =>
  getDefault(module).then(renderComponent(nextProps))

const renderComponent = (nextProps: any) =>
  (Component: ComponentClass<any>) => (
    <Component {...nextProps}/>
  )

type ComponentCallback = (fn: any) => (nextProps: any) => ReactElement<any>

export const createComponentCb: ComponentCallback = fn => nextProps => (
  <Module module={fn}>
    {moduleCb(nextProps)}
  </Module>
)*/
import * as React from 'react'
import { StatelessComponent } from 'react'

import { renderToString, renderToStaticMarkup } from 'react-dom/server'

// import { AsyncSubject } from '@reactivex/rxjs'
// import * as Navigo from 'navigo'
import * as Koa from 'koa'

// import { getDefault } from './modules'
import { debug } from './logging'

import { getAlice } from '../components/Alice'
import { Container } from '../components/Router'

type RouterMiddlewareCreator = (
  location?: string,
) => Koa.Middleware

export const createRouter: RouterMiddlewareCreator = (
) => {
  return async (ctx, next) => {
    const { url } = ctx

    debug('url:', url)
    if(url.includes('dist')) {
      await next()
    } else {
      const Alice: StatelessComponent<any> = await getAlice()

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
    }
  }
}
