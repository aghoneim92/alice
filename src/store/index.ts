import { browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'

const middleware = routerMiddleware(browserHistory)
export default createStore(
  rootReducer,
  applyMiddleware(middleware)
)
//     applyMiddleware([
//       thunk,
//       ...(
//         PROD ? [] : [
//           createLogger({
//             logger: winston,
//           }),
//         ]
//       ),
//     ])
//   )
