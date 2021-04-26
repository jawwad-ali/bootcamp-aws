#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Forstep14Stack } from '../lib/forstep14-stack';

const app = new cdk.App();
new Forstep14Stack(app, 'Forstep14Stack');
