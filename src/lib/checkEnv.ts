import getEnv from './getEnv'

export default (env: string, val: any) => getEnv(env) === val
