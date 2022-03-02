const authenticateToken = require('../../middleware/authorization');
const usersDbHandler = require('../../services/models/actions/users');
const tasksDbHandler = require('../../services/models/actions/tasks');
const { jwtTokens } = require('../../utils/jwtUtils');
const router = require('express').Router();

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const userDetails = await usersDbHandler.getUserByEmail(email);
        res.json(userDetails.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/me/tasks', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email;
        const groupId = req.query.groupId;
        const userDetails = await usersDbHandler.getUserByEmail(email);
        const tasks = await tasksDbHandler.getAllMemberTasksByGroup(groupId, userDetails.rows[0].id);
        res.json(tasks.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await usersDbHandler.createUser(req.body);
        res.json(jwtTokens(newUser));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await usersDbHandler.updateUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;