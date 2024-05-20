const winston = require('winston');
require('winston-daily-rotate-file');
const logFormat = require('./logFormat');



// 
const logger = winston.createLogger({

    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat,
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/server-%DATE%.log',
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            level: 'error',
            handleExceptions: true,
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            level: 'error',
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
