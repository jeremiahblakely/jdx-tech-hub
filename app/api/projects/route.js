import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
});

const docClient = DynamoDBDocumentClient.from(client);

// Mock data for when AWS is unavailable
const mockProjects = {
  'jdx-hub': {
    id: 'jdx-hub',
    name: 'JDX Tech Hub',
    description: 'Central dashboard for managing all development projects and resources',
    status: 'development',
    techStack: ['Next.js', 'React', 'AWS'],
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-18T15:30:00Z'
  },
  'jdtv': {
    id: 'jdtv',
    name: 'JDTV iOS Streaming App',
    description: 'Native iOS streaming application with live TV and on-demand content',
    status: 'active',
    techStack: ['Swift', 'SwiftUI', 'AVKit'],
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-18T12:00:00Z'
  },
  'blakely': {
    id: 'blakely',
    name: 'Blakely Cinematics Website',
    description: 'Professional portfolio and booking platform for cinematography services',
    status: 'development',
    techStack: ['Next.js', 'TypeScript', 'Tailwind'],
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-17T14:00:00Z'
  }
};

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
    
    // Fallback to mock data when AWS is unavailable
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');
    
    if (projectId) {
      return NextResponse.json(mockProjects[projectId] || null);
    } else {
      return NextResponse.json(Object.values(mockProjects));
    }
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

// PATCH - Update specific fields (like blueprint data)
export async function PATCH(request) {
  try {
    const data = await request.json();
    const { id, ...updateFields } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Build update expression dynamically
    let updateExpression = 'SET ';
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    const updateItems = [];

    Object.keys(updateFields).forEach((key, index) => {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      
      updateItems.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = updateFields[key];
    });

    // Always update the updatedAt field
    updateItems.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    updateExpression += updateItems.join(', ');

    const command = new UpdateCommand({
      TableName: 'jdx-projects',
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const response = await docClient.send(command);
    return NextResponse.json({ success: true, data: response.Attributes });
  } catch (error) {
    console.error('Error patching project:', error);
    // Fallback: just return success for demo mode
    return NextResponse.json({ success: true, data: { id, ...updateFields, updatedAt: new Date().toISOString() } });
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
