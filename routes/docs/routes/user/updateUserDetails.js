module.exports = {
    put: {
        tags: ['User'],
        description: 'Update exist user',
        operationId: 'user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/UserUpdate'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "User Updated successfully",
            }
        },
        security: [{bearerAuth: []}]
    },
}