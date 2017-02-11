import winston from 'winston';

export const debug = winston.debug.bind(winston);
export const log = winston.log.bind(winston);
export const error = winston.error.bind(winston);
