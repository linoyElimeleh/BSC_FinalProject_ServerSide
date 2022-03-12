module.exports = {
    get: {
        tags: ['Groups'],
        description: 'Get all groups tasks',
        operationId: 'groups',
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
                            $ref: '#components/schemas/MembersTasks'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}