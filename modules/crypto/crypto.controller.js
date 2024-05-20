const express = require("express");
//
const cryptoServiceFactory = require('./crypto.service');
const responseServiceFactory = require('./response.service');
const redisServiceFactory = require('./redis.service');



//
let cryptoService;
let responseService;
let redisService;
let logger;
const router = express.Router();

router.post('/crypto', async (req, res) => {

    if (!req.body.original_data || !req.body.public_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const encryptedData = cryptoService.encrypt(req.body.original_data, req.body.public_key);
    const id = await redisService.setData(encryptedData);

    responseService.sendResult(res, {
        id_object: id,
        encrypt: encryptedData,
    });
});

router.post('/decrypto', async (req, res) => {

    if (!req.body.id_object || !req.body.private_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const encryptedData = await redisService.getData(req.body.id_object);
    if (!encryptedData) {
        return responseService.sendError(res, 'The object ID is invalid or the object has expired.');
    }

    const originalData = cryptoService.decrypt(encryptedData, req.body.private_key);
    responseService.sendResult(res, {
        original_data: originalData,
    });
});



// 
module.exports = (inRedis, inExpireSeconds, inLogger) => {
    cryptoService = cryptoServiceFactory(inLogger);
    responseService = responseServiceFactory(inLogger);
    redisService = redisServiceFactory(inRedis, inExpireSeconds, inLogger);
    logger = inLogger;
    return router;
}
