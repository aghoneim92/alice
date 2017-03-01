import { identity } from 'ramda'
import { connect } from 'react-redux'

import { Map } from 'immutable'

import { APP_ICON_CLICK, TOGGLE_MENU } from '../constants/ActionTypes'

export default connect(identity, (dispatch: Function): DispatchProps => ({
  toggleMenuOpen: () => dispatch({
    type: TOGGLE_MENU,
  }),
  onAppIconClick: (id: string) => dispatch({
    type: APP_ICON_CLICK,
    payload: {
      data: Map({id}),
    }
  })
}))
