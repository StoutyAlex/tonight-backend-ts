import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { Prompt } from '../../../types/prompt'
import { dynamoClient } from '../../../lib/aws/dynamo'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const prompt = JSON.parse(event.body!) as Prompt

    const command = new PutCommand({
        TableName: process.env.PROMPT_TABLE_NAME!,
        Item: prompt
    })

    await dynamoClient.send(command)

    return {
        statusCode: 201,
        body: JSON.stringify(prompt)
    }
}
