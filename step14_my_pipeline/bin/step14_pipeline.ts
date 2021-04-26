#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step14MyPipelineStack } from '../lib/step14_my_pipeline-stack';

const app = new cdk.App();
new Step14MyPipelineStack(app, 'Step14MyPipelineStack');
