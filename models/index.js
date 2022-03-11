const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const executeTransaction = async (callback) => {
  //const client = await pool.connect();
  pool.query("BEGIN");
  const queryResult = await callback(pool);
  pool.query("COMMIT");
  //client.release();
  return queryResult;
};

module.exports = {
  pool,
  executeTransaction
};
