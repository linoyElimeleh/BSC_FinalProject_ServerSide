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
            RegisterRequest: {
                type: 'object',
                properties: {
                    email: {
                        type: "string",
                        example: "user@email.com"
                    },
                    password: {
                        type: "string",
                        example: "supersecret123"
                    },
                    displayName: {
                        type: "string",
                        example: "User user"
                    },
                    birthDate: {
                        type: "date",
                        example: "1997-01-01"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
                    }
                }
            }
        },
        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                in: "header",
                name: "Authorization"
            }
        }
    }
}