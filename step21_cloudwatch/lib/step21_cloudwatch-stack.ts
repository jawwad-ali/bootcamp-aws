import * as cdk from '@aws-cdk/core';
import cloudwatch = require('@aws-cdk/aws-cloudwatch');
import lambda = require('@aws-cdk/aws-lambda');
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import sns = require('@aws-cdk/aws-sns');
import { SnsAction } from '@aws-cdk/aws-cloudwatch-actions';
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import { threadId } from 'worker_threads';
import { DefaultStackSynthesizer } from '@aws-cdk/core';

export class Step21CloudwatchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here 
    // const lambdaFn = new lambda.Function(this, "CW-Lambda", {
    //   code: lambda.Code.fromAsset("lambda"),
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: "index.handler"
    // })

    // const errors = lambdaFn.metricErrors()
    // const invocation = lambdaFn.metricInvocations()
    // const throttle = lambdaFn.metricThrottles()

    // const allProblems = new cloudwatch.MathExpression({
    //   expression: "error + throttles",
    //   usingMetrics: {
    //     error: errors,
    //     throttles: throttle
    //   }
    // })

    // const problemPercentage = new cloudwatch.MathExpression({
    //   expression: "(problem / invocations) * 100",
    //   usingMetrics: {
    //     problem: allProblems,
    //     invocations: invocation
    //   }
    // })

    // const Topic = new sns.Topic(this, "Topic")
    // Topic.addSubscription(
    //   new subscriptions.EmailSubscription("alijawwad001@gmail.com")
    // )

    // const alarm = new cloudwatch.Alarm(this, "Alarm", {
    //   metric: problemPercentage,
    //   threshold: 10,
    //   comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
    //   evaluationPeriods: 1
    // })
    // alarm.addAlarmAction(new SnsAction(Topic))




    // STEP 02
    const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
    });

    const errors = lambdaFn.metricErrors({
      statistic: "avg",
      period: cdk.Duration.minutes(1)
    })

    const duration = lambdaFn.metricDuration()

    const dashboard = new cloudwatch.Dashboard(this, "dash" , {
      dashboardName:"Example02Dashboard"
    })

    const graphwidget = new cloudwatch.GraphWidget({
      title: "Execution vs error State",
      left: [errors],
      right: [duration],
      view: cloudwatch.GraphWidgetView.BAR,
      liveData: true,
    })

    const textWidget = new cloudwatch.TextWidget({
      markdown: "The Text widget"
    })

    dashboard.addWidgets(graphwidget)
    dashboard.addWidgets(textWidget)

  }
}
