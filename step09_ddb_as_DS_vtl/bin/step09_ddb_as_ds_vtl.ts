#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step09DdbAsDsVtlStack } from '../lib/step09_ddb_as_ds_vtl-stack';

const app = new cdk.App();
new Step09DdbAsDsVtlStack(app, 'Step09DdbAsDsVtlStack');
