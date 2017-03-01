/// <reference path="./ActionTypes.d.ts" />

import reduxCrud from 'redux-crud'

export const APP_ICON_CLICK = 'APP_ICON_CLICK'

export const DOCUMENT_RESIZE = 'DOCUMENT_RESIZE'

export const KEY_PRESS = 'KEY_PRESS'

export const LOCATION_CHANGE = 'LOCATION_CHANGE'

export const WINDOW_CHANGE = 'WINDOW_CHANGE'

export const CURRENT_WINDOW_ID = 'CURRENT_WINDOW_ID'

export const EMOJI_CHANGE = 'EMOJI_CHANGE'

export const TOGGLE_MENU = 'TOGGLE_MENU'

export const WINDOW_ACTION_TYPES = reduxCrud.actionTypesFor('windows')