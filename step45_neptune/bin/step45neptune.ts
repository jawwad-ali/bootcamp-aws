#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step45Neptune } from '../lib/step45neptune-stack';

const app = new cdk.App();
new Step45Neptune(app, 'Step45Neptune');
