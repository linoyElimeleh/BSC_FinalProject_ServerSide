module.exports = {
    put: {
        tags: ['Tasks'],
        description: 'Update an exist task',
        operationId: 'tasks',
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
                        $ref: '#components/schemas/SetTaskStatus'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Task assigned successfully"
            }
        },
        security: [{ bearerAuth: [] }]
    },
}