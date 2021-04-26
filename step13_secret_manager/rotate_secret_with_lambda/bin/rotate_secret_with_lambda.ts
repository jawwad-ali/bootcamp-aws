#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RotateSecretWithLambdaStack } from '../lib/rotate_secret_with_lambda-stack';

const app = new cdk.App();
new RotateSecretWithLambdaStack(app, 'RotateSecretWithLambdaStack');
