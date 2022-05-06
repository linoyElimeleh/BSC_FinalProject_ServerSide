module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user groups- tasks',
        operationId: 'getUserGroupsCurrentTasks',
        responses: {
            '200': {
                description: "Returns user groups task successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/GetUserGroupsCurrentTasks'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
}