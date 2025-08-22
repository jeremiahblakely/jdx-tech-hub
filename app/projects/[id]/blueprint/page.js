'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { jdxTechHubBlueprint } from '../../../../lib/constants/jdx-tech-hub-blueprint.js';
import { blueprintTemplates } from '../../../../lib/constants/blueprint-templates.js';
import { 
  Target,
  Clock,
  AlertCircle,
  Play,
  Copy,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Database,
  Code,
  TrendingUp,
  ExternalLink,
  Timer,
  Pause,
  FileText,
  Brain,
  Archive,
  BarChart3,
  GitBranch,
  Lightbulb,
  Calendar,
  Settings,
  Plus,
  Save,
  RefreshCw,
  Edit3,
  Trash2,
  Download,
  Upload,
  X,
  Check
} from 'lucide-react';

export default function ProjectBlueprint() {
  const params = useParams();
  const projectId = params.id;

  // Core state management
  const [taskStates, setTaskStates] = useState({});
  const [focusTask, setFocusTask] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [decisionLog, setDecisionLog] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [blueprint, setBlueprint] = useState(null);
  const [credentials, setCredentials] = useState({
    awsRegion: 'us-east-1',
    cognitoPoolId: 'us-east-1_2ZIzhhjUY',
    cognitoClientId: '7qi3ollo7i0uj6r07tcuk2r93i',
    dynamoTable: 'jdx-projects',
    githubRepo: `jdxtech/${projectId}`,
    vercelUrl: `${projectId}.vercel.app`
  });
  
  // UI state
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeSpent, setTimeSpent] = useState({});
  const [showAddDecision, setShowAddDecision] = useState(false);
  const [editingCredential, setEditingCredential] = useState(null);
  const [newDecision, setNewDecision] = useState({ decision: '', reason: '', impact: '' });
  const [toasts, setToasts] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Toast notifications
  const showToast = (message, type = 'success') => {
    const toast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 3000);
  };

  // Copy to clipboard with feedback
  const copyToClipboard = async (text, buttonId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [buttonId]: true });
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [buttonId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy', 'error');
    }
  };

  // Manual save function (called by save button)
  const manualSave = async () => {
    try {
      const blueprintData = {
        phases: blueprint?.phases || [],
        currentFocus: focusTask?.id || null,
        progress: getStats().completionRate,
        decisions: decisionLog,
        credentials,
        timeSpent,
        taskStates,
        sessions: sessions.slice(-10), // Keep last 10 sessions
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`/api/projects`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: projectId,
          blueprint: blueprintData
        })
      });

      if (response.ok) {
        showToast('Blueprint saved to database', 'success');
      } else {
        showToast('Failed to save blueprint', 'error');
      }
    } catch (err) {
      console.error('Failed to save blueprint:', err);
      showToast('Failed to save blueprint', 'error');
    }
  };

  // Load blueprint from database
  const loadBlueprintFromDatabase = async () => {
    try {
      const response = await fetch(`/api/projects?id=${projectId}`);
      if (response.ok) {
        const project = await response.json();
        
        if (project.blueprint) {
          const blueprintData = project.blueprint;
          setTaskStates(blueprintData.taskStates || {});
          setDecisionLog(blueprintData.decisions || []);
          setCredentials(prev => ({ ...prev, ...blueprintData.credentials }));
          setSessions(blueprintData.sessions || []);
          setTimeSpent(blueprintData.timeSpent || {});
          
          // Set blueprint - use saved phases or default template
          setBlueprint({
            ...jdxTechHubBlueprint,
            id: `${projectId}-blueprint`,
            name: `${project.name} Blueprint`,
            phases: blueprintData.phases.length > 0 ? blueprintData.phases : jdxTechHubBlueprint.phases
          });
          
          showToast('Blueprint loaded from database', 'success');
        } else {
          // Initialize with default template
          initializeDefaultBlueprint(project);
        }
      } else {
        initializeDefaultBlueprint();
      }
    } catch (err) {
      console.error('Failed to load blueprint:', err);
      initializeDefaultBlueprint();
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with default template
  const initializeDefaultBlueprint = (project = null) => {
    setBlueprint({
      ...jdxTechHubBlueprint,
      id: `${projectId}-blueprint`,
      name: project ? `${project.name} Blueprint` : `${projectId} Blueprint`,
      phases: jdxTechHubBlueprint.phases
    });

    // Add default decisions if none exist
    if (decisionLog.length === 0) {
      setDecisionLog([
        {
          id: '1',
          date: new Date().toISOString().split('T')[0],
          decision: 'Initialize project blueprint',
          reason: 'Need structured development approach with progress tracking',
          impact: 'Will guide development phases and track completion',
          relatedTask: 'Project Setup'
        }
      ]);
    }
  };

  // Auto-save to database with debouncing
  const saveBlueprintToDatabase = async () => {
    if (isLoading || !blueprint) return;
    
    try {
      const blueprintData = {
        phases: blueprint?.phases || [],
        currentFocus: focusTask?.id || null,
        progress: getStats().completionRate,
        decisions: decisionLog,
        credentials,
        timeSpent,
        taskStates,
        sessions: sessions.slice(-10), // Keep last 10 sessions
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`/api/projects`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: projectId,
          blueprint: blueprintData
        })
      });

      if (response.ok) {
        // Optional: show success indicator
        console.log('Blueprint auto-saved');
      } else {
        console.error('Failed to save blueprint');
      }
    } catch (err) {
      console.error('Failed to save blueprint:', err);
    }
  };

  // Auto-save when state changes (debounced)
  useEffect(() => {
    if (!isLoading && blueprint) {
      const timer = setTimeout(saveBlueprintToDatabase, 2000);
      return () => clearTimeout(timer);
    }
  }, [taskStates, decisionLog, credentials, timeSpent, isLoading]);

  // Initialize on mount
  useEffect(() => {
    loadBlueprintFromDatabase();
    initializeSession();
  }, [projectId]);

  // Calculate focus when data changes
  useEffect(() => {
    if (blueprint) {
      calculateCurrentFocus();
    }
  }, [taskStates, blueprint]);

  // Initialize session tracking
  const initializeSession = () => {
    const newSession = {
      id: Date.now(),
      projectId,
      startTime: new Date().toISOString(),
      tasksCompleted: [],
      decisionsAdded: [],
      timeTracked: 0
    };
    setCurrentSession(newSession);
    setSessions(prev => [...prev, newSession]);
  };

  // Task management
  const toggleTask = (taskId, checklistIndex) => {
    const newStates = { ...taskStates };
    if (!newStates[taskId]) {
      newStates[taskId] = { checklist: {}, timeSpent: 0, completed: false };
    }
    
    newStates[taskId].checklist[checklistIndex] = !newStates[taskId].checklist[checklistIndex];
    
    // Check if task is complete
    const task = getTaskById(taskId);
    if (task && task.checklist) {
      const completedItems = Object.values(newStates[taskId].checklist).filter(Boolean).length;
      const totalItems = task.checklist.length;
      newStates[taskId].completed = completedItems === totalItems;
      
      if (newStates[taskId].completed && currentSession) {
        setCurrentSession(prev => ({
          ...prev,
          tasksCompleted: [...prev.tasksCompleted, taskId]
        }));
        showToast(`Task completed: ${task.title}`, 'success');
      }
    }
    
    setTaskStates(newStates);
  };

  const getTaskById = (taskId) => {
    if (!blueprint) return null;
    return blueprint.phases
      .flatMap(phase => phase.tasks)
      .find(task => task.id === taskId);
  };

  const isTaskComplete = (taskId) => {
    return taskStates[taskId]?.completed || false;
  };

  // Timer functionality
  const startTimer = (taskId) => {
    if (activeTimer) {
      stopTimer();
    }
    
    setActiveTimer({
      taskId,
      startTime: Date.now(),
      interval: setInterval(() => {
        setTimeSpent(prev => ({
          ...prev,
          [taskId]: (prev[taskId] || 0) + 1
        }));
      }, 1000)
    });
    showToast('Timer started', 'success');
  };

  const stopTimer = () => {
    if (activeTimer) {
      clearInterval(activeTimer.interval);
      const elapsed = Math.floor((Date.now() - activeTimer.startTime) / 1000);
      
      setTimeSpent(prev => ({
        ...prev,
        [activeTimer.taskId]: (prev[activeTimer.taskId] || 0) + elapsed
      }));
      
      if (currentSession) {
        setCurrentSession(prev => ({
          ...prev,
          timeTracked: prev.timeTracked + elapsed
        }));
      }
      
      showToast(`Timer stopped. Total: ${formatTime(timeSpent[activeTimer.taskId] + elapsed)}`, 'success');
      setActiveTimer(null);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // Smart next action logic
  const getNextAction = () => {
    if (!blueprint) return { task: null, reason: 'Loading...', type: 'loading', priority: 'MEDIUM' };
    
    // Check for critical blockers first
    const criticalTasks = blueprint.phases
      .flatMap(p => p.tasks)
      .filter(t => t.priority === 'critical' && !isTaskComplete(t.id));
    
    if (criticalTasks.length > 0) {
      return {
        task: criticalTasks[0],
        reason: 'Critical blocker - must fix first',
        type: 'blocker',
        priority: 'CRITICAL'
      };
    }
    
    // Check for in-progress tasks
    const inProgressTasks = blueprint.phases
      .flatMap(p => p.tasks)
      .filter(t => t.status === 'in-progress' && !isTaskComplete(t.id));
    
    if (inProgressTasks.length > 0) {
      return {
        task: inProgressTasks[0],
        reason: 'Continue current work',
        type: 'continue',
        priority: 'HIGH'
      };
    }
    
    // Find next available task
    const availableTasks = blueprint.phases
      .flatMap(p => p.tasks)
      .filter(t => {
        if (isTaskComplete(t.id)) return false;
        return true;
      });
    
    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    availableTasks.sort((a, b) => 
      (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
    );
    
    return {
      task: availableTasks[0],
      reason: 'Next in priority order',
      type: 'next',
      priority: availableTasks[0]?.priority?.toUpperCase() || 'MEDIUM'
    };
  };

  const calculateCurrentFocus = () => {
    const nextAction = getNextAction();
    if (nextAction.task) {
      setFocusTask({
        ...nextAction.task,
        priority: nextAction.priority,
        why: nextAction.reason,
        timeEstimate: nextAction.task.timeTracking?.estimatedMinutes ? 
          `${nextAction.task.timeTracking.estimatedMinutes} minutes` : '30 minutes',
        action: `Work on ${nextAction.task.title}`,
        steps: nextAction.task.checklist?.map(item => ({
          task: item.label,
          done: taskStates[nextAction.task.id]?.checklist?.[nextAction.task.checklist?.indexOf(item)] || false
        })) || []
      });
    }
  };

  // Decision management
  const addDecision = () => {
    if (!newDecision.decision.trim() || !newDecision.reason.trim()) {
      showToast('Please fill in decision and reason', 'error');
      return;
    }
    
    const decision = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newDecision,
      relatedTask: focusTask?.title || 'General',
      projectId
    };
    
    setDecisionLog(prev => [...prev, decision]);
    setNewDecision({ decision: '', reason: '', impact: '' });
    setShowAddDecision(false);
    
    if (currentSession) {
      setCurrentSession(prev => ({
        ...prev,
        decisionsAdded: [...prev.decisionsAdded, decision.id]
      }));
    }
    
    showToast('Decision logged successfully', 'success');
  };

  const deleteDecision = (id) => {
    setDecisionLog(prev => prev.filter(d => d.id !== id));
    showToast('Decision deleted', 'success');
  };

  // AI Template generation
  const generateAITemplate = (type) => {
    if (!blueprint) return 'Loading blueprint...';

    const lastCompleted = blueprint.phases
      .flatMap(p => p.tasks)
      .filter(t => isTaskComplete(t.id))
      .slice(-1)[0];
    
    const completionPercentage = Math.round(
      (blueprint.phases.filter(p => p.status === 'completed').length / 
       blueprint.phases.length) * 100
    );
    
    const templates = {
      continue: `🚀 CONTINUING ${projectId.toUpperCase()} PROJECT WORK

🔧 TECH STACK:
- Next.js 14 App Router
- AWS Amplify Auth (Cognito Pool: ${credentials.cognitoPoolId})
- DynamoDB (Table: ${credentials.dynamoTable})
- Carbon Forge theme system
- Region: ${credentials.awsRegion}

✅ LAST COMPLETED: ${lastCompleted?.title || 'Initial setup'}
🎯 CURRENT FOCUS: ${focusTask?.title || 'Determining next task...'}
⏱️ TIME SPENT: ${focusTask ? formatTime(timeSpent[focusTask.id] || 0) : '0s'}
📊 PROGRESS: ${completionPercentage}% complete

🎯 SPECIFIC TASK: ${focusTask?.steps?.find(s => !s.done)?.task || 'Review current state'}

CONTEXT: ${focusTask?.why || `Working on ${projectId} project development`}

Please help me: [ADD YOUR REQUEST HERE]`,

      debug: `🐛 DEBUG ${projectId.toUpperCase()} ERROR

📄 ERROR MESSAGE: [PASTE ERROR HERE]

🎯 CURRENT TASK: ${focusTask?.title || 'General development'}
📁 LIKELY FILES: ${focusTask?.checklist?.[0]?.filesModified?.[0]?.path || '/app/[add-file-path]'}

🔧 TECH CONTEXT:
- Project: ${projectId}
- Next.js 14 with App Router
- AWS Amplify (Pool: ${credentials.cognitoPoolId})
- DynamoDB (Table: ${credentials.dynamoTable})
- Region: ${credentials.awsRegion}
- Theme: Carbon Forge

🤔 WHAT I WAS DOING: ${focusTask?.action || 'Working on features'}
⏱️ TIME SPENT: ${focusTask ? formatTime(timeSpent[focusTask.id] || 0) : '0s'}

Please help debug this issue and provide a solution.`,

      feature: `🚀 NEW FEATURE REQUEST - ${projectId.toUpperCase()}

🎯 FEATURE: [DESCRIBE FEATURE HERE]

📋 CURRENT STATUS:
${blueprint.phases.map(phase => 
  `- ${phase.name}: ${phase.status === 'completed' ? '✅' : phase.status === 'in-progress' ? '🚧' : '⬜'} ${phase.status}`
).join('\n')}

🔧 AVAILABLE TOOLS:
- DynamoDB operations (table: ${credentials.dynamoTable})
- Amplify Auth (getCurrentUser, signIn, signOut)
- Carbon Forge theming system
- Premium UI components

🎨 DESIGN SYSTEM: Carbon Forge with premium-card, premium-button, premium-heading classes

📊 PROGRESS: ${completionPercentage}% complete
🎯 CURRENT FOCUS: ${focusTask?.title || 'Various improvements'}

Please help me implement this feature following the existing patterns and architecture.`,

      question: `❓ ${projectId.toUpperCase()} PROJECT QUESTION

🤔 MY QUESTION: [ADD YOUR QUESTION HERE]

📊 PROJECT CONTEXT:
- Project: ${projectId}
- Phase: ${blueprint.phases.find(p => p.status === 'in-progress')?.name || 'Development'}
- Current Task: ${focusTask?.title || 'Various improvements'}
- Stack: Next.js 14 + AWS (Amplify, DynamoDB)
- Theme: Carbon Forge custom properties
- Progress: ${completionPercentage}% complete

🔧 CREDENTIALS:
- AWS Region: ${credentials.awsRegion}
- DynamoDB Table: ${credentials.dynamoTable}
- Cognito Pool: ${credentials.cognitoPoolId}

💡 WHAT I'M TRYING TO ACHIEVE: ${focusTask?.why || `Building ${projectId} project effectively`}
⏱️ SESSION TIME: ${currentSession ? formatTime(currentSession.timeTracked) : '0s'}

Please provide guidance on the best approach.`
    };
    
    return templates[type] || templates.continue;
  };

  // Export/Import functionality
  const exportBlueprint = () => {
    const data = {
      projectId,
      projectName: blueprint?.name,
      templateId: blueprint?.templateId,
      phases: blueprint?.phases || [],
      taskStates,
      decisionLog,
      credentials,
      sessions: sessions.slice(-10), // Last 10 sessions
      timeSpent,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectId}-blueprint-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Blueprint exported successfully', 'success');
  };

  const importBlueprint = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate imported data
        if (!data.phases || !Array.isArray(data.phases)) {
          showToast('Invalid blueprint file format', 'error');
          return;
        }
        
        setBlueprint(prev => ({
          ...prev,
          phases: data.phases
        }));
        setTaskStates(data.taskStates || {});
        setDecisionLog(data.decisionLog || []);
        setCredentials(prev => ({ ...prev, ...data.credentials }));
        setSessions(data.sessions || []);
        setTimeSpent(data.timeSpent || {});
        
        showToast('Blueprint imported successfully!', 'success');
        calculateCurrentFocus();
      } catch (err) {
        showToast('Failed to import blueprint', 'error');
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);
  };

  // Calculate statistics
  const getStats = () => {
    if (!blueprint) return { totalTasks: 0, completedTasks: 0, completionRate: 0, totalTime: 0, sessionsToday: 0, averageTaskTime: 0 };

    const totalTasks = blueprint.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
    const completedTasks = Object.values(taskStates).filter(state => state.completed).length;
    const totalTime = Object.values(timeSpent).reduce((sum, time) => sum + time, 0);
    const sessionsToday = sessions.filter(s => 
      new Date(s.startTime).toDateString() === new Date().toDateString()
    ).length;
    
    return {
      totalTasks,
      completedTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalTime,
      sessionsToday,
      averageTaskTime: completedTasks > 0 ? Math.round(totalTime / completedTasks) : 0
    };
  };

  // Analytics calculations
  const getAnalytics = () => {
    const stats = getStats();
    const totalPhases = blueprint?.phases?.length || 0;
    const completedPhases = blueprint?.phases?.filter(phase => {
      const phaseTasks = phase.tasks.filter(task => isTaskComplete(task.id));
      return phaseTasks.length === phase.tasks.length && phase.tasks.length > 0;
    }).length || 0;

    const tasksPerDay = sessions.length > 0 ? 
      stats.completedTasks / Math.max(sessions.length, 1) : 0;

    const estimatedTotalHours = blueprint?.phases?.reduce((sum, phase) => 
      sum + (phase.estimatedHours || 0), 0) || 0;

    const remainingTasks = stats.totalTasks - stats.completedTasks;
    const estimatedCompletion = tasksPerDay > 0 ? 
      Math.ceil(remainingTasks / tasksPerDay) : null;

    return {
      completedPhases,
      totalPhases,
      phaseCompletionRate: totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0,
      tasksPerDay: Math.round(tasksPerDay * 10) / 10,
      estimatedTotalHours,
      actualHours: Math.round(stats.totalTime / 3600 * 10) / 10,
      timeEfficiency: estimatedTotalHours > 0 ? 
        Math.round((estimatedTotalHours * 3600 / Math.max(stats.totalTime, 1)) * 100) : 100,
      estimatedDaysToComplete: estimatedCompletion,
      mostTimeSpentTask: Object.entries(timeSpent).reduce((max, [taskId, time]) => 
        time > max.time ? { taskId, time } : max, { taskId: null, time: 0 })
    };
  };

  // Quick Actions
  const markPhaseComplete = (phaseId) => {
    const phase = blueprint?.phases?.find(p => p.id === phaseId);
    if (!phase) return;

    const newTaskStates = { ...taskStates };
    phase.tasks.forEach(task => {
      newTaskStates[task.id] = {
        ...newTaskStates[task.id],
        completed: true,
        checklist: task.checklist?.reduce((acc, _, idx) => {
          acc[idx] = true;
          return acc;
        }, {}) || {}
      };
    });

    setTaskStates(newTaskStates);
    showToast(`Phase "${phase.name}" marked as complete!`, 'success');
    calculateCurrentFocus();
  };

  const resetBlueprint = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setTaskStates({});
      setTimeSpent({});
      setSessions([]);
      setDecisionLog([{
        id: '1',
        date: new Date().toISOString().split('T')[0],
        decision: 'Reset project blueprint',
        reason: 'Starting fresh with clean slate',
        impact: 'All previous progress and decisions cleared',
        relatedTask: 'Project Reset'
      }]);
      showToast('Blueprint reset successfully', 'success');
      calculateCurrentFocus();
    }
  };

  const cloneFromTemplate = (templateKey) => {
    const template = blueprintTemplates[templateKey];
    if (!template) return;

    setBlueprint(prev => ({
      ...prev,
      phases: template.phases,
      name: `${prev?.name} (${template.name} Template)`
    }));
    
    showToast(`Cloned from ${template.name} template`, 'success');
    calculateCurrentFocus();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: 'var(--gradient-subtle)' }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map(toast => (
            <div key={toast.id} className={`
              p-4 rounded-lg animate-slide-in shadow-lg
              ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
            `}>
              {toast.message}
            </div>
          ))}
        </div>
        
        {/* Project Header */}
        <div className="premium-card p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                }}
              >
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="premium-heading text-2xl">{blueprint?.name || `${projectId} Blueprint`}</h1>
                <p className="premium-body opacity-70">Project development blueprint and progress tracking</p>
              </div>
            </div>
            <button 
              onClick={manualSave}
              className="premium-button primary px-4 py-2 text-sm flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Blueprint</span>
            </button>
          </div>
        </div>
        
        {/* Session & Stats Header */}
        <div className="premium-card p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Archive className="w-6 h-6 text-blue-400" />
              <div>
                <span className="premium-heading text-lg">Session #{sessions.length}</span>
                <div className="flex items-center space-x-6 mt-2 text-sm">
                  <span className="premium-body">
                    📊 {stats.completedTasks}/{stats.totalTasks} tasks ({stats.completionRate}%)
                  </span>
                  <span className="premium-body">
                    ⏱️ {formatTime(stats.totalTime)} total
                  </span>
                  <span className="premium-body">
                    🎯 {stats.sessionsToday} sessions today
                  </span>
                  <span className="premium-body">
                    ⚡ Avg {formatTime(stats.averageTaskTime)}/task
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept=".json"
                onChange={(e) => e.target.files[0] && importBlueprint(e.target.files[0])}
                className="hidden"
                id="import-blueprint"
              />
              <label htmlFor="import-blueprint" className="premium-button secondary px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </label>
              <button 
                onClick={exportBlueprint}
                className="premium-button secondary px-4 py-2 text-sm flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button 
                onClick={() => copyToClipboard(generateAITemplate('continue'), 'session-context')}
                className={`premium-button ${copiedStates['session-context'] ? 'primary' : 'secondary'} px-4 py-2 text-sm flex items-center space-x-2`}
              >
                <Copy className="w-4 h-4" />
                <span>{copiedStates['session-context'] ? 'Copied!' : 'Copy Context'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {blueprint && (
          <div className="premium-card p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-green-400" />
                <h2 className="premium-heading text-xl">Analytics & Quick Actions</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={resetBlueprint}
                  className="premium-button secondary px-3 py-1 text-sm hover:bg-red-600"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {(() => {
              const analytics = getAnalytics();
              return (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  
                  {/* Phase Progress */}
                  <div className="premium-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="premium-body text-sm opacity-70">Phase Progress</span>
                      <span className="premium-heading text-lg">{analytics.phaseCompletionRate}%</span>
                    </div>
                    <div className="text-xs opacity-60">
                      {analytics.completedPhases}/{analytics.totalPhases} phases done
                    </div>
                    <div className="w-full h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${analytics.phaseCompletionRate}%`,
                          backgroundColor: '#22c55e'
                        }}
                      />
                    </div>
                  </div>

                  {/* Velocity */}
                  <div className="premium-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="premium-body text-sm opacity-70">Daily Velocity</span>
                      <span className="premium-heading text-lg">{analytics.tasksPerDay}</span>
                    </div>
                    <div className="text-xs opacity-60">tasks per session</div>
                    {analytics.estimatedDaysToComplete && (
                      <div className="text-xs mt-1 text-green-400">
                        ~{analytics.estimatedDaysToComplete} sessions to finish
                      </div>
                    )}
                  </div>

                  {/* Time Efficiency */}
                  <div className="premium-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="premium-body text-sm opacity-70">Time vs Estimate</span>
                      <span className="premium-heading text-lg">{analytics.timeEfficiency}%</span>
                    </div>
                    <div className="text-xs opacity-60">
                      {analytics.actualHours}h / {analytics.estimatedTotalHours}h
                    </div>
                    <div className={`text-xs mt-1 ${analytics.timeEfficiency > 100 ? 'text-green-400' : 'text-orange-400'}`}>
                      {analytics.timeEfficiency > 100 ? 'Ahead of schedule' : 'On track'}
                    </div>
                  </div>

                  {/* Top Time Consumer */}
                  <div className="premium-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="premium-body text-sm opacity-70">Most Time Spent</span>
                      <span className="premium-heading text-sm">
                        {formatTime(analytics.mostTimeSpentTask.time)}
                      </span>
                    </div>
                    <div className="text-xs opacity-60">
                      {analytics.mostTimeSpentTask.taskId ? 
                        getTaskById(analytics.mostTimeSpentTask.taskId)?.title?.substring(0, 20) + '...' || 'Unknown Task' :
                        'No tasks yet'
                      }
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick Actions */}
            <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--theme-border-secondary)' }}>
              <h3 className="premium-heading text-sm mb-3">Quick Actions</h3>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {blueprint.phases.map(phase => {
                  const completed = phase.tasks.filter(t => isTaskComplete(t.id)).length;
                  const total = phase.tasks.length;
                  const isComplete = completed === total && total > 0;
                  
                  return (
                    <button
                      key={phase.id}
                      onClick={() => !isComplete && markPhaseComplete(phase.id)}
                      disabled={isComplete}
                      className={`premium-button text-xs px-3 py-1 ${
                        isComplete ? 'secondary opacity-50 cursor-not-allowed' : 'secondary hover:bg-green-600'
                      }`}
                    >
                      {isComplete ? '✅' : '📋'} Complete {phase.name}
                    </button>
                  );
                })}
                
                <div className="h-6 w-px bg-gray-600 mx-2" />
                
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      cloneFromTemplate(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="premium-button text-xs px-3 py-1 bg-transparent border border-gray-600"
                  style={{ 
                    backgroundColor: 'var(--theme-background-elevated)',
                    color: 'var(--theme-text-primary)'
                  }}
                >
                  <option value="">Clone from Template...</option>
                  {Object.entries(blueprintTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* FOCUS MODE */}
        {focusTask && (
          <div className="premium-card p-8 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: focusTask.priority === 'CRITICAL' ? 'linear-gradient(135deg, #dc2626, #991b1b)' :
                                focusTask.priority === 'HIGH' ? 'linear-gradient(135deg, #ea580c, #c2410c)' :
                                'linear-gradient(135deg, var(--theme-accent-primary), var(--theme-accent-secondary))'
                  }}
                >
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="premium-heading text-3xl">FOCUS: {focusTask.title}</h1>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      focusTask.priority === 'CRITICAL' ? 'bg-red-900/50 text-red-400' :
                      focusTask.priority === 'HIGH' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-blue-900/50 text-blue-400'
                    }`}>
                      {focusTask.priority}
                    </span>
                  </div>
                  <p className="premium-body text-lg mb-2">{focusTask.why}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="premium-body">{focusTask.timeEstimate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span className="premium-body">
                        {formatTime(timeSpent[focusTask.id] || 0)} spent
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span className="premium-body">{focusTask.action}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => activeTimer?.taskId === focusTask.id ? stopTimer() : startTimer(focusTask.id)}
                  className={`premium-button ${activeTimer?.taskId === focusTask.id ? 'danger' : 'secondary'} px-4 py-2 flex items-center space-x-2`}
                >
                  {activeTimer?.taskId === focusTask.id ? <Pause className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
                  <span>{activeTimer?.taskId === focusTask.id ? 'Stop Timer' : 'Start Timer'}</span>
                </button>
                <button 
                  onClick={() => copyToClipboard(generateAITemplate('continue'), 'focus-template')}
                  className={`premium-button ${copiedStates['focus-template'] ? 'primary' : 'secondary'} px-6 py-3 flex items-center space-x-2`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedStates['focus-template'] ? 'Copied!' : 'Copy AI Template'}</span>
                </button>
              </div>
            </div>
            
            {/* Interactive Action Steps */}
            <div className="space-y-3">
              <h3 className="premium-heading text-lg">Action Steps:</h3>
              {focusTask.steps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-lg" 
                     style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                  <input
                    type="checkbox"
                    checked={step.done}
                    onChange={() => {
                      toggleTask(focusTask.id, idx);
                      if (!step.done) {
                        showToast(`Step completed: ${step.task.substring(0, 30)}...`, 'success');
                      }
                    }}
                    className="w-5 h-5 rounded border-2 border-gray-600 bg-gray-700 checked:bg-green-600 checked:border-green-600 cursor-pointer"
                  />
                  <span className={`premium-body flex-1 ${step.done ? 'line-through opacity-60' : ''}`}>
                    {step.task}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs opacity-60">
                      {formatTime(timeSpent[`${focusTask.id}-step-${idx}`] || 0)}
                    </span>
                    {!step.done && (
                      <button 
                        onClick={() => startTimer(`${focusTask.id}-step-${idx}`)}
                        className="premium-button secondary px-3 py-1 text-sm"
                      >
                        Work On This
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AI Context Vault */}
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6" style={{ color: 'var(--theme-accent-primary)' }} />
                <h2 className="premium-heading text-xl">AI Context Vault</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(generateAITemplate('continue'), 'context-vault')}
                className={`premium-button ${copiedStates['context-vault'] ? 'primary' : 'secondary'} px-3 py-1 text-sm`}
              >
                {copiedStates['context-vault'] ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            
            <div className="space-y-3">
              {Object.entries(credentials).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                  <span className="premium-body text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="flex items-center space-x-2">
                    {editingCredential === key ? (
                      <>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setCredentials(prev => ({ ...prev, [key]: e.target.value }))}
                          className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: 'var(--theme-background-primary)' }}
                        />
                        <button
                          onClick={() => {
                            setEditingCredential(null);
                            showToast('Credential updated', 'success');
                          }}
                          className="premium-button primary px-2 py-1 text-xs"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="premium-body text-xs font-mono opacity-70 max-w-32 truncate">
                          {value}
                        </span>
                        <button
                          onClick={() => setEditingCredential(key)}
                          className="premium-button secondary px-2 py-1 text-xs"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(value, key)}
                          className={`premium-button ${copiedStates[key] ? 'primary' : 'secondary'} px-2 py-1 text-xs`}
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Templates */}
          <div className="premium-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-6 h-6" style={{ color: 'var(--theme-accent-primary)' }} />
              <h2 className="premium-heading text-xl">AI Templates</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'continue', label: 'Continue Work', icon: <Play className="w-4 h-4" /> },
                { key: 'debug', label: 'Debug Error', icon: <AlertCircle className="w-4 h-4" /> },
                { key: 'feature', label: 'New Feature', icon: <Plus className="w-4 h-4" /> },
                { key: 'question', label: 'Ask Question', icon: <Brain className="w-4 h-4" /> }
              ].map(template => (
                <button
                  key={template.key}
                  onClick={() => copyToClipboard(generateAITemplate(template.key), template.key)}
                  className={`premium-card p-4 hover:-translate-y-1 transition-transform duration-200 ${
                    copiedStates[template.key] ? 'border-2 border-green-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {template.icon}
                    <span className="premium-heading text-sm">{template.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Copy className="w-3 h-3 opacity-60" />
                    {copiedStates[template.key] && <Check className="w-4 h-4 text-green-500" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Decision Log */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Lightbulb className="w-6 h-6" style={{ color: '#ca8a04' }} />
              <h2 className="premium-heading text-xl">Decision Log</h2>
              <span className="premium-body text-sm opacity-60">Track WHY you built things this way</span>
            </div>
            <button 
              onClick={() => setShowAddDecision(!showAddDecision)}
              className="premium-button primary px-4 py-2 text-sm flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Decision</span>
            </button>
          </div>
          
          {/* Add Decision Form */}
          {showAddDecision && (
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
              <div className="grid grid-cols-1 gap-3">
                <input 
                  placeholder="What decision did you make?"
                  value={newDecision.decision}
                  onChange={(e) => setNewDecision({...newDecision, decision: e.target.value})}
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-primary)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)'
                  }}
                />
                <input 
                  placeholder="Why did you make this decision?"
                  value={newDecision.reason}
                  onChange={(e) => setNewDecision({...newDecision, reason: e.target.value})}
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-primary)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)'
                  }}
                />
                <input 
                  placeholder="What impact will this have?"
                  value={newDecision.impact}
                  onChange={(e) => setNewDecision({...newDecision, impact: e.target.value})}
                  className="w-full p-3 rounded"
                  style={{ 
                    backgroundColor: 'var(--theme-background-primary)',
                    borderColor: 'var(--theme-border-secondary)',
                    color: 'var(--theme-text-primary)'
                  }}
                />
                <div className="flex items-center space-x-3">
                  <button onClick={addDecision} className="premium-button primary px-4 py-2 flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Decision</span>
                  </button>
                  <button 
                    onClick={() => setShowAddDecision(false)} 
                    className="premium-button secondary px-4 py-2 flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Decision List */}
          <div className="space-y-4">
            {decisionLog.slice(-5).reverse().map((decision) => (
              <div key={decision.id} className="p-4 rounded-lg border-l-4 border-yellow-500" 
                   style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="premium-heading text-sm flex-1">{decision.decision}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-xs opacity-60">
                      <Calendar className="w-3 h-3" />
                      <span>{decision.date}</span>
                      <span>•</span>
                      <span>{decision.relatedTask}</span>
                    </div>
                    <button
                      onClick={() => deleteDecision(decision.id)}
                      className="premium-button secondary px-2 py-1 text-xs hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="premium-body text-sm mb-2"><strong>Why:</strong> {decision.reason}</p>
                <p className="premium-body text-sm opacity-80"><strong>Impact:</strong> {decision.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Progress Overview */}
        {blueprint && (
          <div className="premium-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6" style={{ color: '#22c55e' }} />
              <h2 className="premium-heading text-xl">Interactive Progress</h2>
              <button 
                onClick={calculateCurrentFocus}
                className="premium-button secondary px-3 py-1 text-sm flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {blueprint.phases.map(phase => {
                const completed = phase.tasks.filter(t => isTaskComplete(t.id)).length;
                const total = phase.tasks.length;
                const progress = Math.round((completed / total) * 100);
                
                return (
                  <div key={phase.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="premium-heading text-lg">{phase.name}</h3>
                      <span className="premium-body">{completed}/{total} ({progress}%)</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 rounded-full mb-4" style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                      <div 
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: progress === 100 ? '#22c55e' : 'var(--theme-accent-primary)'
                        }}
                      />
                    </div>
                    
                    {/* Interactive Task List */}
                    <div className="space-y-2">
                      {phase.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-opacity-80 transition-colors"
                             style={{ backgroundColor: 'var(--theme-background-elevated)' }}>
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isTaskComplete(task.id)}
                              onChange={() => {
                                // Toggle task completion
                                setTaskStates(prev => ({
                                  ...prev,
                                  [task.id]: {
                                    ...prev[task.id],
                                    completed: !isTaskComplete(task.id)
                                  }
                                }));
                                calculateCurrentFocus();
                              }}
                              className="w-4 h-4 rounded cursor-pointer"
                            />
                            <span className={`premium-body ${isTaskComplete(task.id) ? 'line-through opacity-60' : ''}`}>
                              {task.title}
                            </span>
                            <span className="text-xs opacity-60">
                              ({formatTime(timeSpent[task.id] || 0)})
                            </span>
                          </div>
                          {!isTaskComplete(task.id) && (
                            <button 
                              onClick={() => startTimer(task.id)}
                              className="premium-button secondary px-3 py-1 text-xs"
                            >
                              Work On This
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}