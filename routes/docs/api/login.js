module.exports = {
    post: {
        tags: ['Login'],
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
                            $ref: '#/components/schemas/LoginSuccessful'
                        }
                    }
                }
            }
        }
    }
}