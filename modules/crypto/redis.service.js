const uuid = require("uuid");



//
let redis;
let expireSeconds;

async function setData(data) {
    const id = uuid.v4();
    await redis.set(id, data, "EX", expireSeconds);
    return id;
}

async function getData(id) {
    return await redis.get(id);
}



// 
module.exports = (inRedis, inExpireSeconds) => {

    redis = inRedis;
    expireSeconds = inExpireSeconds

    return {
        setData, getData,
    };
}
