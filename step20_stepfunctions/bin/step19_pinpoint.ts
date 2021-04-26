#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step19PinpointStack } from '../lib/step19_pinpoint-stack';

const app = new cdk.App();
new Step19PinpointStack(app, 'Step19PinpointStack');
