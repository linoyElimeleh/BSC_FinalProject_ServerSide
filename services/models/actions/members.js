const { pool } = require('../index');

const getAllGroupMembers = async (groupId) => {
    return await pool.query(
        `SELECT users.id, users.display_name, users.email, users.birth_date, users.image, 
            members.score, members.is_admin FROM users
            JOIN (select * from group_members where group_id=$1) AS members 
            ON members.user_id = users.id`,
        [groupId]
    );
};

module.exports = {
    getAllGroupMembers
};