import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as events from "@aws-cdk/aws-events";
import * as appsync from "@aws-cdk/aws-appsync";
import * as targets from "@aws-cdk/aws-events-targets";
import { Rule } from "@aws-cdk/aws-events";
import * as ddb from "@aws-cdk/aws-dynamodb";
import {
  requestTemplate,
  responseTemplate,
  EVENT_SOURCE,
} from "../utils/appsync-request-response";

export class Step15EventswithappsyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // API
    const api = new appsync.GraphqlApi(this, "Api", {
      name: "appsync-Eventbridge-API",
      schema: appsync.Schema.fromAsset("schema/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      logConfig: { fieldLogLevel: appsync.FieldLogLevel.ALL },
      xrayEnabled: true,
    });

    // Create new DynamoDB Table for Todos
    const eventTable = new ddb.Table(this, "eventtable", {
      tableName: "e-bridgeTable",
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    // DYNAMO  DATASOURCE
    const ddbAsDS = api.addDynamoDbDataSource("theTable", eventTable);

    // HTTP DATASOURCE
    const httpDs = api.addHttpDataSource(
      "ds",
      "https://events." + this.region + ".amazonaws.com",
      {
        name: "httpsWithEventBridge",
        description: "From appsync to EventBridge",
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: "events",
        },
      }
    );

    events.EventBus.grantPutEvents(httpDs);

    // TRYING///////////////////////////
    const mutations = ["addTimeSlot", "deleteTimeSlot"];

    mutations.forEach((mut) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if (mut === "addTimeSlot") {
        details = `\\\"from\\\":\\\"$ctx.args.timeSlot.from\\\", \\\"to\\\":\\\"$ctx.args.timeSlot.to\\\"`;
      }
      else if (mut === "deleteTimeSlot") {
        details = `\\\"id\\\":\\\"$ctx.args.id\\\"`;
      }

      httpDs.createResolver({
        typeName: "Mutation",
        fieldName: mut,
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          requestTemplate(details, mut)
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromString(
          responseTemplate()
        ),
      });
    });
    // TRYING END///////////////////////////

    // LAMBDA
    const echoLambda = new lambda.Function(this, "echoFunction", {
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        DYNAMO_TABLE_NAME: eventTable.tableName,
      },
    });
    eventTable.grantReadWriteData(echoLambda);
    eventTable.grantFullAccess(echoLambda)

    // RULE
    const rule = new Rule(this, "eventWithAppsyncRule", {
      ruleName: "eventWithAppsyncRule",
      eventPattern: {
        source: ["eru-appsync-events"],
      },
    });
    rule.addTarget(new targets.LambdaFunction(echoLambda));
  }
}
