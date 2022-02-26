const router = require('express').Router();
const db = require('../../handlers/dbHandler');

router.get('/', async (req, res) => {
    const results = await db.getCategories();
    res.status(200).json(results);
});

module.exports = router;