const healthCheck = require('./healthCheck');
const login = require('./login');
const register = require('./register');

module.exports = {
    paths: {
        '/api/beep': {
            ...healthCheck
        },
        '/api/auth/login': {
            ...login
        },
        '/api/auth/register': {
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
                security: {
                    ApiKeyAuth: []
                },
            }
        }
    }
}