const express = require('express');
const cors = require('cors');
const { Redis } = require('ioredis');
// 
require('./env');
const logger = require('./modules/logger/winston');
const cryptoController = require('./modules/crypto/crypto.controller');



// redis
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || '192.168.0.102';
const redisPassword = process.env.REDIS_PASSWORD || 'admin';
const redisExpire = process.env.REDIS_EXPIRE || 60;

const redis = new Redis(redisPort, redisHost, {
    password: redisPassword
});



// server
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    logger.info(`METHOD = ${req.method}`);
    if (req.body) logger.info(`BODY = ${JSON.stringify(req.body)}\n`);
    if (req.params) logger.info(`PARAMS = ${JSON.stringify(req.params)}`);
    if (req.query) logger.info(`QUERY = ${JSON.stringify(req.query)}`);
    next();
});

app.use('/api', cryptoController(redis, redisExpire, logger));

app.listen(port, err => {
    console.log('--- Server --- listen ERROR  = ', err);
    console.log(`--- http://localhost:${port}`);
});
