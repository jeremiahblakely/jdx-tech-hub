// app/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Monitor, 
  Globe, 
  Plus, 
  ArrowRight,
  Github,
  Cloud,
  Activity,
  Calendar,
  Users,
  Zap
} from 'lucide-react';

export default function Home() {
  const [projects] = useState([
    {
      id: 'jdtv',
      name: 'JDTV iOS Streaming App',
      description: 'Native iOS streaming application with live TV and on-demand content',
      status: 'active',
      tech: ['Swift', 'SwiftUI', 'AVKit'],
      icon: Monitor,
      gradient: 'from-blue-600 to-purple-600',
      stats: {
        commits: 234,
        issues: 5,
        lastUpdate: '2 hours ago'
      }
    },
    {
      id: 'blakely',
      name: 'Blakely Cinematics Website',
      description: 'Professional portfolio and booking platform for cinematography services',
      status: 'development',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      icon: Globe,
      gradient: 'from-purple-600 to-pink-600',
      stats: {
        commits: 156,
        issues: 3,
        lastUpdate: '1 day ago'
      }
    },
    {
      id: 'jdx-hub',
      name: 'JDX Tech Hub',
      description: 'Central dashboard for managing all development projects and resources',
      status: 'development',
      tech: ['Next.js', 'React', 'Node.js'],
      icon: Code,
      gradient: 'from-green-600 to-teal-600',
      stats: {
        commits: 45,
        issues: 8,
        lastUpdate: 'Just now'
      }
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-900/50 text-green-400 border-green-700/50';
      case 'development': return 'bg-blue-900/50 text-blue-400 border-blue-700/50';
      case 'maintenance': return 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-700/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">JDX Tech Hub</h1>
                <p className="text-sm text-gray-400">Project Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">All Systems Operational</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white mt-1">{projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Deployments</p>
                <p className="text-2xl font-bold text-white mt-1">2</p>
              </div>
              <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center">
                <Cloud className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Commits</p>
                <p className="text-2xl font-bold text-white mt-1">435</p>
              </div>
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Github className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Open Issues</p>
                <p className="text-2xl font-bold text-white mt-1">16</p>
              </div>
              <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <h2 className="text-xl font-semibold text-white mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-900/50 text-xs text-gray-300 rounded-lg border border-gray-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Github className="w-3 h-3" />
                      {project.stats.commits} commits
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {project.stats.issues} issues
                    </span>
                  </div>

                  {/* Last Update */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated {project.stats.lastUpdate}
                    </span>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1 text-sm">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Add New Project Card */}
          <button className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50 transition-all flex flex-col items-center justify-center gap-3 group">
            <div className="w-12 h-12 bg-gray-900/50 rounded-xl flex items-center justify-center group-hover:bg-gray-900/70 transition-colors">
              <Plus className="w-6 h-6 text-gray-500 group-hover:text-gray-400" />
            </div>
            <span className="text-gray-500 group-hover:text-gray-400 font-medium">Add New Project</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <button className="p-4 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg transition-colors text-left group">
              <Github className="w-5 h-5 text-purple-400 mb-2" />
              <p className="text-sm font-medium text-white group-hover:text-purple-400">Sync GitHub</p>
              <p className="text-xs text-gray-500">Update all repositories</p>
            </button>
            <button className="p-4 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg transition-colors text-left group">
              <Cloud className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-sm font-medium text-white group-hover:text-blue-400">AWS Dashboard</p>
              <p className="text-xs text-gray-500">View resource usage</p>
            </button>
            <button className="p-4 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg transition-colors text-left group">
              <Activity className="w-5 h-5 text-green-400 mb-2" />
              <p className="text-sm font-medium text-white group-hover:text-green-400">Analytics</p>
              <p className="text-xs text-gray-500">View project metrics</p>
            </button>
            <button className="p-4 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg transition-colors text-left group">
              <Users className="w-5 h-5 text-orange-400 mb-2" />
              <p className="text-sm font-medium text-white group-hover:text-orange-400">Team Settings</p>
              <p className="text-xs text-gray-500">Manage collaborators</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}