#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step15EventsStack } from '../lib/step15_events-stack';

const app = new cdk.App();
new Step15EventsStack(app, 'Step15EventsStack');
