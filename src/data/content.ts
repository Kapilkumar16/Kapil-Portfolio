// Every word on the site lives in this file. Edit copy here, not in components.

const titles = ['AI Engineer', 'Python Developer', 'Software Developer']

export const profile = {
  name: 'Kapil Kumar',
  titles,
  role: titles.join(' · '),
  location: 'Gurugram, Haryana',
  email: 'kapil10kumar2004@gmail.com',
  links: {
    github: 'https://github.com/Kapilkumar16',
    linkedin: 'https://linkedin.com/in/kapil-kumar-3b8748249',
    excelmind: 'https://excelmind.kapilp.tech',
    applypilot: 'https://applypilot.kapilp.tech',
  },
}

export const nav = [
  { id: 'applypilot', label: 'ApplyPilot' },
  { id: 'excelmind', label: 'ExcelMind' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  title: 'Kapil Kumar.',
  lead:
    'I build production agent systems — LangGraph workflows, RAG pipelines and voice agents taking 50,000+ calls a month — and the evaluation tooling that keeps them honest.',
  caption: 'Inbound scheduling call, voice agent trace',
}

export type Spec = { value: string; label: string; note?: string }

export const numbers: { title: string; lead: string; specs: Spec[] } = {
  title: 'Performance data.',
  lead: 'Measured in production and in CI, not in a notebook.',
  specs: [
    { value: '50,000+', label: 'Calls a month', note: 'Voice agents, Aviara Labs' },
    { value: '100k+', label: 'Minutes a month', note: 'Full-duplex, live transfers' },
    { value: '20 → 8', label: 'Minutes to book', note: 'Scheduling time, −60%' },
    { value: '~50×', label: 'Faster parse', note: 'ExcelMind ingestion' },
    { value: '<100 ms', label: 'Query latency', note: 'Multi-million-row sheets' },
    { value: '98%', label: 'NL → SQL accuracy', note: 'ExcelMind eval, 51 of 52' },
    { value: '9', label: 'ATS connectors', note: 'Keyless, incl. Workday' },
  ],
}

export type Featured = {
  id: string
  eyebrow: string
  title: string
  lead: string
  status: string
  caption: string
  claims: { title: string; body: string }[]
  specs: Spec[]
  notesLead: string
  notes: { tag: string; title: string; body: string }[]
  stack: string[]
  link: { label: string; href: string }
}

export const applypilot: Featured = {
  id: 'applypilot',
  eyebrow: 'Featured project · 2026',
  title: 'ApplyPilot.',
  lead:
    'ApplyPilot helps with job applications from start to finish. It collects openings from company job boards, gives you a résumé editor in the browser that works like Overleaf, and suggests edits to fit a specific job description. Nothing changes until you approve it.',
  status: 'Most of the plan is built and live, including LaTeX support. A browser extension is still to come.',
  caption: 'Illustration of the tailor view. Figures shown are examples.',
  claims: [
    {
      title: 'It checks the real PDF.',
      body:
        "Most résumé tools give you an ATS score without saying where it came from. ApplyPilot compiles your PDF and reads the text back with two different parsers, then shows what each one picked up. Every result is marked measured, estimated or not measurable. ATS ranking is marked not measurable, because no ATS shares that.",
    },
    {
      title: "It won't make things up.",
      body:
        "When a bullet is rewritten for a job, ApplyPilot compares it with what your résumé already says. If the new version adds a number, tool or employer you can't back up, it gets flagged and can't be exported until you edit or accept it. The check is rule-based, so it works the same whether a template or an LLM wrote the line.",
    },
    {
      title: 'Scores you can explain.',
      body:
        "A match isn't one percentage. It's split into eight parts, such as required skills, location and seniority, and you can change how much each one counts. Every job in the daily feed shows why it ranked where it did and what it's missing.",
    },
  ],
  specs: [
    { value: '623', label: 'Tests' },
    { value: '9', label: 'ATS feeds' },
    { value: '43', label: 'Verified boards' },
    { value: '8', label: 'Match dimensions' },
  ],
  notesLead: 'Five engineering decisions, in brief.',
  notes: [
    {
      tag: 'Discovery',
      title: 'A Workday connector that reads the facets.',
      body:
        'Filters by country at the source (Mastercard: 1,057 → 237 India roles) and stops trusting a total capped at 2,000 — behind which Accenture had 38,277 open India roles. Past the cap it searches for the work by name.',
    },
    {
      tag: 'Tailoring',
      title: 'A redline that cannot show invented text.',
      body:
        'Word-level diffs computed server-side, with pinned invariants: the kept and removed runs must reassemble into exactly the original, kept and added into exactly the proposal.',
    },
    {
      tag: 'Editor',
      title: 'Your own .tex, compiled and edited in place.',
      body:
        'Tectonic compiles pasted LaTeX with a pdfTeX → XeTeX shim for Overleaf templates. Accepted bullets are written back into the source; a bullet it cannot locate is reported, never appended somewhere plausible.',
    },
    {
      tag: 'Ranking',
      title: 'One employer cannot own the feed.',
      body:
        'One company had taken 1,019 of 1,611 matches. A per-company cap applied with a SQL window function before paging keeps page 2 from repeating or skipping what page 1 removed.',
    },
    {
      tag: 'Sourcing',
      title: 'Never crawls LinkedIn, Indeed or Naukri.',
      body:
        'Their terms forbid it. Jobs come from public ATS feeds, JSON-LD career sites with robots.txt honoured, and licensed aggregator APIs.',
    },
  ],
  stack: [
    'FastAPI',
    'PostgreSQL + pgvector',
    'Redis',
    'Celery',
    'Alembic',
    'Typst',
    'Tectonic',
    'Next.js',
    'Docker Compose',
    'GitHub Actions',
    'Azure',
    'Vercel',
  ],
  link: { label: 'Visit ApplyPilot', href: 'https://applypilot.kapilp.tech' },
}

export const excelmind: Featured = {
  id: 'excelmind',
  eyebrow: 'Featured project · 2025',
  title: 'ExcelMind.',
  lead:
    'ExcelMind makes large spreadsheets usable in the browser. You upload a file of up to 200 MB, it is ready in a few seconds, and then you can scroll, filter, chart or ask questions about millions of rows without waiting.',
  status: 'The backend and workers run on an Azure VM. The React frontend is hosted on Vercel.',
  caption: 'Illustration of the chat view over a sheet. Figures shown are examples.',
  claims: [
    {
      title: 'Uploads skip the API.',
      body:
        "The browser uploads the file in 10 MB chunks straight to Azure Blob Storage using signed URLs, so the API server never handles the file itself. A background worker then reads the workbook with python-calamine and Polars, about 50 times faster than openpyxl, saves each sheet as a Parquet file, and reports progress to the browser over SSE.",
    },
    {
      title: 'Fast on millions of rows.',
      body:
        "Postgres only stores details about each file. The rows themselves stay in Parquet, and DuckDB queries them directly. Every sort, filter and page request becomes a parameterised SQL query, and because Parquet keeps statistics for each column, DuckDB can skip the parts it doesn't need. Pages come back in under 100 ms.",
    },
    {
      title: 'Chat can only read your sheet.',
      body:
        "When you ask a question, the model writes SQL against a single table called data. Before it runs, sqlglot checks that it's a plain SELECT, and the backend decides which file it reads. So even if someone tricks the model with a clever prompt, the most it can do is read the sheet that user already has.",
    },
  ],
  specs: [
    { value: '200 MB', label: 'Max upload' },
    { value: '~50×', label: 'Faster parse' },
    { value: '<100 ms', label: 'Page fetches' },
  ],
  notesLead: 'Six engineering decisions, in brief.',
  notes: [
    {
      tag: 'Chat',
      title: 'Small talk costs zero tokens.',
      body:
        'A deterministic triage catches greetings, thanks and "what can you do" before either LLM call. Off-topic or ambiguous questions come back with suggestions built from the sheet’s real columns — never an empty reply.',
    },
    {
      tag: 'Agent',
      title: 'A LangGraph deep mode behind the same guard.',
      body:
        'Multi-step questions run plan → decide → execute_sql → observe → synthesize. Every inner query goes through the same sql_guard path, the loop stops hard at a step limit, and state is checkpointed in Postgres.',
    },
    {
      tag: 'Dashboards',
      title: 'The model drafts a spec, never SQL.',
      body:
        'Widgets are declarative specs checked against real columns, then compiled to parameterized SQL. No key or a bad draft falls back to a deterministic builder, and a view-only link can run only the widgets already saved.',
    },
    {
      tag: 'Evals',
      title: 'Measured, with the one miss kept in.',
      body:
        '52 cases through the real ChatService → sql_guard → DuckDB path score 98% exact match. The single failure is a genuine model limitation, left in as an honest failing case. CI fails the build below threshold.',
    },
    {
      tag: 'Observability',
      title: 'One upload, one trace.',
      body:
        'OpenTelemetry to Tempo, Prometheus to Grafana, and logs correlated by request and trace id. An upload is a single trace spanning the API request and its worker job, with every ingest stage as a child span.',
    },
    {
      tag: 'Debugging',
      title: 'A certificate path from the wrong distro.',
      body:
        'DuckDB’s azure extension links a libcurl built with the RHEL CA path, which does not exist on Debian — so Parquet reads failed while the Python SDK worked. Fixed by installing ca-certificates and symlinking the bundle.',
    },
  ],
  stack: [
    'FastAPI',
    'Arq',
    'Polars + calamine',
    'Parquet',
    'DuckDB',
    'PostgreSQL + pgvector',
    'Redis',
    'Azure Blob',
    'Groq',
    'LangGraph',
    'sqlglot',
    'SSE',
    'OpenTelemetry',
    'React + TypeScript',
    'Docker Compose',
    'Caddy',
  ],
  link: { label: 'Visit ExcelMind', href: 'https://excelmind.kapilp.tech' },
}

export type ProjectVisual = 'contract' | 'telemetry'

export type Project = {
  id: string
  tag: string
  year: string
  title: string
  body: string
  stack: string[]
  visual: ProjectVisual
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'contract-intelligence',
    tag: 'RAG · API',
    year: 'Aug 2025',
    title: 'Contract Intelligence API',
    body:
      'A RAG document-intelligence API: PDF ingestion, chunking and embedding, field extraction and retrieval-grounded Q&A across multiple LLM providers, with SSE streaming and webhook callbacks. Its LLM risk-audit engine falls back to regex, so it degrades gracefully under outages and rate limits.',
    stack: ['FastAPI', 'RAG', 'Embeddings', 'Redis', 'SSE', 'Docker'],
    visual: 'contract',
    links: [
      { label: 'GitHub', href: 'https://github.com/Kapilkumar16/contract-intelligence-api' },
    ],
  },
  {
    id: 'process-monitor',
    tag: 'Backend · Realtime',
    year: 'Oct 2025',
    title: 'Process Monitor Agent',
    body:
      'Cross-platform time-series monitoring. A lightweight psutil agent streams CPU, memory and PID-hierarchy metrics to a Django REST API with per-host API-key auth, backed by historical range queries and real-time WebSocket fan-out over Django Channels and Redis.',
    stack: ['Python', 'DRF', 'Channels', 'WebSockets', 'Redis', 'psutil'],
    visual: 'telemetry',
    links: [
      { label: 'GitHub', href: 'https://github.com/Kapilkumar16/Process-monitoring-agent' },
    ],
  },
]

