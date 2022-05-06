module.exports = {
    put: {
        tags: ['Scores'],
        description: 'Update user with new score after reject',
        operationId: 'rejectScore',
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
                description: "scores for this user was updated successfully",
            }
        },
        security: [{bearerAuth: []}]
    },
}