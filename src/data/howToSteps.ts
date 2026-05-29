/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HowToStep {
  id: string;
  docUrl: string;
  docTitle: string;
  steps: string[];
  codeSnippet: string;
  codeLanguage: string;
}

export const HOW_TO_STEPS_REGISTRY: Record<string, HowToStep> = {
  // Bob Diamond AI Overage RAG Suite Tasks
  'L1-01': {
    id: 'L1-01',
    docUrl: 'https://docs.n8n.io/hosting/installation/docker/',
    docTitle: 'n8n Docker Deployment Guide',
    steps: [
      'Navigate to the Google Cloud Platform (GCP) Console and create a project named "bob-diamond-overages-rag".',
      'Go to the Google Cloud Marketplace or API Directory and enable the Generative Language API.',
      'Provision a secure virtual machine (Compute Engine) or deploy Docker container host on a service like Railway or Render.',
      'Set environment variables: `N8N_ENCRYPTION_KEY` matching a secure random salt, and configure Basic Authentication.',
      'Start the Docker daemon and monitor logs via terminal command mapping port 5678 to execute the automation workflows.'
    ],
    codeSnippet: `docker run -d \\
  --name n8n_rag_flow \\
  -p 5678:5678 \\
  -e N8N_BASIC_AUTH_ACTIVE=true \\
  -e N8N_BASIC_AUTH_USER=admin \\
  -e N8N_BASIC_AUTH_PASSWORD=SecurePassword123 \\
  n8nio/n8n:latest`,
    codeLanguage: 'bash',
  },
  'L1-02': {
    id: 'L1-02',
    docUrl: 'https://developers.google.com/sheets/api/guides/concepts',
    docTitle: 'Google Sheets Developer API Reference',
    steps: [
      'Create a new Google Spreadsheet named "Bob Diamond Lead Intake CRM" loaded in your Google Workspace.',
      'Establish exactly 11 database tracking columns on the first row (A1 to K1): "ID", "Name", "Email", "Phone", "State", "Experience", "Capital", "Commitment", "Fit Score", "Lead Status", "Created At".',
      'Create a Service Account inside your GCP credentials menu and click "Create New JSON Key" to download keyfile.',
      'Open the JSON file, copy the "client_email" field, and share the Google Spreadsheet with that email with "Editor" permissions.'
    ],
    codeSnippet: `{
  "columns": [
    "ID", "Name", "Email", "Phone", "State", 
    "Experience", "Capital", "Commitment", 
    "Fit Score", "Lead Status", "Created At"
  ],
  "sheet_permissions": "Shared with GCP Service account as Editor"
}`,
    codeLanguage: 'json',
  },
  'L1-03': {
    id: 'L1-03',
    docUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/',
    docTitle: 'n8n Webhook Integration Guide',
    steps: [
      'Log in to your n8n workspace, click "Add Workflow," and name it "Bob Diamond Inbound Leads".',
      'Select the Webhook core node as the trigger set to "HTTP Method: POST" and "Path: lead-intake".',
      'Connect the Webhook node outputs directly to a "Google Sheets: Append Row" node.',
      'Authenticate with Sheet API using your downloaded Service Account JSON credentials, matching the Spreadsheet ID found in your Sheet URL.'
    ],
    codeSnippet: `// Post Payload Sample to n8n Webhook Endpoint
curl -X POST https://your-n8n-server.com/webhook/lead-intake \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Alex Johnson",
    "email": "alex@overageprospect.com",
    "phone": "555-019-2831",
    "state": "Florida",
    "experience": "Beginner",
    "capital": "$5,000",
    "commitment": "10-15 hrs/week"
  }'`,
    codeLanguage: 'bash',
  },
  'L1-04': {
    id: 'L1-04',
    docUrl: 'https://developers.google.com/youtube/v3/docs/captions/download',
    docTitle: 'YouTube Captions API Documentation',
    steps: [
      'Configure the YouTube Data API v3 within your GCP Google Console Credentials manager.',
      'Build a schedule-triggered python script or n8n sequence listing video IDs from Bob Diamond\'s channel using the playlistItems endpoint.',
      'Download auto-generated and uploaded captions for over 1000+ files using the captions.download endpoint.',
      'Write transcripts out to a raw text folder with title, date, and subtitle metadata headers.'
    ],
    codeSnippet: `import googleapiclient.discovery

youtube = googleapiclient.discovery.build("youtube", "v3", developerKey="YOUR_API_KEY")
request = youtube.playlistItems().list(
    part="snippet,contentDetails",
    playlistId="UU_DIAMOND_LAW_CHANNEL_ID", # Uploads playlist
    maxResults=50
)
response = request.execute()`,
    codeLanguage: 'python',
  },
  'L1-05': {
    id: 'L1-05',
    docUrl: 'https://docs.pinecone.io/guides/indexes/create-an-index',
    docTitle: 'Pinecone Index Initialization Guide',
    steps: [
      'Log into the Pinecone Serverless Console, create a new project, and configure a Vector index.',
      'Configure the metric to "Cosine" similarity distance metric, matching exactly 1536 dimensions corresponding to Gemini Text Embeddings.',
      'Utilize a Python chunking handler splitting Bob\'s video texts into blocks of 1000 characters with a 200-character overlapping sliding window.',
      'Upsert embedded vectors with namespace tag "bob_diamond_transcripts" detailing exact video link citations.'
    ],
    codeSnippet: `import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: 'PINECONE_API_KEY' });
await pc.createIndex({
  name: 'bob-diamond-rag',
  dimension: 1536,
  metric: 'cosine',
  spec: { 
    serverless: { cloud: 'aws', region: 'us-east-1' }
  }
});`,
    codeLanguage: 'typescript',
  },
  'L1-06': {
    id: 'L1-06',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
    docTitle: 'CORS Preflight Mechanics Guide',
    steps: [
      'Develop clean HTML forms using standard input tags matching user specifications.',
      'When executing fetch handlers to post lead state directly to n8n Webhook, omit client-side custom headers that trigger preflight OPTIONS requests.',
      'Configure the inbound n8n Webhook response parameters to send headers "Access-Control-Allow-Origin: *".',
      'Review build logs inside the Netlify CDN console to confirm deployment of the compiled index-v1.html page.'
    ],
    codeSnippet: `// Simple CORS-safe HTTP form submission hook
async function submitLead(leadData) {
  const targetWebhook = 'https://n8n-server.com/webhook/lead-intake';
  const response = await fetch(targetWebhook, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  });
  return await response.json();
}`,
    codeLanguage: 'javascript',
  },
  'L2-01': {
    id: 'L2-01',
    docUrl: 'https://docs.netlify.com/functions/overview/',
    docTitle: 'Netlify Edge Serverless Functions',
    steps: [
      'Create a `/netlify/functions/query-gemini.ts` backend routing endpoint.',
      'Configure environment secrets on the Netlify dashboard by adding `GEMINI_API_KEY` secure value.',
      'Do not prefix your secret key with "VITE_" so it is completely invisible to client inspecting tools.',
      'Within the serverless script handler, instantiate the `@google/genai` library, execute request, and proxy the output back securely.'
    ],
    codeSnippet: `import { GoogleGenAI } from '@google/genai';

export async function handler(event, context) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const { query, promptContext } = JSON.parse(event.body);
  
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: promptContext + "\\n\\nQuery: " + query
  });
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: response.text })
  };
}`,
    codeLanguage: 'typescript',
  },
  'L2-02': {
    id: 'L2-02',
    docUrl: 'https://ai.google.dev/gemini-api/docs/system-instructions',
    docTitle: 'Gemini System Prompt Engineering Guide',
    steps: [
      'In client or proxy configurations, construct system instruction strings establishing Bob\'s AI persona ("Ask Bob").',
      'Instruct the model to assert educational and authoritative values but explicitly skip any form of legal counsel.',
      'Force the assistant to end or preface messages with standard legal disclaimer blocks.',
      'Configure strict parameters penalizing hallucinated numbers, maintaining compliance bounds.'
    ],
    codeSnippet: `const SYSTEM_INSTRUCTIONS = \`
You are "Ask Bob", an interactive AI Assistant representing tax attorney Bob Diamond.
Your primary objective is to teach surplus recovery, tax sales, and legal frameworks of Tax Overages.
RULE 1: You are an educator, not the user's attorney. Avoid direct legal advice.
RULE 2: Include the following disclaimer at the end of guidance: "Disclaimer: This educational service is provided for illustrative purposes only. Consult fully-licensed state attorneys before proceeding with legal claims."
\`;`,
    codeLanguage: 'text',
  },
  'L2-03': {
    id: 'L2-03',
    docUrl: 'https://react.dev/reference/react/useState',
    docTitle: 'React Interactive Form Components',
    steps: [
      'Develop multi-step wizard state structure utilizing sequential stage indexes (0: Personal info, 1: State/capital inputs, 2: Score output).',
      'Write scoring algorithm multiplying experience factors, accessible funds, and local market potential to result in fit score value (e.g. 0-100).',
      'Apply dynamic class values representing danger ratings for scorers below 40, and success tags for scores exceeding 75.',
      'Add micro-interaction ease transitions to ensure form changes feel premium and responsive.'
    ],
    codeSnippet: `function getFitScore(capital, experience, commitment) {
  let score = 30;
  if (capital > 5000) score += 30;
  if (experience === 'Intermediate' || experience === 'Expert') score += 20;
  if (commitment === 'High') score += 20;
  return score;
}`,
    codeLanguage: 'javascript',
  },
  'L2-04': {
    id: 'L2-04',
    docUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.activecampaign/',
    docTitle: 'n8n ActiveCampaign Marketing Automation Integration',
    steps: [
      'Create a separate conditional node inside your n8n workflows routing scored leads.',
      'Connect n8n workflows with your ActiveCampaign active automation suite.',
      'Leads scoring above 75 trigger custom campaign tags named "Tax_Overage_Elite_HighTicket_Lead".',
      'Trigger automated, highly customized email templates containing specialized legal tutorials.'
    ],
    codeSnippet: `// n8n logical switch node rule
{
  "conditions": {
    "number": [
      {
        "value1": "={{$node[\"Webhook\"].json[\"fitScore\"]}}",
        "operation": "largerEqual",
        "value2": 75
      }
    ]
  }
}`,
    codeLanguage: 'json',
  },
  'L2-05': {
    id: 'L2-05',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_components',
    docTitle: 'Vanilla Web Components Reference',
    steps: [
      'Create a production bundle containing styling rules and iframe elements wrapped in a vanilla JS closure.',
      'Implement custom launch hooks floating the widget at the bottom right corner of any page.',
      'Allow custom properties injection letting Bob\'s partners easily personalize chatbot color combinations, welcome titles, and text sizes.',
      'Verify execution compatibility inside WordPress, Kajabi, or custom static sites.'
    ],
    codeSnippet: `<!-- Embeddable Widget script snippet -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['AskBobWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];js.id='ask-bob';
    js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','bob','https://cdn.bobdiamond.com/widget-v2.js'));
  bob('init', { projectId: 'bob-diamond-rag', primaryColor: '#2563eb' });
</script>`,
    codeLanguage: 'html',
  },
  'L2-06': {
    id: 'L2-06',
    docUrl: 'https://k6.io/docs/',
    docTitle: 'k6 Performance Testing Tool Reference',
    steps: [
      'Implement load execution scripts using standard simulation systems like k6.',
      'Configure simulation targets checking API proxy request latencies and response times.',
      'Acknowledge and evaluate vector chunk limits to protect database rates and avoid token limit locks.',
      'Write audit diagnostic summaries detailing execution milestones.'
    ],
    codeSnippet: `import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50, // 50 concurrent virtual users
  duration: '30s',
};

export default function () {
  let res = http.post('https://your-netlify-endpoint.com/api/query-gemini', JSON.stringify({ query: 'how do overages work?' }));
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}`,
    codeLanguage: 'javascript',
  },

  // Standard Generic SaaS Tasks (For users toggling to SaaS standard workspace)
  'T1-01': {
    id: 'T1-01',
    docUrl: 'https://docs.netlify.com/cli/get-started/',
    docTitle: 'Netlify CLI & CD Guide',
    steps: [
      'Create standard empty Git repository on GitHub matching requested name.',
      'Initialize Vite bundle environment with correct target configurations.',
      'Link your repo with Netlify dashboard matching correct auto deployment hooks.'
    ],
    codeSnippet: `git init
git add .
git commit -m "feat: init framework"
gh repo create sheets-crm-saas-evolution --public --source=. --remote=origin
git push -u origin main`,
    codeLanguage: 'bash',
  },
  'T1-02': {
    id: 'T1-02',
    docUrl: 'https://tailwindcss.com/docs/installation',
    docTitle: 'Tailwind CSS Quick Start Guide',
    steps: [
      'Implement standard web elements containing high-contrast colors and layout alignments.',
      'Verify touch structures match mobile requirements.'
    ],
    codeSnippet: `<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
  <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Lead Capture Portal</h1>
  </div>
</div>`,
    codeLanguage: 'html',
  },
  'T1-03': {
    id: 'T1-03',
    docUrl: 'https://developers.google.com/sheets/api/concepts',
    docTitle: 'Google Sheets developer concept workspace',
    steps: [
      'Create a spreadsheet inside Google Drive designated for storage records.',
      'Prepare correct rows tracking names, emails, and transaction notes.'
    ],
    codeSnippet: `// Initial Sheet headers
["Lead Name", "Email Address", "Phone Number", "Lead Status", "Log Notes", "Modified Date"]`,
    codeLanguage: 'json',
  },
  'T1-04': {
    id: 'T1-04',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    docTitle: 'Using Fetch API Client',
    steps: [
      'Write ajax POST connector inside your submission JS files.',
      'Deliver custom parsed state strings to correct webhook servers.'
    ],
    codeSnippet: `fetch('https://your-endpoint.com/api', {
  method: 'POST',
  body: JSON.stringify({ leadData: "data" })
})`,
    codeLanguage: 'javascript',
  },
  'T1-05': {
    id: 'T1-05',
    docUrl: 'https://docs.netlify.com/configure-builds/file-based-configuration/',
    docTitle: 'Netlify netlify.toml Configuration File Reference',
    steps: [
      'Write `netlify.toml` file mapping correct build directories and redirection routes.',
      'Define security headers ensuring browsers enforce strict CSP structures.'
    ],
    codeSnippet: `[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"`,
    codeLanguage: 'toml',
  },
  'T1-06': {
    id: 'T1-06',
    docUrl: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    docTitle: 'Writing clear README.md project portals',
    steps: [
      'Produce explicit markup file describing software setups.',
      'Provide visual descriptions of SaaS CRM system limits.'
    ],
    codeSnippet: `# Generic SaaS System Core Setup
- Standard Sheet triggers for lead routing.
- Webhook endpoints linked to netlify proxy routes.`,
    codeLanguage: 'markdown',
  },
  'T2-01': {
    id: 'T2-01',
    docUrl: 'https://vite.dev/guide/',
    docTitle: 'Vite Environment Bootstrap Guide',
    steps: [
      'Transition folder assets into typescript files.',
      'Setup development environment routing configurations.'
    ],
    codeSnippet: `npm init vite@latest target-app -- --template react-ts
npm install lucide-react motion recharts`,
    codeLanguage: 'bash',
  },
  'T2-02': {
    id: 'T2-02',
    docUrl: 'https://supabase.com/docs/guides/auth',
    docTitle: 'Supabase Authentication Quick Start',
    steps: [
      'Bootstrap database space inside Supabase Cloud.',
      'Define secure rules tracking leads to protect tables.'
    ],
    codeSnippet: `create table leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text unique
);
alter table leads enable row level security;`,
    codeLanguage: 'sql',
  },
  'T2-03': {
    id: 'T2-03',
    docUrl: 'https://recharts.org/en-US/guide/getting-started',
    docTitle: 'Recharts Quick Start Guide',
    steps: [
      'Build rich metric card visuals displaying project pipelines.',
      'Utilize responsive container hooks protecting dimensions.'
    ],
    codeSnippet: `<ResponsiveContainer width="100%" height={300}>
  <BarChart data={leadData}>
    <Bar dataKey="leads" fill="#2563eb" />
  </BarChart>
</ResponsiveContainer>`,
    codeLanguage: 'javascript',
  },
  'T2-04': {
    id: 'T2-04',
    docUrl: 'https://ai.google.dev/api/sdk-platforms',
    docTitle: 'Google Gen AI SDK Quick Start',
    steps: [
      'Connect front-end search text strings to secure API proxy routes.',
      'Handle markdown representations correctly using suitable tools.'
    ],
    codeSnippet: `import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: 'gemini-1.5-flash',
  contents: 'Analyze this sheet structure...'
});`,
    codeLanguage: 'javascript',
  },
  'T2-05': {
    id: 'T2-05',
    docUrl: 'https://playwright.dev/docs/intro',
    docTitle: 'Playwright E2E testing framework reference',
    steps: [
      'Write end-to-end automation scripts testing form validation features.',
      'Execute tests during build processes to prove system integrity.'
    ],
    codeSnippet: `import { test, expect } from '@playwright/test';

test('has title and submits lead', async ({ page }) => {
  await page.goto('https://your-site.com');
  await page.fill('input[type="email"]', 'test@test.com');
  await page.click('button[type="submit"]');
});`,
    codeLanguage: 'typescript',
  },
};
