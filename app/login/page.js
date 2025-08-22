'use client';

import { useState, useEffect } from 'react';
import { signIn, confirmSignIn } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [signInResponse, setSignInResponse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // ESC key to return to landing page
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [router]);

  const AUTHORIZED_EMAIL = 'jd@jeremiahblakely.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate authorized email
    if (email !== AUTHORIZED_EMAIL) {
      setError('Unauthorized access. This is a private admin portal.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await signIn({
        username: email,
        password
      });

      if (response.isSignedIn) {
        router.push('/dashboard');
      } else if (response.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setNeedsPasswordChange(true);
        setSignInResponse(response);
        setError(''); // Clear any previous errors
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.name === 'UserNotConfirmedException') {
        setError('Account needs to be confirmed by administrator.');
      } else if (err.name === 'NotAuthorizedException') {
        setError('Invalid credentials. Check your temporary password.');
      } else if (err.name === 'InvalidParameterException') {
        setError('Invalid credentials format.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate new password
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await confirmSignIn({
        challengeResponse: newPassword
      });

      if (response.isSignedIn) {
        router.push('/dashboard');
      } else {
        setError('Failed to set new password. Please try again.');
      }
    } catch (err) {
      console.error('Password change error:', err);
      if (err.name === 'InvalidParameterException') {
        setError('Password does not meet requirements. Must be at least 8 characters.');
      } else if (err.name === 'InvalidPasswordException') {
        setError('Password does not meet complexity requirements.');
      } else {
        setError('Failed to set new password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{ background: 'var(--gradient-subtle)' }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full premium-glow opacity-10 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="premium-heading text-6xl tracking-[-0.02em] mb-6"
            style={{ 
              background: 'linear-gradient(135deg, var(--platinum) 0%, var(--silver) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            JDX
          </h1>
          
          {/* Subtle divider */}
          <div 
            className="h-px mx-auto mb-6 opacity-20"
            style={{ 
              width: '120px',
              background: 'linear-gradient(90deg, transparent 0%, var(--silver) 50%, transparent 100%)'
            }}
          ></div>
          
          <h2 className="premium-subtitle text-sm tracking-[0.2em] uppercase mb-2">
            System Access
          </h2>
          
          {/* Status indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div 
              className="w-1.5 h-1.5 rounded-full premium-glow"
              style={{ backgroundColor: 'var(--gold-accent)' }}
            ></div>
            <span className="premium-body text-xs tracking-[0.1em] uppercase opacity-60">
              Secure Connection
            </span>
          </div>
        </div>

        {/* Conditional Forms */}
        {!needsPasswordChange ? (
          /* Initial Login Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="premium-subtitle block text-xs tracking-[0.1em] uppercase mb-3 opacity-80"
                >
                  Authorization Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="premium-input w-full text-sm"
                  placeholder="Enter authorization credentials"
                  style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="premium-subtitle block text-xs tracking-[0.1em] uppercase mb-3 opacity-80"
                >
                  Security Key
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="premium-input w-full text-sm"
                  placeholder="Enter temporary password"
                  style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="premium-card p-4" style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                <div 
                  className="text-xs premium-body leading-relaxed"
                  style={{ color: 'rgba(248, 113, 113, 0.9)' }}
                >
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="premium-button w-full py-4 text-sm tracking-[0.1em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
                    <span>Authenticating</span>
                  </div>
                ) : (
                  'Access System'
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Password Change Form */
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="mb-6 text-center">
              <div 
                className="w-2 h-2 rounded-full premium-glow mx-auto mb-4"
                style={{ backgroundColor: 'var(--copper-accent)' }}
              ></div>
              <h3 className="premium-subtitle text-sm tracking-[0.15em] uppercase mb-2">
                Password Update Required
              </h3>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Please set a permanent password to complete authentication
              </p>
            </div>

            <div className="space-y-4">
              
              {/* New Password Field */}
              <div>
                <label 
                  htmlFor="newPassword" 
                  className="premium-subtitle block text-xs tracking-[0.1em] uppercase mb-3 opacity-80"
                >
                  New Security Key
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="premium-input w-full text-sm"
                  placeholder="Create permanent password"
                  style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="premium-subtitle block text-xs tracking-[0.1em] uppercase mb-3 opacity-80"
                >
                  Confirm Security Key
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="premium-input w-full text-sm"
                  placeholder="Confirm permanent password"
                  style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}
                />
              </div>
            </div>

            {/* Password Requirements */}
            <div className="premium-card p-3" style={{ backgroundColor: 'rgba(26, 26, 26, 0.3)' }}>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Password requirements: Minimum 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="premium-card p-4" style={{ borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                <div 
                  className="text-xs premium-body leading-relaxed"
                  style={{ color: 'rgba(248, 113, 113, 0.9)' }}
                >
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="premium-button w-full py-4 text-sm tracking-[0.1em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
                    <span>Updating Password</span>
                  </div>
                ) : (
                  'Set Permanent Password'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-px h-3 opacity-20" style={{ backgroundColor: 'var(--mercury)' }}></div>
            <span className="premium-body text-xs tracking-[0.15em] uppercase opacity-40">
              ESC
            </span>
            <div className="w-px h-3 opacity-20" style={{ backgroundColor: 'var(--mercury)' }}></div>
          </div>
          <p className="premium-body text-xs opacity-50 tracking-wide">
            Return to system overview
          </p>
        </div>
      </div>

      {/* Minimal corner accents */}
      <div className="absolute top-6 left-6 w-4 h-px opacity-15" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute top-6 left-6 w-px h-4 opacity-15" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute bottom-6 right-6 w-4 h-px opacity-15" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute bottom-6 right-6 w-px h-4 opacity-15" style={{ backgroundColor: 'var(--silver)' }}></div>
    </div>
  );
}