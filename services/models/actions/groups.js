const { pool, executeTransaction } = require('../index');


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

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup
};