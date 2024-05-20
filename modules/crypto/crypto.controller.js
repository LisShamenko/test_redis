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

/**
 * @openapi
 * /api/crypto:
 *   post:
 *     description: Encrypts the object.
 *     tags:
 *     - Crypto Controller
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               original_data:
 *                 type: object
 *                 example: { "sss": "fff" }
 *               public_key:
 *                 type: object
 *                 example: |
 *                   -----BEGIN RSA PUBLIC KEY-----
 *                   MIIBCgKCAQEAkpkM/IXUwgdFJle9Fconpbb618JN8YSX6B9zfZCsEXzXI9rnxqDJ
 *                   tSKnFEIu25FBiofxoU3mQZim7uxBW5HrSTgZL9zfafKWoBL8acPB0Cb0pO7vPvNL
 *                   Qpab5suZxGNTiK4LziB/x/Uj5y+PZzjaLgLnJ5RSXE+r5OfRR/aW/7DgtYOpZ83f
 *                   j1aRXia3G22uXEZ80ybd6HEybQiZUKdanCqvWp8w0KRIsWIQWAizIhrDgJl4SBSu
 *                   ccvbFZG9yYroJMVdp0UGSMlnLDM7UpFSJoQr4B8xC48sa/S6UKf2CbIoSbpCm9cc
 *                   9kk6w2ip4GxOtaKGI0UxQ0yhw7Ldf8UqBQIDAQAB
 *                   -----END RSA PUBLIC KEY-----
 *             required:
 *               - original_data
 *               - public_key
 *     responses:
 *       201:
 *         description: Returns the encrypted data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_object:
 *                   type: string
 *                   description: The redis record id.
 *                 encrypt:
 *                   type: string
 *                   description: The encrypted data.
 *       400:
 *         description: Wrong data. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 */
router.post('/crypto', async (req, res) => {

    if (!req.body.original_data || !req.body.public_key) {
        return responseService.sendError(res, 'Wrong data.');
    }

    const encryptedData = cryptoService.encrypt(req.body.original_data, req.body.public_key);
    if (!encryptedData) {
        return responseService.sendError(res, 'Decryption failed.');
    }

    const id = await redisService.setData(encryptedData);
    responseService.sendSuccess(res, {
        id_object: id,
        encrypt: encryptedData,
    });
});

/**
 * @openapi
 * /api/decrypto:
 *   post:
 *     description: Decrypts the object.
 *     tags:
 *     - Crypto Controller
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id_object:
 *                 type: string
 *                 example: 5f7d4614-828d-46db-8168-f5c16691ac34
 *               private_key:
 *                 type: object
 *                 example: |
 *                   -----BEGIN RSA PRIVATE KEY-----
 *                   MIIEowIBAAKCAQEAkpkM/IXUwgdFJle9Fconpbb618JN8YSX6B9zfZCsEXzXI9rn
 *                   xqDJtSKnFEIu25FBiofxoU3mQZim7uxBW5HrSTgZL9zfafKWoBL8acPB0Cb0pO7v
 *                   PvNLQpab5suZxGNTiK4LziB/x/Uj5y+PZzjaLgLnJ5RSXE+r5OfRR/aW/7DgtYOp
 *                   Z83fj1aRXia3G22uXEZ80ybd6HEybQiZUKdanCqvWp8w0KRIsWIQWAizIhrDgJl4
 *                   SBSuccvbFZG9yYroJMVdp0UGSMlnLDM7UpFSJoQr4B8xC48sa/S6UKf2CbIoSbpC
 *                   m9cc9kk6w2ip4GxOtaKGI0UxQ0yhw7Ldf8UqBQIDAQABAoIBAAMmwMrhkkrKKY2N
 *                   n6DLHoy8lmoyoPFQW+GfYiCwuPo2mFC1gSZZyNbuKUWmtzzSGQ9sz7Vw0sKAkRTG
 *                   xbroXp9NfOvJ+uWF/lXvl+HVgEzvYXKgOPVoo9Vec83Y0kk7Ug2N9u6rRS6bvEtZ
 *                   JY3fANWyC0e5s7GMpucop+znm08LdS+WX9QAsjzjEfqOLGjbMiaj04Np/jzf309Y
 *                   Jh6pwWz0dMYiZUbTEWqwECHa2p4HDM8Nb9JR6nk1RUKENXPd9Ou0AueUdk5S/2zH
 *                   t72EVUtk4shyA/trA0QS2Acq7+hqhTnfQvGHKn3B/VUvdOGJeYqmX5mEMG+sZFsZ
 *                   /NHfwFsCgYEAy7UIIFIcyklv9eV6IqPbARgZZx/mULWr6XI3jAj4k0z+Bkswm0ov
 *                   cLm7VBTxHTYyEmui9TkVoavW4YzS6DtCqtqnK+kQuXtR2LphTd9tZcUe30AargAv
 *                   8embZenGG6dcgba3XZI4iURleec63JolOiDu0Wkr7GnEurVsEl4DCVMCgYEAuDr7
 *                   gWJmQ/UikOEKC9C2kDjxyflcaqMEfKMWkA4SpIi1FV+oHJZLIKKsy3ro+14srmXu
 *                   U9umcWNdZ1N6ygiexbHjFqbJr9frtxEngnCsg174bCb5cNMp7HLiMy1RC9YJZbFb
 *                   92X4GKFMAi78hBObSfssA3z9zxiOGw5011TlnEcCgYBm8WpU4woXk/sXecs5/DIt
 *                   oF8eBTnf6Z8hzw2RH+t2jP8GcTL0Fw5YWhP3zsl2aK/vLSPh5uIunGdv/jmLEH+F
 *                   VhALGbHQ+igHbVDFCLcBKheK3Jte+UtBZjuYygXKbc5K4upRSBZ4D+90Jk1RtDhB
 *                   4uitPQfsZhr7+7jMo2PHbwKBgGdcaDkKHPgps0/3gixo19SIrlcz+T624VCQK5t8
 *                   2cbIEFjCh04qoFHaEvpCpi5JguYBuDoCNRrOtdu/wVdSiMm/6PmPb/6hNNVL4Y/U
 *                   aWV3RgdfwnkjcBUBy5kM5riuSC1u2XsvEYe4Dy32cKQlX+2c5u+6E6g6TZgufy1E
 *                   q2IHAoGBAJvMG3OaJVBFzWp3tlTMtieFdbOph1vVRQPnA6hM/NdHcGdEMdAitEA+
 *                   5L6pR0xeb57P97ABjFGFEiwHW5Z3aQ2v3ofEYcRCAGpZVlsl39b+eSi+GTo4zXeK
 *                   /K86biasFCDeurKunAmsy/V8idUopHP4vC+vFc5zKeOCIUZgxVMa
 *                   -----END RSA PRIVATE KEY-----
 *             required:
 *               - id_object
 *               - private_key
 *     responses:
 *       200:
 *         description: Returns the original data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 original_data:
 *                   type: object
 *                   description: The original object.
 *       400:
 *         description: Wrong data. The object ID is invalid or the object has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 */
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
