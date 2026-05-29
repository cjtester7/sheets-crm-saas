/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task, VersionedFile, BugLog } from './types';

export const DEFAULT_TASKS: Task[] = [
  // Phase 1 Tasks
  {
    id: 'T1-01',
    title: 'Initialize GitHub Repo & Netlify Site',
    description: 'Set up the remote repo, local folder structures, and configure continuous deployment from GitHub to Netlify.',
    category: 'Setup & DevOps',
    status: 'done',
    phase: 1,
  },
  {
    id: 'T1-02',
    title: 'Design index-v1.html Landing Page',
    description: 'Create a highly polished, responsive lead-capture page showcasing professional layout and accessibility standards.',
    category: 'Frontend',
    status: 'done',
    phase: 1,
  },
  {
    id: 'T1-03',
    title: 'Establish Google Sheets Backend CRM',
    description: 'Prepare Google Sheets with columns for Leads: Name, Email, Phone, Status, Date Created, and Notes. Configure sheet permissions.',
    category: 'Backend / CRM',
    status: 'done',
    phase: 1,
  },
  {
    id: 'T1-04',
    title: 'Implement submit-v1.js Form Connector',
    description: 'Write client-side fetch script with precise CORS settings to post form leads to Google Sheets via No-Code endpoint/Web App.',
    category: 'Backend / CRM',
    status: 'in_progress',
    phase: 1,
  },
  {
    id: 'T1-05',
    title: 'Write netlify.toml & Custom Redirects',
    description: 'Add custom security headers, basic content-security-policy (CSP), and form handling routes in netlify.toml.',
    category: 'Setup & DevOps',
    status: 'todo',
    phase: 1,
  },
  {
    id: 'T1-06',
    title: 'Document Architectural Workflow & CRM Flow',
    description: 'Create a recruiter-friendly, visual architectural draft explaining the Google Sheets integration limitations and benefits.',
    category: 'Documentation',
    status: 'todo',
    phase: 1,
  },
  
  // Phase 2 Tasks
  {
    id: 'T2-01',
    title: 'Bootstrap React & TypeScript Environment',
    description: 'Transition the codebase from raw files to React + Vite setup. Install core dependencies.',
    category: 'Setup & DevOps',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'T2-02',
    title: 'Initialize Supabase Schema & Auth System',
    description: 'Establish secure backend tables for leads and appointments. Configure Row Level Security (RLS) rules.',
    category: 'Backend / CRM',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'T2-03',
    title: 'Create Dashboard App UI (dashboard-v2.html)',
    description: 'Implement a comprehensive real-time dashboard UI displaying charts and filtering lead categories.',
    category: 'Frontend',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'T2-04',
    title: 'Integrate AI Workspace Assistant',
    description: 'Implement client-side query interface passing context to Gemini API proxy server for lead analysis.',
    category: 'AI Integration',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'T2-05',
    title: 'Configure Jest / Playwright End-to-End Tests',
    description: 'Add a QA regression test suite for automated CRM triggers and submission error handling.',
    category: 'QA & Testing',
    status: 'todo',
    phase: 2,
  },
];

export const DEFAULT_FILES: VersionedFile[] = [
  {
    id: 'F1',
    name: 'index-v1.html',
    type: 'html',
    version: '1.0.0',
    lastModified: '2026-05-28',
    description: 'Landing page with clean landing UI and optimized responsive form capturing metadata.',
    author: 'Senior Portfolio Architect',
    dependencies: 'None (Pure HTML/CSS)',
  },
  {
    id: 'F2',
    name: 'submit-v1.js',
    type: 'js',
    version: '1.1.2',
    lastModified: '2026-05-29',
    description: 'Handles CORS client handshake, validates input patterns, passes telemetry payloads, and redirects responses.',
    author: 'Senior Portfolio Architect',
    dependencies: 'Google Apps Script Web App Endpoint',
  },
  {
    id: 'F3',
    name: 'crm-config-v1.json',
    type: 'json',
    version: '1.0.1',
    lastModified: '2026-05-27',
    description: 'Configuration file mapping input form identifiers to Google Sheets spreadsheet IDs/cells.',
    author: 'System Design Lead',
    dependencies: 'submit-v1.js',
  },
];

export const DEFAULT_BUGS: BugLog[] = [
  {
    id: 'B1',
    fileName: 'submit-v1.js',
    errorMsg: 'TypeError: Failed to fetch due to preflight CORS blocking.',
    rootCause: 'Google Apps Script Web App redirect (302 response) is caught by preflight limitations when custom application headers are applied.',
    resolution: 'Removed standard application/json headers to permit simple POST stream; handled response body extraction manually inside plain fetch stream.',
    status: 'resolved',
    severity: 'high',
    createdAt: '2026-05-28 14:35',
  },
  {
    id: 'B2',
    fileName: 'index-v1.html',
    errorMsg: 'Input text overlaps on small viewport screens (320px).',
    rootCause: 'Oversized tracking padding classes hardcoded without fallback media prefixes.',
    resolution: 'Replaced layout columns with block-by-default grid structure featuring smooth breakpoints (sm:grid-cols-2).',
    status: 'resolved',
    severity: 'medium',
    createdAt: '2026-05-29 09:12',
  },
];

export const NOTION_METADATA = {
  databases: [
    {
      name: '📂 Project Architecture Map',
      purpose: 'Visualizes layout trees, state transitions, API integrations, and third-party webhooks.',
      properties: ['Layer', 'Status', 'Upstream Deps', 'Downstream Impact', 'Last Verified'],
    },
    {
      name: '🛠️ Task & Sprint Backlog',
      purpose: 'Agile tracking of current milestones, feature implementations, and blockers.',
      properties: ['Phase ID', 'Priority', 'Assigned Engineer', 'Est Hours', 'Branch Hook'],
    },
    {
      name: '📝 Code Inventory & Version Control',
      purpose: 'Acts as a manual Registry map of versioned client files, capturing changes before Git merge.',
      properties: ['Filename', 'Version SemVer', 'Author', 'Risk Profile', 'CRC Hash'],
    },
    {
      name: '🐞 Error Log & Debug Vault',
      purpose: 'High-fidelity knowledge-base storing standard operational errors, stack traces, and permanent resolutions.',
      properties: ['Error Hash', 'File Target', 'Root Cause Analysis', 'Resolution Path', 'Severity'],
    },
  ],
  sections: [
    {
      name: '📊 Technical Case Study Sandbox',
      desc: 'Chronicles architecture pivots, system limitations (e.g., Google Sheets quota limits), and engineering decisions.',
    },
    {
      name: '👔 Recruiter Portal & Interview Cribs',
      desc: 'Pre-formatted answers to technical questions, architecture diagrams, and feature walkthroughs.',
    },
  ],
};
