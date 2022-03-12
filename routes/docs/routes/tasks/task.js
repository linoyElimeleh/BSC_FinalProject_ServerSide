module.exports = {
    post: {
        tags: ['Tasks'],
        description: 'Create a new task',
        operationId: 'tasks',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/CreateNewTask'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "The task was created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/UpdateExistTask'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
    put: {
        tags: ['Tasks'],
        description: 'Update an exist task',
        operationId: 'tasks',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/UpdateExistTask'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "The task was updated successfully"
            }
        },
        security: [{bearerAuth: []}]
    },
}