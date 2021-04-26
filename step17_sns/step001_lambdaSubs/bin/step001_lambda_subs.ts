#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step001LambdaSubsStack } from '../lib/step001_lambda_subs-stack';

const app = new cdk.App();
new Step001LambdaSubsStack(app, 'Step001LambdaSubsStack');
