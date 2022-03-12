const router = require('express').Router();
const authenticateToken = require('../../middleware/authorization');
const UserService = require('../../services/userService');

/**
 * Get user by a query :search by display_name or email
 */
router.get('/search', authenticateToken, async (req, res) => {
    const query = req.query.query;
    const searchResults = await UserService.searchUsers(query);
    res.json(searchResults);
});

module.exports = router;