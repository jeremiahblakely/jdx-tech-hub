'use client';

import { useEffect } from 'react';
import amplifyConfig from '../lib/amplify-config';
import { initializeTheme } from '@/themes';

export default function AmplifyProvider({ children }) {
  useEffect(() => {
    // Amplify is configured in amplify-config.js
    // Initialize theme system
    initializeTheme();
  }, []);

  return <div className="theme-transition">{children}</div>;
}