const { pool, executeTransaction } = require('../index');

const getAllGroupMembers = async (groupId) => {
    return await pool.query(
        `SELECT users.id, users.display_name, users.email, users.birth_date, users.image, 
            members.score, members.is_admin FROM users
            JOIN (select * from group_members where group_id=$1) AS members 
            ON members.user_id = users.id`,
        [groupId]
    );
};

const addGroupMembers = async (groupId, idsToAdd) => {
    await executeTransaction(async (client) => {
        await client.query(
            `INSERT INTO group_members(group_id, user_id) 
            VALUES ($1, UNNEST($2::int[]))`,
            [groupId, idsToAdd]
        );
    })

};

module.exports = {
    getAllGroupMembers,
    addGroupMembers
};