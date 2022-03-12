const { pool, executeTransaction } = require('../index');


const getAllGroups = async () => {
    return await pool.query('SELECT * FROM groups');
}

const getGroupById = async (groupId) => {
    return await pool.query('SELECT * FROM groups WHERE id = $1', [groupId]);
}

const getGroupByInviteCode = async (inviteCode) => {
    return await pool.query('SELECT * FROM groups WHERE invite_code = $1', [inviteCode]);
}

const isUserMemberOfGroup = async (groupId, userId) => {
    return await pool.query('SELECT * FROM group_members WHERE group_id=$1 AND user_id=$2', [groupId, userId]);
}

const createGroup = async (group, userId) => {
    return await executeTransaction(async (client) => {
        const { group_name, description, image, invite_code } = group;
        let newGroup = await client.query(
            'INSERT INTO groups (name, description, image, invite_code) VALUES ($1,$2,$3,$4) RETURNING *'
            , [group_name, description, image, invite_code]);
        newGroup = newGroup.rows[0];
        await client.query(
            'INSERT INTO group_members (group_id, user_id, is_admin, role_id, score) VALUES ($1, $2, $3, $4, $5) RETURNING *'
            , [newGroup.id, userId, true, null, 0]);
        return newGroup;
    })
}

const updateGroup = async (group, groupId) => {
    await executeTransaction(async (client) => {
        const {group_name, description, image} = group;
        await client.query(
            'UPDATE groups SET name=$1, description=$2, image=$3 WHERE id=$4 RETURNING *'
            , [group_name, description, image, groupId]);
    })
}

const isUserAdmin = async (groupId, userId) => {
    return await pool.query('SELECT is_admin FROM group_members WHERE group_id=$1 AND user_id=$2', [groupId, userId]);

}

module.exports = {
    getAllGroups,
    getGroupById,
    getGroupByInviteCode,
    createGroup,
    updateGroup,
    isUserMemberOfGroup,
    isUserAdmin
};