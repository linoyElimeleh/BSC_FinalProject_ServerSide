module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user groups',
        operationId: 'user',
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
        security: [{ bearerAuth: [] }]
    },
}