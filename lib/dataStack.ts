import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export interface DataStackProps extends cdk.StackProps {
  serviceName: string,
  envName: string,
}

export class DataStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: DataStackProps) {
    super(scope, id, props);

    this.createDynamoTable(props);
  }

  private createDynamoTable(props: DataStackProps) {
    let table = new dynamodb.TableV2(this, `${props.serviceName}-Table-${props.envName}`, {
      tableName: `${props.serviceName}-Table-${props.envName}`,
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING
      },
      pointInTimeRecovery: true,
    });

    table.addLocalSecondaryIndex({
      indexName: 'EventStartIndex',
      sortKey: {
        name: 'eventStartTime',
        type: dynamodb.AttributeType.STRING,
      }
    });
  }
}
