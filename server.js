const express = require('express');
const cors = require('cors');
const { Redis } = require('ioredis');
// 
require('./env');
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
    console.log('--------------------------------');
    console.log('METHOD = ', req.method);
    if (req.body) console.log('BODY\n', req.body);
    if (req.params) console.log('PARAMS\n', req.params);
    if (req.query) console.log('QUERY\n', req.query);
    next();
});

app.use('/api', cryptoController(redis, redisExpire));

app.listen(port, err => {
    console.log('--- Server --- listen ERROR  = ', err);
    console.log(`--- http://localhost:${port}`);
});
