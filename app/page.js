'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // If authenticated, redirect to dashboard
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    // Secret keyboard shortcut to access admin login
    const handleKeyDown = (event) => {
      // Cmd+Shift+\ (backslash) - secret shortcut to login
      if (event.metaKey && event.shiftKey && event.code === 'Backslash') {
        event.preventDefault();
        router.push('/login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent tracking-tight animate-pulse">
            JDX
          </h1>
        </div>

        {/* Subtle tagline */}
        <p className="text-white/50 text-lg font-light tracking-widest">
          TECH HUB
        </p>
        
        {/* Portfolio description */}
        <div className="mt-8 text-center max-w-md">
          <p className="text-white/40 text-sm leading-relaxed">
            Development & Creative Technologies
          </p>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-ping"></div>
        </div>
      </div>

      {/* Minimal geometric shapes for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-32 w-1 h-8 bg-white/10 transform rotate-45"></div>
      <div className="absolute top-40 right-40 w-3 h-3 border border-white/10 transform rotate-12"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-purple-300/30 rounded-full"></div>
    </div>
  );
}