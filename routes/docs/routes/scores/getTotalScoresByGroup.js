module.exports = {
    get: {
        tags: ['Scores'],
        description: 'Get group score',
        operationId: 'getTotalScoresByGroup',
        parameters: [
            {
                "name": "group_id",
                "in": "path",
                "type": "integer",
                "required": true,
                "description": "group id"
            }
        ],
        responses: {
            '200': {
                description: "Get Scores Request Successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#components/schemas/getTotalScores'
                        }
                    }
                }
            }
        },
        security: [{bearerAuth: []}]
    },
}