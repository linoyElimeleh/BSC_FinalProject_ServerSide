const usersDbHandler = require('../models/actions/users');
const tasksDbHandler = require('../models/actions/tasks');
const { jwtTokens } = require('../utils/jwtUtils');

class UserService {
    constructor() { }

    static getCurrentUserDetails = async (email) => {
        const userDetails = await usersDbHandler.getUserByEmail(email);
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
        return (jwtTokens(newUser));
    }

    static updateUser = async (user) => {
        await usersDbHandler.updateUser(user);
    }

    static searchUsers = async (query) => {
        const searchResults = await usersDbHandler.searchUsers(query);
        return searchResults.rows;
    }
}

module.exports = UserService;