import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Step45Neptune from '../lib/step45neptune-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Step45Neptune.Step45Neptune(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});
