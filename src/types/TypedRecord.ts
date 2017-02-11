import { Record } from 'immutable'

export interface IRecord {
  ( value: (T | undefined) ) => Immutable.Map<string, any>;
}

export class TypedRecord<T> {
  constructor(
    readonly value: (T | undefined),
    readonly record: IRecord
  ) {
    Object.assign(
      this,
      ( value ? record(value) : record() ),
    )
  }
}

export const createRecord =
  <T extends Iterable<any>> (
    initialValue: Iterable<any>,
    name: string,
  ) => {
    const record: IRecord = Record(initialValue, name)

    return (value: (T | undefined) ): TypedRecord<T> =>
      new TypedRecord<T>(value, record)
  }
