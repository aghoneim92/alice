export const getIn = (path: string[]) =>
  (immutableObject: any) =>
    immutableObject.getIn(path)

export const prop = (propName: string) =>
  (map: Map<string, any>) =>
    map.get(propName)

export const toObject = (immutableObject: any) =>
  immutableObject.toObject()

export const merge = (obj1: any, obj2: any) =>
  obj1.merge(obj2)