export const experience = {
  eyebrow: 'Experience',
  title: 'In production.',
  caption: 'Scheduling agent and the VoiceQA loop that measures it',
  roles: [
    {
      company: 'Aviara Labs',
      title: 'Associate Software Engineer',
      dates: 'Dec 2025 — Present',
      location: 'Noida',
      bullets: [
        'Build and run low-latency, full-duplex ElevenLabs voice agents for healthcare clinics — scheduling actions and live call transfers across 50,000+ calls and 100k+ minutes a month.',
        'Designed multi-agent LangGraph workflows for a healthcare scheduling platform — multi-turn state, tool use and context-aware planning across FastAPI and Django services — cutting appointment scheduling from 20 minutes to 8.',
        'Built VoiceQA, an agent evaluation service: it fires scenario-driven test calls, ingests transcripts by webhook, scores them through a two-stage LLM pipeline (free-form analysis → structured pass/fail rubric), stores every run in PostgreSQL and reports pass rates and regressions over REST and CLI.',
        'Made VoiceQA reusable infrastructure: onboarding a new agent takes one declarative scenario file and zero changes to telephony, evaluation or reporting.',
        'Integrated external tools and automations (Make.com, n8n) across CRM and backend systems; shipped with Docker, GitHub Actions CI/CD and JWT-secured APIs.',
      ],
    },
    {
      company: 'Air India Limited',
      title: 'Apprentice, Data Analytics',
      dates: 'Oct 2025 — Dec 2025',
      location: 'Gurugram',
      bullets: [
        'Collected, cleaned, transformed and validated business and financial datasets from multiple sources with Python (Pandas, NumPy), SQL and Excel.',
        'Built interactive Power BI dashboards that turned raw multi-source data into business intelligence for non-technical stakeholders.',
      ],
    },
  ],
  education: {
    school: 'College of Engineering Roorkee',
    degree: 'B.Tech, Computer Science and Engineering',
    dates: 'Sep 2021 — Jun 2025',
    location: 'Roorkee',
  },
  certifications: [
    { name: 'Django Full Stack Development', issuer: 'Udemy' },
    { name: 'Data Visualization', issuer: 'TATA (Forage)' },
  ],
}

