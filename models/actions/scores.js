const {pool, executeTransaction} = require('../index');


const getAllScores = async () => {
    return await pool.query('SELECT * FROM scores');
}

const getScoresByGroupId = async (groupId) => {
    return await pool.query('SELECT * FROM scores WHERE group_id = $1', [groupId]);
}

const getScoresByUserId = async (userId) => {
    return await pool.query('SELECT * FROM scores WHERE user_id = $1', [userId]);
}

const getScoresByUserIdAndGroupId = async (userId, groupId) => {
    return await pool.query('SELECT * FROM scores WHERE user_id = $1 AND group_id = $2', [userId, groupId]);
}

const updateScoreByUserId = async (score, userId ,groupId) => {
    await executeTransaction(async (client) => {
        await client.query(
            'UPDATE scores SET score=$1 WHERE group_id=$2 AND user_id=$3 RETURNING *'
            , [score, groupId, userId]);
    })
}

const createScoresByUserId = async (score, userId, groupId) => {
    return await executeTransaction(async (client) => {
        let newScore = await client.query(
            'INSERT INTO scores (score, user_id, group_id) VALUES ($1,$2,$3) RETURNING *'
            , [score, userId, groupId]);
        return newScore;
    })
}

const isUserAlreadyCreatedInGroup = async (groupId, userId) => {
    let user = await pool.query('SELECT * FROM scores WHERE group_id=$1 AND user_id=$2', [groupId, userId]);
    if (user.rows == 0) {
        return false;
    }
    return true;
}

module.exports = {
    getAllScores,
    getScoresByGroupId,
    getScoresByUserId,
    updateScoreByUserId,
    createScoresByUserId,
    isUserAlreadyCreatedInGroup,
    getScoresByUserIdAndGroupId
};