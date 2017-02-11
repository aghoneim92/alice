import { WindowRecord } from './Window'

export interface Payload {
  window?: WindowRecord
}

export class Action {

  readonly window?: WindowRecord;

  constructor(
    readonly type: string,
    readonly payload: Payload,
  ) {
    const { window } = payload
    if(window) {
      this.window = window
    }
  }
}
