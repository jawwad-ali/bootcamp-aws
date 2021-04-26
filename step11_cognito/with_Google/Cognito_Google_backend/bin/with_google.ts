#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WithGoogleStack } from '../lib/with_google-stack';

const app = new cdk.App();
new WithGoogleStack(app, 'WithGoogleStack');
