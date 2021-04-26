import * as cdk from '@aws-cdk/core';
import * as CodePipeline from '@aws-cdk/aws-codepipeline'
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions'
import * as CodeBuild from '@aws-cdk/aws-codebuild'

export class Step14MyPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Artifact from source stage
    const sourceOutput = new CodePipeline.Artifact();

    // Artifact from build stage
    const CDKOutput = new CodePipeline.Artifact();

    let stackName = "CdkbackendStack"
    const cdkBuild = new CodeBuild.PipelineProject(this, 'CdkBuild', {

      buildSpec: CodeBuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            "runtime-versions": {
              "nodejs": 12
            },
            commands: [
              'npm install'
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth -- -o dist'
            ],
          },
        },
        artifacts: {
          'base-directory': './dist',
          files: [
            `${stackName}.template.json`,
          ],
        },
      }),
      environment: {
        buildImage: CodeBuild.LinuxBuildImage.STANDARD_3_0,
      },
    });

    ///Define a pipeline
    const pipline = new CodePipeline.Pipeline(this, 'CDKPipeline', {
      crossAccountKeys: false,
      restartExecutionOnUpdate: true,
    });

    ///Adding stages to pipeline

    //First Stage Source
    pipline.addStage({
      stageName: 'Source',
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: 'Checkout',
          owner: 'jawwad-ali',
          repo: "cdk-backend",
          oauthToken: cdk.SecretValue.plainText('46cbe5155f710099b62942a7844276f705c32d18'),
          output: sourceOutput,
          branch: "master",
        }),
      ],
    })

    pipline.addStage({
      stageName: 'Build',
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: 'cdkBuild',
          project: cdkBuild,
          input: sourceOutput,
          outputs: [CDKOutput],
        }),
      ],
    })

    pipline.addStage({
      stageName: 'Deploy',
      actions: [
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          actionName: "DeployPipeline",
          templatePath: CDKOutput.atPath(`${stackName}.template.json`),
          stackName: stackName,
          adminPermissions: true
        }),
      ],
    })
  }
}