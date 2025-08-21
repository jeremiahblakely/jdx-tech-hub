import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(client);

// GET all projects or single project
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (projectId) {
      // Get single project
      const command = new GetCommand({
        TableName: 'jdx-projects',
        Key: { id: projectId }
      });
      const response = await docClient.send(command);
      return NextResponse.json(response.Item || null);
    } else {
      // Get all projects
      const command = new ScanCommand({
        TableName: 'jdx-projects'
      });
      const response = await docClient.send(command);
      return NextResponse.json(response.Items || []);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(request) {
  try {
    const data = await request.json();
    const command = new PutCommand({
      TableName: 'jdx-projects',
      Item: {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });
    await docClient.send(command);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(request) {
  try {
    const data = await request.json();
    const command = new PutCommand({
      TableName: 'jdx-projects',
      Item: {
        ...data,
        updatedAt: new Date().toISOString()
      }
    });
    await docClient.send(command);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');
    
    const command = new DeleteCommand({
      TableName: 'jdx-projects',
      Key: { id: projectId }
    });
    await docClient.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
