const Pool = require("pg").Pool;

const pool = new Pool({
  user: "wjkzlytlbrkzbe",
  host: "ec2-176-34-105-15.eu-west-1.compute.amazonaws.com",
  database: "dbiog8i57pkf3",
  password: "0b90f9d5de0e2c919c89170e8de85a4e5e427e8568a7039cd5fb4514a003ca72",
  port: 5432,
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
