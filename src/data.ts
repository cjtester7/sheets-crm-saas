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

export const BOB_DIAMOND_TASKS: Task[] = [
  // Phase 1: Infrastructure Setup, Ingestion Pipelines, & CRM Core
  {
    id: 'L1-01',
    title: 'Provision Google Cloud Platform & Self-Host n8n',
    description: 'Establish GCP console project with access to Gemini API, and deploy an automated n8n workflow server instance on Render or Railway.',
    category: 'Setup & DevOps',
    status: 'in_progress',
    phase: 1,
  },
  {
    id: 'L1-02',
    title: 'Design Live Google Sheets CRM & Access Schema',
    description: 'Map structured columns (Name, Email, Phone, State, Experience, Capital, Commitment, Fit Score, Lead Status, Notes) and secure service account scopes.',
    category: 'Backend / CRM',
    status: 'todo',
    phase: 1,
  },
  {
    id: 'L1-03',
    title: 'Configure Inbound n8n Webhook Endpoint Receiver',
    description: 'Build n8n webhook route parsing incoming JSON lead payloads, checking for validation parameters, and appending entries securely to Google Sheets.',
    category: 'Backend / CRM',
    status: 'todo',
    phase: 1,
  },
  {
    id: 'L1-04',
    title: 'Assemble YouTube Transcript Scraping Pipeline',
    description: 'Configure daily automation task linking YouTube v3 Data API to extract caption streams from Bob\'s 1000+ overage videos.',
    category: 'AI Integration',
    status: 'todo',
    phase: 1,
  },
  {
    id: 'L1-05',
    title: 'Deploy Pinecone Vector DB Namespace & Embeddings Creator',
    description: 'Model vector database, run standard chunking algorithm with overlapping sliding window, and upload text-embedding-004 vectors.',
    category: 'AI Integration',
    status: 'todo',
    phase: 1,
  },
  {
    id: 'L1-06',
    title: 'Verify Lead Intake Form CORS Overrides & Deploy static SPA',
    description: 'Build responsive single-screen HTML portal, write submit-v1.js post connectors without custom header preflight blocks, and host on NetlifyCDN.',
    category: 'Frontend',
    status: 'todo',
    phase: 1,
  },

  // Phase 2: Live AI Agents, Front-End Widgets, & Production Compliance
  {
    id: 'L2-01',
    title: 'Build Secure Serverless proxy for Gemini API Key',
    description: 'Develop Netlify serverless function or Express route acting as a secure intermediary shielding the GEMINI_API_KEY from browser inspection.',
    category: 'Setup & DevOps',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'L2-02',
    title: 'Draft System Instructions & RAG Context Optimizer',
    description: 'Write robust system prompts ensuring conversational AI ("Ask Bob") answers Tax Overage procedures authoritatively without giving unauthorized legal advice.',
    category: 'QA & Compliance',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'L2-03',
    title: 'Implement Multi-Step "Business-Fit" Assessment Form',
    description: 'Develop interactive React component checking user available capital, experience level, state/location, and risk index to compute a Fit Score.',
    category: 'Frontend',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'L2-04',
    title: 'Establish n8n Automation for CRM Segmentation & Nurture Trigger',
    description: 'Sync n8n with ActiveCampaign to trigger immediate customized email sequences mapped to the prospect\'s calculated Business-Fit assessment score.',
    category: 'Backend / CRM',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'L2-05',
    title: 'Deploy Embeddable Vanilla JS Web Widget for primary lands',
    description: 'Generate an optimized CDN-ready Javascript wrapper allowing Bob\'s team to insert the RAG widget onto any site using a single <script> block.',
    category: 'Frontend',
    status: 'todo',
    phase: 2,
  },
  {
    id: 'L2-06',
    title: 'Perform E2E System Latency Audit & Load Simulation',
    description: 'Simulate 100+ concurrent RAG conversations to stress-test prompt token costs, rate-limit margins, and cold-start execution delays.',
    category: 'QA & Compliance',
    status: 'todo',
    phase: 2,
  },
];

export const BOB_DIAMOND_FILES: VersionedFile[] = [
  {
    id: 'F1',
    name: 'index-v1.html',
    type: 'html',
    version: '1.0.0',
    lastModified: '2026-05-28',
    description: 'Inbound landing page with responsive grid and form capturing candidate criteria for tax overages.',
    author: 'Senior Portfolio Architect',
    dependencies: 'pure-css-classes-only',
  },
  {
    id: 'F2',
    name: 'submit-v1.js',
    type: 'js',
    version: '1.0.4',
    lastModified: '2026-05-29',
    description: 'Extracts lead form states, computes telemetry, formats fields, and posts JSON data to the n8n endpoint.',
    author: 'Senior Portfolio Architect',
    dependencies: 'n8n integration endpoint v1',
  },
  {
    id: 'F3',
    name: 'ask-bob-chatbot.tsx',
    type: 'js',
    version: '2.0.0-rc1',
    lastModified: '2026-05-29',
    description: 'React client chat widget executing vector lookup with Gemini processing models to recommend specific material.',
    author: 'AI Consultant',
    dependencies: 'Gemini SDK, Pinecone Vectors',
  },
  {
    id: 'F4',
    name: 'business-fit-quiz.tsx',
    type: 'js',
    version: '2.0.0-beta',
    lastModified: '2026-05-29',
    description: 'Qualifying multi-step form executing criteria assessment logic to rate lead score and profile tags.',
    author: 'UI/UX Developer',
    dependencies: 'lucide-react components',
  },
];

export const BOB_DIAMOND_BUGS: BugLog[] = [
  {
    id: 'B1',
    fileName: 'submit-v1.js',
    errorMsg: 'TypeError: Failed to fetch due to CORS preflight failure on redirect.',
    rootCause: 'n8n redirection response payload was blocked by standard browser CORS handshakes under custom headers.',
    resolution: 'Disabled client content-type headers to allow simple upload trigger streams; configured n8n Webhook response parameters directly.',
    status: 'resolved',
    severity: 'high',
    createdAt: '2026-05-28 10:20',
  },
  {
    id: 'B2',
    fileName: 'ask-bob-chatbot.tsx',
    errorMsg: 'EmbeddingMismatch: Chunk size mismatch resulted in abrupt transcript summaries.',
    rootCause: 'Ingestion parser split source transcripts (over 1000 YouTube videos) at exact line bounds instead of semantic paragraphs.',
    resolution: 'Updated ingestion script to bundle transcript sentences using a semantic overlapping sliding window.',
    status: 'unresolved',
    severity: 'medium',
    createdAt: '2026-05-29 08:44',
  },
];

