#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step14CodepipelineStack } from '../lib/step14_codepipeline-stack';

const app = new cdk.App();
new Step14CodepipelineStack(app, 'Step14CodepipelineStack');
