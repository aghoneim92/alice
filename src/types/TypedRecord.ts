import { Record } from 'immutable'

export interface IRecord<T> {
  ( value: (T | undefined) ): Immutable.Map<string, any>;
}

export class TypedRecord<T> {

  prototype?: TypedRecord<T>;

  constructor(
    readonly value: (T | undefined),
    readonly record: IRecord<T>
  ) {
    Object.assign(
      this,
      record(value),
    )
  }
}

export const createRecord =
  <T extends Iterable<any>> (
    initialValue: Iterable<any>,
    name: string,
  ) => {
    const record: IRecord<T> = Record(initialValue, name)

    const ret: { new(): TypedRecord<T>; } = function( value: (T | undefined) ) {
      TypedRecord<T>.call(this, value, record)
    }

    ret.name = name

    ret.prototype = TypedRecord<T>!.prototype

    return ret
  }
