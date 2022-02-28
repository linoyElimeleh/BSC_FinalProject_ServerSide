const bcrypt = require('bcrypt');

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

module.exports = {
    validatePassword,
    encryptPassword
}