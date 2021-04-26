import { EventBridgeEvent, Context } from "aws-lambda";
import { randomBytes } from "crypto";
import * as AWS from "aws-sdk";

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME as string;

exports.handler = async (event: EventBridgeEvent<string, any>, context: Context) => {
    try {
        // ADD
        if (event["detail-type"] === "addTimeSlot") {

            console.log("detail===>", JSON.stringify(event.detail, null, 2));

            const params = {
                TableName: TABLE_NAME,
                Item: {
                    id: randomBytes(16).toString("hex"),
                    ...event.detail,
                    isBooked: false,
                },
            };
            await dynamoClient.put(params).promise();
        }

        // DELETE
        else if (event["detail-type"] === "deleteTimeSlot") {
            console.log("detail===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Key: { id: event.detail.id },
            }
            await dynamoClient.delete(params).promise();
        }
    }
    catch (err) {
        console.log("err", err);
    }
};
