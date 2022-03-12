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
            CreateNewGroup: {
                type: 'object',
                properties: {
                    group_name: {
                        type: "string",
                        example: "Todo Bom Group"
                    },
                    description: {
                        type: "string",
                        example: "The best Group In the World"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
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
                    display_name: {
                        type: "string",
                        example: "User user"
                    },
                    birth_date: {
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
            bearerAuth: {
                type: "apiKey",
                scheme: "Bearer",
                bearerFormat: "JWT",
                name: "authorization",
                in: "header",
                description: "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",

            }
        },
    },
    // security: [
    //     {
    //         bearerAuth: []
    //     },
    // ],
}