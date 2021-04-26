#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step12IamPolicyStack } from '../lib/step12_iam_policy-stack';

const app = new cdk.App();
new Step12IamPolicyStack(app, 'Step12IamPolicyStack');
