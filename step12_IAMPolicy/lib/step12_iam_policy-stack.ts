import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export class Step12IamPolicyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
    })

    const dynamoDBTable = new ddb.Table(this, 'Table', {
      tableName: "IAMTable",
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });

    // create a specific role for lambda
    const role = new Role(this, "roleForLambda", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com")
    })

    const policy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:*", "logs:*", "amplify:*"],
      resources: ["*"]
    })
    role.addToPolicy(policy)

    const createLambda = new lambda.Function(this, "Step12Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      role: role,
      environment: {
        "TABLE": dynamoDBTable.tableName
      }
    })
    const lambdaDS = api.addLambdaDataSource("LambdaDataSource", createLambda)

    lambdaDS.createResolver({
      typeName: "Query",
      fieldName: "welcome"
    })

    lambdaDS.createResolver({
      typeName: "Mutation",
      fieldName: "createData"
    })

  }
}
