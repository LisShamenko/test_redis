const express = require("express");
//
const cryptoService = require('./crypto.service');
const responseService = require('./response.service');



//
const router = express.Router();

router.post('/crypto', (req, res) => {

    if (!req.body.payload || !req.body.public_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const result = cryptoService.encrypt(req.body.payload, req.body.public_key);
    responseService.sendResult(res, result);
});

router.post('/decrypto', (req, res) => {

    if (!req.body.id_object || !req.body.private_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const result = cryptoService.decrypt(req.body.id_object, req.body.private_key);
    responseService.sendResult(res, result);
});

module.exports = router;
