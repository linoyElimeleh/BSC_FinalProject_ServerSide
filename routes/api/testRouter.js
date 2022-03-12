const authenticateToken = require('../../middleware/authorization');

const router = require('express').Router();

/**
 * Test auth request
 */
router.get('/', authenticateToken, (req, res) => {
    res.json({ beep: 'boop' });
});

module.exports = router;