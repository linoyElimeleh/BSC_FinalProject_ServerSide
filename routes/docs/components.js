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
                        example: 1234
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
                        example: 1234
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
                        example: 500
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
                        example: 1234
                    },
                    task_id: {
                        type: "integer",
                        example: 5678
                    },
                    user_id: {
                        type: "integer",
                        example: 8910
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
                        example: 1234
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
            CreateNewTask: {
                type: 'object',
                properties: {
                    task: {
                        type: 'object',
                        properties: {
                            title: {
                                type: "string",
                                example: "Todo Bom Title"
                            },
                            description: {
                                type: "string",
                                example: "The best Task In the World"
                            },
                            category_id: {
                                type: "integer",
                                example: 1234
                            },
                            due_date: {
                                type: "timestamp",
                                example: 1649505357023
                            },
                            done: {
                                type: "boolean",
                                example: true
                            },
                            repeat: {
                                type: "integer",
                                example: 2
                            },
                            end_repeat: {
                                type: "timestamp",
                                example: 1649505357023
                            },
                            urgent: {
                                type: "boolean",
                                example: false
                            },
                            snooze_interval: {
                                type: "integer",
                                example: 4
                            },
                            score: {
                                type: "integer",
                                example: 500
                            }
                        }
                    },
                    userId: {
                        type: "integer",
                        example: 500
                    }
                }
            },
            UpdateExistTask: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 500
                    },
                    title: {
                        type: "string",
                        example: "Todo Bom Title"
                    },
                    description: {
                        type: "string",
                        example: "The best Task In the World"
                    },
                    category_id: {
                        type: "integer",
                        example: 1234
                    },
                    due_date: {
                        type: "timestamp",
                        example: 1649505357023
                    },
                    done: {
                        type: "boolean",
                        example: true
                    },
                    repeat: {
                        type: "integer",
                        example: 2
                    },
                    end_repeat: {
                        type: "timestamp",
                        example: 1649505357023
                    },
                    urgent: {
                        type: "boolean",
                        example: false
                    },
                    snooze_interval: {
                        type: "integer",
                        example: 4
                    },
                    score: {
                        type: "integer",
                        example: 500
                    },
                }
            },
            DeleteTask: {
                type: 'object',
                properties: {
                    taskId: {
                        type: "integer",
                        example: 1234
                    }
                }
            },
            SetTaskStatus: {
                type: 'object',
                properties: {
                    taskId: {
                        type: "integer",
                        example: 1234
                    },
                    status: {
                        type: 'boolean',
                        example: true
                    }
                }
            },
            AssignTask: {
                type: 'object',
                properties: {
                    taskId: {
                        type: "integer",
                        example: 1234
                    },
                    userId: {
                        type: 'integer',
                        example: 1234
                    }
                }
            },
            UserFullDetails: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 1234
                    },
                    display_name: {
                        type: "string",
                        example: "Linoy"
                    },
                    email: {
                        type: "string",
                        example: "yosi12345567@yosi.com"
                    },
                    birth_date: {
                        type: "date",
                        example: "1997-01-01"
                    },
                    password: {
                        type: "string",
                        example: "pass123"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
                    },
                }
            },
            GetUserTask: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 1111
                    },
                    title: {
                        type: "string",
                        example: "Todo Bom Title"
                    },
                    description: {
                        type: "string",
                        example: "The best Task In the World"
                    },
                    category_id: {
                        type: "integer",
                        example: 1234
                    },
                    due_date: {
                        type: "date",
                        example: "1997-01-01"
                    },
                    done: {
                        type: "boolean",
                        example: true
                    },
                    repeat: {
                        type: "integer",
                        example: 2
                    },
                    end_repeat: {
                        type: "date",
                        example: "1997-01-01"
                    },
                    urgent: {
                        type: "boolean",
                        example: false
                    },
                    snooze_interval: {
                        type: "integer",
                        example: 4
                    },
                    score: {
                        type: "integer",
                        example: 500
                    },
                    group_id: {
                        type: "integer",
                        example: 1
                    },
                    task_id: {
                        type: "integer",
                        example: 2
                    },
                    user_id: {
                        type: "integer",
                        example: 3
                    },
                }
            },
            GetUserGroups: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 1111
                    },
                    name: {
                        type: "string",
                        example: "Todo Bom name"
                    },
                    description: {
                        type: "string",
                        example: "The best group In the World"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
                    },
                    invite_code: {
                        type: "string",
                        example: "94b60e4d-2015-4adf-bacc-5f8421ac51b4"
                    },
                }
            },
            UserUpdate: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 1111
                    },
                    display_name: {
                        type: "string",
                        example: "Todo Bom name"
                    },
                    image: {
                        type: "string",
                        example: "https://some-image.com"
                    },
                }
            },
            RepeatTypes: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        type: {
                            type: "string",
                            example: "Daily"
                        },
                    }

                }
            },
            RefreshToken: {
                type: 'object',
                properties: {
                    refresh_token: {
                        type: "string",
                        example: "some token..."
                    }
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