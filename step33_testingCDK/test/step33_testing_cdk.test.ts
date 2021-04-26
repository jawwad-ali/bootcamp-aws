import * as cdk from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';
import * as lambda from '@aws-cdk/aws-lambda';
import * as Step33TestingCdk from '../lib/step33_testing_cdk-stack';
import '@aws-cdk/assert/jest';

// test('TEST MAIN STACK', () => {

// const app = new cdk.App();
// const stack = new Step33TestingCdk.Step33TestingCdkStack(app, 'MyTestStack');

// 1
// counts number of lambda functions in stack
//   expect(stack).toCountResources("AWS::Lambda::Function", 1)

//   // matches the props in lambda function
//   expect(stack).toHaveResource("AWS::Lambda::Function", {
//     "Handler": "index.handler",
//     "MemorySize": 1024
//   })

//   expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
// });

// // 2
// test("TEST A MOCK FUNC", () => {
//   const app = new cdk.App()
//   const mockTagsAspect = jest.spyOn(cdk.Tags, "of")
//   const stack = new Step33TestingCdk.Step33TestingCdkStack(app, "MyTestStack")

//   expect(mockTagsAspect).toBeCalledTimes(1)
// })

// 3
// test("TEST IF YOUR CUSTOM CONSTRUCT IS RUNNIG IN THE MAIN STACK", () => {
//   const app = new cdk.App();
//   const stack = new Step33TestingCdk.Step33TestingCdkStack(app, 'MyTestStack');

//   // looking for lambda functions in entire stack
//   expect(stack).toCountResources("AWS::Lambda::Function", 2)

//   expect(stack.node.tryFindChild('custom_construct')).not.toBeUndefined()

//   expect(stack.node.tryFindChild('step33lambdaFunction')).not.toBeUndefined()
//   expect(stack.node.tryFindChild("testLambda1")).toBeUndefined()

// })

//4
test("TESTING THE CHAGES BY CUSTOM STACK IN MAIN STACK", () => {

  const app = new cdk.App();
  const stack = new Step33TestingCdk.Step33TestingCdkStack(app, 'MyTestStack');

  expect(stack).toCountResources("AWS::DynamoDB::Table", 1)
  expect(stack.node.tryFindChild("Table")).not.toBeUndefined()

})