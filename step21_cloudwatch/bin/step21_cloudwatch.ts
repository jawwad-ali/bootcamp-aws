#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step21CloudwatchStack } from '../lib/step21_cloudwatch-stack';

const app = new cdk.App();
new Step21CloudwatchStack(app, 'Step21CloudwatchStack');
