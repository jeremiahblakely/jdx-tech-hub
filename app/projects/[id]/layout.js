// app/projects/[id]/layout.js
'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { ArrowLeft, Home, Code, Key, Cloud, FileText, Github } from 'lucide-react';

export default function ProjectLayout({ children }) {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.id;

  // Mock project data - will be replaced with real data later
  const projects = {
    'jdtv': { name: 'JDTV iOS Streaming App', color: 'from-blue-600 to-purple-600' },
    'blakely': { name: 'Blakely Cinematics Website', color: 'from-purple-600 to-pink-600' },
    'jdx-hub': { name: 'JDX Tech Hub', color: 'from-green-600 to-teal-600' }
  };

  const project = projects[projectId] || { name: 'Unknown Project', color: 'from-gray-600 to-gray-700' };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home, href: `/projects/${projectId}` },
    { id: 'credentials', label: 'Credentials', icon: Key, href: `/projects/${projectId}/credentials` },
    { id: 'github', label: 'GitHub', icon: Github, href: `/projects/${projectId}/github` },
    { id: 'aws', label: 'AWS Resources', icon: Cloud, href: `/projects/${projectId}/aws` },
    { id: 'context', label: 'Context Generator', icon: FileText, href: `/projects/${projectId}/context` }
  ];

  const isTabActive = (tab) => {
    if (tab.id === 'overview') {
      return pathname === `/projects/${projectId}`;
    }
    return pathname === tab.href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                {project.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700/50 bg-gray-900/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = isTabActive(tab);
              
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 transition-all
                    ${isActive 
                      ? 'border-blue-500 text-white bg-gray-800/30' 
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}