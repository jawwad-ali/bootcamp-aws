#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step23XRayStack } from '../lib/step23_x_ray-stack';

const app = new cdk.App();
new Step23XRayStack(app, 'Step23XRayStack');
