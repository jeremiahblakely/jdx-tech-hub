'use client';

import { useState } from 'react';
import { blueprintTemplates } from '../../lib/constants/blueprint-templates.js';
import { 
  ChevronDown, 
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  Play,
  Pause,
  AlertCircle,
  Target,
  Calendar,
  BarChart3,
  Zap,
  Users,
  Code
} from 'lucide-react';

export default function TestBlueprintPage() {
  const [expandedPhases, setExpandedPhases] = useState(new Set(['foundation']));
  const [taskStatuses, setTaskStatuses] = useState({
    'task-1': 'completed',
    'task-2': 'in-progress', 
    'task-3': 'not-started',
    'task-4': 'not-started',
    'task-5': 'not-started',
  });

  // Get the first template for testing
  const template = blueprintTemplates[0];

  const togglePhase = (phaseName) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseName)) {
      newExpanded.delete(phaseName);
    } else {
      newExpanded.add(phaseName);
    }
    setExpandedPhases(newExpanded);
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Play className="w-4 h-4" style={{ color: 'var(--theme-accent-primary)' }} />;
      case 'blocked':
        return <AlertCircle className="w-4 h-4" style={{ color: 'var(--theme-accent-danger)' }} />;
      default:
        return <Circle className="w-4 h-4" style={{ color: 'var(--theme-text-muted)' }} />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'not-started': { bg: 'rgba(113, 121, 126, 0.2)', text: 'var(--theme-text-muted)', border: 'rgba(113, 121, 126, 0.3)' },
      'in-progress': { bg: 'rgba(255, 69, 0, 0.2)', text: 'var(--theme-accent-primary)', border: 'var(--theme-border-primary)' },
      'completed': { bg: 'rgba(34, 197, 94, 0.2)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
      'blocked': { bg: 'rgba(139, 0, 0, 0.2)', text: 'var(--theme-accent-danger)', border: 'rgba(139, 0, 0, 0.3)' }
    };

    const style = colors[status] || colors['not-started'];

    return (
      <span 
        className="px-2 py-1 text-xs rounded-full border font-medium tracking-wide"
        style={{
          backgroundColor: style.bg,
          color: style.text,
          borderColor: style.border
        }}
      >
        {status.replace('-', ' ')}
      </span>
    );
  };

  const calculatePhaseProgress = (phase) => {
    const tasks = phase.tasks || [];
    if (tasks.length === 0) return 0;
    
    let completedCount = 0;
    tasks.forEach(task => {
      const status = taskStatuses[task.id] || task.status || 'not-started';
      if (status === 'completed') completedCount++;
    });
    
    return Math.round((completedCount / tasks.length) * 100);
  };

  const calculateOverallProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    template.phases.forEach(phase => {
      totalTasks += phase.tasks.length;
      phase.tasks.forEach(task => {
        const status = taskStatuses[task.id] || task.status || 'not-started';
        if (status === 'completed') completedTasks++;
      });
    });
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div 
      className="min-h-screen p-8"
      style={{ background: 'var(--gradient-subtle)' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="premium-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center forge-flame"
                style={{ 
                  background: 'linear-gradient(135deg, var(--theme-accent-primary) 0%, var(--theme-accent-secondary) 100%)',
                  boxShadow: 'var(--theme-effects-shadow)'
                }}
              >
                <Target className="w-8 h-8" style={{ color: 'var(--theme-background-primary)' }} />
              </div>
              <div>
                <h1 className="premium-heading text-4xl tracking-wide mb-2">Blueprint System Test</h1>
                <p className="premium-subtitle text-lg">{template.name}</p>
                <p className="premium-body text-sm mt-2">{template.description}</p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="text-right">
              <div className="premium-card p-6 bg-opacity-50">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6" style={{ color: 'var(--theme-accent-primary)' }} />
                  <span className="premium-heading text-xl">{overallProgress}%</span>
                </div>
                <div 
                  className="w-48 h-2 rounded-full mb-3"
                  style={{ backgroundColor: 'var(--theme-background-elevated)' }}
                >
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${overallProgress}%`,
                      background: `linear-gradient(90deg, var(--theme-accent-secondary), var(--theme-accent-primary))`
                    }}
                  />
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="premium-body">{template.estimatedHours}h est.</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span className="premium-body">{template.phases.length} phases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {template.techStack.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 text-xs rounded-lg border"
                style={{
                  backgroundColor: 'var(--theme-background-elevated)',
                  borderColor: 'var(--theme-border-secondary)',
                  color: 'var(--theme-text-secondary)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Template Info */}
          <div className="flex items-center space-x-6 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" style={{ color: 'var(--theme-accent-primary)' }} />
              <span className="premium-body">Popularity: {template.popularity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span className="premium-body">Type: {template.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="premium-body">Template ID: {template.id}</span>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {template.phases.map((phase, phaseIdx) => {
            const isExpanded = expandedPhases.has(phase.name.toLowerCase().replace(' ', '-'));
            const progress = calculatePhaseProgress(phase);
            const completedTasks = phase.tasks.filter(task => {
              const status = taskStatuses[task.id] || task.status || 'not-started';
              return status === 'completed';
            }).length;

            return (
              <div key={phaseIdx} className="premium-card transition-all duration-300">
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.name.toLowerCase().replace(' ', '-'))}
                  className="w-full p-6 text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                        style={{ 
                          backgroundColor: 'var(--theme-accent-primary)',
                          color: 'var(--theme-background-primary)'
                        }}
                      >
                        {phase.order}
                      </div>
                      <div>
                        <h3 className="premium-heading text-xl mb-1">{phase.name}</h3>
                        <p className="premium-body text-sm">{phase.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Progress Info */}
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="premium-heading text-lg">{progress}%</span>
                          <span className="premium-body text-xs">
                            ({completedTasks}/{phase.tasks.length} tasks)
                          </span>
                        </div>
                        <div 
                          className="w-32 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--theme-background-elevated)' }}
                        >
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: progress === 100 ? '#22c55e' : 'var(--theme-accent-primary)'
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-3 mt-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span className="premium-body">{phase.estimatedHours}h</span>
                          </div>
                          {phase.dependencies && (
                            <div className="flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" />
                              <span className="premium-body">deps: {phase.dependencies.length}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                        <ChevronRight className="w-5 h-5" style={{ color: 'var(--theme-text-secondary)' }} />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Phase Tasks */}
                {isExpanded && (
                  <div 
                    className="border-t px-6 pb-6"
                    style={{ borderColor: 'var(--theme-border-secondary)' }}
                  >
                    <div className="pt-6 space-y-4">
                      {phase.tasks.map((task, taskIdx) => {
                        const taskStatus = taskStatuses[task.id] || task.status || 'not-started';
                        
                        return (
                          <div 
                            key={taskIdx} 
                            className="premium-card p-4 bg-opacity-50 hover:-translate-y-1 transition-transform duration-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                {getTaskStatusIcon(taskStatus)}
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="premium-heading text-lg">{task.title}</h4>
                                    {getStatusBadge(taskStatus)}
                                  </div>
                                  
                                  {task.description && (
                                    <p className="premium-body text-sm mb-3">{task.description}</p>
                                  )}

                                  {/* Task Details */}
                                  <div className="flex items-center space-x-4 text-xs">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span className="premium-body">{task.estimatedMinutes}min</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Target className="w-3 h-3" />
                                      <span className="premium-body">{task.priority}</span>
                                    </div>
                                    {task.checklist && (
                                      <div className="flex items-center space-x-1">
                                        <CheckCircle className="w-3 h-3" />
                                        <span className="premium-body">{task.checklist.length} items</span>
                                      </div>
                                    )}
                                    {task.credentials && (
                                      <div className="flex items-center space-x-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span className="premium-body">{task.credentials.length} creds</span>
                                      </div>
                                    )}
                                    {task.endpoints && (
                                      <div className="flex items-center space-x-1">
                                        <Code className="w-3 h-3" />
                                        <span className="premium-body">{task.endpoints.length} APIs</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}