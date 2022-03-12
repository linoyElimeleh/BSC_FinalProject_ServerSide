const router = require('express').Router();

/**
 * Health check request
 */
router.get('/beep', (req, res) => {
    res.json({ beep: 'boop' });
});

module.exports = router;