const healthCheck = require('./healthCheck');
const login = require('./login');

module.exports = {
    paths: {
        '/api/beep': {
            ...healthCheck
        },
        '/api/auth/login': {
            ...login
        },
        '/api/test-auth': {
            get: {
                tags: ['Test Route'],
                description: 'test that auth works',
                operationId: 'beep',
                security: {
                    bearerAuth: []
                },
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
                }
            }
        }
    }
}