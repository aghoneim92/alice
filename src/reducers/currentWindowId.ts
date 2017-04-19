import { APP_ICON_CLICK } from './../constants/ActionTypes';
// import { debug } from './../lib/logging';

export const currentWindowId: Reducer<string, ImMap> = (
  state = '',
  { type, payload }
) => {
  if (
    type === APP_ICON_CLICK
 && payload
 && payload.data
  ) {
    return payload.data.get('id')
  }

  return state
}

