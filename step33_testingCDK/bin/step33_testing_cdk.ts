#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step33TestingCdkStack } from '../lib/step33_testing_cdk-stack';

const app = new cdk.App();
new Step33TestingCdkStack(app, 'Step33TestingCdkStack');
