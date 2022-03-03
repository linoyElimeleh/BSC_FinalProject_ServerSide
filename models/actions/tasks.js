const { pool, executeTransaction } = require('../index');


const createTask = async (task) => {
    return await executeTransaction(async (client) => {
        const { title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score } = task;
        return await client.query(
            `INSERT INTO tasks (title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`
            , [title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score]);
    })
}

const updateTask = async (task) => {
    await executeTransaction(async (client) => {
        const { id, title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score } = group;
        await client.query(
            `UPDATE tasks SET title=$1, description=$2, category_id=$3, due_date=$4, done=$5,
                repeat=$6, end_repeat=$7, urgent=$8, snooze_interval=$9, score=$10
                WHERE id=$11
                RETURNING *`
            , [title, description, category_id, due_date, done, repeat, end_repeat, urgent, snooze_interval, score, id]);
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

const getAllMemberTasksByGroup = async (groupId, memeberId) => {
    return await pool.query(
        `SELECT * FROM tasks
            LEFT OUTER JOIN (select * from group_user_tasks where group_id=$1 and user_id=$2) AS user_tasks 
            ON user_tasks.task_id = tasks.id`,
        [groupId, memeberId]
    );
};

module.exports = {
    createTask,
    updateTask,
    getAllGroupTasks,
    getAllMemberTasksByGroup
};