import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda"

export class Step24LambdaLayerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaLayer = new lambda.LayerVersion(this, "lambdaLayer", {
      code: lambda.Code.fromAsset("lambdaLayer")
    })

    const lambdaAuthLayer = new lambda.LayerVersion(this, "lambdaAuthLayer", {
      code: lambda.Code.fromAsset("lambdaLayer/auth"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X]
    })

    new lambda.Function(this, "lambdaFn", {
      code: lambda.Code.fromAsset("lambda"),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      layers: [lambdaLayer, lambdaAuthLayer]
    })
  }
}
