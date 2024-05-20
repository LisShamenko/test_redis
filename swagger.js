const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



// 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test Redis',
            version: '1.0.0',
        },
    },
    apis: ['./*.js', './modules/crypto/*.js'],
}

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
