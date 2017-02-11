import { WindowRecord } from './Window'

export interface Payload {
  window?: WindowRecord
}

export interface Action {
  readonly window?: WindowRecord;
  readonly type: string;
  readonly payload?: Payload;
  readonly data: any;
}
