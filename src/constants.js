const { env } = process

export const TEST = env.NODE_ENV === 'test'
export const DEV = env.NODE_ENV === 'development'
export const PROD = env.NODE_ENV === 'production'
