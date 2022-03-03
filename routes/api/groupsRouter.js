const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const router = require('express').Router();


router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await GroupService.getGroupById(groupId);
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/members', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const members = await GroupService.getGroupMembers(groupId);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/tasks', authenticateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const tasks = await GroupService.getGroupTasks(groupId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newGroup = await GroupService.createGroup(req.body);
        res.json(newGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await GroupService.updateGroup(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;