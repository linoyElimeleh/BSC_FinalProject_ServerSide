const { pool } = require('../index');

const getCategories = async () => {
    const response = await pool.query('select * from categories');
    return response?.rows;
}

module.exports = { getCategories };