import * as cdk from '@aws-cdk/core';
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as apigw from "@aws-cdk/aws-apigateway";
import { SubscriptionProtocol } from "@aws-cdk/aws-sns";
import * as lambda from "@aws-cdk/aws-lambda"

export class Step00Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const hello = new lambda.Function(this, "helloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler"
    })

    // create an endpoint for lambda function
    const api = new apigw.LambdaRestApi(this, "EndPoint", {
      handler: hello
    })

    const myTopic = new sns.Topic(this, "MyTopic", {
      topicName: "Step00-Topic"
    })

    myTopic.addSubscription(
      new subscriptions.UrlSubscription(api.url, {
        protocol: SubscriptionProtocol.HTTPS
      })
    )

  }
}
