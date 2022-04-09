module.exports = {
    post: {
        tags: ['Groups'],
        description: 'Add new team members to an exist group',
        operationId: 'addGroupMembers',
        parameters: [
            {
                "name": "id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/UsersIds'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Teams members were added successful",
            }
        },
        security: [{ bearerAuth: [] }]
    },
}