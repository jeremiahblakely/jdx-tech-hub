// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import Link from 'next/link';
import ThemeSwitcher from '../../components/ThemeSwitcher';
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
  Zap,
  X,
  Save
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
    techStack: '',
    template: 'web-app'
  });
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

  useEffect(() => {
    checkAuthStatus();
  }, [router]);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    } catch (error) {
      console.log('Not authenticated, redirecting to login');
      router.push('/login');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim() || !newProject.id.trim()) {
      alert('Please fill in project name and ID');
      return;
    }

    try {
      const projectData = {
        id: newProject.id.toLowerCase().replace(/\s+/g, '-'),
        name: newProject.name,
        description: newProject.description,
        status: 'development',
        techStack: newProject.techStack.split(',').map(t => t.trim()).filter(Boolean),
        blueprint: {
          template: newProject.template,
          phases: [],
          currentFocus: null,
          progress: 0,
          decisions: [{
            id: '1',
            date: new Date().toISOString().split('T')[0],
            decision: 'Initialize project blueprint',
            reason: 'Need structured development approach with progress tracking',
            impact: 'Will guide development phases and track completion',
            relatedTask: 'Project Setup'
          }],
          credentials: {
            awsRegion: 'us-east-1',
            githubRepo: `jdxtech/${newProject.id}`,
            vercelUrl: `${newProject.id}.vercel.app`
          },
          timeSpent: {},
          taskStates: {},
          sessions: [],
          lastUpdated: new Date().toISOString()
        }
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        setShowCreateProject(false);
        setNewProject({ id: '', name: '', description: '', techStack: '', template: 'web-app' });
        // Navigate to the new project's blueprint
        router.push(`/projects/${projectData.id}/blueprint`);
      } else {
        alert('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-900/50 text-green-400 border-green-700/50';
      case 'development': return 'bg-blue-900/50 text-blue-400 border-blue-700/50';
      case 'maintenance': return 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-700/50';
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'var(--gradient-subtle)' }}
    >
      {/* Premium Header */}
      <header 
        className="border-b sticky top-0 z-50 backdrop-blur-xl"
        style={{ 
          borderColor: 'var(--glass-border)',
          backgroundColor: 'rgba(10, 10, 10, 0.8)'
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center forge-flame"
                style={{ 
                  background: 'linear-gradient(135deg, var(--theme-accent-primary) 0%, var(--theme-accent-secondary) 100%)',
                  boxShadow: 'var(--theme-effects-shadow)'
                }}
              >
                <Code className="w-6 h-6" style={{ color: 'var(--theme-background-primary)' }} />
              </div>
              <div>
                <h1 className="premium-heading text-2xl tracking-wide">JDX Tech Hub</h1>
                <p className="premium-body text-xs tracking-[0.1em] uppercase opacity-60 mt-1">
                  Enterprise Dashboard
                </p>
              </div>
            </div>
            
            {/* Status & Actions */}
            <div className="flex items-center space-x-6">
              
              {/* System Status */}
              <div className="premium-card px-4 py-2 flex items-center space-x-2">
                <div 
                  className="w-1.5 h-1.5 rounded-full status-indicator theme-glow"
                ></div>
                <span className="premium-body text-xs tracking-[0.05em] uppercase opacity-80">
                  Operational
                </span>
              </div>
              
              {/* Theme Switcher */}
              <ThemeSwitcher compact={true} />
              
              {/* Sign Out Button */}
              <button 
                onClick={handleSignOut}
                className="premium-button secondary flex items-center space-x-2 px-6 py-3"
              >
                <span className="text-xs tracking-[0.1em] uppercase">Sign Out</span>
              </button>
              
              {/* New Project Button */}
              <button 
                onClick={() => setShowCreateProject(true)}
                className="premium-button flex items-center space-x-2 px-6 py-3"
              >
                <Plus className="w-4 h-4" />
                <span className="text-xs tracking-[0.1em] uppercase">New Project</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Analytics Overview */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="premium-heading text-xl tracking-wide mb-2">System Overview</h2>
          <p className="premium-body text-sm opacity-70">Real-time performance metrics</p>
        </div>
        
        <div className="grid grid-cols-4 gap-8 mb-16">
          
          {/* Total Projects */}
          <div className="premium-card p-6 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Code className="w-5 h-5" style={{ color: 'var(--gold-accent)' }} />
              </div>
              <div className="text-right">
                <div className="premium-body text-xs tracking-[0.1em] uppercase opacity-60 mb-1">Projects</div>
                <div className="premium-heading text-3xl tracking-tight">{projects.length}</div>
              </div>
            </div>
          </div>
          
          {/* Active Deployments */}
          <div className="premium-card p-6 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(142, 142, 147, 0.1)' }}>
                <Cloud className="w-5 h-5" style={{ color: 'var(--silver)' }} />
              </div>
              <div className="text-right">
                <div className="premium-body text-xs tracking-[0.1em] uppercase opacity-60 mb-1">Active</div>
                <div className="premium-heading text-3xl tracking-tight">2</div>
              </div>
            </div>
          </div>
          
          {/* Total Commits */}
          <div className="premium-card p-6 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(109, 109, 115, 0.1)' }}>
                <Github className="w-5 h-5" style={{ color: 'var(--mercury)' }} />
              </div>
              <div className="text-right">
                <div className="premium-body text-xs tracking-[0.1em] uppercase opacity-60 mb-1">Commits</div>
                <div className="premium-heading text-3xl tracking-tight">435</div>
              </div>
            </div>
          </div>
          
          {/* Open Issues */}
          <div className="premium-card p-6 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(179, 115, 51, 0.1)' }}>
                <Activity className="w-5 h-5" style={{ color: 'var(--copper-accent)' }} />
              </div>
              <div className="text-right">
                <div className="premium-body text-xs tracking-[0.1em] uppercase opacity-60 mb-1">Issues</div>
                <div className="premium-heading text-3xl tracking-tight">16</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Projects Grid */}
        <div className="mb-12">
          <h2 className="premium-heading text-xl tracking-wide mb-2">Active Projects</h2>
          <p className="premium-body text-sm opacity-70">Development portfolio and infrastructure</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="group"
              >
                <div className="premium-card p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: 'var(--gold-accent)' }} />
                    </div>
                    
                    <div 
                      className="px-3 py-1 rounded-full border text-xs tracking-[0.1em] uppercase"
                      style={{ 
                        color: project.status === 'active' ? 'var(--gold-accent)' : 'var(--silver)',
                        borderColor: project.status === 'active' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(142, 142, 147, 0.3)',
                        backgroundColor: project.status === 'active' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(142, 142, 147, 0.1)'
                      }}
                    >
                      {project.status}
                    </div>
                  </div>

                  {/* Project Info */}
                  <h3 className="premium-heading text-lg mb-3 group-hover:opacity-80 transition-opacity">
                    {project.name}
                  </h3>
                  <p className="premium-body text-sm mb-6 leading-relaxed opacity-80">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 text-xs tracking-[0.05em] rounded-lg border"
                        style={{ 
                          color: 'var(--mercury)',
                          borderColor: 'var(--glass-border)',
                          backgroundColor: 'rgba(26, 26, 26, 0.5)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b" style={{ borderColor: 'var(--glass-border)' }}>
                    <div className="flex items-center space-x-1">
                      <Github className="w-3 h-3 opacity-60" />
                      <span className="premium-body text-xs opacity-60 tracking-wide">
                        {project.stats.commits}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3 opacity-60" />
                      <span className="premium-body text-xs opacity-60 tracking-wide">
                        {project.stats.issues}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 opacity-60" />
                      <span className="premium-body text-xs opacity-60 tracking-wide">
                        {project.stats.lastUpdate}
                      </span>
                    </div>
                  </div>

                  {/* View Details */}
                  <div className="flex items-center justify-between">
                    <span className="premium-body text-xs tracking-[0.1em] uppercase opacity-50">
                      Project Details
                    </span>
                    <ArrowRight 
                      className="w-4 h-4 opacity-40 group-hover:opacity-70 group-hover:translate-x-1 transition-all" 
                    />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Add New Project Card */}
          <button 
            onClick={() => setShowCreateProject(true)}
            className="premium-card p-8 border-2 border-dashed hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group"
            style={{ borderColor: 'rgba(142, 142, 147, 0.2)' }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'rgba(142, 142, 147, 0.1)' }}
            >
              <Plus className="w-7 h-7" style={{ color: 'var(--mercury)' }} />
            </div>
            <span className="premium-body text-sm tracking-wide opacity-60 group-hover:opacity-80 transition-opacity">
              Initialize Project
            </span>
          </button>
        </div>

        {/* Premium Quick Actions */}
        <div className="mt-20">
          <div className="mb-8">
            <h3 className="premium-heading text-xl tracking-wide mb-2 flex items-center space-x-3">
              <Zap className="w-5 h-5" style={{ color: 'var(--gold-accent)' }} />
              <span>Command Center</span>
            </h3>
            <p className="premium-body text-sm opacity-70">System management and integration tools</p>
          </div>
          
          <div className="grid grid-cols-5 gap-6">
            
            {/* GitHub Sync */}
            <button className="premium-card p-6 text-left group transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Github className="w-6 h-6" style={{ color: 'var(--gold-accent)' }} />
              </div>
              <h4 className="premium-heading text-sm mb-2 group-hover:opacity-80 transition-opacity">
                Repository Sync
              </h4>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Synchronize development repositories
              </p>
            </button>
            
            {/* AWS Dashboard */}
            <button className="premium-card p-6 text-left group transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(142, 142, 147, 0.1)' }}>
                <Cloud className="w-6 h-6" style={{ color: 'var(--silver)' }} />
              </div>
              <h4 className="premium-heading text-sm mb-2 group-hover:opacity-80 transition-opacity">
                Cloud Resources
              </h4>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Monitor infrastructure metrics
              </p>
            </button>
            
            {/* Analytics */}
            <button className="premium-card p-6 text-left group transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(179, 115, 51, 0.1)' }}>
                <Activity className="w-6 h-6" style={{ color: 'var(--copper-accent)' }} />
              </div>
              <h4 className="premium-heading text-sm mb-2 group-hover:opacity-80 transition-opacity">
                Performance Analytics
              </h4>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Review system performance data
              </p>
            </button>
            
            {/* Blueprint Test */}
            <Link href="/test-blueprint">
              <button className="premium-card p-6 text-left group transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255, 69, 0, 0.1)' }}>
                  <Activity className="w-6 h-6" style={{ color: 'var(--theme-accent-primary)' }} />
                </div>
                <h4 className="premium-heading text-sm mb-2 group-hover:opacity-80 transition-opacity">
                  Blueprint System Test
                </h4>
                <p className="premium-body text-xs opacity-60 leading-relaxed">
                  Test the new Blueprint & Progress system
                </p>
              </button>
            </Link>
            
            {/* Team Management */}
            <button className="premium-card p-6 text-left group transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(109, 109, 115, 0.1)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--mercury)' }} />
              </div>
              <h4 className="premium-heading text-sm mb-2 group-hover:opacity-80 transition-opacity">
                Access Control
              </h4>
              <p className="premium-body text-xs opacity-60 leading-relaxed">
                Configure system permissions
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="premium-card p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="premium-heading text-xl">Create New Project</h2>
              <button 
                onClick={() => setShowCreateProject(false)}
                className="premium-button secondary px-2 py-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="premium-body text-sm block mb-2">Project ID (URL-safe)</label>
                <input
                  type="text"
                  value={newProject.id}
                  onChange={(e) => setNewProject({...newProject, id: e.target.value})}
                  placeholder="my-awesome-project"
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-secondary)'
                  }}
                />
              </div>

              <div>
                <label className="premium-body text-sm block mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="My Awesome Project"
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-secondary)'
                  }}
                />
              </div>

              <div>
                <label className="premium-body text-sm block mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Brief description of the project"
                  rows="3"
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-secondary)'
                  }}
                />
              </div>

              <div>
                <label className="premium-body text-sm block mb-2">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-secondary)'
                  }}
                />
              </div>

              <div>
                <label className="premium-body text-sm block mb-2">Blueprint Template</label>
                <select
                  value={newProject.template}
                  onChange={(e) => setNewProject({...newProject, template: e.target.value})}
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)',
                    border: '1px solid var(--theme-border-secondary)'
                  }}
                >
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="api">API Service</option>
                  <option value="desktop-app">Desktop Application</option>
                  <option value="library">Library/Package</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button 
                onClick={createProject}
                className="premium-button primary px-6 py-3 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Create Project</span>
              </button>
              <button 
                onClick={() => setShowCreateProject(false)}
                className="premium-button secondary px-6 py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}