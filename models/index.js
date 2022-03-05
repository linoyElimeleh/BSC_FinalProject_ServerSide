const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


const executeTransaction = async (callback) => {
  const client = await pool.connect();
  client.query("BEGIN");
  const queryResult = await callback(client);
  client.query("COMMIT");
  return queryResult;
};

module.exports = {
  pool,
  executeTransaction,
};
