const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const UserService = require('../../services/userService');
const groupValidation = require('../../middleware/groupValidations');
const router = require('express').Router();

router.get('/:id', authenticateToken, groupValidation, async (req, res) => {
    try {
        const members = await GroupService.getGroupMembers(req.params.id);
        res.json({ ...req.group, members });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/members', authenticateToken, groupValidation, async (req, res) => {
    try {
        const members = await GroupService.getGroupMembers(req.params.id);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id/add_members', authenticateToken, groupValidation, async (req, res) => {
    try {
        const groupId = req.params.id;
        const idsToAdd = req.body.members;
        await GroupService.addGroupMembers(groupId, idsToAdd);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/tasks', authenticateToken, groupValidation, async (req, res) => {
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
        const newGroup = await GroupService.createGroup(req.body, req.user.id);
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