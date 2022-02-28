const Pool = require('pg').Pool
const bcrypt = require('bcrypt');
const { encryptPassword } = require('../utils/authenticationUtils');
const { jwtTokens } = require('../utils/jwtUtils');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5438,
});

//--------------------- Common ----------------------------
const executeTransaction = async (callback) => {
    const client = await pool.connect();
    client.query('BEGIN');
    const queryResult = await callback(client);
    client.query('COMMIT');
    return queryResult;
}

//--------------------- Categories Operations ----------------------------
const getCategories = async () => {
    const response = await pool.query('select * from categories');
    return response?.rows;
}

//--------------------- User Operations ----------------------------
const getAllUsers = async () => {
    return await pool.query('SELECT * FROM users');
}

const getUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
}

const getUserById = async (userId) => {
    return await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
}

const createUser = async (user) => {
    return await executeTransaction(async (client) => {
        const { display_name, email, birth_date, password, image } = user;
        const hashedPassword = encryptPassword(password);
        return await client.query(
            'INSERT INTO users (display_name,email,birth_date, password, image) VALUES ($1,$2,$3,$4,$5) RETURNING *'
            , [display_name, email, birth_date, hashedPassword, image]);
    });
}

const updateUser = async (user) => {
    await executeTransaction(async (client) => {
        const { id, display_name, image } = user;
        //check if await is needed
        await client.query(
            'UPDATE users SET display_name=$1, image=$2 WHERE id=$3'
            , [display_name, image, id]);
    });
}

//--------------------- Group Operations ----------------------------
const getAllGroups = async () => {
    return await pool.query('SELECT * FROM groups');
}

const getGroupById = async (groupId) => {
    return await pool.query('SELECT * FROM groups WHERE id = $1', [groupId]);
}

const createGroup = async (group) => {
    return await executeTransaction(async (client) => {
        const { group_name, description, image } = group;
        return await client.query(
            'INSERT INTO groups (name, description, image) VALUES ($1,$2,$3) RETURNING *'
            , [group_name, description, image]);
    })
}

const updateGroup = async (group) => {
    await executeTransaction(async (client) => {
        const { id, group_name, description, image } = group;
        await client.query(
            'UPDATE groups SET name=$1, description=$2, image=$3 WHERE id=$4 RETURNING *'
            , [group_name, description, image, id]);
    })
}

//--------------------- Group Members Operations ----------------------------
const getAllGroupMembers = async (groupId) => {
    return await pool.query(
        `SELECT users.*, members.score, members.is_admin FROM users
            LEFT OUTER JOIN (select * from group_members where group_id=$1) AS members 
            ON members.user_id = users.id`,
        [groupId]
    );
};

//--------------------- Tasks Operations ----------------------------
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

//--------------------- Group User Tasks Operations ----------------------------
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
    getCategories,
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    getAllGroupMembers,
    createTask,
    updateTask,
    getAllGroupTasks,
    getAllMemberTasksByGroup
};