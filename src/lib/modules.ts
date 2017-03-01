import { prop } from 'ramda'

export const getDefault: (m: NodeModule) => any = prop('default')
