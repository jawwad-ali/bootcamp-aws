#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DefineUserpoolStack } from '../lib/define_userpool-stack';

const app = new cdk.App();
new DefineUserpoolStack(app, 'DefineUserpoolStack');
