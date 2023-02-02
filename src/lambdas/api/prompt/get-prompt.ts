import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const promptId = event.pathParameters?.id

    // get from database

    return {
        statusCode: 200,
        body: JSON.stringify({
            promptId
        })
    }
}