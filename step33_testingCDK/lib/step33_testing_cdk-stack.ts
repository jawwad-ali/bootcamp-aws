import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda"
import * as my_construct from "../my_construct/my_construct"

export class Step33TestingCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new lambda.Function(this, "step33lambdaFunction", {
      functionName: "Step33LambdaFunc",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromInline("exports.handler = async () => {\nconsole.log(\'hello world'\);\n}"),
      handler: "index.handler",
      memorySize: 1024
    })

    cdk.Tags.of(this).add("Hello", "world!")

    new my_construct.my_construct(this, "custom_construct", {
      functionName: "my_function"
    })

  }
}
