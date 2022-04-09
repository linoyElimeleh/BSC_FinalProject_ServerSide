module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user tasks',
        operationId: 'getUserTasks',
        parameters: [
            {
                "name": "groupId",
                "in": "query",
                "type": "integer",
                "required": true,
                "description": "group id"
            }
        ],
        responses: {
            '200': {
                description: "Returns user task successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/GetUserTask'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
}