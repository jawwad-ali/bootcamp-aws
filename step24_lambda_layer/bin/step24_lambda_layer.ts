#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step24LambdaLayerStack } from '../lib/step24_lambda_layer-stack';

const app = new cdk.App();
new Step24LambdaLayerStack(app, 'Step24LambdaLayerStack');
