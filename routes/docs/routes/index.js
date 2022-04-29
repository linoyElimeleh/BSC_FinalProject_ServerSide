const healthCheck = require('./healthCheck');
const login = require('./auth/login');
const register = require('./auth/register');
const refreshToken = require('./auth/refreshToken');
const categories = require('./categories/categories');
const createGroup = require('./group/createGroup');
const groupGetAndUpdateData = require('./group/groupGetAndUpdateData');
const getGroupMembers = require('./group/getGroupMembers');
const addGroupsMembers = require('./group/addGroupsMembers');
const getGroupTasks = require('./group/getGroupTask');
const searchUsers = require('./search/users');
const tasks = require('./tasks/tasks');
const setTaskStatus = require('./tasks/setTaskStatus');
const assignTask = require('./tasks/assignTask');
const getUserDetails = require('./user/getUserDetails');
const getUserTasks = require('./user/getUserTasks');
const getUserGroups = require('./user/getUserGroups');
const updateUserDetails = require('./user/updateUserDetails');
const repeatTypes = require('./common/repeatTypes');
const addNewScore = require('./scores/addNewScore');
module.exports = {
    paths: {
        '/api/beep': {
            ...healthCheck
        },
        '/api/auth/login': {
            ...login
        },
        '/api/auth/refresh_token': {
            ...refreshToken
        },
        '/api/users/register': {
            ...register
        },
        '/api/categories': {
            ...categories
        },
        '/api/groups': {
            ...createGroup
        },
        '/api/groups/{id}': {
            ...groupGetAndUpdateData
        },
        '/api/groups/{id}/members': {
            ...getGroupMembers
        },
        '/api/groups/{id}/add_members': {
            ...addGroupsMembers
        },
        '/api/groups/{id}/tasks': {
            ...getGroupTasks
        },
        '/api/groups/{id}/task': {
            ...tasks
        },
        '/api/groups/{id}/task/set_status': {
            ...setTaskStatus
        },
        '/api/groups/{id}/task/assign': {
            ...assignTask
        },
        '/api/search/users': {
            ...searchUsers
        },
        '/api/users/me': {
            ...getUserDetails
        },
        '/api/users/me/tasks': {
            ...getUserTasks
        },
        '/api/users/me/groups': {
            ...getUserGroups
        },
        '/api/users': {
            ...updateUserDetails
        },
        '/api/common/repeat_types': {
            ...repeatTypes
        },
        '/api/scores/{group_id}/{user_id}/addNewScore': {
            ...addNewScore
        }
    }
}