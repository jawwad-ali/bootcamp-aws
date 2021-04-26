#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step08BackendStack } from '../lib/step08_backend-stack';

const app = new cdk.App();
new Step08BackendStack(app, 'Step08BackendStack');
