// app/projects/[id]/context/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  FileText, 
  Copy, 
  Download, 
  RefreshCw, 
  Check,
  Settings,
  Code,
  Database,
  Globe,
  Key,
  GitBranch,
  Server,
  Sparkles
} from 'lucide-react';

export default function ContextGeneratorPage() {
  const params = useParams();
  const projectId = params.id;
  const [projectData, setProjectData] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [includeOptions, setIncludeOptions] = useState({
    overview: true,
    techStack: true,
    credentials: true,
    endpoints: true,
    gitInfo: false,
    awsResources: false,
    fileStructure: false,
    notes: true
  });
  const [generatedContext, setGeneratedContext] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load project data
    const storedProject = localStorage.getItem(`project_${projectId}`);
    if (storedProject) {
      setProjectData(JSON.parse(storedProject));
    }
    
    // Load credentials
    const storedCredentials = localStorage.getItem(`credentials_${projectId}`);
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
    }
  }, [projectId]);

  const generateContext = () => {
    if (!projectData) return;

    let context = `# Project Context: ${projectData.name}\n\n`;
    
    if (includeOptions.overview) {
      context += `## Overview\n`;
      context += `**Name:** ${projectData.name}\n`;
      context += `**Description:** ${projectData.description}\n`;
      context += `**Status:** ${projectData.status}\n`;
      context += `**Start Date:** ${projectData.startDate}\n\n`;
    }

    if (includeOptions.techStack && projectData.techStack) {
      context += `## Technology Stack\n`;
      context += projectData.techStack.map(tech => `- ${tech}`).join('\n');
      context += '\n\n';
    }

    if (includeOptions.credentials && credentials.length > 0) {
      context += `## Credentials & API Keys\n`;
      credentials.forEach(cred => {
        context += `### ${cred.name}\n`;
        context += `- **Type:** ${cred.type}\n`;
        context += `- **Environment:** ${cred.environment}\n`;
        context += `- **Value:** ${cred.value}\n`;
        if (cred.description) {
          context += `- **Description:** ${cred.description}\n`;
        }
        context += '\n';
      });
    }

    if (includeOptions.endpoints) {
      context += `## API Endpoints\n`;
      if (projectData.deployment) {
        context += `**Base URL:** ${projectData.deployment}\n\n`;
      }
      context += `### Available Endpoints\n`;
      context += `- GET /api/health - Health check endpoint\n`;
      context += `- POST /api/auth/login - User authentication\n`;
      context += `- GET /api/users - Get user list\n`;
      context += `- GET /api/projects - Get project list\n\n`;
    }

    if (includeOptions.gitInfo && projectData.repository) {
      context += `## Repository Information\n`;
      context += `**GitHub URL:** ${projectData.repository}\n`;
      context += `**Default Branch:** main\n`;
      context += `**Last Commit:** ${new Date().toLocaleDateString()}\n\n`;
    }

    if (includeOptions.awsResources) {
      context += `## AWS Resources\n`;
      context += `### EC2 Instances\n`;
      context += `- web-server-01 (t3.medium) - Running\n`;
      context += `- api-server-01 (t3.small) - Running\n\n`;
      context += `### RDS Database\n`;
      context += `- PostgreSQL 14.7 (db.t3.micro) - Available\n\n`;
      context += `### S3 Buckets\n`;
      context += `- jdx-assets (1.2 GB)\n`;
      context += `- jdx-backups (5.8 GB)\n\n`;
    }

    if (includeOptions.fileStructure) {
      context += `## File Structure\n`;
      context += '```\n';
      context += `${projectData.name}/\n`;
      context += `├── app/\n`;
      context += `│   ├── components/\n`;
      context += `│   ├── api/\n`;
      context += `│   └── page.js\n`;
      context += `├── public/\n`;
      context += `├── package.json\n`;
      context += `└── README.md\n`;
      context += '```\n\n';
    }

    if (includeOptions.notes && projectData.notes) {
      context += `## Additional Notes\n`;
      context += `${projectData.notes}\n\n`;
    }

    context += `---\n`;
    context += `*Generated on ${new Date().toLocaleString()} for Claude AI*`;

    setGeneratedContext(context);
  };

  useEffect(() => {
    if (projectData) {
      generateContext();
    }
  }, [projectData, credentials, includeOptions]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadContext = () => {
    const blob = new Blob([generatedContext], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData?.name || 'project'}-context.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const optionsList = [
    { key: 'overview', label: 'Project Overview', icon: FileText },
    { key: 'techStack', label: 'Technology Stack', icon: Code },
    { key: 'credentials', label: 'Credentials & Keys', icon: Key },
    { key: 'endpoints', label: 'API Endpoints', icon: Globe },
    { key: 'gitInfo', label: 'Git Repository', icon: GitBranch },
    { key: 'awsResources', label: 'AWS Resources', icon: Server },
    { key: 'fileStructure', label: 'File Structure', icon: Database },
    { key: 'notes', label: 'Additional Notes', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Context Generator</h2>
          <p className="text-gray-400">Generate comprehensive project context for Claude AI</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateContext}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
          <button
            onClick={downloadContext}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Options Panel */}
        <div className="col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Include in Context
            </h3>
            <div className="space-y-3">
              {optionsList.map(({ key, label, icon: Icon }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includeOptions[key]}
                    onChange={(e) => setIncludeOptions({
                      ...includeOptions,
                      [key]: e.target.checked
                    })}
                    className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* AI Tips */}
          <div className="mt-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-700/30">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI Context Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Include credentials only when necessary for the task</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Add file structure for code generation tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Keep context focused on relevant information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Update context regularly as project evolves</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Context Preview</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 max-h-[600px] overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {generatedContext || 'Context will appear here once generated...'}
              </pre>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {generatedContext ? `${generatedContext.length} characters` : 'No content generated'}
              </span>
              <span className="text-gray-500">
                Markdown format • Ready for Claude AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}