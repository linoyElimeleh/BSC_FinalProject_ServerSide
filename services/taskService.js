const dbHandler = require('../models/actions/tasks');

class TaskService {
    static createTask = async (task) => {
        const newTask = await dbHandler.createTask(task);
        res.json(newTask.rows[0]);
    }

    static updateTask = async (task) => {
        await dbHandler.updateTask(task);
    }
}

module.exports = TaskService;