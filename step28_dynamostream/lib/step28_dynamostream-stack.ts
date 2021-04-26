import * as cdk from '@aws-cdk/core';
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs";
import { DynamoEventSource, SqsDlq } from "@aws-cdk/aws-lambda-event-sources";

export class Step28DynamostreamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const ordersTable = new dynamodb.Table(this, "OrdersTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const deadLetterQueue = new sqs.Queue(this, "deadLetterQueue");

    const echoLambda = new lambda.Function(this, "echoLambda", {
      // code: lambda.Code.fromAsset("lambda"),
      code: lambda.Code.fromInline(
        // "exports.handler = (event,context) => {console.log(event.Records.map(item=>Object.entries(item.dynamodb.NewImage))); context.succeed(event);}"
        "exports.handler = (event) => {console.log(JSON.stringify(event.Records)); return event.Records}"
      ),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    echoLambda.addEventSource(
      new DynamoEventSource(ordersTable, {
        startingPosition: lambda.StartingPosition.LATEST,
        batchSize: 1,
        bisectBatchOnError: true,
        onFailure: new SqsDlq(deadLetterQueue),
        retryAttempts: 10,
      })
    );

  }
}
