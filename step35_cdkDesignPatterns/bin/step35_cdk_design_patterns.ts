#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step35CdkDesignPatternsStack } from '../lib/step35_cdk_design_patterns-stack';

const app = new cdk.App();
new Step35CdkDesignPatternsStack(app, 'Step35CdkDesignPatternsStack');
