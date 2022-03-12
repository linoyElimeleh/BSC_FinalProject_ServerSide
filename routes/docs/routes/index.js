const healthCheck = require('./healthCheck');
const login = require('./login');
const register = require('./register');
const refreshToken = require('./refreshToken');
const categories = require('./categories');
const createGroup = require('./createGroup');
const groupGetAndUpdateData = require('./groupGetAndUpdateData');

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
                security: [{bearerAuth: []}]
            }
        },
        '/api/categories/': {
            ...categories
        },
        '/api/groups/': {
            ...createGroup
        },
        '/api/groups/{id}': {
            ...groupGetAndUpdateData
        }
    }
}