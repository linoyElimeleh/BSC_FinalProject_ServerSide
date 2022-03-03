const router = require('express').Router();
const categoriesHandler = require('../../models/actions/categories');

router.get('/', async (req, res) => {
    const results = await categoriesHandler.getCategories();
    res.status(200).json(results);
});

module.exports = router;