export const getEnv = (env: string) => process.env[env]
export const checkEnv = (env: string, val: any) => getEnv(env) === val
export const checkNodeEnv = (val: string) => process.env.NODE_ENV === val
