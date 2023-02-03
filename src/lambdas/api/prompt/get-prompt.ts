import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoClient } from '../../../lib/aws/dynamo'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const promptId = event.pathParameters?.promptId

    const command = new GetCommand({
        TableName: process.env.PROMPT_TABLE_NAME!,
        Key: {
            promptId
        }
    })

    const result = await dynamoClient.send(command)

    if (!result.Item) return { statusCode: 404, body: '' }

    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    }
}
