module.exports = {
    get: {
        tags: ['User'],
        description: 'Get user full details',
        operationId: 'getUserDetails',
        parameters: [],
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
        security: [{ bearerAuth: [] }]
    },
}