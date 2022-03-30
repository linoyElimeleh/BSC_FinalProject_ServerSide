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
const tasks = require('./tasks/task');
const getUserDetails = require('./user/getUserDetails');
const getUserTasks = require('./user/getUserTasks');
const getUserGroups = require('./user/getUserGroups');
const updateUserDetails = require('./user/updateUserDetails');

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
        '/api/test-auth': {
            get: {
                tags: ['Test Route'],
                description: 'test that auth works',
                operationId: 'beep',
                responses: {
                    '200': {
                        description: "Server is alive",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/beep'
                                }
                            }
                        }
                    }
                },
                security: [{ bearerAuth: [] }]
            }
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
        '/api/search/users': {
            ...searchUsers
        },
        '/api/tasks': {
            ...tasks
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
    }
}