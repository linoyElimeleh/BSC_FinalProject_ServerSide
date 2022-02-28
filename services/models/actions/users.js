const { encryptPassword } = require('../../../utils/authenticationUtils');
const { pool, executeTransaction } = require('../index');

const getAllUsers = async () => {
    return await pool.query('SELECT * FROM users');
}

const getUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
}

const getUserById = async (userId) => {
    return await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
}

const createUser = async (user) => {
    return await executeTransaction(async (client) => {
        const { display_name, email, birth_date, password, image } = user;
        const hashedPassword = encryptPassword(password);
        return await client.query(
            'INSERT INTO users (display_name,email,birth_date, password, image) VALUES ($1,$2,$3,$4,$5) RETURNING *'
            , [display_name, email, birth_date, hashedPassword, image]);
    });
}

const updateUser = async (user) => {
    await executeTransaction(async (client) => {
        const { id, display_name, image } = user;
        //check if await is needed
        await client.query(
            'UPDATE users SET display_name=$1, image=$2 WHERE id=$3'
            , [display_name, image, id]);
    });
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser
};