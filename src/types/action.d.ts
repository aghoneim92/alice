interface Payload<T> {
  readonly data?: T
  readonly error?: Error
}

interface Action<T> {
  readonly type: string
  readonly payload?: Payload<T>
  readonly data?: any
}

type Reducer<T> = (
  state: T,
  action: Action<T>
) => T

type ActionCreator<T> = (...args: any[]) => Action<T>