import { browserHistory } from 'react-router'
import { reactReduxFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'

const createStoreWithFirebase = compose(
  reactReduxFirebase(config, { userProfile: 'users' }),
)(createStore)

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
