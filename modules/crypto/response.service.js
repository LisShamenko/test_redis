
let logger;

function sendError(res, message) {
    logger.error(message);
    res.status(400).json({
        error: message,
    });
}

function sendSuccess(res, data) {
    logger.info('Send success.');
    res.status(201).json(data);
}

function sendResult(res, data) {
    logger.info('Send result.');
    res.status(200).json(data);
}

module.exports = (inLogger) => {
    logger = inLogger;
    return {
        sendError, sendSuccess, sendResult,
    };
}
