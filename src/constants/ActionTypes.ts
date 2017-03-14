/// <reference path="./ActionTypes.d.ts" />

import reduxCrud from 'redux-crud'

export const APP_ICON_CLICK = 'APP_ICON_CLICK'

export const CURRENT_WINDOW_ID = 'CURRENT_WINDOW_ID'

export const DOCUMENT_RESIZE = 'DOCUMENT_RESIZE'

export const EMOJI_CHANGE = 'EMOJI_CHANGE'

export const KEY_PRESS = 'KEY_PRESS'

export const LOCATION_CHANGE = 'LOCATION_CHANGE'

export const MENU_TOGGLE = 'TOGGLE_MENU'

export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE'
const { SIDEBAR_UPDATE_SUCCESS } = reduxCrud.actionTypesFor('sidebar')
export { SIDEBAR_UPDATE_SUCCESS }

export const WINDOW_MOVE = 'WINDOW_MOVE'
export const WINDOW_TOGGLE_FULLSCREEN = 'WINDOW_TOGGLE_FULLSCREEN'

const { WINDOW_DELETE_SUCCESS, WINDOW_UPDATE_SUCCESS } = reduxCrud.actionTypesFor('window')
export { WINDOW_DELETE_SUCCESS, WINDOW_UPDATE_SUCCESS }
