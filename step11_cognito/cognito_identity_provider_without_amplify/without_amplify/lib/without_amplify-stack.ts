import * as cdk from '@aws-cdk/core';
import * as cognito from "@aws-cdk/aws-cognito"

export class WithoutAmplifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here 
    const userPool = new cognito.UserPool(this, "myuserpool", {
      selfSignUpEnabled: true,
      // This will send an verification email
      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Hello, Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      signInAliases: {
        username: true,
        email: true,
      },
      autoVerify: { email: true },
      signInCaseSensitive: false,
      standardAttributes: {
        fullname: {
          required: true,
          mutable: true,
        },
        email: {
          required: true,
          mutable: false,
        },
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // creating an app client for our userpool
    const client = new cognito.UserPoolClient(this, "app-client", {
      userPool: userPool,
      generateSecret: true,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL],
        callbackUrls: [`http://localhost:8000/login/`],
        logoutUrls: [`http://localhost:8000`],
      },
    });

    // Domain
    const domain = userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: "my-awesome-app",
      },
    })

    const signInUrl = domain.signInUrl(client, {
      redirectUri: `http://localhost:8000/login/`, // must be a URL configured under 'callbackUrls' with the client
    });
  }
}