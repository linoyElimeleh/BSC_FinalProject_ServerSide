const { pool, executeTransaction } = require('../index');


const getAllRepeatTypes = async () => {
    return await pool.query('SELECT * FROM repeat_types');
}

module.exports = {
    getAllRepeatTypes
}