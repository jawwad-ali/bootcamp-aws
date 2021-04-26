import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda"
import * as appsync from "@aws-cdk/aws-appsync"
import * as sns from "@aws-cdk/aws-sns"

export class Step25LambdaEdgeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // API
    const api = new appsync.GraphqlApi(this, 'emailAppsync', {
      name: 'emailAppsync',
      schema: appsync.Schema.fromAsset('schema/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
    });

    // Lambda function
    const emailLambda = new lambda.Function(this, 'emailLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024
    });


  }
}
