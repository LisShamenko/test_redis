const crypto = require("crypto");



// 
function encrypt(payload, publicKey) {
    const result = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(payload)
    );
    return result.toString("base64");
}

function decrypt(payload, privateKey) {
    const result = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(payload, 'base64')
    )
    return result.toString();
}

module.exports = {
    encrypt, decrypt,
};
