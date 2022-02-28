const { pool } = require('../index');

const getAllGroupMembers = async (groupId) => {
    return await pool.query(
        `SELECT users.*, members.score, members.is_admin FROM users
            LEFT OUTER JOIN (select * from group_members where group_id=$1) AS members 
            ON members.user_id = users.id`,
        [groupId]
    );
};

module.exports = {
    getAllGroupMembers
};