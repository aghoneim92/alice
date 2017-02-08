import winston from 'winston';

export const debug = winston.debug.bind(winston);
export const stdout = winston.log.bind(winston);
export const stderr = winston.error.bind(winston);
