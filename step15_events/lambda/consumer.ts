exports.handler = async function (event: any) {
    console.log("request", JSON.stringify(event, undefined, 2))
    return {
        statusCode: 200,
        headers: { "Context-Type": "text/plain" },
        body: `New HEllo CDK You've hit ${event.path}\n`
    }
}