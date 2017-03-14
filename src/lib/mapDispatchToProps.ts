import { Map } from 'immutable'

import { genId } from './genId'

import {
  APP_ICON_CLICK,
  MENU_TOGGLE,
  SIDEBAR_TOGGLE,
  SIDEBAR_UPDATE_SUCCESS,
  WINDOW_TOGGLE_FULLSCREEN,
  WINDOW_UPDATE_SUCCESS,
  WINDOW_DELETE_SUCCESS,
  WINDOW_MOVE,
} from '../constants/ActionTypes'
import { WindowConfig } from '../components/Window/index'

import { Action, Dispatch } from 'redux'

export const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  toggleMenuOpen: () => dispatch({
    type: MENU_TOGGLE,
  }),
  toggleSidebarOpen: () => dispatch({
    type: SIDEBAR_TOGGLE,
  }),
  toggleWindowFullScreen: (id: string) => dispatch({
    type: WINDOW_TOGGLE_FULLSCREEN,
    payload: {
      data: { id },
    }
  }),
  onAppIconClick: (appId: string) => dispatch({
    type: APP_ICON_CLICK,
    payload: {
      data: Map({ id: genId(), appId }),
    }
  }),
  onWindowChange: (window: WindowConfig) => dispatch({
    type: WINDOW_UPDATE_SUCCESS,
    payload: {
      data: Map(window as any)
    }
  }),
  onWindowMove: (id: string, deltaX: number, deltaY: number) => dispatch({
    type: WINDOW_MOVE,
    payload: {
      data: {
        id,
        deltaX,
        deltaY,
      }
    }
  }),
  onWindowDestroy: (id: string) => dispatch({
    type: WINDOW_DELETE_SUCCESS,
    payload: {
      data: {
        id,
      },
    }
  }),
  setSidebarOpen: value => dispatch({
    type: SIDEBAR_UPDATE_SUCCESS,
    payload: {
      data: value,
    },
  })
})