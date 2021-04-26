#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step28DynamostreamStack } from '../lib/step28_dynamostream-stack';

const app = new cdk.App();
new Step28DynamostreamStack(app, 'Step28DynamostreamStack');
