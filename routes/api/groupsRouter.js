const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const { groupValidation, adminValidation, isUserEligibleToJoin } = require('../../middleware/groupValidations');
const TaskService = require('../../services/taskService');
const { taskOwnerValidation, taskReporterValidation } = require('../../middleware/taskValidation');
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
 * Create a new task with a body contains title,description, and more.
 */
router.post('/:id/task', authenticateToken, groupValidation, async (req, res) => {
    try {
        const newTask = await TaskService.createTask(req.body.task, req.body.userId, req.params.id, req.user.id);
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/task', authenticateToken, groupValidation, taskReporterValidation, async (req, res) => {
    try {
        await TaskService.updateTask(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id/task', authenticateToken, groupValidation, taskOwnerValidation, async (req, res) => {
    try {
        await TaskService.deleteTask(req.body.taskId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/task/set_status', authenticateToken, groupValidation, taskReporterValidation, async (req, res) => {
    try {
        await TaskService.setTaskStatus(req.body.taskId, req.body.status);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/task/assign', authenticateToken, groupValidation, taskOwnerValidation, async (req, res) => {
    try {
        await TaskService.assignTask(req.body.taskId, req.body.userId);
        res.sendStatus(200);
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
        res.status(500).json({ error: error.message });
    }
});


router.post('/join', authenticateToken, isUserEligibleToJoin, async (req, res) => {
    try {
        //req.group is received after isUserEligibleToJoin and req.user is received after authenticateToken
        await GroupService.addGroupMembers(req.group.id, [req.user.id]);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;