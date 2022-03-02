const authenticateToken = require('../../middleware/authorization');
const dbHandler = require('../../services/models/actions/tasks');
const router = require('express').Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newTask = await dbHandler.createTask(req.body);
        res.json(newTask.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await dbHandler.updateTask(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;