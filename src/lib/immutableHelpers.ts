import { curry } from 'ramda';

export const getIn = (path: string[]) =>
  (immutableObject: any) =>
    immutableObject.getIn(path)

export const propImmutable = (propName: string) =>
  (map: Map<string, any>) =>
    map.get(propName)

export const mergeImmutable = curry(
  (obj1: any, obj2: any) => obj1.merge(obj2)
)
