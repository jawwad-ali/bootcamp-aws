import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as WithoutAmplify from '../lib/without_amplify-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new WithoutAmplify.WithoutAmplifyStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
