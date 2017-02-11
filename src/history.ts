import { browserHistory } from 'react-router'
import store from './store/index'
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(
  browserHistory,
  store,
  {
    selectLocationState: (state: Map<string, any>) =>
    state.get('routing').toJS(),
  },
)

export default history
