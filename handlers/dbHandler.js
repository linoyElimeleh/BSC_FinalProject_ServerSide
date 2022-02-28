const Pool = require('pg').Pool
const bcrypt = require('bcrypt');
const { encryptPassword } = require('../utils/authentication');
const { jwtTokens } = require('../utils/jwt-helpers');

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
}

const getUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
}

const insertUser = async (user) => {
    const client = await pool.connect();
    client.query('BEGIN');
    const { display_name, email, birth_date, password, image } = user;
    const hashedPassword = encryptPassword(password);
    const newUser = await client.query(
        'INSERT INTO users (display_name,email,birth_date, password, image) VALUES ($1,$2,$3,$4,$5) RETURNING *'
        , [display_name, email, birth_date, hashedPassword, image]);
    client.query('COMMIT');
    return newUser;
}

const startAction = (client) => {
    client.query('BEGIN');
}

const commitAction = (client) => {
    client.query('COMMIT');
}


module.exports = {
    pool,
    startAction,
    commitAction,
    insertUser,
    getCategories,
    getUserByEmail
};