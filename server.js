const express = require('express');
const cors = require('cors');
// 
require('./env');



// 
const port = process.env.PORT || 3000;

// server
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

app.listen(port, err => {
    console.log('--- Server --- listen ERROR  = ', err);
    console.log(`--- http://localhost:${port}`);
});
