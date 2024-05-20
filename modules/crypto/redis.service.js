const uuid = require("uuid");



//
let redis;
let expireSeconds;
let logger;

async function setData(data) {
    try {
        const id = uuid.v4();
        await redis.set(id, data, "EX", expireSeconds);
        logger.info(`--- redis SET data --- id = ${id}`);
        return id;
    }
    catch (err) {
        logger.error(`--- redis SET ERROR: ${err} --- data = ${JSON.stringify(data)}`);
    }
}

async function getData(id) {
    try {
        const data = await redis.get(id);
        logger.info(`--- redis GET data --- id = ${id}`);
        return data;
    }
    catch (err) {
        logger.error(`--- redis GET ERROR: ${err} --- id = ${id}`);
    }
}



// 
module.exports = (inRedis, inExpireSeconds, inLogger) => {
    redis = inRedis;
    expireSeconds = inExpireSeconds
    logger = inLogger;
    return {
        setData, getData,
    };
}
