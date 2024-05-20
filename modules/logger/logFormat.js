const winston = require('winston');
const moment = require('moment');



// 
const logFormat = winston.format.printf(
    ({
        level,
        message,
        timestamp,
        durationMs,
        err,
        member_id,
        domain,
        payload,
    }) => {
        let log =
            `--- [${level}] ${moment(timestamp).utcOffset(3)
                .format('YYYY-MM-DD HH:mm:ss')}\n${message}` +
            `${durationMs ? '\nDuration: ' + durationMs / 1000 + 's' : ''}` +
            `${err ? '\n' + JSON.stringify(err) : ''}`;

        if (payload && typeof payload === 'object') {
            Object.keys(payload).forEach((key) => {
                log += `\n${key}: ${JSON.stringify(payload[key])}`;
            });
        }

        return log;
    },
);

module.exports = logFormat;
