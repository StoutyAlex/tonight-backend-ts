import { JsonSchemaType, Model, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

export class CreatePromptModel extends Model {
  constructor(scope: Construct, restApi: RestApi) {
    super(scope, 'create-prompt-model', {
      restApi,
      contentType: 'application/json',
      description: 'Validates prompt create',
      modelName: 'create-prompt-model',
      schema: {
        type: JsonSchemaType.OBJECT,
        required: ['promptId'],
        properties: {
          promptId: {
            type: JsonSchemaType.STRING,
          }
        }
      }
    })
  }
}