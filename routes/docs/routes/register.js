module.exports = {
    post: {
        tags: ['Authentication'],
        description: 'Register to the app',
        operationId: 'register',
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