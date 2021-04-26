#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkbackendStack } from '../lib/cdkbackend-stack';

const app = new cdk.App();
new CdkbackendStack(app, 'CdkbackendStack');
