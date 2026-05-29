/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, GitCommit, Database, FolderCheck, BookOpen, AlertCircle, Layout } from 'lucide-react';
import { CommitBuilder } from '../types';

interface PortfolioDocsProps {
  githubName: string;
  netlifyName: string;
}

export default function PortfolioDocs({ githubName, netlifyName }: PortfolioDocsProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // States for commit standards generator
  const [comType, setComType] = useState('feat');
  const [comScope, setComScope] = useState('crm-sheets');
  const [comSub, setComSub] = useState('integrate secure POST submit-v1.js form connector');
  const [comBody, setComBody] = useState('Connect clean contact form to Google Sheets Web App endpoint with error protection.');
  const [comVer, setComVer] = useState('1.1.0');
  const [comTask, setComTask] = useState('T1-04');
  const [commitCopied, setCommitCopied] = useState(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 1. Full Markdown README custom template for portfolio
  const readmeTemplate = `# 🚀 ${githubName.toUpperCase()} — Elite CRM Stack & SaaS Evolution

An enterprise-ready portfolio project showcasing scalable development, robust error caching, architectural evolution plans (from Sheets DB to Postgres), and senior engineering workflows. This project tracks leads, schedules small business appointments, and features an integrated AI assistant.

> Deployed Project URL: [https://${netlifyName}.netlify.app](https://${netlifyName}.netlify.app)
> Notion Development Space: [Link to your Workspace]

---

## 👔 Recruiter TL;DR (Context & System Trade-Offs)

As a senior architect, I designed this codebase using an **Adaptive Transition Strategy** to prove that highly functional, visual, and secure customer tools can be built rapidly without the high costs of relational database servers. 

### Core Tech Stack:
- **Phase 1 (Initial Release)**: Pure \`HTML5\`, \`CSS3 (Tailwind)\`, \`Vanilla ES6 JavaScript\` submitting to a serverless CORS proxy forwarding inputs to a secure **Google Sheets CRM dataset**. Hosted on **Netlify CDN**.
- **Phase 2 (Enterprise Upgrade Paths)**: Migrated to **React + Vite**, **TypeScript**, **Supabase DB (PostgreSQL)**, and custom server-side **Gemini AI routes** for analyzing captured leads.

### Key Architectural Challenges Solved:
1. **Google Sheets Preflight CORS Handshake (CORS 302 Redirect)**: Custom script requests often crash when interfacing with Google Script Web Apps. By formatting payloads as a direct POST stream, I solved standard JSON Web Hook blocks safely.
2. **Incremental File-Naming Standard (\`index-v1.html\` / \`submit-v1.js\`)**: Preserved early prototypes alongside active production environments to give recruiters an immediate look at my initial systems thinking.

---

## 📂 Windows & POSIX Production Folder Tree

\`\`\`text
${githubName}/
├── .github/                  # GitHub workflow CI/CD integrations
│   └── workflows/
├── dist/                     # Optimized minified distribution build
├── src/                      # Source Code (Phase 2 React upgrade)
│   ├── components/           # Extracted UI widgets
│   │   ├── DashboardWidgets.tsx
│   │   └── Chatbot-v1-2.tsx
│   ├── types.ts              # Global TypeScript interfaces
│   └── App.tsx               # Primary Client Application Entry
├── legacy/                   # Phase 1 Legacy Prototype Registry
│   ├── index-v1.html         # Landing page prototype
│   └── submit-v1.js          # Google Sheets CRM connector
├── netlify.toml              # Netlify Edge configuration, custom CORS, redirects
└── README.md                 # Recruiter Case-Study documentation
\`\`\`

---

## 🛠️ Recommended Naming & Development Standards

| Domain | Standard Naming Convention | Example |
| :--- | :--- | :--- |
| **Asset Files** | \`[intent]_[descriptor].[ext]\` | \`hero_banner.webp\`, \`logo_footer.svg\` |
| **Legacy Code** | \`[filename]-v[major].html\` | \`index-v1.html\`, \`dashboard-v2.html\` |
| **Branching** | \`[feat/fix/docs]/[scope]-[description]\`| \`feat/crm-sheets-form-submission\` |
| **Releases** | \`v[major].[minor].[patch]\` | \`v1.2.0\` |

---

## ⚡ Setup / Cold-Start Instructions
1. Clone the repository: \`git clone https://github.com/my-username/${githubName}.git\`
2. Run localized dependencies: \`npm install\`
3. Spin dev server: \`npm run dev\`
`;

  // 2. Notion Workspace Structure schema
  const notionWorkspaceDetails = `=== NOTION WORKSPACE SYSTEM BLUEPRINT ===

1. 📂 [DB] PROJECT ARCHITECTURE MAP
   - Description: Registers all system endpoints, backend API routing, and Google Sheets mappings.
   - Core Properties: Area (Frontend/Backend/Proxy), File Source, Critical Handshake, Active Health status.

2. 🗺️ [DB] TASK SPRINT REVOLUTION ROADMAP
   - Description: Multi-phase sprint board mapping tasks, deadlines, and milestone achievements.
   - Core Properties: Milestone Phase, Owner, Estimated LOE (hrs), Pull-Request, QA Checklist status.

3. 📝 [DB] CODE RECENT VERSION CATALOG
   - Description: Catalog of versioned prototype files tracking date modified and authors before merging with local Git.
   - Core Properties: File Name, Applied SemVer, Contribution Lead, Upstream and Downstream dependencies.

4. 🐞 [DB] DEFECT DEBUGGING VAULT (PROBLEM-SOLVING EVIDENCE)
   - Description: The ultimate technical database tracking production bugs, stack traces, and resolutions.
   - Core Properties: Stack Trace, Associated File, Root Cause Analysis, Confirmed Hotfix, Recruiter walkthrough code.`;

  const generatedCommit = `${comType}(${comScope}): ${comSub}\n\n- ${comBody}\n\nTask-Ref: #${comTask}\nRelease-Ver: v${comVer}`;

  return (
    <div className="space-y-6">
      
      {/* Three Pillar Header */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex gap-2.5">
            <div className="rounded bg-slate-900 p-2 text-white shrink-0">
              <FolderCheck className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Windows Naming rules</h3>
              <p className="mt-1 text-xs text-slate-505 leading-relaxed font-sans">
                Uses clear file schemas <span className="font-mono bg-slate-100 px-1 py-0.5 rounded" >submit-v1.js</span> to prevent lock conflicts. Avoid characters like <span className="font-mono bg-slate-100 px-1 py-0.5 rounded" >\/:*?"&lt;&gt;|</span> from Windows.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex gap-2.5">
            <div className="rounded bg-slate-900 p-2 text-white shrink-0">
              <Database className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notion Blueprint</h3>
              <p className="mt-1 text-xs text-slate-505 leading-relaxed font-sans">
                Four pre-styled database spaces tracking project progress, architecture, version codes, and logged defects. Focuses heavily on design documentation.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex gap-2.5">
            <div className="rounded bg-slate-900 p-2 text-white shrink-0">
              <GitCommit className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Conventional Commits</h3>
              <p className="mt-1 text-xs text-slate-505 leading-relaxed font-sans">
                Adhere to strict commit patterns linking tasks (<span className="font-mono text-xs font-bold text-blue-600">T1-04</span>) and versions to build polished repositories recruiters trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Git Commit Builder & Notion Schema Copy tools */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Interactive Commit Standards Generator */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
              <GitCommit className="h-4 w-4 text-blue-500" />
              Conventional Commit Generator
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedCommit);
                setCommitCopied(true);
                setTimeout(() => setCommitCopied(false), 2000);
              }}
              className="flex items-center gap-1 rounded bg-slate-900 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider hover:bg-slate-800"
              style={{ cursor: 'pointer' }}
            >
              {commitCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {commitCopied ? 'Copied' : 'Copy Commit'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Commit Type</label>
                <select
                  value={comType}
                  onChange={e => setComType(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="feat">feat: (New Feature)</option>
                  <option value="fix">fix: (Defect Resolved)</option>
                  <option value="docs">docs: (Documentation changes)</option>
                  <option value="refactor">refactor: (Structure clean)</option>
                  <option value="chore">chore: (Ops & dependencies)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Scope Area</label>
                <input
                  type="text"
                  value={comScope}
                  onChange={e => setComScope(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Brief Subject</label>
                <input
                  type="text"
                  value={comSub}
                  onChange={e => setComSub(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Task Ref</label>
                <input
                  type="text"
                  value={comTask}
                  onChange={e => setComTask(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Release Target</label>
                <input
                  type="text"
                  value={comVer}
                  onChange={e => setComVer(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wider">Bullet Description</label>
              <textarea
                value={comBody}
                onChange={e => setComBody(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-550"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Raw Commit Output</label>
              <pre className="rounded bg-slate-900 border border-slate-850 p-4 text-[10px] font-mono leading-relaxed text-emerald-450 overflow-x-auto select-all text-emerald-440">
                {generatedCommit}
              </pre>
            </div>
          </div>
        </div>

        {/* Notion Workspace Blueprint Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
              <Database className="h-4 w-4 text-blue-500" />
              Notion Workspace Blueprint Schema
            </h3>
            <button
              onClick={() => handleCopyText(notionWorkspaceDetails, 'notion')}
              className="flex items-center gap-1 rounded bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 uppercase tracking-wider"
              style={{ cursor: 'pointer' }}
            >
              {copiedSection === 'notion' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              {copiedSection === 'notion' ? 'Copied Blueprint' : 'Copy Blueprint'}
            </button>
          </div>

          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            Create 4 distinct interconnected databases inside your Notion workspace using the exact schema metrics. This demonstrates structured PM and QA disciplines.
          </p>

          <pre className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-[10px] font-mono text-slate-600 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
            {notionWorkspaceDetails}
          </pre>
        </div>
      </div>

      {/* Recruiter-Ready GitHub README Markdown Generator with Side Scroll */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 border-b border-slate-150 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-blue-500" />
              Markdown README Showcase Builder
            </h3>
            <p className="text-xs text-slate-400 mt-1">Copy and paste this markdown text directly into your project's GitHub homepage!</p>
          </div>
          <button
            onClick={() => handleCopyText(readmeTemplate, 'readme')}
            className="flex items-center gap-1 rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider shadow-sm transition-colors hover:bg-blue-700 shrink-0 shadow-blue-500/10"
            style={{ cursor: 'pointer' }}
          >
            {copiedSection === 'readme' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copiedSection === 'readme' ? 'Copied' : 'Copy Portfolio README'}
          </button>
        </div>

        <div className="rounded bg-slate-900 border border-slate-850 p-5 overflow-x-auto text-slate-300 font-mono text-xs leading-relaxed max-h-96">
          <pre className="whitespace-pre-wrap">{readmeTemplate}</pre>
        </div>
      </div>
    </div>
  );
}
