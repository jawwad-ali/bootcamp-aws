import { EventBridge } from "aws-sdk"

exports.handler = async (ev: any) => {
    const evBridge = new EventBridge()

    const result = await evBridge.putEvents({
        Entries: [
            {
                EventBusName: "default",
                Source: "orderService",
                DetailType: "theOrder",
                Detail: JSON.stringify({
                    productName: "t-shirt",
                    price: "500"
                }),
            }
        ]
    }).promise()

    console.log("result:", JSON.stringify(result))
    return {
        statusCode: 200,
        headers: { "Context-Type": "text/plain" },
        body: `New hello CDK!! You've hit ${JSON.stringify(result)} `
    }
}