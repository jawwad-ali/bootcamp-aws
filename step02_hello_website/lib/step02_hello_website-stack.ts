import * as cdk from '@aws-cdk/core';
import * as s3 from "@aws-cdk/aws-s3"
import * as s3deploy from "@aws-cdk/aws-s3-deployment"
import * as cloudfront from "@aws-cdk/aws-cloudfront"
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import { CfnOutput } from '@aws-cdk/core';

export class Step02HelloWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here 
    // creating s3Bucket
    const websiteBucket = new s3.Bucket(this, 'MyBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
    });

    const getDomain = new CfnOutput(this, "HelloCFN", {
      value: distribution.domainName
    })

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./website')],
      destinationBucket: websiteBucket,
      distribution: distribution
    });
  }
}
