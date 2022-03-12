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
            },
            GroupData: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: "1234"
                    },
                    name: {
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
                    },
                    members: {
                        type: "array",
                        items: {
                            $ref: '#components/schemas/MembersData'
                        }
                    }
                }
            },
            MembersData: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: "1234"
                    },
                    display_name: {
                        type: "string",
                        example: "Linoy Elimeleh"
                    },
                    email: {
                        type: "string",
                        example: "linoy@gmail.com"
                    },
                    birth_date: {
                        type: "string",
                        example: "1996-12-31T22:00:00.000Z"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
                    },
                    score: {
                        type: "integer",
                        example: "500"
                    },
                    is_admin: {
                        type: "boolean",
                        example: true
                    },
                }
            },
            MembersTasks: {
                type: 'object',
                properties: {
                    group_id: {
                        type: "integer",
                        example: "1234"
                    },
                    task_id: {
                        type: "integer",
                        example: "5678"
                    },
                    user_id: {
                        type: "integer",
                        example: "8910"
                    },
                }
            },
            UsersIds: {
                type: 'object',
                properties: {
                    members: {
                        type: "array",
                        example: "[1,2,6,8]"
                    }
                }
            },
            UsersAfterSearch: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: "1234"
                    },
                    display_name: {
                        type: "string",
                        example: "Linoy"
                    },
                    email: {
                        type: "string",
                        example: "yosi12345567@yosi.com"
                    },
                }
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "apiKey",
                scheme: "Bearer",
                bearerFormat: "JWT",
                name: "authorization",
                in: "header",
                description: "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your access token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
            }
        },
    },
}