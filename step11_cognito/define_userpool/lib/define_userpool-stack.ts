import * as cdk from '@aws-cdk/core';
import * as cognito from "@aws-cdk/aws-cognito";
import * as lambda from "@aws-cdk/aws-lambda";

export class DefineUserpoolStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authEmailFn = new lambda.Function(this, 'authEmailFn', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    // The code that defines your stack goes here
    const userPool = new cognito.UserPool(this, "userPoolFromCDK", {
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },

      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
      },
      standardAttributes: {
        fullname: {
          required: true,
          mutable: true
        }
      },
      customAttributes: {
        'myappid': new cognito.StringAttribute({ minLen: 5, maxLen: 15, mutable: false }),
      },                                ////Custom Attributes defined according to the application needs
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: cdk.Duration.days(3),
      },                                                        ///Password Policy
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,      ///Account Recovery email

      lambdaTriggers: {
        preSignUp: authEmailFn      ///Trigger before the signup process to userpool
      },
    })

    // connecting to Client might be
    const userPoolClient = new cognito.UserPoolClient(this, "userPoolClient-Amplify", {
      userPool,
    })

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    })

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    })
  }
}
