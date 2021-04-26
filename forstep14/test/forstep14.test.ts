import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Forstep14 from '../lib/forstep14-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Forstep14.Forstep14Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
