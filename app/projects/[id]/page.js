// app/projects/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  GitBranch, 
  Activity, 
  Server,
  Database,
  Shield,
  Zap,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function ProjectOverview() {
  const params = useParams();
  const projectId = params.id;
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState(null);

  // Load project data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(`project_${projectId}`);
    if (storedData) {
      setProjectData(JSON.parse(storedData));
    } else {
      // Default data structure
      setProjectData({
        id: projectId,
        name: projectId === 'jdtv' ? 'JDTV iOS Streaming App' : 
              projectId === 'blakely' ? 'Blakely Cinematics Website' : 
              'JDX Tech Hub',
        description: 'Project description...',
        status: 'active',
        startDate: '2024-01-01',
        team: ['John Doe'],
        techStack: ['Next.js', 'React', 'Node.js'],
        repository: '',
        deployment: '',
        features: [],
        endpoints: [],
        notes: ''
      });
    }
  }, [projectId]);

  const handleSave = () => {
    localStorage.setItem(`project_${projectId}`, JSON.stringify(projectData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const storedData = localStorage.getItem(`project_${projectId}`);
    if (storedData) {
      setProjectData(JSON.parse(storedData));
    }
    setIsEditing(false);
  };

  if (!projectData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Project Overview</h2>
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Project
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Info Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Project Name</label>
            {isEditing ? (
              <input
                type="text"
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-xl font-semibold text-white">{projectData.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Description</label>
            {isEditing ? (
              <textarea
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-300">{projectData.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Status</label>
              {isEditing ? (
                <select
                  value={projectData.status}
                  onChange={(e) => setProjectData({...projectData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="development">In Development</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="archived">Archived</option>
                </select>
              ) : (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${projectData.status === 'active' ? 'bg-green-900/50 text-green-400' : 
                    projectData.status === 'development' ? 'bg-blue-900/50 text-blue-400' :
                    projectData.status === 'maintenance' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-gray-900/50 text-gray-400'}`}>
                  {projectData.status}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Start Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => setProjectData({...projectData, startDate: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <p className="text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(projectData.startDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Technology Stack
        </h3>
        {isEditing ? (
          <input
            type="text"
            value={projectData.techStack.join(', ')}
            onChange={(e) => setProjectData({...projectData, techStack: e.target.value.split(',').map(t => t.trim())})}
            placeholder="Enter technologies separated by commas"
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {projectData.techStack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Repository & Deployment */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-500" />
            Repository
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.repository}
              onChange={(e) => setProjectData({...projectData, repository: e.target.value})}
              placeholder="https://github.com/username/repo"
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <a href={projectData.repository} target="_blank" rel="noopener noreferrer" 
               className="text-blue-400 hover:text-blue-300 break-all">
              {projectData.repository || 'Not configured'}
            </a>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-green-500" />
            Deployment
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={projectData.deployment}
              onChange={(e) => setProjectData({...projectData, deployment: e.target.value})}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <a href={projectData.deployment} target="_blank" rel="noopener noreferrer"
               className="text-blue-400 hover:text-blue-300 break-all">
              {projectData.deployment || 'Not deployed'}
            </a>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Additional Notes</h3>
        {isEditing ? (
          <textarea
            value={projectData.notes}
            onChange={(e) => setProjectData({...projectData, notes: e.target.value})}
            rows={4}
            placeholder="Add any additional notes about the project..."
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <p className="text-gray-300 whitespace-pre-wrap">
            {projectData.notes || 'No additional notes'}
          </p>
        )}
      </div>
    </div>
  );
}
