import { TonightStack } from "../cdk/tonight-stack"
import { App } from 'aws-cdk-lib'

const app = new App()

new TonightStack(app, 'tonight-stack')
