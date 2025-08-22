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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--gradient-subtle)' }}
    >
      {/* Premium ambient lighting */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full premium-pulse opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full premium-glow opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(142, 142, 147, 0.08) 0%, transparent 70%)' }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          
          {/* Premium logo treatment */}
          <div className="mb-12">
            <h1 
              className="premium-heading text-9xl md:text-[12rem] lg:text-[14rem] tracking-[-0.05em] mb-4"
              style={{ 
                background: 'linear-gradient(135deg, var(--platinum) 0%, var(--silver) 50%, var(--platinum) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}
            >
              JDX
            </h1>
            
            {/* Subtle underline */}
            <div 
              className="h-px mx-auto opacity-30"
              style={{ 
                width: '280px',
                background: 'linear-gradient(90deg, transparent 0%, var(--gold-accent) 50%, transparent 100%)'
              }}
            ></div>
          </div>

          {/* Sophisticated tagline */}
          <div className="mb-16 space-y-4">
            <h2 className="premium-subtitle text-xl md:text-2xl tracking-[0.15em] uppercase">
              Technology Solutions
            </h2>
            <p className="premium-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Advanced development platforms and creative technology infrastructure 
              designed for enterprise-grade performance and precision.
            </p>
          </div>

          {/* Luxury feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="premium-card p-6 group cursor-default">
              <div className="w-8 h-8 mb-4 mx-auto opacity-60 group-hover:opacity-80 transition-opacity">
                <div className="w-full h-full border border-current rounded-sm"></div>
              </div>
              <h3 className="premium-subtitle text-sm tracking-[0.1em] uppercase mb-2">Platform</h3>
              <p className="premium-body text-xs leading-relaxed">Enterprise-grade infrastructure</p>
            </div>
            
            <div className="premium-card p-6 group cursor-default">
              <div className="w-8 h-8 mb-4 mx-auto opacity-60 group-hover:opacity-80 transition-opacity">
                <div className="w-full h-full border border-current rounded-full"></div>
              </div>
              <h3 className="premium-subtitle text-sm tracking-[0.1em] uppercase mb-2">Performance</h3>
              <p className="premium-body text-xs leading-relaxed">Optimized for speed and reliability</p>
            </div>
            
            <div className="premium-card p-6 group cursor-default">
              <div className="w-8 h-8 mb-4 mx-auto opacity-60 group-hover:opacity-80 transition-opacity">
                <div className="w-3 h-3 border border-current transform rotate-45 mx-auto mt-2"></div>
              </div>
              <h3 className="premium-subtitle text-sm tracking-[0.1em] uppercase mb-2">Precision</h3>
              <p className="premium-body text-xs leading-relaxed">Meticulously crafted solutions</p>
            </div>
          </div>

          {/* Subtle status indicator */}
          <div className="flex items-center justify-center space-x-3">
            <div 
              className="w-2 h-2 rounded-full premium-glow"
              style={{ backgroundColor: 'var(--gold-accent)' }}
            ></div>
            <span className="premium-body text-xs tracking-[0.1em] uppercase opacity-60">
              System Operational
            </span>
          </div>
        </div>
      </div>

      {/* Minimal geometric accents */}
      <div className="absolute top-8 left-8 w-px h-16 opacity-20" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute top-8 left-8 w-16 h-px opacity-20" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute bottom-8 right-8 w-px h-16 opacity-20" style={{ backgroundColor: 'var(--silver)' }}></div>
      <div className="absolute bottom-8 right-8 w-16 h-px opacity-20" style={{ backgroundColor: 'var(--silver)' }}></div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-4 right-4 w-1 h-1 opacity-40 rounded-full" style={{ backgroundColor: 'var(--mercury)' }}></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 opacity-40 rounded-full" style={{ backgroundColor: 'var(--mercury)' }}></div>
    </div>
  );
}