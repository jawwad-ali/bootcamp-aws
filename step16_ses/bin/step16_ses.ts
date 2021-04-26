#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step16SesStack } from '../lib/step16_ses-stack';

const app = new cdk.App();
new Step16SesStack(app, 'Step16SesStack');
