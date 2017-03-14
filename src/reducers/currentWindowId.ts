import { APP_ICON_CLICK } from './../constants/ActionTypes';
// import { debug } from './../lib/logging';

export const currentWindowId: Reducer<string, ImMap> = (
  state = '',
  { type, payload }
) => type === APP_ICON_CLICK
  && payload
  && payload.data ?
     payload.data.get('id')
  :  state

