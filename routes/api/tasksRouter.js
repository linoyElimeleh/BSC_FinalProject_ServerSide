const authenticateToken = require('../../middleware/authorization');
const TaskService = require('../../services/taskService');
const router = require('express').Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newTask = await TaskService.createTask(req.body);
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await TaskService.updateTask(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;