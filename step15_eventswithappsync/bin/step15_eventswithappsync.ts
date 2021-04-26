#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step15EventswithappsyncStack } from '../lib/step15_eventswithappsync-stack';

const app = new cdk.App();
new Step15EventswithappsyncStack(app, 'Step15EventswithappsyncStack');
