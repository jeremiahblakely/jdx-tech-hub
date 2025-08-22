import '../types/blueprint.js';

/** @type {BlueprintTemplate[]} */
export const blueprintTemplates = [
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS Application',
    description: 'Full-stack SaaS with auth, payments, and dashboard',
    type: 'web-app',
    tags: ['saas', 'nextjs', 'full-stack'],
    popularity: 95,
    estimatedHours: 40,
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Stripe'],
    commonCredentials: [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'EMAIL_API_KEY'
    ],
    phases: [
      {
        name: 'Foundation',
        description: 'Setup project structure and core dependencies',
        order: 1,
        estimatedHours: 3,
        tasks: [
          {
            title: 'Initialize Next.js project',
            priority: 'critical',
            estimatedMinutes: 30,
            checklist: [
              { label: 'Create Next.js app', required: true },
              { label: 'Setup TypeScript', required: true },
              { label: 'Configure Tailwind', required: true },
              { label: 'Setup ESLint/Prettier', required: false }
            ]
          },
          {
            title: 'Setup database',
            priority: 'critical',
            estimatedMinutes: 60,
            credentials: [
              { key: 'DATABASE_URL', name: 'Database Connection', required: true }
            ]
          },
          {
            title: 'Configure deployment',
            priority: 'high',
            estimatedMinutes: 45,
            checklist: [
              { label: 'Setup Vercel/Amplify', required: true },
              { label: 'Configure environment variables', required: true },
              { label: 'Setup CI/CD', required: false }
            ]
          }
        ]
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization',
        order: 2,
        estimatedHours: 8,
        dependencies: ['foundation'],
        tasks: [
          {
            title: 'Setup auth provider',
            priority: 'critical',
            estimatedMinutes: 120,
            endpoints: [
              { method: 'POST', path: '/api/auth/login', hasAuth: false },
              { method: 'POST', path: '/api/auth/register', hasAuth: false },
              { method: 'POST', path: '/api/auth/logout', hasAuth: true },
              { method: 'POST', path: '/api/auth/refresh', hasAuth: true }
            ]
          },
          {
            title: 'Create auth UI',
            priority: 'critical',
            estimatedMinutes: 180,
            checklist: [
              { label: 'Login form', required: true },
              { label: 'Register form', required: true },
              { label: 'Password reset flow', required: true },
              { label: 'Email verification', required: true }
            ]
          },
          {
            title: 'Add security features',
            priority: 'high',
            estimatedMinutes: 90,
            checklist: [
              { label: 'Rate limiting', required: true },
              { label: 'CSRF protection', required: true },
              { label: 'Session management', required: true },
              { label: '2FA support', required: false }
            ]
          }
        ]
      },
      {
        name: 'Core Features',
        description: 'Build main application features',
        order: 3,
        estimatedHours: 20,
        dependencies: ['authentication'],
        tasks: [
          {
            title: 'Dashboard',
            priority: 'high',
            estimatedMinutes: 240
          },
          {
            title: 'User profile management',
            priority: 'high',
            estimatedMinutes: 180
          },
          {
            title: 'Data CRUD operations',
            priority: 'critical',
            estimatedMinutes: 360
          }
        ]
      },
      {
        name: 'Payments',
        description: 'Payment processing and billing',
        order: 4,
        estimatedHours: 6,
        dependencies: ['core-features'],
        tasks: [
          {
            title: 'Stripe integration',
            priority: 'critical',
            estimatedMinutes: 180,
            credentials: [
              { key: 'STRIPE_PUBLIC_KEY', name: 'Stripe Publishable Key', required: true },
              { key: 'STRIPE_SECRET_KEY', name: 'Stripe Secret Key', required: true },
              { key: 'STRIPE_WEBHOOK_SECRET', name: 'Stripe Webhook Secret', required: true }
            ]
          },
          {
            title: 'Subscription management',
            priority: 'high',
            estimatedMinutes: 120
          },
          {
            title: 'Billing dashboard',
            priority: 'medium',
            estimatedMinutes: 60
          }
        ]
      },
      {
        name: 'Polish & Launch',
        description: 'Final touches and production preparation',
        order: 5,
        estimatedHours: 3,
        dependencies: ['payments'],
        tasks: [
          {
            title: 'Error handling',
            priority: 'critical',
            estimatedMinutes: 60
          },
          {
            title: 'Loading states',
            priority: 'high',
            estimatedMinutes: 30
          },
          {
            title: 'SEO optimization',
            priority: 'medium',
            estimatedMinutes: 45
          },
          {
            title: 'Analytics setup',
            priority: 'low',
            estimatedMinutes: 45
          }
        ]
      }
    ]
  }
];