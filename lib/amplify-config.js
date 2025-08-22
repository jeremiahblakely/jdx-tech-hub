import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID?.split('_')[1]}.auth.${process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'}.amazoncognito.com`,
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: [
            typeof window !== 'undefined' ? window.location.origin + '/dashboard' : 'http://localhost:3000/dashboard'
          ],
          redirectSignOut: [
            typeof window !== 'undefined' ? window.location.origin + '/login' : 'http://localhost:3000/login'
          ],
          responseType: 'code',
        },
        email: true,
        username: false,
      },
    },
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;