const authenticateToken = require('../../middleware/authorization');
const UserService = require('../../services/userService');
const router = require('express').Router();


router.get('/me', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const userDetails = await UserService.getCurrentUserDetails(email);
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/me/tasks', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const groupId = req.query.groupId;
        const tasks = await UserService.getCurrentUserTasks(email, groupId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/me/groups', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const groups = await UserService.getCurrentUserGroups(email);
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await UserService.registerUser(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await UserService.updateUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;