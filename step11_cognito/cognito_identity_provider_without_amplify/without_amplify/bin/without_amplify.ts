#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WithoutAmplifyStack } from '../lib/without_amplify-stack';

const app = new cdk.App();
new WithoutAmplifyStack(app, 'WithoutAmplifyStack');
