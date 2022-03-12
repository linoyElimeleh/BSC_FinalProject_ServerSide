module.exports = {
    get: {
        tags: ['Categories'],
        description: 'Get all categories',
        operationId: 'categories',
        responses: {
            '200': {
                description: "Get categories successful",
                //todo add categories schemas
                /*  content: {
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
                  }*/
            }
        }
    },
}