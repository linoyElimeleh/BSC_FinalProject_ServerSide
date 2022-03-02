const router = require('express').Router();
const api = require('./api');
const docs = require('./docs');

router.use('/api', api);
router.use('/docs', docs);

module.exports = router;