export type Skill = { name: string; where: string }

export const stack: { id: string; label: string; skills: Skill[] }[] = [
  {
    id: 'agentic',
    label: 'Agentic AI',
    skills: [
      { name: 'LangGraph', where: 'Multi-agent orchestration, checkpointed state — scheduling platform, ExcelMind' },
      { name: 'LangChain', where: 'Tool use, memory, retrieval chains' },
      { name: 'Agent evaluation', where: 'VoiceQA — scenario runs, two-stage LLM scoring' },
      { name: 'ElevenLabs Voice AI', where: 'Full-duplex voice agents, live call transfer' },
      { name: 'Prompt engineering', where: 'Personas, routing logic, tool-use behaviour' },
      { name: 'Groq API', where: 'llama-3.3-70b inference in ExcelMind' },
    ],
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    skills: [
      { name: 'RAG architecture', where: 'Contract Intelligence API, ExcelMind' },
      { name: 'pgvector', where: 'Column-embedding retrieval for schema-aware context' },
      { name: 'sentence-transformers', where: 'Embeddings for semantic search' },
      { name: 'sqlglot guardrails', where: 'AST-level validation of generated SQL' },
      { name: 'Fallback design', where: 'Regex fallback under LLM outages and rate limits' },
      { name: 'Provenance checks', where: 'ApplyPilot verifier — no unsupported claims' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'FastAPI', where: 'VoiceQA, ExcelMind, ApplyPilot, Contract Intelligence' },
      { name: 'Django / DRF', where: 'Scheduling platform, Process Monitor Agent' },
      { name: 'Pydantic v2', where: 'Typed request and response models' },
      { name: 'SQLAlchemy 2.0 + Alembic', where: 'Async ORM, versioned migrations' },
      { name: 'WebSockets / SSE', where: 'Django Channels fan-out, streamed answers' },
      { name: 'JWT & API-key auth', where: 'Role-scoped access, per-host keys' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    skills: [
      { name: 'PostgreSQL', where: 'Primary store across services' },
      { name: 'DuckDB + Parquet', where: 'In-process analytics, sub-100 ms queries' },
      { name: 'Polars', where: 'Columnar ingestion, ~50× faster than openpyxl' },
      { name: 'Pandas / NumPy', where: 'Cleaning and validation, Air India' },
      { name: 'Redis', where: 'Rate limiting, channel layers, queues' },
      { name: 'Power BI', where: 'Dashboards for non-technical stakeholders' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'Azure', where: 'VM, Blob Storage, PostgreSQL' },
      { name: 'Docker / Compose', where: 'Every service, local to production' },
      { name: 'GitHub Actions', where: 'Lint, migrations, tests against real Postgres' },
      { name: 'Nginx + Caddy', where: 'Reverse proxy, automatic HTTPS' },
      { name: 'Cloudflare', where: 'DNS and routing for kapilp.tech' },
      { name: 'Make.com / n8n', where: 'Workflow automation across external APIs' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', where: 'OOP, async, data structures — daily driver' },
      { name: 'SQL', where: 'PostgreSQL, DuckDB, window functions' },
      { name: 'TypeScript', where: 'React and Next.js frontends' },
      { name: 'Java', where: 'Data structures and algorithms' },
    ],
  },
]

export const resume = {
  href: '/resume/kapil_kumar_resume.pdf',
  // Name the file gets when saved.
  filename: 'kapil_kumar_resume.pdf',
}

export const contact = {
  title: "Let's talk.",
  lead: 'Open to conversations about agentic AI, backend platforms and voice systems.',
}
