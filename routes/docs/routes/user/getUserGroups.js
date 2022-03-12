module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user groups',
        operationId: 'user',
        parameters: [
            {
                "name": "userId",
                "in": "query",
                "type": "integer",
                "required": true,
                "description": "user id"
            }
        ],
        responses: {
            '200': {
                description: "Returns user groups successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/GetUserGroups'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}