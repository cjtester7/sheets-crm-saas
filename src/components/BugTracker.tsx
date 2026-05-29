/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BugLog } from '../types';
import { ShieldCheck, Flame, Bug, CheckCircle, AlertTriangle, Play, Sparkles, Plus } from 'lucide-react';

interface BugTrackerProps {
  bugs: BugLog[];
  onAddBug: (newBug: Omit<BugLog, 'id' | 'createdAt'>) => void;
  onResolveBug: (id: string, resolution: string) => void;
}

export default function BugTracker({ bugs, onAddBug, onResolveBug }: BugTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  
  // New Bug fields
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('low');

  // Resolution Modal field
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionInput, setResolutionInput] = useState('');

  const activeBugs = bugs.filter(b => b.status === 'unresolved');
  const resolvedBugs = bugs.filter(b => b.status === 'resolved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim() || !errorMsg.trim()) return;

    onAddBug({
      fileName,
      errorMsg,
      rootCause,
      resolution: '',
      status: 'unresolved',
      severity,
    });

    setFileName('');
    setErrorMsg('');
    setRootCause('');
    setSeverity('low');
    setIsAdding(false);
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingId || !resolutionInput.trim()) return;
    onResolveBug(resolvingId, resolutionInput);
    setResolvingId(null);
    setResolutionInput('');
  };

  const severityStyles = {
    low: 'bg-slate-100 text-slate-700 border-slate-200',
    medium: 'bg-amber-50 text-amber-800 border-amber-200',
    high: 'bg-red-50 text-red-700 border-red-205',
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Metrics Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Registered Logs</span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">{bugs.length}</h3>
          </div>
          <div className="rounded bg-slate-100 p-2 text-slate-600">
            <Bug className="h-5 w-5 text-blue-500" />
          </div>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50/20 p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Blockers</span>
            <h3 className="mt-1 text-2xl font-extrabold text-red-650">{activeBugs.length}</h3>
          </div>
          <div className="rounded bg-red-100/50 p-2 text-red-600">
            <Flame className="h-5 w-5 text-red-550" />
          </div>
        </div>

        <div className="rounded-xl border border-emerald-105 bg-emerald-50/20 p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Resolved Proofs</span>
            <h3 className="mt-1 text-2xl font-extrabold text-emerald-800">{resolvedBugs.length}</h3>
          </div>
          <div className="rounded bg-emerald-100/50 p-2 text-emerald-600">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider transition-all hover:bg-blue-700 shadow-sm shadow-blue-500/10"
          style={{ cursor: 'pointer' }}
        >
          <Plus className="h-4 w-4" />
          Log Operational Bug
        </button>
      </div>

      {/* New Bug Logger */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">KNOWLEDGE-BASE ERROR LOGGER</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Offending File *</label>
              <input
                type="text"
                required
                placeholder="e.g. submit-v1.js"
                value={fileName}
                onChange={e => setFileName(e.target.value)}
                className="mt-1 w-full rounded border border-slate-205 bg-white px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Raw Stack / Error Message *</label>
              <input
                type="text"
                required
                placeholder="TypeError: Failed to fetch due to CORS"
                value={errorMsg}
                onChange={e => setErrorMsg(e.target.value)}
                className="mt-1 w-full rounded border border-slate-205 bg-white px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Root Cause Analysis</label>
            <textarea
              placeholder="Why did this bug occur? Be technical and details-oriented (this shows system mastery to recruiters)."
              value={rootCause}
              onChange={e => setRootCause(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded border border-slate-205 bg-white px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Impact Severity</span>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverity(sev)}
                  className={`rounded px-4 py-1.5 text-xs font-bold uppercase tracking-wider border ${
                    severity === sev
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded bg-slate-200 px-3 py-1.5 text-slate-705"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-805"
            >
              Log Bug
            </button>
          </div>
        </form>
      )}

      {/* Resolution Submission Dialog inline */}
      {resolvingId && (
        <form onSubmit={handleResolveSubmit} className="rounded-xl border border-emerald-250 bg-emerald-50/20 p-6 space-y-3">
          <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Resolve Issue #{resolvingId}
          </h3>
          <p className="text-xs text-slate-500">Document the engineering solution used to permanently hotfix this bug.</p>
          <textarea
            required
            placeholder="Describe the solution in details, e.g. modified JSON serialization to allow native arrays, or added CORS proxy middleware"
            value={resolutionInput}
            onChange={e => setResolutionInput(e.target.value)}
            rows={3}
            className="w-full rounded border border-slate-200 bg-white p-3 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setResolvingId(null)}
              className="rounded bg-slate-200 px-3 py-1.5 text-slate-705"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-emerald-800 px-3 py-1.5 text-white hover:bg-emerald-700 animate-pulse"
            >
              Commit Solution
            </button>
          </div>
        </form>
      )}

      {/* Interactive Bug List */}
      <div className="space-y-4">
        {bugs.map((bug) => (
          <div key={bug.id} className="rounded-xl border border-slate-150 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-705 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">E/{bug.fileName}</span>
                <span className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${severityStyles[bug.severity]}`}>
                  {bug.severity} severity
                </span>
                <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  bug.status === 'resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                }`}>
                  {bug.status === 'resolved' ? 'FIX CONFIRMED' : 'ACTIVE BLOCKER'}
                </span>
              </div>
              <span className="font-mono text-[9px] text-slate-400">{bug.createdAt}</span>
            </div>

            <h3 className="mt-2 text-xs font-bold text-slate-900 font-mono bg-slate-900 text-emerald-400 p-3 rounded border border-slate-800 overflow-x-auto">
              {bug.errorMsg}
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Bug className="h-4 w-4 text-slate-450" />
                  Root Cause Diagnosis:
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">{bug.rootCause || 'No technical diagnostics logged yet.'}</p>
              </div>

              <div className="rounded-lg border border-emerald-100 bg-emerald-50/10 p-4">
                <h4 className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Resolution Path:
                </h4>
                {bug.status === 'resolved' ? (
                  <p className="mt-2 text-xs text-emerald-800 leading-relaxed font-sans">{bug.resolution}</p>
                ) : (
                  <div className="mt-2 text-xs leading-relaxed font-sans">
                    <p className="text-slate-500 italic font-medium">Unresolved bug blocking portfolio validation.</p>
                    <button
                      onClick={() => setResolvingId(bug.id)}
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                      style={{ cursor: 'pointer' }}
                    >
                      <Play className="h-3 w-3 fill-current" /> Provide hotfix log
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
