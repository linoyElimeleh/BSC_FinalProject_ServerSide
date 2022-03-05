const router = require('express').Router();
const authenticateToken = require('../../middleware/authorization');
const UserService = require('../../services/userService');

router.get('/users', authenticateToken, async (req, res) => {
    const query = req.query.query;
    const searchResults = await UserService.searchUsers(query);
    res.json(searchResults);
});

module.exports = router;