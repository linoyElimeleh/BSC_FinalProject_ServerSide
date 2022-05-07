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
const getUserGroupsCurrentTask = require('./user/getUserGroupsCurrentTask');
const updateUserDetails = require('./user/updateUserDetails');
const repeatTypes = require('./common/repeatTypes');
const addNewScore = require('./scores/addNewScore');
const getScoresByGroupAndUser = require('./scores/getScoresByGroupAndUser');
const getScoresByUserId = require('./scores/getAllGroupsScoresByUser');
const getTotalScoresByUserId = require('./scores/getTotalScoresByUser');
const getTotalScoresByGroupId = require('./scores/getTotalScoresByGroup');
const getScoresByGroupId = require('./scores/getAllUsersScoresByGroup');
const changePassword = require('./auth/changeUserPassword');
const rejectTask = require('./scores/rejectTask');

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
        '/api/tasks/{id}/tasks': {
            ...getGroupTasks
        },
        '/api/groups/{id}/task': {
            post: tasks.post,
            delete: tasks.delete,
            put: tasks.put,
        },
        '/api/groups/{id}/task/{task_id}': {
            get: tasks.get
        },
        '/api/tasks/{id}/task/set_status': {
            ...setTaskStatus
        },
        '/api/tasks/{id}/task/assign': {
            ...assignTask
        },
        '/api/search/users': {
            ...searchUsers
        },
        '/api/users/me': {
            ...getUserDetails
        },
        '/api/auth/changePassword': {
            ...changePassword
        },
        '/api/users/me/tasks': {
            ...getUserTasks
        },
        '/api/users/me/groups': {
            ...getUserGroups
        },
        '/api/users/me/groupsCurrentTask': {
            ...getUserGroupsCurrentTask
        },
        '/api/users/updateProfile': {
            ...updateUserDetails
        },
        '/api/common/repeat_types': {
            ...repeatTypes
        },
        '/api/scores/{group_id}/{user_id}/addNewScore': {
            ...addNewScore
        },
        '/api/scores/{group_id}/{user_id}/scores': {
            ...getScoresByGroupAndUser
        },
        '/api/scores/{user_id}/groupsScores': {
            ...getScoresByUserId
        },
        '/api/scores/{user_id}/userTotalScores': {
            ...getTotalScoresByUserId
        },
        '/api/scores/{group_id}/groupTotalScores': {
            ...getTotalScoresByGroupId
        },
        '/api/scores/{group_id}/usersScores': {
            ...getScoresByGroupId
        },
        '/api/scores/{group_id}/{user_id}/rejectTask': {
            ...rejectTask
        }
    }
}