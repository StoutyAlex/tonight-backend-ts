import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    // create prompt in database

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Created!'
        })
    }
}
