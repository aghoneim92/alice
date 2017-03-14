interface Payload<T> {
  readonly data?: T
  readonly error?: Error
}

interface Action<T> {
  readonly type: string
  readonly payload?: Payload<T>
}

type Reducer<T, A> = (
  state: T,
  action: Action<A>
) => T

type IdReducer<T> = Reducer<T, T>

type ActionCreator<T> = (...args: any[]) => Action<T>
