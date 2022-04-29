module.exports = {
    post: {
        tags: ['Scores'],
        description: 'Add new score',
        operationId: 'addNewScore',
        parameters: [
            {
                "name": "group_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            },
            {
                "name": "user_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "user id"
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/addNewScore'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "scores for this user was added successfully",
            }
        },
        security: [{ bearerAuth: [] }]
    },
}