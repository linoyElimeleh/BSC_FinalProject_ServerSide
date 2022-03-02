const authenticateToken = require('../../middleware/authorization');
const groupsDbHandler = require('../../services/models/actions/groups');
const membersDbHandler = require('../../services/models/actions/members');
const tasksDbHandler = require('../../services/models/actions/tasks');
const router = require('express').Router();


router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await groupsDbHandler.getGroupById(groupId);
        res.json(group.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/members', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const members = await membersDbHandler.getAllGroupMembers(groupId);
        res.json(members.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/tasks', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const task = await tasksDbHandler.getAllGroupTasks(groupId);
        res.json(task.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newGroup = await groupsDbHandler.createGroup(req.body);
        res.json(newGroup.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await groupsDbHandler.updateGroup(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;