import * as cdk from '@aws-cdk/core';
// import * as s3 from "@aws-cdk/aws-s3"
// import { Bucket } from "@aws-cdk/aws-s3"
// import { Construct, ConstructNode, IConstruct } from "@aws-cdk/core"
const console = require('console')
import * as lambda from "@aws-cdk/aws-lambda"
import * as appsync from "@aws-cdk/aws-appsync"
import { IConstruct } from '@aws-cdk/core';
import { NotifyingBucket } from "../custom_construct/CustomConstruct";

export class Step35CdkDesignPatternsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // parent of stack
    // console.log(this.node.scope)

    const lambda1 = new lambda.Function(this, 'lambdafunc', {
      code: lambda.Code.fromAsset("lambda"),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      memorySize: 1024
    })

    const api = new appsync.GraphqlApi(this, "gapi", {
      name: "checkwithapi"
    })

    // custom construct
    const xyz = new NotifyingBucket(this, "cc", {
      prefix: "text"
    })

    // finding parent of custom construct
    // console.log("play with custom construct",xyz.node.scope)

    // finding the parent of lambda function
    // console.log("parent of lambda is ", lambda1.node.scope);

    // finds a child with specific id
    // console.log(this.node.findChild('lambdafunc'))

    // find children of the stack
    // console.log(this.node.children)

    // finds children of a lambda func
    // console.log(lambda1.node.children);


    ///////////////////////////////////// VISITOR PATTERNS /////////////////////////////////////

    class TraverseResource implements cdk.IAspect {
      constructor(stack: Step35CdkDesignPatternsStack) { }

      // this method will be called on each node and node itself will be passed as a parameter
      public visit(node: IConstruct): void {
        if (node instanceof appsync.GraphqlApi) {
          // console.log("an api is found")
        }
      }
    }

    // we want to traverse the stack and all its children 
    cdk.Aspects.of(this).add(new TraverseResource(this))

    // Annotations
    cdk.Annotations.of(this).addWarning("warning")

  }
}
