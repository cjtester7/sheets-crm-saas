/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskTracker from './components/TaskTracker';
import VersionTracker from './components/VersionTracker';
import BugTracker from './components/BugTracker';
import PortfolioDocs from './components/PortfolioDocs';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';
import { Task, VersionedFile, BugLog } from './types';
import { DEFAULT_TASKS, DEFAULT_FILES, DEFAULT_BUGS, BOB_DIAMOND_TASKS, BOB_DIAMOND_FILES, BOB_DIAMOND_BUGS } from './data';
import { Sparkles, Calendar, CheckSquare, Bug, Award, BookOpen, AlertCircle, RefreshCcw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('roadmap');

  const [activeProject, setActiveProject] = useState<'default' | 'bob_diamond'>(() => {
    return (localStorage.getItem('portfolio_active_project') as any) || 'default';
  });

  // Suggested project names in github & netlify conditionally mapped
  const githubName = activeProject === 'bob_diamond' ? 'bob-diamond-overages-rag' : 'sheets-crm-saas-evolution';
  const netlifyName = activeProject === 'bob_diamond' ? 'ask-bob-overages-crm' : 'saas-crm-evolution-tracker';

  // Persistence States
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('portfolio_tasks');
    return saved ? JSON.parse(saved) : (activeProject === 'bob_diamond' ? BOB_DIAMOND_TASKS : DEFAULT_TASKS);
  });

  const [files, setFiles] = useState<VersionedFile[]>(() => {
    const saved = localStorage.getItem('portfolio_files');
    return saved ? JSON.parse(saved) : (activeProject === 'bob_diamond' ? BOB_DIAMOND_FILES : DEFAULT_FILES);
  });

  const [bugs, setBugs] = useState<BugLog[]>(() => {
    const saved = localStorage.getItem('portfolio_bugs');
    return saved ? JSON.parse(saved) : (activeProject === 'bob_diamond' ? BOB_DIAMOND_BUGS : DEFAULT_BUGS);
  });

  // Save active project configuration
  useEffect(() => {
    localStorage.setItem('portfolio_active_project', activeProject);
  }, [activeProject]);

  // Keep state synced on mutate
  useEffect(() => {
    localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('portfolio_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('portfolio_bugs', JSON.stringify(bugs));
  }, [bugs]);

  // Dynamic project trigger template swapper
  const handleSwitchProject = (projectType: 'default' | 'bob_diamond') => {
    setActiveProject(projectType);
    if (projectType === 'bob_diamond') {
      setTasks(BOB_DIAMOND_TASKS);
      setFiles(BOB_DIAMOND_FILES);
      setBugs(BOB_DIAMOND_BUGS);
    } else {
      setTasks(DEFAULT_TASKS);
      setFiles(DEFAULT_FILES);
      setBugs(DEFAULT_BUGS);
    }
  };

  // Handlers
  const handleToggleTaskStatus = (id: string, status: 'todo' | 'in_progress' | 'done') => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const id = `T${newTask.phase}-${(tasks.length + 1).toString().padStart(2, '0')}`;
    setTasks(prev => [...prev, { ...newTask, id }]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddFile = (newFile: VersionedFile) => {
    setFiles(prev => [...prev, newFile]);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleAddBug = (newBug: Omit<BugLog, 'id' | 'createdAt'>) => {
    const id = `B${bugs.length + 1}`;
    const createdAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setBugs(prev => [...prev, { ...newBug, id, createdAt }]);
  };

  const handleResolveBug = (id: string, resolution: string) => {
    setBugs(prev => prev.map(b => b.id === id ? { ...b, resolution, status: 'resolved' as const } : b));
  };

  // Stats calculation
  const completedTasksCount = tasks.filter(t => t.status === 'done').length;
  const progressPercent = Math.round((completedTasksCount / tasks.length) * 100) || 0;
  const resolvedBugsCount = bugs.filter(b => b.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-stone-50/50 pb-12 font-sans antialiased text-stone-900">
      
      {/* Universal Header Section */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        githubName={githubName}
        netlifyName={netlifyName}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Dynamic Project Blueprint Active Selector Banner */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-blue-50/20 p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="rounded bg-blue-600 p-2 text-white shrink-0 h-9 w-9 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-blue-100" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                ACTIVE BLUEPRINT BLUEPRINT REGISTRY
              </h2>
              <p className="mt-0.5 text-xs text-slate-600 leading-relaxed font-sans">
                Active Scope Tracker: <span className="font-bold text-blue-700">{activeProject === 'bob_diamond' ? "Bob Diamond AI Tax Overage RAG Ecosystem" : "Generic SaaS Deployment Suite"}</span>. Toggle below to apply structural pre-loads mapped from PDF specifications.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => handleSwitchProject('default')}
              className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeProject === 'default'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              style={{ cursor: 'pointer' }}
            >
              Standard SaaS
            </button>
            <button
              onClick={() => handleSwitchProject('bob_diamond')}
              className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                activeProject === 'bob_diamond'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <RefreshCcw className="h-3 w-3" />
              Bob Diamond AI RAG
            </button>
          </div>
        </div>

        {/* Quick Dashboard Overlook Banner */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2.5 text-orange-700">
              <CheckSquare className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Roadmap Progress</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-extrabold text-stone-900">{progressPercent}%</span>
                <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2.5 text-purple-700">
              <Bug className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Fixed Defect Proofs</span>
              <p className="text-sm font-extrabold text-stone-900 mt-0.5">
                {resolvedBugsCount} of {bugs.length} resolved
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2.5 text-indigo-700">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">GitHub Standard</span>
              <p className="text-sm font-extrabold text-stone-900 mt-0.5">Conventional SemVer</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-700">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Notion Portfolio Blueprint</span>
              <p className="text-sm font-extrabold text-stone-900 mt-0.5">4 Sync Databases</p>
            </div>
          </div>
        </div>

        {/* Dynamic Nav Route View Switcher */}
        <div className="mt-2">
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <ArchitectureVisualizer />
              <TaskTracker
                tasks={tasks}
                onToggleStatus={handleToggleTaskStatus}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}

          {activeTab === 'versions' && (
            <VersionTracker
              files={files}
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
            />
          )}

          {activeTab === 'bugs' && (
            <BugTracker
              bugs={bugs}
              onAddBug={handleAddBug}
              onResolveBug={handleResolveBug}
            />
          )}

          {activeTab === 'docs' && (
            <PortfolioDocs
              githubName={githubName}
              netlifyName={netlifyName}
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 text-center text-[11px] text-stone-400 border-t border-gray-100 pt-6">
        <p>© 2026 Developer Portfolio Architecture Suite.</p>
        <p className="mt-1 font-mono">Environment Status: Production Sandbox Mode | Secure Client-Side Storage Active</p>
      </footer>
    </div>
  );
}
