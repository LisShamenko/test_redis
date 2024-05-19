
function sendError(res, message) {
    res.status(400).json({
        error: message,
    });
}

function sendSuccess(res) {
    res.status(201);
}

function sendResult(res, data) {
    res.status(200).json(data);
}

module.exports = {
    sendError, sendSuccess, sendResult,
};
