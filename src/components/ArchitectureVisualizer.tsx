/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, ArrowRight, Sparkles, Layers, Chrome, Globe, Share2 } from 'lucide-react';

export default function ArchitectureVisualizer() {
  const [activePhase, setActivePhase] = useState<1 | 2>(1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-550" />
            Interactive System Architecture Map
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare the lightweight initial CRM stack with the full-scale SaaS production blueprint.
          </p>
        </div>

        <div className="inline-flex rounded bg-slate-100 p-1 shrink-0">
          <button
            onClick={() => setActivePhase(1)}
            className={`rounded px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              activePhase === 1
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            style={{ cursor: 'pointer' }}
          >
            Phase 1 Prototype
          </button>
          <button
            onClick={() => setActivePhase(2)}
            className={`rounded px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              activePhase === 2
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            style={{ cursor: 'pointer' }}
          >
            Phase 2 SaaS
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activePhase === 1 ? (
          <div>
            {/* Phase 1 Diagram Display */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {/* Box 1: Frontend Client */}
              <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-blue-500 p-1.5 text-white">
                    <Chrome className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Frontend</h4>
                    <span className="font-mono text-[9px] text-blue-600 block">index-v1.html</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-blue-800 leading-relaxed">
                  Single HTML file using Tailwind, posting data via submit scripts.
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-blue-100 text-[10px] font-mono text-blue-700">
                  📄 submit-v1.js <br />
                  📄 style-v1.css
                </div>
              </div>

              {/* Connecting arrow 1 */}
              <div className="flex items-center justify-center py-2 md:col-span-1 md:py-0">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-slate-400 bg-white px-2 py-0.5 border border-slate-150 rounded">POST Handshake</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 mt-1 rotate-90 md:rotate-0" />
                </div>
              </div>

              {/* Box 2: Serverless Integration Gateway */}
              <div className="rounded-lg border border-amber-100 bg-amber-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-amber-500 p-1.5 text-white">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Gateway Logic</h4>
                    <span className="font-mono text-[9px] text-amber-600 block">netlify.toml</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-amber-800 leading-relaxed">
                  CORS rules & safe environment variables forwarding payloads.
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-amber-100 text-[10px] font-mono text-amber-700">
                  ⚙️ CORS Streams <br />
                  ⚙️ Header Overrides
                </div>
              </div>

              {/* Connecting arrow 2 */}
              <div className="flex items-center justify-center py-2 md:col-span-1 md:py-0">
                <ArrowRight className="h-4 w-4 text-slate-400 rotate-90 md:rotate-0" />
              </div>

              {/* Box 3: Lightweight Database */}
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-emerald-500 p-1.5 text-white">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Sheets DB</h4>
                    <span className="font-mono text-[9px] text-emerald-600 block">CRM Sheets</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-emerald-800 leading-relaxed">
                  Google Sheet spreadsheet rows recording captured leads safely.
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-emerald-100 text-[10px] font-mono text-emerald-700">
                  📊 Lead Records <br />
                  📊 Recruiter Audit Page
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phase 1 Architectural Principles (Lightweight CRM)</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Designed to operate without heavy backend database servers. Handled through simple CORS streams forwarding contacts to spreadsheets, avoiding credentials leakage. This approach shows technical agility to recruiters by prioritizing visual, working MVPs.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Phase 2 Diagram Display */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {/* Box 1: Advanced SPA */}
              <div className="rounded-lg border border-purple-100 bg-purple-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-purple-600 p-1.5 text-white">
                    <Chrome className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-purple-900 uppercase tracking-wider">React Client</h4>
                    <span className="font-mono text-[9px] text-purple-600 block">React + Vite</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-purple-800 leading-relaxed">
                  Interactive real-time dashboards with componentized panels.
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-purple-100 text-[10px] font-mono text-purple-700">
                  📄 App-v2.tsx <br />
                  📄 AdminDashboard.tsx
                </div>
              </div>

              {/* Connecting arrow 1 */}
              <div className="flex items-center justify-center py-2 md:col-span-1 md:py-0">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-slate-400 bg-white px-2 py-0.5 border border-slate-150 rounded">REST Endpoint</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 mt-1 rotate-90 md:rotate-0" />
                </div>
              </div>

              {/* Box 2: Auth & Database Gateway */}
              <div className="rounded-lg border border-pink-100 bg-pink-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-pink-500 p-1.5 text-white">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-pink-900 uppercase tracking-wider">SaaS Backend</h4>
                    <span className="font-mono text-[9px] text-pink-600 block">Supabase Gateway</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-pink-800 leading-relaxed">
                  OAuth JWT Session validation with safe Row Level Security (RLS).
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-pink-100 text-[10px] font-mono text-pink-700">
                  🔒 MFA Security <br />
                  🔗 API JWT Validation
                </div>
              </div>

              {/* Connecting arrow 2 */}
              <div className="flex items-center justify-center py-2 md:col-span-1 md:py-0">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-purple-500 bg-white px-2 py-0.5 border border-purple-100 rounded">AI Proxy Gateway</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 mt-1 rotate-90 md:rotate-0" />
                </div>
              </div>

              {/* Box 3: Enterprise Database & AI */}
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-emerald-600 p-1.5 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider">PostgreSQL + AI</h4>
                    <span className="font-mono text-[9px] text-emerald-600 block">Postgres & Gemini</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-emerald-800 leading-relaxed">
                  ACID storage layer, data trigger webhooks, and automated lead intelligence.
                </p>
                <div className="mt-3 rounded bg-white p-2 border border-emerald-100 text-[10px] font-mono text-emerald-700">
                  ⚙️ Gemini AI Summary <br />
                  📊 Relational Tables
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phase 2 Architectural Principles (Production SaaS Enterprise)</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Highlights absolute modularity scaling up database operations. Integrates real relational tables with user access verification, schema triggers, and automated report summaries. Perfect for showcasing production SaaS standards.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
