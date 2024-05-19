const express = require("express");
//
const cryptoService = require('./crypto.service');
const responseService = require('./response.service');
const redisService = require('./redis.service');



//
let redis;
const router = express.Router();

router.post('/crypto', async (req, res) => {

    if (!req.body.original_data || !req.body.public_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const encryptedData = cryptoService.encrypt(req.body.original_data, req.body.public_key);
    const id = await redis.setData(encryptedData);

    responseService.sendResult(res, {
        id_object: id,
        encrypt: encryptedData,
    });
});

router.post('/decrypto', async (req, res) => {

    if (!req.body.id_object || !req.body.private_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const encryptedData = await redis.getData(req.body.id_object);
    if (!encryptedData) {
        return responseService.sendError(res, 'The object ID is invalid or the object has expired.');
    }

    const originalData = cryptoService.decrypt(encryptedData, req.body.private_key);
    responseService.sendResult(res, {
        original_data: originalData,
    });
});



// 
module.exports = (inRedis, inExpireSeconds) => {
    redis = redisService(inRedis, inExpireSeconds);
    return router;
}
