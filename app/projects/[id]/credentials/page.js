// app/projects/[id]/credentials/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Shield,
  Server,
  Database,
  Cloud,
  Globe,
  Lock,
  Copy,
  Check
} from 'lucide-react';

export default function CredentialsPage() {
  const params = useParams();
  const projectId = params.id;
  const [credentials, setCredentials] = useState([]);
  const [showValues, setShowValues] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCredential, setNewCredential] = useState({
    name: '',
    type: 'api_key',
    value: '',
    description: '',
    environment: 'development'
  });

  const credentialTypes = {
    api_key: { label: 'API Key', icon: Key, color: 'text-blue-500' },
    database: { label: 'Database', icon: Database, color: 'text-green-500' },
    server: { label: 'Server', icon: Server, color: 'text-purple-500' },
    cloud: { label: 'Cloud Service', icon: Cloud, color: 'text-yellow-500' },
    domain: { label: 'Domain', icon: Globe, color: 'text-pink-500' },
    other: { label: 'Other', icon: Shield, color: 'text-gray-500' }
  };

  useEffect(() => {
    // Load credentials from localStorage
    const storedCredentials = localStorage.getItem(`credentials_${projectId}`);
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
    }
  }, [projectId]);

  const saveCredentials = (updatedCredentials) => {
    localStorage.setItem(`credentials_${projectId}`, JSON.stringify(updatedCredentials));
    setCredentials(updatedCredentials);
  };

  const handleAddCredential = () => {
    if (newCredential.name && newCredential.value) {
      const credential = {
        id: Date.now().toString(),
        ...newCredential,
        createdAt: new Date().toISOString()
      };
      saveCredentials([...credentials, credential]);
      setNewCredential({
        name: '',
        type: 'api_key',
        value: '',
        description: '',
        environment: 'development'
      });
      setIsAdding(false);
    }
  };

  const handleUpdateCredential = (id) => {
    const credential = credentials.find(c => c.id === id);
    if (credential) {
      saveCredentials(credentials.map(c => c.id === id ? credential : c));
      setEditingId(null);
    }
  };

  const handleDeleteCredential = (id) => {
    if (confirm('Are you sure you want to delete this credential?')) {
      saveCredentials(credentials.filter(c => c.id !== id));
    }
  };

  const toggleShowValue = (id) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (value, id) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const maskValue = (value) => {
    if (value.length <= 8) return '••••••••';
    return value.substring(0, 4) + '••••' + value.substring(value.length - 4);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Credentials & Secrets</h2>
          <p className="text-gray-400">Manage API keys, passwords, and other sensitive data</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Credential
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-yellow-500 mt-0.5" />
        <div className="text-sm text-yellow-200">
          <p className="font-semibold mb-1">Security Notice</p>
          <p>Credentials are currently stored in browser localStorage. For production use, implement server-side encryption and secure storage.</p>
        </div>
      </div>

      {/* Add New Credential Form */}
      {isAdding && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Credential</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Name</label>
              <input
                type="text"
                value={newCredential.name}
                onChange={(e) => setNewCredential({...newCredential, name: e.target.value})}
                placeholder="e.g., Stripe API Key"
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Type</label>
              <select
                value={newCredential.type}
                onChange={(e) => setNewCredential({...newCredential, type: e.target.value})}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {Object.entries(credentialTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Value</label>
              <input
                type="password"
                value={newCredential.value}
                onChange={(e) => setNewCredential({...newCredential, value: e.target.value})}
                placeholder="Enter the secret value"
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Environment</label>
              <select
                value={newCredential.environment}
                onChange={(e) => setNewCredential({...newCredential, environment: e.target.value})}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-400 block mb-1">Description</label>
              <input
                type="text"
                value={newCredential.description}
                onChange={(e) => setNewCredential({...newCredential, description: e.target.value})}
                placeholder="Optional description"
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddCredential}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Credential
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Credentials List */}
      <div className="space-y-4">
        {credentials.length === 0 && !isAdding ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <Key className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No credentials added yet</p>
          </div>
        ) : (
          credentials.map((credential) => {
            const TypeIcon = credentialTypes[credential.type].icon;
            const isEditing = editingId === credential.id;
            
            return (
              <div key={credential.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 bg-gray-900/50 rounded-lg ${credentialTypes[credential.type].color}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={credential.name}
                          onChange={(e) => setCredentials(credentials.map(c => 
                            c.id === credential.id ? {...c, name: e.target.value} : c
                          ))}
                          className="mb-2 px-2 py-1 bg-gray-900/50 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <h4 className="text-white font-semibold mb-1">{credential.name}</h4>
                      )}
                      
                      {credential.description && (
                        <p className="text-sm text-gray-400 mb-2">{credential.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          credential.environment === 'production' ? 'bg-red-900/50 text-red-400' :
                          credential.environment === 'staging' ? 'bg-yellow-900/50 text-yellow-400' :
                          'bg-green-900/50 text-green-400'
                        }`}>
                          {credential.environment}
                        </span>
                        <span className="text-xs text-gray-500">
                          Added {new Date(credential.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1 font-mono text-sm bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700">
                          {isEditing ? (
                            <input
                              type="text"
                              value={credential.value}
                              onChange={(e) => setCredentials(credentials.map(c => 
                                c.id === credential.id ? {...c, value: e.target.value} : c
                              ))}
                              className="w-full bg-transparent text-white focus:outline-none"
                            />
                          ) : (
                            <span className="text-gray-300">
                              {showValues[credential.id] ? credential.value : maskValue(credential.value)}
                            </span>
                          )}
                        </div>
                        
                        {!isEditing && (
                          <>
                            <button
                              onClick={() => toggleShowValue(credential.id)}
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                              title={showValues[credential.id] ? "Hide" : "Show"}
                            >
                              {showValues[credential.id] ? 
                                <EyeOff className="w-4 h-4 text-gray-300" /> : 
                                <Eye className="w-4 h-4 text-gray-300" />
                              }
                            </button>
                            <button
                              onClick={() => copyToClipboard(credential.value, credential.id)}
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                              title="Copy"
                            >
                              {copiedId === credential.id ? 
                                <Check className="w-4 h-4 text-green-400" /> : 
                                <Copy className="w-4 h-4 text-gray-300" />
                              }
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleUpdateCredential(credential.id)}
                          className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                          title="Save"
                        >
                          <Save className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingId(credential.id)}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleDeleteCredential(credential.id)}
                          className="p-2 bg-gray-700 hover:bg-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-gray-300" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}