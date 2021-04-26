#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelinebackendStack } from '../lib/pipelinebackend-stack';

const app = new cdk.App();
new PipelinebackendStack(app, 'PipelinebackendStack');
