module.exports = {
    post: {
        tags: ['Authentication'],
        description: 'Login to the app',
        operationId: 'login',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/LoginRequest'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Login successful",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                access_token: {
                                    type: "string",
                                    example: "some jwt token..."
                                },
                                refresh_token: {
                                    type: "string",
                                    example: "some jwt token..."
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}