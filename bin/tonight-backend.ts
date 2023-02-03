import { TonightStack } from "../cdk/tonight-stack"
import { App } from 'aws-cdk-lib'

const app = new App()

new TonightStack(app, 'tonight-stack', {
    env: {
        account: '477948800870',
        region: 'eu-west-1'
    }
})
