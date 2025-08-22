import '../types/blueprint.js';

/** @type {BlueprintTemplate} */
export const jdxTechHubBlueprint = {
  id: 'jdx-tech-hub',
  name: 'JDX Tech Hub - Development Command Center',
  description: 'Personal project management dashboard with AWS integration, authentication, and blueprint tracking',
  type: 'web-app',
  tags: ['dashboard', 'nextjs', 'aws', 'cognito', 'dynamodb'],
  popularity: 100,
  estimatedHours: 60,
  techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'AWS Amplify', 'AWS Cognito', 'DynamoDB', 'AWS SDK'],
  commonCredentials: [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'NEXT_PUBLIC_COGNITO_USER_POOL_ID',
    'NEXT_PUBLIC_COGNITO_CLIENT_ID',
    'NEXTAUTH_SECRET'
  ],
  phases: [
    {
      id: 'foundation',
      name: 'Foundation & Database',
      description: 'Core infrastructure, database setup, and project structure',
      order: 1,
      estimatedHours: 12,
      actualHours: 8.5,
      status: 'completed',
      tasks: [
        {
          id: 'database-setup',
          title: 'Setup DynamoDB Infrastructure',
          priority: 'critical',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 180,
            actualMinutes: 120,
            startedAt: '2024-03-15T10:00:00Z',
            completedAt: '2024-03-15T12:00:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'db-table-create',
              label: "Created DynamoDB table 'jdx-projects'",
              checked: true,
              required: true,
              completedAt: '2024-03-15T11:15:00Z',
              details: [
                {
                  type: 'schema',
                  description: 'DynamoDB table configuration',
                  metadata: {
                    tableName: 'jdx-projects',
                    region: 'us-east-1',
                    primaryKey: 'id (String)',
                    billingMode: 'PAY_PER_REQUEST'
                  }
                }
              ],
              filesModified: [
                {
                  path: '/app/api/aws/setup-dynamodb/route.js',
                  action: 'created',
                  description: 'DynamoDB table creation API',
                  lastModified: '2024-03-15T11:15:00Z'
                }
              ]
            },
            {
              id: 'db-partition-key',
              label: "Configured partition key 'id'",
              checked: true,
              required: true,
              completedAt: '2024-03-15T11:20:00Z'
            },
            {
              id: 'db-gsi',
              label: "Added GSI for status queries",
              checked: true,
              required: false,
              completedAt: '2024-03-15T11:30:00Z',
              details: [
                {
                  type: 'schema',
                  description: 'Global Secondary Index configuration',
                  metadata: {
                    indexName: 'status-index',
                    partitionKey: 'status',
                    projectionType: 'ALL'
                  }
                }
              ]
            },
            {
              id: 'db-backup',
              label: "Enable point-in-time recovery",
              checked: false,
              required: false,
              priority: 'medium',
              blockers: ['Need to configure backup policies first']
            },
            {
              id: 'db-monitoring',
              label: "Configure CloudWatch monitoring",
              checked: false,
              required: false,
              priority: 'low'
            }
          ],
          fieldsImplemented: [
            { field: 'id', type: 'String', status: 'complete', description: 'Primary key' },
            { field: 'name', type: 'String', status: 'complete', description: 'Project name' },
            { field: 'description', type: 'String', status: 'complete', description: 'Project description' },
            { field: 'status', type: 'String', status: 'complete', description: 'active | development | maintenance | archived' },
            { field: 'techStack', type: 'Array', status: 'complete', description: 'Technology stack array' },
            { field: 'startDate', type: 'String', status: 'complete', description: 'ISO date string' },
            { field: 'team', type: 'Array', status: 'complete', description: 'Team members array' },
            { field: 'repository', type: 'String', status: 'complete', description: 'GitHub repository URL' },
            { field: 'deployment', type: 'String', status: 'complete', description: 'Live deployment URL' },
            { field: 'features', type: 'Array', status: 'complete', description: 'Feature list (currently unused)' },
            { field: 'endpoints', type: 'Array', status: 'complete', description: 'API endpoints (currently unused)' },
            { field: 'notes', type: 'String', status: 'complete', description: 'Additional project notes' },
            { field: 'createdAt', type: 'String', status: 'complete', description: 'Creation timestamp' },
            { field: 'updatedAt', type: 'String', status: 'complete', description: 'Last update timestamp' }
          ],
          endpointsCreated: [
            { endpoint: '/api/projects', method: 'GET', status: 'working', description: 'List all projects or get by ID' },
            { endpoint: '/api/projects', method: 'POST', status: 'working', description: 'Create new project' },
            { endpoint: '/api/projects', method: 'PUT', status: 'working', description: 'Update existing project' },
            { endpoint: '/api/projects', method: 'DELETE', status: 'working', description: 'Delete project by ID' }
          ],
          filesModified: [
            { path: '/app/api/projects/route.js', action: 'created', description: 'Main projects CRUD API' },
            { path: '/app/api/aws/setup-dynamodb/route.js', action: 'created', description: 'Database setup endpoint' }
          ]
        },
        {
          id: 'project-structure',
          title: 'Next.js Project Structure',
          priority: 'critical',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 90,
            actualMinutes: 60,
            startedAt: '2024-03-15T09:00:00Z',
            completedAt: '2024-03-15T10:00:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'nextjs-init',
              label: 'Initialize Next.js 14 application',
              checked: true,
              required: true,
              completedAt: '2024-03-15T09:15:00Z'
            },
            {
              id: 'tailwind-config',
              label: 'Configure Tailwind CSS',
              checked: true,
              required: true,
              completedAt: '2024-03-15T09:30:00Z',
              filesModified: [
                { path: '/tailwind.config.js', action: 'created', description: 'Tailwind configuration' },
                { path: '/app/globals.css', action: 'created', description: 'Global styles with Tailwind imports' }
              ]
            },
            {
              id: 'app-router',
              label: 'Setup App Router structure',
              checked: true,
              required: true,
              completedAt: '2024-03-15T09:45:00Z',
              filesModified: [
                { path: '/app/layout.js', action: 'created', description: 'Root layout component' },
                { path: '/app/page.js', action: 'created', description: 'Landing page component' }
              ]
            },
            {
              id: 'eslint-setup',
              label: 'Configure ESLint and Prettier',
              checked: false,
              required: false,
              priority: 'low'
            }
          ]
        }
      ]
    },
    {
      id: 'authentication',
      name: 'Authentication System',
      description: 'AWS Cognito integration with single-user auth and security',
      order: 2,
      estimatedHours: 15,
      actualHours: 12.5,
      status: 'completed',
      tasks: [
        {
          id: 'cognito-setup',
          title: 'AWS Cognito Configuration',
          priority: 'critical',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 240,
            actualMinutes: 180,
            startedAt: '2024-03-16T10:00:00Z',
            completedAt: '2024-03-16T13:00:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'cognito-user-pool',
              label: 'Created Cognito User Pool',
              checked: true,
              required: true,
              completedAt: '2024-03-16T10:30:00Z',
              details: [
                {
                  type: 'config',
                  description: 'Cognito User Pool Configuration',
                  metadata: {
                    userPoolId: 'us-east-1_2ZIzhhjUY',
                    region: 'us-east-1',
                    signInAliases: ['email'],
                    passwordPolicy: {
                      minimumLength: 8,
                      requireUppercase: true,
                      requireLowercase: true,
                      requireNumbers: true,
                      requireSymbols: true
                    }
                  }
                }
              ]
            },
            {
              id: 'cognito-client',
              label: 'Created App Client (secret-free)',
              checked: true,
              required: true,
              completedAt: '2024-03-16T11:00:00Z',
              details: [
                {
                  type: 'config',
                  description: 'App Client Configuration',
                  metadata: {
                    clientId: '7qi3ollo7i0uj6r07tcuk2r93i',
                    generateSecret: false,
                    authFlows: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH']
                  }
                }
              ]
            },
            {
              id: 'cognito-user',
              label: 'Created single authorized user',
              checked: true,
              required: true,
              completedAt: '2024-03-16T11:15:00Z',
              details: [
                {
                  type: 'config',
                  description: 'Single-user setup for jd@jeremiahblakely.com',
                  metadata: {
                    email: 'jd@jeremiahblakely.com',
                    status: 'CONFIRMED',
                    passwordType: 'PERMANENT'
                  }
                }
              ]
            }
          ],
          filesModified: [
            { path: '/lib/amplify-config.js', action: 'created', description: 'Amplify configuration' },
            { path: '/components/AmplifyProvider.js', action: 'created', description: 'Amplify provider component' }
          ]
        },
        {
          id: 'auth-implementation',
          title: 'Authentication Implementation',
          priority: 'critical',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 300,
            actualMinutes: 270,
            startedAt: '2024-03-16T14:00:00Z',
            completedAt: '2024-03-16T18:30:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'login-page',
              label: 'Created login page with hidden access',
              checked: true,
              required: true,
              completedAt: '2024-03-16T15:30:00Z',
              details: [
                {
                  type: 'feature',
                  description: 'Security through obscurity with Cmd+Shift+\\ shortcut',
                  metadata: {
                    shortcut: 'Cmd+Shift+\\',
                    escapeKey: 'ESC to return home',
                    themes: 'Carbon Forge styling'
                  }
                }
              ],
              filesModified: [
                { path: '/app/login/page.js', action: 'created', description: 'Login page with Amplify Auth integration' },
                { path: '/app/page.js', action: 'modified', description: 'Added hidden keyboard shortcut' }
              ]
            },
            {
              id: 'auth-middleware',
              label: 'Implemented route protection',
              checked: true,
              required: true,
              completedAt: '2024-03-16T16:30:00Z',
              filesModified: [
                { path: '/middleware.js', action: 'created', description: 'Client-side auth protection middleware' }
              ]
            },
            {
              id: 'dashboard-auth',
              label: 'Added auth checks to dashboard',
              checked: true,
              required: true,
              completedAt: '2024-03-16T17:00:00Z',
              filesModified: [
                { path: '/app/dashboard/page.js', action: 'modified', description: 'Added getCurrentUser check and signOut functionality' }
              ]
            },
            {
              id: 'password-challenge',
              label: 'NEW_PASSWORD_REQUIRED challenge flow',
              checked: true,
              required: true,
              completedAt: '2024-03-16T18:30:00Z',
              details: [
                {
                  type: 'feature',
                  description: 'Dual-form interface for temporary password flow',
                  metadata: {
                    challengeType: 'NEW_PASSWORD_REQUIRED',
                    validation: 'Password strength requirements',
                    flow: 'signIn -> confirmSignIn -> dashboard'
                  }
                }
              ]
            }
          ],
          endpointsCreated: [
            { endpoint: '/api/auth/session', method: 'GET', status: 'working', description: 'Check current auth session' }
          ]
        }
      ]
    },
    {
      id: 'theme-system',
      name: 'Theme System',
      description: 'Dynamic theme switching with Carbon Forge as default',
      order: 3,
      estimatedHours: 8,
      actualHours: 6.5,
      status: 'completed',
      tasks: [
        {
          id: 'theme-architecture',
          title: 'Theme System Architecture',
          priority: 'high',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 180,
            actualMinutes: 150,
            startedAt: '2024-03-17T10:00:00Z',
            completedAt: '2024-03-17T12:30:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'theme-config',
              label: 'Created theme configuration system',
              checked: true,
              required: true,
              completedAt: '2024-03-17T11:00:00Z',
              filesModified: [
                { path: '/themes/index.js', action: 'created', description: 'Complete 5-theme system configuration' }
              ]
            },
            {
              id: 'theme-switcher',
              label: 'Built theme switcher component',
              checked: true,
              required: true,
              completedAt: '2024-03-17T12:00:00Z',
              filesModified: [
                { path: '/components/ThemeSwitcher.js', action: 'created', description: 'Dynamic theme switching component' }
              ]
            },
            {
              id: 'css-variables',
              label: 'Implemented CSS custom properties',
              checked: true,
              required: true,
              completedAt: '2024-03-17T12:30:00Z',
              filesModified: [
                { path: '/app/globals.css', action: 'modified', description: 'Added theme-aware CSS variables' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'blueprint-system',
      name: 'Blueprint & Progress Tracking',
      description: 'Development command center with detailed progress tracking',
      order: 4,
      estimatedHours: 20,
      actualHours: 8.0,
      status: 'in-progress',
      tasks: [
        {
          id: 'blueprint-types',
          title: 'Blueprint Type System',
          priority: 'critical',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 120,
            actualMinutes: 90,
            startedAt: '2024-03-18T10:00:00Z',
            completedAt: '2024-03-18T11:30:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'blueprint-types-def',
              label: 'Created comprehensive type definitions',
              checked: true,
              required: true,
              completedAt: '2024-03-18T11:00:00Z',
              filesModified: [
                { path: '/lib/types/blueprint.js', action: 'created', description: 'Complete JSDoc type definitions for blueprint system' }
              ]
            },
            {
              id: 'sample-templates',
              label: 'Created sample blueprint templates',
              checked: true,
              required: true,
              completedAt: '2024-03-18T11:30:00Z',
              filesModified: [
                { path: '/lib/constants/blueprint-templates.js', action: 'created', description: 'Sample Next.js SaaS blueprint' }
              ]
            }
          ]
        },
        {
          id: 'blueprint-test-page',
          title: 'Blueprint Test & Visualization',
          priority: 'high',
          status: 'completed',
          timeTracking: {
            estimatedMinutes: 240,
            actualMinutes: 210,
            startedAt: '2024-03-18T14:00:00Z',
            completedAt: '2024-03-18T17:30:00Z'
          },
          completionPercentage: 100,
          checklist: [
            {
              id: 'test-page-create',
              label: 'Created blueprint test page',
              checked: true,
              required: true,
              completedAt: '2024-03-18T16:00:00Z',
              filesModified: [
                { path: '/app/test-blueprint/page.js', action: 'created', description: 'Interactive blueprint visualization page' }
              ]
            },
            {
              id: 'progress-visualization',
              label: 'Implemented progress visualization',
              checked: true,
              required: true,
              completedAt: '2024-03-18T17:00:00Z',
              details: [
                {
                  type: 'feature',
                  description: 'Progress bars, status badges, and completion tracking',
                  metadata: {
                    progressTypes: ['phase', 'task', 'overall'],
                    visualElements: ['progress bars', 'status badges', 'icons'],
                    interactions: ['expand/collapse', 'status updates']
                  }
                }
              ]
            },
            {
              id: 'dashboard-integration',
              label: 'Added navigation from dashboard',
              checked: true,
              required: false,
              completedAt: '2024-03-18T17:30:00Z',
              filesModified: [
                { path: '/app/dashboard/page.js', action: 'modified', description: 'Added Blueprint System Test card to Command Center' }
              ]
            }
          ]
        },
        {
          id: 'detailed-tracking',
          title: 'Enhanced Detail Tracking System',
          priority: 'critical',
          status: 'in-progress',
          timeTracking: {
            estimatedMinutes: 360,
            actualMinutes: 180,
            startedAt: '2024-03-18T18:00:00Z'
          },
          completionPercentage: 50,
          checklist: [
            {
              id: 'multi-level-detail',
              label: 'Implement multi-level detail structure',
              checked: true,
              required: true,
              completedAt: '2024-03-18T19:00:00Z'
            },
            {
              id: 'jdx-blueprint-data',
              label: 'Create real JDX Tech Hub blueprint data',
              checked: false,
              required: true,
              priority: 'critical'
            },
            {
              id: 'enhanced-test-page',
              label: 'Build enhanced command center page',
              checked: false,
              required: true,
              priority: 'critical'
            },
            {
              id: 'gap-analysis',
              label: 'Add production readiness gap analysis',
              checked: false,
              required: false,
              priority: 'high'
            }
          ]
        }
      ]
    },
    {
      id: 'production-ready',
      name: 'Production Readiness',
      description: 'Security, monitoring, and deployment optimization',
      order: 5,
      estimatedHours: 10,
      actualHours: 0,
      status: 'not-started',
      tasks: [
        {
          id: 'security-hardening',
          title: 'Security & Hardening',
          priority: 'critical',
          status: 'not-started',
          timeTracking: {
            estimatedMinutes: 300,
            actualMinutes: 0
          },
          completionPercentage: 0,
          checklist: [
            {
              id: 'env-security',
              label: 'Secure environment variables',
              checked: false,
              required: true,
              priority: 'critical',
              blockers: ['Need to rotate exposed AWS keys in .env.local']
            },
            {
              id: 'rate-limiting',
              label: 'Implement API rate limiting',
              checked: false,
              required: true,
              priority: 'high'
            },
            {
              id: 'input-validation',
              label: 'Add comprehensive input validation',
              checked: false,
              required: true,
              priority: 'high'
            },
            {
              id: 'error-handling',
              label: 'Implement proper error boundaries',
              checked: false,
              required: false,
              priority: 'medium'
            }
          ]
        },
        {
          id: 'monitoring',
          title: 'Monitoring & Analytics',
          priority: 'medium',
          status: 'not-started',
          timeTracking: {
            estimatedMinutes: 180,
            actualMinutes: 0
          },
          completionPercentage: 0,
          checklist: [
            {
              id: 'cloudwatch',
              label: 'Setup CloudWatch monitoring',
              checked: false,
              required: false,
              priority: 'medium'
            },
            {
              id: 'error-tracking',
              label: 'Configure error tracking service',
              checked: false,
              required: false,
              priority: 'low'
            }
          ]
        }
      ]
    }
  ]
};