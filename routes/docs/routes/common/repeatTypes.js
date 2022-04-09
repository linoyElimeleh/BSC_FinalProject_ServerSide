module.exports = {
    get: {
        tags: ['Common'],
        description: 'Get all repeat types',
        operationId: 'repeatTypes',
        responses: {
            '200': {
                description: "Success",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/RepeatTypes'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
}