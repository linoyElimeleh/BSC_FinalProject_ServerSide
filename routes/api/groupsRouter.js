const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const { groupValidation, adminValidation } = require('../../middleware/groupValidations');
const router = require('express').Router();

/**
 * Return the group data by group id
 */
router.get('/:id', authenticateToken, groupValidation, async (req, res) => {
    try {
        const members = await GroupService.getGroupMembers(req.params.id);
        res.json({ ...req.group, members });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Return the group members by group id
 */
router.get('/:id/members', authenticateToken, groupValidation, async (req, res) => {
    try {
        const members = await GroupService.getGroupMembers(req.params.id);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * This request adds new members to exist group by group id and members ids array list
 */
router.post('/:id/add_members', authenticateToken, groupValidation, adminValidation, async (req, res) => {
    try {
        const groupId = req.params.id;
        const idsToAdd = req.body.members;
        await GroupService.addGroupMembers(groupId, idsToAdd);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * This request returns the task of the groups
 */
router.get('/:id/tasks', authenticateToken, groupValidation, async (req, res) => {
    try {
        const groupId = req.params.id;
        const tasks = await GroupService.getGroupTasks(groupId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Create new group by body and user id.
 * Body contains: group name, group description and photo.
 */
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newGroup = await GroupService.createGroup(req.body, req.user.id);
        res.json(newGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Update exist group by group id and body.
 * Body contains: group name, group description and photo.
 */
router.put('/:id', authenticateToken, groupValidation, adminValidation, async (req, res) => {
    try {
        await GroupService.updateGroup(req.body, req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;