module.exports = {
    get: {
        tags: ['Groups'],
        description: 'Get Groups Teams members',
        operationId: 'getGroupMembers',
        parameters: [
            {
                "name": "id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            }
        ],
        responses: {
            '200': {
                description: "Get Groups Get Teams members successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/MembersData'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
}