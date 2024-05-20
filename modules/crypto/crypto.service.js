const crypto = require("crypto");



// 
let logger;

function encrypt(originalData, publicKey) {
    try {
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(originalData)
        );
        const result = encryptedData.toString("base64");
        logger.info('--- crypto ENCRYPT');
        return result;
    }
    catch (err) {
        // only testing
        logger.error(`
            --- crypto ENCRYPT ERROR: ${err}
            --- originalData = ${originalData}
            --- publicKey = ${publicKey}`);
        return null;
    }
}

function decrypt(encryptedData, privateKey) {
    try {
        const originalData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(encryptedData, 'base64')
        )
        const result = JSON.parse(originalData.toString());
        logger.info('--- crypto DECRYPT');
        return result;
    }
    catch (err) {
        // only testing
        logger.error(`
            --- crypto DECRYPT ERROR: ${err}
            --- encryptedData = ${encryptedData}
            --- privateKey = ${privateKey}`);
    }
}

module.exports = (inLogger) => {
    logger = inLogger;
    return {
        encrypt, decrypt,
    }
};
