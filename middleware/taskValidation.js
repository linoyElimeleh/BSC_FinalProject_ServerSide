const TaskNotExist = require("../exceptions/TaskNotExist");
const UserIsNotTaskOwner = require("../exceptions/UserIsNotTaskOwner");
const UserIsNotTaskReporter = require("../exceptions/UserIsNotTaskReporter");
const GroupService = require("../services/groupService");
const TaskService = require("../services/taskService");

const taskOwnerValidation = async (req, res, next) => {
    isGroupAdmin(req, res, async (isAdmin, _, userId, taskId) => {
        const isTaskOwner = await TaskService.isTaskOwner(taskId, userId);
        if (!isAdmin && !isTaskOwner) {
            throw new UserIsNotTaskOwner();
        }
        next();
    });
}

const taskReporterValidation = async (req, res, next) => {
    isGroupAdmin(req, res, async (isAdmin, _, userId, taskId) => {
        const isTaskReporter = await TaskService.isTaskReporter(taskId, userId);
        if (!isAdmin && !isTaskReporter) {
            throw new UserIsNotTaskReporter();
        }
        next();
    });
}

const isGroupAdmin = async (req, res, callback) => {
    try {
        const groupId = req.group.id;
        const userId = req.user.id;
        const taskId = req.body.taskId || req.body.id;
        const isAdmin = await GroupService.isUserAdmin(groupId, userId);
        return await callback(isAdmin, groupId, userId, taskId);
    } catch (e) {
        if (e instanceof UserIsNotTaskReporter || e instanceof UserIsNotTaskOwner) {
            res.status(401).json({ error: e.message });
            return;
        }
        if (e instanceof TaskNotExist) {
            res.status(400).json({ error: e.message });
            return;
        }
    }
}

module.exports = {
    taskOwnerValidation,
    taskReporterValidation
};