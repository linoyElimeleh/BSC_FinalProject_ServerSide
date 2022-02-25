const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5438,
});

const getCategories = (req, res) => {
    pool.query('select * from categories', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getCategories
};