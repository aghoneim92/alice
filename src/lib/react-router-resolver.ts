// import { debug, error } from './logging';

// import { match } from 'react-router'

// let history: any, routes: any

// export default {
//   init: (props: any) => {
//     history = props.history;
//     routes = props.routes;
//   },
//   navigate: (path: string) => history.push( path ),
//   resolve: (location: string, cb: Function) =>
//     match({
//       routes,
//       location,
//     }, (err: Error, redirect: any, state: any) => {
//       debug('redirect', redirect)
//       if(err) {
//         error(err)
//         cb(err)
//       } else if(redirect && state && state.compoennt) {
//         cb(null, state.component)
//       }
//     })
// }
