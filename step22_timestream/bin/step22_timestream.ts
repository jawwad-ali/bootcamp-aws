#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step22TimestreamStack } from '../lib/step22_timestream-stack';

const app = new cdk.App();
new Step22TimestreamStack(app, 'Step22TimestreamStack');
