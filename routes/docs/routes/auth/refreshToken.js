module.exports = {
    get: {
        tags: ['Authentication'],
        description: 'Get the refresh token',
        operationId: 'refresh_token',
        requestBody: {
            content: {
                'application/json': {}
            }
        },
        responses: {
            '200': {
                description: "Get refresh token and access token successfully",
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
    delete: {
        tags: ['Authentication'],
        description: 'Delete the refresh token',
        operationId: 'refresh_token',
        requestBody: {
            content: {
                'application/json': {}
            }
        },
        responses: {
            '200': {
                description: "Refresh token deleted.",
            }
        }
    }
}