const authenticateToken = require('../../middleware/authorization');
const CommonService = require('../../services/commonService');
const router = require('express').Router();

/**
 * Return repeat types
 */
router.get('/repeat_types', authenticateToken, async (req, res) => {
    try {
        const repeatTypes = await CommonService.getRepeatTypes();
        res.json(repeatTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;