module.exports = {
    put: {
        tags: ['Scores'],
        description: 'Update user with new score after reject',
        operationId: 'rejectScore',
        parameters: [
            {
                "name": "task_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "task id"
            }
        ],
        responses: {
            '200': {
                description: "The task reject successfully successfully",
            }
        },
        security: [{bearerAuth: []}]
    },
}