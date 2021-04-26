import * as cdk from '@aws-cdk/core';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';

export class CreateAutoSecretStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here 
    const secret = new secretsmanager.Secret(this, "secret")

    // LAMBDA FUNCTION
    const lambdaFn = new lambda.Function(this, "secretManagerLambdaFunction", {
      code: lambda.Code.fromAsset("functions"),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      environment: {
        EXAMPLE_SECRET_KEY: `${secretsmanager.Secret.fromSecretAttributes(this, "ExampleSecretKey", {
          secretArn: secret.secretArn
        }).secretValue
          }`
      }
    })

  }
}
