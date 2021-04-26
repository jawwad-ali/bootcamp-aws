
// var AWS = require("aws-sdk");
// // var sns = new AWS.SNS();

import { ContextProvider } from "@aws-cdk/core"

// exports.handler = (event: any, context: any, callback: any) => {

//     event.Records.forEach((record: any) => {
//         console.log('Stream record: ', JSON.stringify(record, null, 2));

//         if (record.eventName == 'INSERT') {
//             var who = JSON.stringify(record.dynamodb.NewImage.Username.S);
//             var when = JSON.stringify(record.dynamodb.NewImage.Timestamp.S);
//             var what = JSON.stringify(record.dynamodb.NewImage.Message.S);

//             console.log("WHO", who, "WHEN", when, "WHAT", what)

//             // var params = {
//             //     Subject: 'A new bark from ' + who,
//             //     Message: 'Woofer user ' + who + ' barked the following at ' + when + ':\n\n ' + what,
//             //     TopicArn: 'arn:aws:sns:region:accountID:wooferTopic'
//             // };
//             // sns.publish(params, function (err, data) {
//             //     if (err) {
//             //         console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
//             //     } else {
//             //         console.log("Results from sending message: ", JSON.stringify(data, null, 2));
//             //     }
//             // });
//         }
//     });
//     callback(null, `Successfully processed ${event.Records.length} records.`);
// }; 


// exports.handler = async (event: any, context: any) => {
//     console.log(
//         event.Record.map(item => Object.entries(item.dynamodb.NewImage))
//     )
//     context.succeed(event)
// }