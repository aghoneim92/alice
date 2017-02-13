interface Payload {
  readonly data?: ImMap;
  readonly error?: Error;
}

interface Action {
  readonly type: string;
  readonly payload?: Payload;
  readonly data?: any;
}
