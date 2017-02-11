import checkEnv from './checkEnv'

export default (val: string) => checkEnv('NODE_ENV', val)
