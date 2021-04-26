import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as event from "@aws-cdk/aws-events";
import * as target from "@aws-cdk/aws-events-targets";
import * as destinations from "@aws-cdk/aws-lambda-destinations";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sns from '@aws-cdk/aws-sns';
import * as iam from "@aws-cdk/aws-iam";

export class Step26LambdaDestinationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const bus = new event.EventBus(this, "EventBus", {
      eventBusName: "ExampleEventBus"
    })

    const myTopic = new sns.Topic(this, "Step26Topic")

    const mainLambda = new lambda.Function(this, "mainLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      environment: {
        TOPIC_ARN: myTopic.topicArn
      }
    })

    // Success lambda 
    const successLambda = new lambda.Function(this, 'SuccesserLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'success.handler'
    });

    // initialinzing topic on success to send an email
    const successTopic = new sns.Topic(this, "successTopic")
    successTopic.addSubscription(new subs.EmailSubscription("alijawwad001@gmail.com"))

    // Fail lambda 
    const failLambda = new lambda.Function(this, 'failureLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'fail.handler',
    });

    const destinatedLambda = new lambda.Function(this, "DestinationLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "destinated.handler",
      retryAttempts: 0,
      // onSuccess: new destinations.LambdaDestination(successLambda),
      onSuccess: new destinations.SnsDestination(successTopic),
      onFailure: new destinations.LambdaDestination(failLambda)
    })
    myTopic.addSubscription(new subs.LambdaSubscription(destinatedLambda))


    mainLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sns:*"],
        resources: ["*"]
      })
    )

    const api = new apigw.LambdaRestApi(this, "endpoint", {
      handler: mainLambda,
    })

    new cdk.CfnOutput(this, "EndpointURL", {
      value: api.url
    })


    // const successRule = new event.Rule(this, "successRule", {
    //   eventBus: bus,
    //   eventPattern: {
    //     "detail": {
    //       "responsePayload": {
    //         "source": ["event-success"],
    //         "action": ["data"]
    //       }
    //     }
    //   },
    //   targets: [
    //     new target.LambdaFunction(successLambda)
    //   ]
    // })


    // const failRule = new event.Rule(this, 'failRule', {
    //   eventBus: bus,
    //   eventPattern:
    //   {
    //     "detail": {
    //       "responsePayload": {
    //         "source": ["event-fail"],
    //         "action": ["data"]
    //       }
    //     }
    //   },
    //   targets: [
    //     new target.LambdaFunction(failLambda)
    //   ]
    // });

  }
}