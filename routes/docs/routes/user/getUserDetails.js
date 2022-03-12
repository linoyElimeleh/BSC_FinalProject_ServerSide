module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user full details',
        operationId: 'user',
        parameters: [
            {
                "name": "email",
                "in": "query",
                "type": "string",
                "required": true,
                "description": "user email"
            }
        ],
        responses: {
            '200': {
                description: "Returns user details successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/UserFullDetails'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}