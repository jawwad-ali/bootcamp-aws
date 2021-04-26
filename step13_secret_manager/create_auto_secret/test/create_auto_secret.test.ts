import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CreateAutoSecret from '../lib/create_auto_secret-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CreateAutoSecret.CreateAutoSecretStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
