import { browserHistory } from 'react-router'
import store from './store/index'
import { syncHistoryWithStore } from 'react-router-redux';

export default syncHistoryWithStore(browserHistory, store)
