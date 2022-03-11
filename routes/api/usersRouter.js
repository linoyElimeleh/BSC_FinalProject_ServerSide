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
        const groupId = req.query.groupId;
        const tasks = await UserService.getCurrentUserTasks(req.user.id, groupId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/me/groups', authenticateToken, async (req, res) => {
    try {
        const groups = await UserService.getCurrentUserGroups(req.user.id);
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
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exist.' });
            return;
        }
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