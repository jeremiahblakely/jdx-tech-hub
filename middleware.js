import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic here if needed
    console.log('Middleware: User authenticated:', req.nextauth.token?.email);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if user is authenticated and has the correct email
        const authorizedEmail = 'jd@jeremiahblakely.com';
        return token?.email === authorizedEmail;
      },
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/setup/:path*'
  ]
};