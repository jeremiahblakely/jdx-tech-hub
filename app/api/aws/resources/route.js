import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { CloudWatchClient, GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch';
import { NextResponse } from 'next/server';

const config = {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
};

export async function GET() {
  try {
    const ec2Client = new EC2Client(config);
    const s3Client = new S3Client(config);

    // Get EC2 instances
    const instancesCommand = new DescribeInstancesCommand({});
    const instancesData = await ec2Client.send(instancesCommand);

    // Get S3 buckets
    const bucketsCommand = new ListBucketsCommand({});
    const bucketsData = await s3Client.send(bucketsCommand);

    return NextResponse.json({
      instances: instancesData.Reservations,
      buckets: bucketsData.Buckets,
    });
  } catch (error) {
    console.error('AWS Error:', error);
    return NextResponse.json({ error: 'Failed to fetch AWS resources' }, { status: 500 });
  }
}