import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as events from '@aws-cdk/aws-events';
import { Rule } from "@aws-cdk/aws-events";
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
// import * as sns from '@aws-cdk/aws-sns';
// import * as iam from '@aws-cdk/aws-iam';
// import * as snsSubscriptions from '@aws-cdk/aws-sns-subscriptions';
// import * as stepFunctions from '@aws-cdk/aws-stepfunctions';
// import * as stepFunctionsTasks from '@aws-cdk/aws-stepfunctions-tasks';
// import * as cognito from "@aws-cdk/aws-cognito"
import { requestTemplate, responseTemplate, EVENT_SOURCE } from '../utils/appsync-request-response';

export class ResturantAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // const userPool = new cognito.UserPool(this, "aws-amplify-userpool", {
    //   userPoolName: "restuarantApp_UserPool",
    //   selfSignUpEnabled: true,
    //   accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    //   userVerification: {
    //     emailStyle: cognito.VerificationEmailStyle.CODE
    //   },
    //   autoVerify: { email: true },
    //   standardAttributes: {
    //     email: {
    //       mutable: true,
    //       required: true,
    //     },
    //     phoneNumber: {
    //       mutable: true,
    //       required: true
    //     }
    //   },
    // })
    // const userPoolClient = new cognito.UserPoolClient(this, "userPoolClient", {
    //   userPoolClientName: "restuarantApp_UserPoolClient",
    //   userPool
    // })

    // new cognito.CfnUserPoolGroup(this, "adminsGroup", {
    //   groupName: "admins",
    //   userPoolId: userPool.userPoolId
    // })

    // Appsync API
    const api = new appsync.GraphqlApi(this, "restuarantAPI", {
      name: "appsyncResAPI",
      schema: appsync.Schema.fromAsset('schema/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          // userPoolConfig: { userPool },
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      },
      logConfig: { fieldLogLevel: appsync.FieldLogLevel.ALL },
      xrayEnabled: true,

    })

    // Dynamodb table
    const resTable = new dynamodb.Table(this, "restaurantsTable", {
      tableName: "Restuarant",
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: id,
        type: dynamodb.AttributeType.STRING
      },

    })

    // APPSYNC DATA SOURCE
    // const restuarantsTimeSlotsDs = api.addDynamoDbDataSource("RestuarantsTimeDS", resTable)

    // Query
    // restuarantsTimeSlotsDs.createResolver({
    //   typeName: "Query",
    //   fieldName: "getTimeSlots",
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    // })
     
    // No data Source
    // const appsyncNoDS = api.addNoneDataSource("noDataSource", {
    //   name: "NoDataSource",
    //   description: "Does not save incoming Data"
    // })

    // HTTP as DS for API
    const httpEventTriggerDS = api.addHttpDataSource(
      "eventTriggerDS",
      "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
      {
        name: "httpDsWithEventBridge",
        description: "From Appsync to Eventbridge",
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: "events",
        },
      }
    );
    events.EventBus.grantAllPutEvents(httpEventTriggerDS);

    ///////////////  APPSYNC  Resolvers   ///////////////

    /* Mutation */
    const mutations = ["addTimeSlot"]
    // const mutations = ["addTimeSlot", "deleteTimeSlot", "bookTimeSlot", "addBookingRequest", "deleteBookingRequest", "cancelBooking", "resetAllBookings"]

    mutations.forEach((mut) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if (mut === 'addTimeSlot') {
        details = `\\\"from\\\":\\\"$ctx.args.timeSlot.from\\\", \\\"to\\\":\\\"$ctx.args.timeSlot.to\\\"`

      }
      // else if (mut === "addBookingRequest") {
      //   details = `\\\"id\\\":\\\"$ctx.args.id\\\", \\\"userName\\\":\\\"$ctx.args.userName\\\"`
      // }

      httpEventTriggerDS.createResolver({
        typeName: "Mutation",
        fieldName: mut,
        requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, mut)),
        responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate()),
      });
    });

    /* Mutation also for Subscription */
    // appsyncNoDS.createResolver({
    //   typeName: "Mutation",
    //   fieldName: "generateAction",
    //   requestMappingTemplate: appsync.MappingTemplate.fromString(`{
    //     "version" : "2017-02-28",
    //     "payload" : util.toJson($ctx.args)
    //   }`),
    //   responseMappingTemplate: appsync.MappingTemplate.fromString(
    //     "$util.toJson($ctx.result)"
    //   )
    // })

    // DynamoDB Lambda
    const dynamoLambda = new lambda.Function(this, "dynamoLambdaRestuarant", {
      code: lambda.Code.fromAsset("lambda"),
      handler: "databse.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        DYNAMO_TABLE_NAME: resTable.tableName
      },
    })
    // Giving right to lambda for accesing dynamodb
    resTable.grantReadWriteData(dynamoLambda)

    ////////// Creating rule to invoke step function on event ///////////////////////
    const rule = new Rule(this, "theRule", {
      ruleName: "restuarantAppRule",
      eventPattern: {
        source: [EVENT_SOURCE],
      },
    });
    rule.addTarget(new eventsTargets.LambdaFunction(dynamoLambda));
  }
}