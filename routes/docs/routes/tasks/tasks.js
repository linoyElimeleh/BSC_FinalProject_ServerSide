module.exports = {
    post: {
        tags: ['Tasks'],
        description: 'Create a new task',
        operationId: 'createTasks',
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
        security: [{ bearerAuth: [] }]
    },
    put: {
        tags: ['Tasks'],
        description: 'Update an existing task',
        operationId: 'updateTask',
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
        security: [{ bearerAuth: [] }]
    },
    delete: {
        tags: ['Tasks'],
        description: 'Delete a task',
        operationId: 'deleteTaks',
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
                        $ref: '#components/schemas/DeleteTask'
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
    get: {
        tags: ['Tasks'],
        description: 'Get an existing task',
        operationId: 'getTask',
        parameters: [
            {
                "name": "id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            },
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
                description: "The task was created successfully",
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