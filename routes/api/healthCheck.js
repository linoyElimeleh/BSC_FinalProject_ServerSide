const router = require('express').Router();

router.get('/beep', (req, res) => {
    res.json({ beep: 'boop' });
});

module.exports = router;