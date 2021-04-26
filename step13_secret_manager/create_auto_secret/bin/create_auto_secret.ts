#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CreateAutoSecretStack } from '../lib/create_auto_secret-stack';

const app = new cdk.App();
new CreateAutoSecretStack(app, 'CreateAutoSecretStack');
