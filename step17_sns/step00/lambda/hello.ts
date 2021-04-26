import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const data = JSON.parse(event.body!)
    console.log(data)

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/plain"
        },
        body: `Hello World!!!!!!!`
    }

}   