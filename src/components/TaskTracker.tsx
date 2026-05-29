/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle, AlertCircle, Plus, Sparkles, Filter, Trash2 } from 'lucide-react';

interface TaskTrackerProps {
  tasks: Task[];
  onToggleStatus: (id: string, currentStatus: 'todo' | 'in_progress' | 'done') => void;
  onAddTask: (newTask: Omit<Task, 'id'>) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskTracker({ tasks, onToggleStatus, onAddTask, onDeleteTask }: TaskTrackerProps) {
  const [phaseFilter, setPhaseFilter] = useState<'all' | 1 | 2>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // States for adding a new task
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [phase, setPhase] = useState<1 | 2>(1);
  const [isAdding, setIsAdding] = useState(false);

  const categories = Array.from(new Set(tasks.map(t => t.category)));

  const filteredTasks = tasks.filter(t => {
    const matchPhase = phaseFilter === 'all' || t.phase === phaseFilter;
    const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchPhase && matchCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title,
      description,
      category,
      status: 'todo',
      phase,
    });
    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  const statusIcons = {
    todo: { icon: Circle, color: 'text-stone-400 hover:text-stone-600', bg: 'bg-stone-50' },
    in_progress: { icon: AlertCircle, color: 'text-amber-500 hover:text-amber-600', bg: 'bg-amber-50/50' },
    done: { icon: CheckCircle2, color: 'text-emerald-500 hover:text-emerald-600', bg: 'bg-emerald-50/20' },
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-250 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Filter className="h-3.5 w-3.5 text-blue-500" />
            Filter Milestones:
          </div>
          
          {/* Phase Filter Button Group */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            {(['all', 1, 2] as const).map((phase) => (
              <button
                key={phase}
                onClick={() => setPhaseFilter(phase)}
                className={`rounded px-3 py-1 text-xs font-semibold tracking-wide transition-all ${
                  phaseFilter === phase
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {phase === 'all' ? 'All Phases' : `Phase ${phase}`}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ cursor: 'pointer' }}
          >
            <option value="all">ALL DEPARTMENTS</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider transition-all hover:bg-blue-700 shadow-sm shadow-blue-500/10"
          style={{ cursor: 'pointer' }}
        >
          <Plus className="h-4 w-4" />
          {isAdding ? 'Close Builder' : 'Log New Task'}
        </button>
      </div>

      {/* Task Creation Drawer Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-xs animate-fadeIn space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">NEW ROADMAP RECORD BUILDER</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Task Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Write Google Sheets App Script triggers"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Department / Specialty</label>
              <input
                type="text"
                placeholder="Frontend, Backend, DevOps, Documentation..."
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full rounded border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Description & Target Outcomes</label>
            <textarea
              placeholder="Detail out the checklist targets or technical trade-offs..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded border border-slate-205 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Target Development Phase</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhase(1)}
                  className={`rounded px-4 py-2 text-xs font-bold uppercase tracking-wider border ${
                    phase === 1
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Phase 1 (Lightweight)
                </button>
                <button
                  type="button"
                  onClick={() => setPhase(2)}
                  className={`rounded px-4 py-2 text-xs font-bold uppercase tracking-wider border ${
                    phase === 2
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Phase 2 (Scalable React)
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 uppercase tracking-wider"
              style={{ cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 uppercase tracking-wider"
              style={{ cursor: 'pointer' }}
            >
              Confirm Task
            </button>
          </div>
        </form>
      )}

      {/* Task List Workspace */}
      <div className="grid grid-cols-1 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-250 p-12 text-center bg-white">
            <Sparkles className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-xs font-bold text-slate-800 uppercase tracking-widest">No matching milestone records found</p>
            <p className="mt-1 text-xs text-slate-400">Add custom tasks or adjust filters above.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const statusConfig = statusIcons[task.status];
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={task.id}
                className={`group flex items-start gap-4 rounded-xl border border-slate-150 p-4 shadow-sm transition-all hover:bg-slate-50/50 ${statusConfig.bg}`}
              >
                {/* Status Toggle Button */}
                <button
                  onClick={() => {
                    const next: Record<'todo' | 'in_progress' | 'done', 'todo' | 'in_progress' | 'done'> = {
                      todo: 'in_progress',
                      in_progress: 'done',
                      done: 'todo',
                    };
                    onToggleStatus(task.id, next[task.status]);
                  }}
                  className={`mt-0.5 transition-colors focus:outline-none ${statusConfig.color}`}
                  title={`Status: ${task.status}. Click to advance.`}
                  style={{ cursor: 'pointer' }}
                >
                  <StatusIcon className="h-5 w-5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {task.id}
                    </span>
                    <h3 className={`text-xs font-bold text-slate-900 ${task.status === 'done' ? 'line-through text-slate-400 font-normal' : ''}`}>
                      {task.title}
                    </h3>
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                      {task.category}
                    </span>
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      task.phase === 1 ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                      Phase {task.phase}
                    </span>
                  </div>
                  <p className={`mt-2 text-xs leading-relaxed text-slate-500 ${task.status === 'done' ? 'text-slate-300' : ''}`}>
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="rounded p-1.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-red-600 group-hover:opacity-100"
                  title="Remove this task"
                  style={{ cursor: 'pointer' }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
