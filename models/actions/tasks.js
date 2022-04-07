const { pool, executeTransaction } = require('../index');


const createTask = async (task, userId, groupId, ownerId) => {
    return await executeTransaction(async (client) => {
        const { title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score } = task;
        const newTask = await createTaskClient(client, title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score);
        const taskDetails = newTask.rows[0];
        await assignTaskClient(client, taskDetails.id, userId, groupId, ownerId);
        return taskDetails;
    })
}

const updateTaskAsignee = async (taskId, userId) => {
    return await executeTransaction(async (client) => {
        return await client.query(
            `UPDATE group_user_tasks SET user_id=$2 WHERE task_id=$1`
            , [taskId, userId]
        );
    })
}

const updateTask = async (task) => {
    await executeTransaction(async (client) => {
        const { id, title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score } = task;
        await client.query(
            `UPDATE tasks SET title=$1, description=$2, category_id=$3, due_date=$4, done=$5,
                repeat=$6, end_repeat=$7, urgent=$8, snooze_interval=$9, score=$10
                WHERE id=$11
                RETURNING *`
            , [title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score, id]);
    })
}

const deleteTask = async (taskId) => {
    await executeTransaction(async (client) => {
        await client.query(
            `DELETE FROM tasks WHERE id=$1`
            , [taskId]
        );
        await client.query(
            `DELETE FROM group_user_tasks WHERE task_id=$1`
            , [taskId]
        );
    })
}

const setTaskStatus = async (taskId, status) => {
    await executeTransaction(async (client) => {
        await client.query(
            `UPDATE tasks SET done=$2 WHERE id=$1`
            , [taskId, status]
        );
    })
}

const getAllGroupTasks = async (groupId) => {
    return await pool.query(
        `SELECT * FROM tasks
            LEFT OUTER JOIN (select * from group_user_tasks where group_id=$1) AS group_tasks 
            ON group_tasks.task_id = tasks.id`,
        [groupId]
    );
};

const getAllMemberTasksByGroup = async (groupId, memberId) => {
    return await pool.query(
        `SELECT * FROM tasks
            LEFT OUTER JOIN (select * from group_user_tasks where group_id=$1 and user_id=$2) AS user_tasks 
            ON user_tasks.task_id = tasks.id`,
        [groupId, memberId]
    );
};

const getTaskGroupUserRelation = async (taskId) => {
    return await pool.query(
        `SELECT * FROM group_user_tasks WHERE task_id=$1`
        , [taskId]
    );
}

const assignTaskClient = async (client, taskId, userId, groupId, ownerId) => {
    return await client.query(
        `INSERT INTO group_user_tasks (task_id, user_id, group_id, owner_id)
                VALUES ($1,$2,$3,$4) RETURNING *`
        , [taskId, userId, groupId, ownerId]);
}

const createTaskClient = async (client, title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score) => {
    return await client.query(
        `INSERT INTO tasks (title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`
        , [title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score]);
}

module.exports = {
    createTask,
    updateTask,
    updateTaskAsignee,
    deleteTask,
    setTaskStatus,
    getAllGroupTasks,
    getAllMemberTasksByGroup,
    getTaskGroupUserRelation
};