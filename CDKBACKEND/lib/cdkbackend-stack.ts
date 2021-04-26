import * as cdk from '@aws-cdk/core';
import * as ddb from "@aws-cdk/aws-dynamodb"

export class CdkbackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const dynamoDBTable = new ddb.Table(this, 'Table', {
      tableName: "table-codepipeline",
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
  }
}
