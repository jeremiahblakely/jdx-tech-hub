'use client';

import { useEffect } from 'react';
import amplifyConfig from '../lib/amplify-config';

export default function AmplifyProvider({ children }) {
  useEffect(() => {
    // Amplify is configured in amplify-config.js
  }, []);

  return <>{children}</>;
}