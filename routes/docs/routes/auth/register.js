module.exports = {
    post: {
        tags: ['User'],
        description: 'Register to the app',
        operationId: 'user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/RegisterRequest'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Register successful",
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
    }
}