const usersDbHandler = require('../models/actions/users');
const tasksDbHandler = require('../models/actions/tasks');
const { jwtTokens } = require('../utils/jwtUtils');

class UserService {
    constructor() { }

    static getCurrentUserDetails = async (userId) => {
        const userDetails = await usersDbHandler.getUserById(userId);
        return userDetails.rows[0];
    }

    static getCurrentUserTasks = async (userId, groupId) => {
        const tasks = await tasksDbHandler.getAllMemberTasksByGroup(groupId, userId);
        return tasks.rows;
    }

    static getCurrentUserGroups = async (userId) => {
        const groups = await usersDbHandler.getUserGroups(userId);
        return groups.rows;
    }

    static registerUser = async (user) => {
        const newUser = await usersDbHandler.createUser(user);
        const newUserData = newUser.rows[0];
        const tokens = jwtTokens(newUserData);
        await this.addUserRefreshToken(newUserData.id, tokens.refreshToken);
        return tokens;
    }

    static updateUser = async (user) => {
        await usersDbHandler.updateUser(user);
    }

    static searchUsers = async (query) => {
        const searchResults = await usersDbHandler.searchUsers(query);
        return searchResults.rows;
    }

    static addUserRefreshToken = async (userId, refreshToken) => {
        await usersDbHandler.addUserRefreshToken(userId, refreshToken);
    }

    static getCurrentRefreshTokenIndex = async (userId, refreshToken) => {
        const userData = await usersDbHandler.getCurrentRefreshTokenIndex(userId, refreshToken);
        return userData.rows[0];
    }

    static refreshUserToken = async (userId, oldRefreshTokenIndex, newRefreshToken) => {
        await usersDbHandler.updateUserRefreshToken(userId, oldRefreshTokenIndex, newRefreshToken);
    }

    static deleteUserRefreshToken = async (userId, refreshToken) => {
        await usersDbHandler.deleteUserRefreshToken(userId, refreshToken);
    }
}

module.exports = UserService;