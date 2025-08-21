import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { NextResponse } from 'next/server';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
});

export async function POST() {
  try {
    // Check if table already exists
    try {
      await client.send(new DescribeTableCommand({ TableName: 'jdx-projects' }));
      return NextResponse.json({ message: 'Table already exists' });
    } catch (e) {
      // Table doesn't exist, create it
    }

    const command = new CreateTableCommand({
      TableName: 'jdx-projects',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    return NextResponse.json({ message: 'DynamoDB table created successfully' });
  } catch (error) {
    console.error('DynamoDB Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}