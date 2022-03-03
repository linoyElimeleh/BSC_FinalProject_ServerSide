const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5438,
});

const executeTransaction = async (callback) => {
    const client = await pool.connect();
    client.query('BEGIN');
    const queryResult = await callback(client);
    client.query('COMMIT');
    return queryResult;
}


module.exports = {
    pool,
    executeTransaction
};