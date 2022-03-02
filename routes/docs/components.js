module.exports = {
    components: {
        schemas: {
            beep: {
                type: 'object',
                properties: {
                    beep: {
                        type: "string",
                        example: "boop"
                    }
                }
            },
            LoginRequest: {
                type: 'object',
                properties: {
                    email: {
                        type: "string",
                        example: "user@email.com"
                    },
                    password: {
                        type: "string",
                        example: "supersecret123"
                    }
                }
            },
            LoginSuccessful: {
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
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                in: 'header'
            },
        }
    }
}