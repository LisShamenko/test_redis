const crypto = require("crypto");



// 
function encrypt(originalData, publicKey) {
    const result = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(originalData)
    );
    return result.toString("base64");
}

function decrypt(encryptedData, privateKey) {
    const result = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(encryptedData, 'base64')
    )
    return result.toString();
}

module.exports = {
    encrypt, decrypt,
};
