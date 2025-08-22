// Blueprint Templates for Different Project Types
import '../types/blueprint.js';

/** @type {Object.<string, BlueprintTemplate>} */
export const blueprintTemplates = {
  saas: {
    id: 'saas-template',
    name: 'SaaS Application',
    description: 'Multi-user web application with authentication, payments, and subscriptions',
    type: 'web-app',
    tags: ['saas', 'web-app', 'authentication', 'payments', 'subscriptions'],
    popularity: 95,
    estimatedHours: 120,
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'Auth0'],
    commonCredentials: [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'STRIPE_SECRET_KEY',
      'STRIPE_PUBLISHABLE_KEY',
      'AUTH0_CLIENT_ID',
      'AUTH0_CLIENT_SECRET'
    ],
    phases: [
      {
        id: 'foundation',
        name: 'Foundation & Setup',
        description: 'Project setup, database, and core infrastructure',
        order: 1,
        estimatedHours: 20,
        status: 'not-started',
        tasks: [
          {
            id: 'project-setup',
            title: 'Initialize Project Structure',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 120,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'next-init',
                label: 'Create Next.js application',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'eslint-setup',
                label: 'Configure ESLint and Prettier',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'tailwind-setup',
                label: 'Setup Tailwind CSS',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'env-setup',
                label: 'Configure environment variables',
                checked: false,
                required: true,
                priority: 'critical'
              }
            ]
          },
          {
            id: 'database-setup',
            title: 'Database Configuration',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 180,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'db-provider',
                label: 'Choose and setup database provider',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'prisma-setup',
                label: 'Configure Prisma ORM',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'db-schema',
                label: 'Design initial database schema',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'db-migrate',
                label: 'Run initial migrations',
                checked: false,
                required: true,
                priority: 'medium'
              }
            ]
          }
        ]
      },
      {
        id: 'authentication',
        name: 'User Authentication',
        description: 'User registration, login, and session management',
        order: 2,
        estimatedHours: 25,
        status: 'not-started',
        tasks: [
          {
            id: 'auth-setup',
            title: 'Authentication System Setup',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 240,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'nextauth-config',
                label: 'Configure NextAuth.js',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'auth-providers',
                label: 'Setup authentication providers',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'user-model',
                label: 'Create user database model',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'auth-pages',
                label: 'Build login/register pages',
                checked: false,
                required: true,
                priority: 'medium'
              }
            ]
          }
        ]
      },
      {
        id: 'core-features',
        name: 'Core Features',
        description: 'Main application features and functionality',
        order: 3,
        estimatedHours: 40,
        status: 'not-started',
        tasks: [
          {
            id: 'dashboard',
            title: 'User Dashboard',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 300,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'dashboard-layout',
                label: 'Create dashboard layout',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'dashboard-stats',
                label: 'Add key metrics/stats',
                checked: false,
                required: true,
                priority: 'medium'
              },
              {
                id: 'dashboard-actions',
                label: 'Implement main actions',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      },
      {
        id: 'deployment',
        name: 'Deployment & Production',
        description: 'Deploy application and configure production environment',
        order: 4,
        estimatedHours: 15,
        status: 'not-started',
        tasks: [
          {
            id: 'production-deploy',
            title: 'Production Deployment',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 180,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'hosting-setup',
                label: 'Choose and configure hosting',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'domain-dns',
                label: 'Setup domain and DNS',
                checked: false,
                required: true,
                priority: 'high'
              },
              {
                id: 'env-production',
                label: 'Configure production environment',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      }
    ]
  },

  website: {
    id: 'website-template',
    name: 'Marketing Website',
    description: 'Marketing website with CMS, blog, and lead generation',
    type: 'web-app',
    tags: ['website', 'marketing', 'cms', 'blog', 'seo'],
    popularity: 90,
    estimatedHours: 60,
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
    commonCredentials: [
      'SANITY_PROJECT_ID',
      'SANITY_API_TOKEN',
      'GOOGLE_ANALYTICS_ID',
      'SENDGRID_API_KEY'
    ],
    phases: [
      {
        id: 'design-content',
        name: 'Design & Content',
        description: 'Website design, content strategy, and asset preparation',
        order: 1,
        estimatedHours: 20,
        status: 'not-started',
        tasks: [
          {
            id: 'design-system',
            title: 'Design System & Branding',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 240,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'brand-colors',
                label: 'Define brand colors and typography',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'component-library',
                label: 'Create component library',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      },
      {
        id: 'pages-content',
        name: 'Pages & Content',
        description: 'Core website pages and content management',
        order: 2,
        estimatedHours: 25,
        status: 'not-started',
        tasks: [
          {
            id: 'core-pages',
            title: 'Core Website Pages',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 300,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'homepage',
                label: 'Build homepage',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'about-page',
                label: 'Create about page',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      }
    ]
  },

  mobile: {
    id: 'mobile-template',
    name: 'Mobile App',
    description: 'Cross-platform mobile application with React Native',
    type: 'mobile-app',
    tags: ['mobile', 'react-native', 'ios', 'android', 'app-store'],
    popularity: 85,
    estimatedHours: 100,
    techStack: ['React Native', 'Expo', 'React Navigation', 'AsyncStorage', 'Firebase'],
    commonCredentials: [
      'FIREBASE_API_KEY',
      'FIREBASE_PROJECT_ID',
      'EXPO_ACCESS_TOKEN',
      'APP_STORE_CONNECT_KEY'
    ],
    phases: [
      {
        id: 'app-setup',
        name: 'App Setup',
        description: 'Initialize React Native project and basic configuration',
        order: 1,
        estimatedHours: 15,
        status: 'not-started',
        tasks: [
          {
            id: 'rn-init',
            title: 'React Native Initialization',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 120,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'expo-init',
                label: 'Initialize Expo project',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'navigation-setup',
                label: 'Configure React Navigation',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      }
    ]
  },

  custom: {
    id: 'custom-template',
    name: 'Custom Project',
    description: 'Start with a blank blueprint and customize as needed',
    type: 'web-app',
    tags: ['custom', 'blank', 'flexible'],
    popularity: 70,
    estimatedHours: 40,
    techStack: [],
    commonCredentials: [],
    phases: [
      {
        id: 'planning',
        name: 'Project Planning',
        description: 'Define requirements and plan the project structure',
        order: 1,
        estimatedHours: 8,
        status: 'not-started',
        tasks: [
          {
            id: 'requirements',
            title: 'Requirements Gathering',
            priority: 'critical',
            status: 'not-started',
            timeTracking: {
              estimatedMinutes: 180,
              actualMinutes: 0
            },
            completionPercentage: 0,
            checklist: [
              {
                id: 'define-scope',
                label: 'Define project scope',
                checked: false,
                required: true,
                priority: 'critical'
              },
              {
                id: 'tech-stack',
                label: 'Choose technology stack',
                checked: false,
                required: true,
                priority: 'high'
              }
            ]
          }
        ]
      }
    ]
  }
};

export default blueprintTemplates;