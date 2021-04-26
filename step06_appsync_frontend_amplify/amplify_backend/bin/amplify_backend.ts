#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AmplifyBackendStack } from '../lib/amplify_backend-stack';

const app = new cdk.App();
new AmplifyBackendStack(app, 'AmplifyBackendStack');
