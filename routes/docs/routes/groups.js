module.exports = {
    post: {
        tags: ['Groups'],
        description: 'Create a new group',
        operationId: 'groups',
        parameters: [
            {
                "name": "userId",
                "in": "query",
                "type": "string",
                "required": true
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/CreateNewGroup'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Group Created successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                group_id: {
                                    type: "string",
                                    example: "12345"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}