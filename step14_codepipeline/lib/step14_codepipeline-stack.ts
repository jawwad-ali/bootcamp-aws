import * as cdk from '@aws-cdk/core';
import * as CodePipeline from '@aws-cdk/aws-codepipeline'
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions'
import * as CB from "@aws-cdk/aws-codebuild"
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';

const stackName = "Forstep14Stack"

export class Step14CodepipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // for source stage
    const sourceOutput = new CodePipeline.Artifact()

    // for build stage
    const CDKOutput = new CodePipeline.Artifact()

    // Code build action, Here you will define a complete build
    const cdkBuild = new CB.Project(this, 'CdkBuild', {
      buildSpec: CB.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            "runtime-version": {
              "nodejs": 12
            },
            commands: [
              "npm install"
            ],
          },

          build: {
            commands: [
              "num run build",
              "npm run cdk synth -- -o dist "
            ]
          },
        },

        artifacts: {
          "base-directory": "./dist",
          files: [
            `${stackName}.template.json`
          ],
        },
      }),
      environment: {
        buildImage: CB.LinuxBuildImage.STANDARD_3_0
      }
    })

    // Define a pipeline
    const pipeline = new CodePipeline.Pipeline(this, "CDKPipeline", {
      crossAccountKeys: false,
      restartExecutionOnUpdate: true
    })


    // const role = new Role(this, "secretsmanager", {
    //   assumedBy: new ServicePrincipal("secretsmanager.amazonaws.com")
    // })
    // const policy = new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   actions: ['secretsmanager:GetSecretValue'],
    //   resources: ['*']
    // });
    // role.addToPolicy(policy);

    // adding stages to pipeline
    // First stage "SOURCE STAGE"
    // pipeline.addStage({
    //   stageName: 'Source',
    //   actions: [
    //     new CodePipelineAction.GitHubSourceAction({
    //       actionName: 'Checkout',
    //       owner: 'jawwad-ali',
    //       repo: "forstep14",
    //       oauthToken: cdk.SecretValue.plainText('78b17d31292c7229cc127763b95292b1fb573c79'),
    //       output: sourceOutput,
    //       branch: "master",
    //     }),
    //   ],
    // })


    // Pipeline for build stage
    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "cdkBuild",
          project: cdkBuild,
          input: sourceOutput,
          outputs: [CDKOutput]
        })
      ]
    })

    pipeline.addStage({
      stageName: "DeployCDK",
      actions: [
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          actionName: "AdministerPipeline",
          templatePath: CDKOutput.atPath(`${this.stackName}.template.json`),
          stackName: this.stackName,
          adminPermissions: true
        })
      ]
    })

  }
}
