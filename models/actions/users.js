const { encryptPassword } = require("../../utils/authenticationUtils");
const { pool, executeTransaction } = require("../index");

const getAllUsers = async () => {
  return await pool.query("SELECT id, display_name, email, birth_date, image FROM users");
};

const getUserByEmail = async (email) => {
  return await pool.query("SELECT id, display_name, email, birth_date, image, password FROM users WHERE email = $1", [email]);
};

const getUserById = async (userId) => {
  return await pool.query("SELECT id, display_name, email, birth_date, image FROM users WHERE id = $1", [userId]);
};

const getPasswordById = async (userId) => {
  const password = await pool.query("SELECT password FROM users WHERE id = $1", [userId]);
  if (password.rows.length == 0) return res.status(400).json({error: "Password for this user not found"});

  return password.rows[0].password;
};

const getUserGroups = async (userId) => {
  return await pool.query(
      `SELECT * FROM groups 
                            WHERE groups.id IN 
                            (SELECT group_id FROM group_members WHERE user_id=$1)`,
      [userId]
  );
};

const createUser = async (user) => {
  return await executeTransaction(async (client) => {
    const {display_name, email, birth_date, password, image} = user;
    const hashedPassword = await encryptPassword(password);
    return await client.query(
        "INSERT INTO users (display_name, email, birth_date, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [display_name, email, birth_date, hashedPassword, image]
    );
  });
};

const updatePasswordById = async (userId, password) => {
  return await executeTransaction(async (client) => {
    const hashedPassword = await encryptPassword(password);
    return await client.query(
        "UPDATE users SET password=$1 WHERE id=$2",
        [hashedPassword, userId]
    );
  });
};

const updateUser = async (user) => {
  await executeTransaction(async (client) => {
    const {id, display_name, image} = user;
    //check if await is needed
    await client.query(
        "UPDATE users SET display_name=$1, image=$2 WHERE id=$3",
        [display_name, image, id]
    );
  });
};

const searchUsers = async (query) => {
  return await executeTransaction(async (client) => {
    return await client.query(
      `SELECT id, display_name, email FROM users WHERE display_name LIKE $1 OR email LIKE $1`,
      [`%${query}%`]
    );
  });
};

const addUserRefreshToken = async (userId, refreshToken) => {
  await executeTransaction(async (client) => {
    await client.query(
      "UPDATE users SET tokens=array_append(users.tokens, $2) WHERE id=$1",
      [userId, refreshToken]
    );
  });
};

const getCurrentRefreshTokenIndex = async (userId, refreshToken) => {
  return await executeTransaction(async (client) => {
    return await client.query(
      `SELECT *, array_position(tokens, $2) as position FROM users WHERE id=$1 AND $2=ANY(tokens)`,
      [userId, refreshToken]
    );
  });
};

const updateUserRefreshToken = async (userId, oldRefreshTokenIndex, newRefreshToken) => {
  await executeTransaction(async (client) => {
    await client.query(
      "UPDATE users SET tokens[$2]=$3 WHERE id=$1",
      [userId, oldRefreshTokenIndex, newRefreshToken]
    );
  });
};

const deleteUserRefreshToken = async (userId, refreshToken) => {
  await executeTransaction(async (client) => {
    await client.query(
      "UPDATE users SET tokens=array_remove(tokens, $2) WHERE id=$1",
      [userId, refreshToken]
    );
  });
};

const deleteUserByEmail = async (email) => {
  await executeTransaction(async (client) => {
    await client.query(
      "DELETE FROM users WHERE email=$1",
      [email]
    );
  })
}


module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  getUserGroups,
  searchUsers,
  addUserRefreshToken,
  getCurrentRefreshTokenIndex,
  updateUserRefreshToken,
  deleteUserRefreshToken,
  deleteUserByEmail,
  getPasswordById,
  updatePasswordById,
};
