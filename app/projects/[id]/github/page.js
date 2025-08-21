// app/projects/[id]/github/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Github, 
  GitBranch, 
  GitCommit, 
  GitPullRequest,
  Star,
  Eye,
  GitFork,
  AlertCircle,
  RefreshCw,
  Link as LinkIcon,
  Calendar,
  User,
  FileCode,
  Activity
} from 'lucide-react';

export default function GitHubPage() {
  const params = useParams();
  const projectId = params.id;
  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);

  useEffect(() => {
    // Load saved GitHub URL from localStorage
    const projectData = localStorage.getItem(`project_${projectId}`);
    if (projectData) {
      const data = JSON.parse(projectData);
      if (data.repository) {
        setRepoUrl(data.repository);
        fetchGitHubData(data.repository);
      }
    }
  }, [projectId]);

  const extractRepoInfo = (url) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace('.git', '') };
    }
    return null;
  };

  const fetchGitHubData = async (url) => {
    const repoInfo = extractRepoInfo(url);
    if (!repoInfo) {
      setError('Invalid GitHub URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch repository data
      const repoResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
      if (!repoResponse.ok) throw new Error('Repository not found');
      const repoData = await repoResponse.json();
      setRepoData(repoData);

      // Fetch recent commits
      const commitsResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/commits?per_page=10`);
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        setCommits(commitsData);
      }

      // Fetch branches
      const branchesResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/branches`);
      if (branchesResponse.ok) {
        const branchesData = await branchesResponse.json();
        setBranches(branchesData);
      }

      // Save the repository URL to project data
      const projectData = localStorage.getItem(`project_${projectId}`);
      if (projectData) {
        const data = JSON.parse(projectData);
        data.repository = url;
        localStorage.setItem(`project_${projectId}`, JSON.stringify(data));
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    if (repoUrl) {
      fetchGitHubData(repoUrl);
      setIsConfiguring(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!repoData && !isConfiguring) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Github className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Repository Connected</h3>
        <p className="text-gray-400 mb-6">Connect a GitHub repository to view insights and activity</p>
        <button
          onClick={() => setIsConfiguring(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Connect Repository
        </button>
      </div>
    );
  }

  if (isConfiguring) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Connect GitHub Repository</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Repository URL</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleConnect}
                disabled={!repoUrl || loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                Connect
              </button>
              <button
                onClick={() => setIsConfiguring(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Repository Header */}
      {repoData && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">{repoData.name}</h2>
              </div>
              <p className="text-gray-400 mb-4">{repoData.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {repoData.stargazers_count} stars
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <GitFork className="w-4 h-4 text-blue-500" />
                  {repoData.forks_count} forks
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Eye className="w-4 h-4 text-green-500" />
                  {repoData.watchers_count} watchers
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fetchGitHubData(repoUrl)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
              </button>
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                title="Open in GitHub"
              >
                <LinkIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {repoData && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <FileCode className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-white">{repoData.language}</p>
                <p className="text-sm text-gray-400">Primary Language</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-white">{branches.length}</p>
                <p className="text-sm text-gray-400">Branches</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{repoData.open_issues_count}</p>
                <p className="text-sm text-gray-400">Open Issues</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-lg font-bold text-white">
                  {new Date(repoData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
                <p className="text-sm text-gray-400">Created</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Commits */}
      {commits.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-blue-500" />
            Recent Commits
          </h3>
          <div className="space-y-3">
            {commits.slice(0, 5).map((commit) => (
              <div key={commit.sha} className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                <img 
                  src={commit.author?.avatar_url || `https://ui-avatars.com/api/?name=${commit.commit.author.name}`} 
                  alt={commit.commit.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{commit.commit.message}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {commit.commit.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(commit.commit.author.date)}
                    </span>
                    <a 
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {commit.sha.substring(0, 7)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branches */}
      {branches.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-500" />
            Branches
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {branches.map((branch) => (
              <div key={branch.name} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                <span className="text-white font-medium">{branch.name}</span>
                {branch.protected && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded-full">Protected</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}