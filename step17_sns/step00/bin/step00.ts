#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step00Stack } from '../lib/step00-stack';

const app = new cdk.App();
new Step00Stack(app, 'Step00Stack');
