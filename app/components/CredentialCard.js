'use client';
import { useState } from 'react';

export default function CredentialCard({ service, username, apiKey, type }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="credential-card">
      <div className="credential-header">
        <h4>{service}</h4>
        <span className="credential-type">{type}</span>
      </div>
      <div className="credential-info">
        <p><span className="label">Username:</span> {username}</p>
        <div className="api-key-row">
          <span className="label">API Key:</span>
          <span className="api-key">
            {showKey ? apiKey : '••••••••••••••••'}
          </span>
          <button 
            className="toggle-key"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    </div>
  );
}