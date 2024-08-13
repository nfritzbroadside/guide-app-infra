#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DataStack } from '../lib/dataStack';

const app = new cdk.App();
new DataStack(app, 'GuideApp-DataStack-prod', {
  stackName: 'GuideApp-DataStack-prod',
  env: { account: '971422711298', region: 'us-east-1' },
  serviceName: 'GuideApp',
  envName: 'prod',
});