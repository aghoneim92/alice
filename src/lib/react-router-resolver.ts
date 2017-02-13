import { debug } from './logging';

import { match } from 'react-router'

let history, routes

export default {
  init: (props: any) => {
    history = props.history;
    routes = props.routes;
  },
  navigate: (path: string) => history.push( path ),
  resolve: (location: string, cb: Function) =>
    match({
      routes,
      location,
    }, (err: Error, redirect: any, state: any) => debug('redirect', redirect) ||
      cb( err, state.component )
    )
}
