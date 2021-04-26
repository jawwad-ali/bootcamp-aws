import * as cdk from '@aws-cdk/core';
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as sns from "@aws-cdk/aws-sns";
import * as sqs from "@aws-cdk/aws-sqs";

export class Step001LambdaSubsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscriptionDL",
      retentionPeriod: cdk.Duration.days(14)
    })

    const myTopic = new sns.Topic(this, "step01ses-Topic", {
      topicName: "Step01Topic"
    })

    myTopic.addSubscription(
      new subscriptions.SmsSubscription("+923212623771", {
        deadLetterQueue: dlQueue,
      })
    )
    myTopic.addSubscription(
      new subscriptions.EmailSubscription("alijawwad001@gmail.com", {
        json: false,
        deadLetterQueue: dlQueue,
      })
    );


    // filterPolicy: {
    //   test: sns.SubscriptionFilter.numericFilter({
    //     greaterThan: 100
    //   })
    // }
  }
}