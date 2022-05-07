const { encryptPassword } = require("../../utils/authenticationUtils");
const { pool, executeTransaction } = require("../index");

const getAllUsers = async () => {
  return await pool.query("SELECT id, display_name, email, birth_date, image FROM users");
};

const getUserByEmail = async (email) => {
  return await pool.query("SELECT id, display_name, email, birth_date, image, password, notification_tokens FROM users WHERE email = $1", [email]);
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
      `SELECT * FROM groups WHERE groups.id IN (SELECT group_id FROM group_members WHERE user_id=$1)`, [userId]
  );
};

const getUserGroupsCurrentTaskData = async (userId) => {
  return await pool.query(
      `select min_due_date_table.min_due_date, groups.id as group_id, groups.name, groups.description as group_description, groups.image, groups.invite_code,
scores.score as current_user_score ,
group_user_tasks.task_id, tasks.title, tasks.description as task_description, tasks.category_id, tasks.due_date, tasks.done, tasks.repeat, tasks.end_repeat, tasks.urgent, tasks.snooze_interval, tasks.score
from 
(select MIN(test.due_date) as min_due_date, test.group_id from 
   (SELECT groups.id as group_id, tasks.due_date, tasks.id as task_id
    FROM groups
    Left JOIN group_user_tasks ON group_user_tasks.group_id = groups.id and group_user_tasks.user_id= $1
    Left JOIN tasks ON tasks.id = group_user_tasks.task_id
    WHERE groups.id IN (SELECT group_id FROM group_members WHERE user_id=$1)
   ) as test
 GROUP BY test.group_id
) as min_due_date_table 
Left JOIN groups ON  min_due_date_table.group_id=groups.id
Left JOIN scores ON min_due_date_table.group_id= scores.group_id  and scores.user_id= $1
Left JOIN group_user_tasks ON  min_due_date_table.group_id= group_user_tasks.group_id and group_user_tasks.user_id= $1 
Left JOIN tasks ON tasks.id = group_user_tasks.task_id 
where min_due_date_table.min_due_date IS NULL or
tasks.due_date = min_due_date_table.min_due_date`
      , [userId]
  );
};

const createUser = async (user) => {
  return await executeTransaction(async (client) => {
    const { display_name, email, birth_date, password, image, notification_token } = user;
    const hashedPassword = await encryptPassword(password);
    let queryBase = "INSERT INTO users (display_name, email, birth_date, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    let paramsBase = [display_name, email, birth_date, hashedPassword, image]
    if (notification_token){
      queryBase = "INSERT INTO users (display_name, email, birth_date, password, image, notification_tokens) VALUES ($1, $2, $3, $4, $5, ARRAY[$6]) RETURNING *"
      paramsBase.push(notification_token);
    }
    return await client.query(
      queryBase,
      paramsBase
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

const updateUser = async (userBody, userId) => {
  await executeTransaction(async (client) => {
    const {displayName, image, birthDate} = userBody;
    await client.query(
        "UPDATE users SET display_name=$1, image=$2, birth_date=$3 WHERE id=$4",
        [displayName, image, birthDate, userId]
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

const addUserNotificationToken = async (userId, notification_token) => {
  await executeTransaction(async (client) => {
    await client.query(
      "UPDATE users SET notification_tokens=array_append(users.notification_tokens, $2) WHERE id=$1",
      [userId, notification_token]
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
  addUserNotificationToken,
  getCurrentRefreshTokenIndex,
  updateUserRefreshToken,
  deleteUserRefreshToken,
  deleteUserByEmail,
  getPasswordById,
  updatePasswordById,
  getUserGroupsCurrentTaskData
};
