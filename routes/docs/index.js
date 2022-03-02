const router = require('express').Router();
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const basicInfo = require('./basicInfo');
const servers = require('./servers');
const security = require('./security');
const components = require('./components');
const api = require('./api');

const docs = {
    ...basicInfo,
    ...servers,
    ...components,
    ...security,
    ...api
}

router.use('/', swaggerUI.serve, swaggerUI.setup(docs));

module.exports = router;