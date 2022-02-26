const Pool = require('pg').Pool
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5438,
});

const getCategories = async () => {
    const response = await pool.query('select * from categories');
    return response?.rows;

        // await pool.query('select * from categories', (error, results) => {
        //     if (error) {
        //         throw error;
        //     }
        //     res.status(200).json(results.rows);
    // });
}

const authenticateUser = async (email, password, done) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await JSON.stringify(client.query('SELECT rowid AS id, * FROM users WHERE email=$1', [email], (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false, { message: "Incorrect email or password" });
            bcrypt.compare(password, result.rows[0].password, (err, check) => {
                if (err) {
                    return done();
                }
                else if (check) {
                    let user = result.rows[0];
                    return done(null, [{ email: user.email }]);
                } else {
                    return done(null, false);
                }
            })

        }))

    } catch (e) { throw e; }
}

module.exports = {
    getCategories
};