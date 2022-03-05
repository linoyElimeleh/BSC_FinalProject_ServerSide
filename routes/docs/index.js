const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');

const basicInfo = require('./basicInfo');
const servers = require('./servers');
const security = require('./security');
const components = require('./components');
const routes = require('./routes');

const docs = {
    ...basicInfo,
    ...servers,
    ...components,
    ...security,
    ...routes
}

router.use('/', swaggerUI.serve, swaggerUI.setup(docs));

module.exports = router;