'use client';

import { useState } from 'react';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const setupDynamoDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/aws/setup-dynamodb', {
        method: 'POST'
      });
      const data = await response.json();
      setStatus(data.message || 'DynamoDB table created successfully!');
    } catch (error) {
      setStatus('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Setup DynamoDB</h1>
        </div>
        
        <p className="text-gray-400 mb-6">
          Click the button below to create DynamoDB tables for storing your project data securely in AWS.
        </p>

        <button
          onClick={setupDynamoDB}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
        >
          {loading ? 'Creating Table...' : 'Create DynamoDB Table'}
        </button>

        {status && (
          <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
            status.includes('Error') ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'
          }`}>
            {status.includes('Error') ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
