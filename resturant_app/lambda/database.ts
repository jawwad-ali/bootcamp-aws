import { EventBridgeEvent, Context } from 'aws-lambda';
import { randomBytes } from 'crypto';
import * as AWS from 'aws-sdk';

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME as string

export type PayloadType = {
    operationSuccessful: boolean,
    SnsMessage?: string,
    customerEmail?: string
}

exports.handler = async (event: EventBridgeEvent<string, any>) => {
    console.log("from start", event)
    const returningPayload: PayloadType = { operationSuccessful: true };

    try {
        if (event["detail-type"] === "addTimeSlot") {

            console.log("after if", event)

            const params = {
                TableName: TABLE_NAME,
                Item: {
                    id: randomBytes(5).toString("hex"),
                    ...event.detail,
                    isBooked: false
                }
            }
            console.log("line26", event)
            await dynamoClient.put(params).promise()
        }
    }
    catch (err) {
        console.log(err)
    }
}