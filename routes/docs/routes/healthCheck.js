module.exports = {
    get: {
        tags: ['Alive check'],
        description: 'Check if server is alive',
        operationId: 'beep',
        responses: {
            '200': {
                description: "Server is alive",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/beep'
                        }
                    }
                }
            }
        }
    }
}