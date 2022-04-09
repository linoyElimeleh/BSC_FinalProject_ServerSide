module.exports = {
    post: {
        tags: ['Authentication'],
        description: 'Get a new refresh token',
        operationId: 'postRefresh_token',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/RefreshToken'
                    }
                }
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
        operationId: 'deleteRefresh_token',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#components/schemas/RefreshToken'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Refresh token deleted.",
            }
        }
    }
}