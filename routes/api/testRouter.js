const authenticateToken = require('../../middleware/authorization');

const router = require('express').Router();

router.get('/', authenticateToken, (req, res) => {
    res.json({ beep: 'boop' });
});

module.exports = router;