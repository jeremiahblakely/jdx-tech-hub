import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

const AUTHORIZED_EMAIL = 'jd@jeremiahblakely.com';

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: `https://cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Validate that only authorized email can sign in
      if (user.email !== AUTHORIZED_EMAIL) {
        console.log(`Unauthorized login attempt by: ${user.email}`);
        return false; // Deny access
      }
      return true; // Allow access
    },
    async jwt({ token, account, profile, user }) {
      // Additional email check in JWT callback
      if (user && user.email !== AUTHORIZED_EMAIL) {
        throw new Error('Unauthorized email');
      }
      
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Final email validation in session callback
      if (session.user.email !== AUTHORIZED_EMAIL) {
        throw new Error('Unauthorized email');
      }
      
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect errors to login page
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };