const { env } = process

export const TEST = env.NODE_ENV === 'test'
