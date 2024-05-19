
function sendError(res, message) {
    res.status(400).json({
        error: message,
    });
}

function sendSuccess(res) {
    res.status(201);
}

function sendResult(res, payload) {
    res.status(200).json({
        payload: payload,
    });
}

module.exports = {
    sendError, sendSuccess, sendResult,
};
