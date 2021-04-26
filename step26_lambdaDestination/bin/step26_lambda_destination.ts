#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step26LambdaDestinationStack } from '../lib/step26_lambda_destination-stack';

const app = new cdk.App();
new Step26LambdaDestinationStack(app, 'Step26LambdaDestinationStack');
