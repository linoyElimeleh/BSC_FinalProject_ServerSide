module.exports = {
    put: {
        tags: ['User'],
        description: 'Change user password',
        operationId: 'changeUserPassword',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/changePasswordRequest'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "User Updated successfully",
            }
        },
        security: [{ bearerAuth: [] }]
    },
}