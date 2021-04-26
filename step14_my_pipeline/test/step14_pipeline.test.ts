import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Step14MyPipelineStack from '../lib/step14_my_pipeline-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHENStep14MyPipelineStack
    const stack = new Step14MyPipelineStack.Step14MyPipelineStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
