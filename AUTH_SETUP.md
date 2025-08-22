# JDX Tech Hub - Authentication Setup

## Single-User Authentication System

This application implements a **single-user authentication system** using AWS Cognito and NextAuth.js, designed for personal admin access only.

## Configuration

### Environment Variables Required:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_URL=http://localhost:3001

# AWS Cognito Settings
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_2ZIdN9jVY
NEXT_PUBLIC_COGNITO_CLIENT_ID=7aih7v6094c9vdp3f5jq62b0gc
COGNITO_CLIENT_SECRET=your-cognito-client-secret

# AWS Region
NEXT_PUBLIC_AWS_REGION=us-east-1
```

## Security Features

### Single-User Access
- **Only `jd@jeremiahblakely.com` can log in**
- Email validation on both client and server side
- No public signup functionality
- Admin-only portal design

### Route Protection
Protected routes via middleware:
- `/dashboard/*`
- `/projects/*` 
- `/setup/*`

### Multi-Layer Validation
1. **Client-side**: Email validation in login form
2. **NextAuth signIn callback**: Server-side email verification
3. **JWT callback**: Token-level validation
4. **Session callback**: Final session verification
5. **Middleware**: Route-level protection

## User Account Setup

The authorized user account must be created manually in AWS Cognito Console:

1. Go to AWS Cognito User Pools
2. Select your user pool (`us-east-1_2ZIdN9jVY`)
3. Create user with email: `jd@jeremiahblakely.com`
4. Set temporary password and require password reset on first login

## Development Usage

```bash
npm run dev
```

### Hidden Login Access (Security Through Obscurity)

- **Landing page**: Appears as normal portfolio site
- **Secret access**: Press `Cmd+Shift+\` to reveal admin login
- **Return home**: Press `ESC` on login page to return to landing
- **No visible navigation** between landing and login pages
- Protected routes redirect unauthenticated users to login
- Successful authentication redirects to `/dashboard`

### Keyboard Shortcuts

| Key Combination | Action |
|----------------|--------|
| `Cmd+Shift+\` | Access hidden admin login (from landing page) |
| `ESC` | Return to landing page (from login page) |

## Security Notes

⚠️ **Important**: 
- Rotate AWS credentials regularly
- Use IAM roles instead of hardcoded keys in production
- Keep `NEXTAUTH_SECRET` secure and unique
- Monitor login attempts through Cognito CloudWatch logs