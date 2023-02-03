import * as cdk from 'aws-cdk-lib'
import { LambdaIntegration, RequestValidator, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'
import { CreatePromptModel } from './models/create-prompt-model'

export class TonightStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const promptTable = new Table(this, 'prompt-table', {
      partitionKey: {
        name: 'promptId',
        type: AttributeType.STRING,
      }
    })

    const getPrompt = new NodejsFunction(this, 'get-prompt', {
      functionName: 'create-prompt',
      entry: path.join(__dirname, '../src/lambdas/api/prompt/get-prompt.ts'),
      runtime: Runtime.NODEJS_16_X,
      bundling: {
        forceDockerBundling: false,
        externalModules: ['aws-sdk'],
      },
      environment: {
        PROMPT_TABLE_NAME: promptTable.tableName
      }
    })

    const putPrompt = new NodejsFunction(this, 'put-prompt', {
      functionName: 'put-prompt',
      entry: path.join(__dirname, '../src/lambdas/api/prompt/put-prompt.ts'),
      runtime: Runtime.NODEJS_16_X,
      bundling: {
        forceDockerBundling: false,
        externalModules: ['aws-sdk'],
      },
      environment: {
        PROMPT_TABLE_NAME: promptTable.tableName
      }
    })

    promptTable.grantReadData(getPrompt)
    promptTable.grantWriteData(putPrompt)

    const api = new RestApi(this, 'tonight-api', {
      restApiName: 'Tonight Backend',
      description: 'This is the backend for the Tonight app'
    })

    const bodyValidator = new RequestValidator(this, 'body-validator', {
      restApi: api,
      validateRequestBody: true,
    })

    const promptRoot = api.root.addResource('prompt')

    // GET /prompt/{id}
    promptRoot.addResource('{promptId}').addMethod('GET', new LambdaIntegration(getPrompt))

    // PUT /prompt
    promptRoot.addMethod('PUT', new LambdaIntegration(putPrompt), {
      requestValidator: bodyValidator,
      requestModels: {
        'application/json': new CreatePromptModel(this, api)
      }
    })
  }
}
