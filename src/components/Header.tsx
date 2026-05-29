/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, BookOpen, GitBranch, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  githubName: string;
  netlifyName: string;
}

export default function Header({ activeTab, setActiveTab, githubName, netlifyName }: HeaderProps) {
  const navItems = [
    { id: 'roadmap', label: 'Milestone Roadmap', icon: LayoutDashboard },
    { id: 'versions', label: 'Version Catalog', icon: GitBranch },
    { id: 'bugs', label: 'Problem-Solving Logs', icon: ShieldCheck },
    { id: 'docs', label: 'Portfolio Documentation', icon: BookOpen },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900 text-white p-6 shadow-md shadow-slate-950/20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center rounded bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 tracking-wider uppercase">
              ACTIVE SPRINT: ALPHA-MVP
            </span>
            <h1 className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl">
              NEXUSARCHITECT-CORE
            </h1>
            <p className="mt-1 text-xs text-slate-400 font-mono tracking-widest uppercase">
              SYSTEMS ARCHITECTURE & PORTFOLIO FRAMEWORK v1.0.4
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-slate-700 bg-slate-800/40 p-4 shrink-0 sm:max-w-xs">
            <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">SUGGESTED DEPLOY NAME</h3>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">GitHub:</span>
                <span className="font-bold text-slate-200">{githubName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Netlify:</span>
                <span className="font-bold text-slate-200">{netlifyName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 pb-1 border-t border-slate-800 pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                    : 'text-slate-400 hover:bg-slate-800 h-8 hover:text-white'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
