module.exports = {
    get: {
        tags: ['Search'],
        description: 'Get search request',
        operationId: 'searchUsers',
        parameters: [
            {
                "name": "query",
                "in": "query",
                "type": "string",
                "required": true,
                "description": "email or display_name"
            }
        ],
        responses: {
            '200': {
                description: "Get Users request successful",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/UsersAfterSearch'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
}