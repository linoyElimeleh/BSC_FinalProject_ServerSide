const authenticateToken = require('../../middleware/authorization');
const TaskService = require('../../services/taskService');
const router = require('express').Router();
const {groupValidation, adminValidation, isUserEligibleToJoin} = require('../../middleware/groupValidations');
const {taskOwnerValidation, taskReporterValidation} = require('../../middleware/taskValidation');
const GroupService = require('../../services/groupService');

/**
 * Create a new task with a body contains title,description, and more.
 */

/**
 * Create new task with group id
 */
router.post('/:id/task', authenticateToken, groupValidation, async (req, res) => {
    try {
        user = req.body.userId;
        if (user == null) {
            user = req.user.id
        }
        const newTask = await TaskService.createTask(req.body.task, user, req.params.id, req.user.id);
        res.json(newTask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Update exist task
 */
router.put('/:id/task', authenticateToken, groupValidation, taskReporterValidation, async (req, res) => {
    try {
        await TaskService.updateTask(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Delete exist task
 */
router.delete('/:id/task', authenticateToken, groupValidation, taskOwnerValidation, async (req, res) => {
    try {
        await TaskService.deleteTask(req.body.taskId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Set status on task
 */
router.put('/:id/task/set_status', authenticateToken, groupValidation, taskReporterValidation, async (req, res) => {
    try {
        await TaskService.setTaskStatus(req.body.taskId, req.body.status);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Assign task to user
 */
router.put('/:id/task/assign', authenticateToken, groupValidation, taskOwnerValidation, async (req, res) => {
    try {
        await TaskService.assignTask(req.body.taskId, req.body.userId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
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
        res.status(500).json({error: error.message});
    }
});

module.exports = router;