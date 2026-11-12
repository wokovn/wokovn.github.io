export const personalInfo = {
  name: "Nguyễn Anh Khoa",
  handle: "wokovn",
  targetTitle: "Full-Stack Software Engineer",
  roles: [
    "FULL-STACK WEB ENGINEER",
    "AI WORKFLOW & BACKEND",
    "DESIGN-FOCUSED FRONTEND"
  ],
  subTitle: "Building fast, reliable web apps and practical AI tools",
  email: "anhkhoa.nguyen4405@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  university: "VNUHCM - University of Science (HCMUS)",
  major: "Information Technology (Software Engineering)",
  graduation: "09/2023 – 09/2027 (Senior)",
  gpa: "3.2 / 4.0",
  github: "https://github.com/wokovn",
  linkedin: "https://www.linkedin.com/in/ng-anh-khoa/",
  customDomain: "https://wokovn.id.vn",
  summary:
    "Full-Stack Engineer (TypeScript, React, Next.js, Node.js). Shipped production AI & HR security tools at ISB Vietnam.",
  recruiterQuickRead: {
    bestFitRoles: [
      "Full-Stack Engineer (TS / React / Node.js)",
      "Frontend Engineer (React / Next.js / Vue 3)",
      "Backend / AI Systems Engineer"
    ],
    highlights: [
      "ISB Vietnam Intern: Shipped AI & security apps in prod",
      "HCMUS IT Senior (GPA 3.2/4.0 · Class of 2027)",
      "54% faster CI · 5.8x AI rows · 23/24 security fixes"
    ],
    languages: "Vietnamese (Native) · English (Professional)"
  }
};

export const coreMetrics = [
  {
    id: "throughput",
    label: "2.4x FASTER UNDER TRAFFIC",
    numericValue: 87.2,
    suffix: " RPS",
    decimals: 1,
    detail: "Served 350 concurrent users cleanly (0.8% errors)",
    badge: "Scalability",
    spark: [24, 31, 36, 48, 63, 74, 87.2]
  },
  {
    id: "tests",
    label: "54% FASTER RELEASE CHECKS",
    numericValue: 5600,
    suffix: "+",
    decimals: 0,
    detail: "Automated tests cutting CI wait 352s → 162s",
    badge: "Quality & CI",
    spark: [42, 48, 55, 68, 79, 91, 100]
  },
  {
    id: "agents",
    label: "~8H WORK CUT TO ~5 MINS",
    numericValue: 5.8,
    suffix: "x",
    decimals: 1,
    detail: "More company data rows analyzed via AI agents",
    badge: "AI Automation",
    spark: [18, 25, 38, 54, 71, 86, 98]
  },
  {
    id: "redos",
    label: "3–18s DELAY → UNDER 0.2s",
    prefix: "<",
    numericValue: 200,
    suffix: "ms",
    decimals: 0,
    detail: "Fixed performance bottleneck + 23 security upgrades",
    badge: "HR Security",
    spark: [96, 84, 62, 44, 28, 19, 12]
  }
];

export const projects = [
  {
    id: "arknet",
    title: "ArkNet: Scalable Social Media Platform",
    tagline: "Built to handle 350 concurrent users smoothly without crashing",
    repo: "https://github.com/wokovn/SocialMediaProject",
    category: "Distributed Systems & Cloud",
    tags: [
      "TypeScript",
      "Node.js (Express 5)",
      "React 19",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis Lua",
      "BullMQ",
      "Socket.IO",
      "Docker",
      "Kubernetes HPA"
    ],
    highlight: "2.42x faster throughput & 35x fewer errors under peak traffic",
    description:
      "Production-grade modular Node.js backend engineered for high concurrency, real-time WebSocket engagement, and non-blocking media pipelines.",
    architecture: [
      { step: "Client", desc: "React 19 web interface with live Socket.IO updates" },
      { step: "Ingress", desc: "Nginx gateway routing traffic & blocking abuse" },
      { step: "Core API", desc: "Stateless Node.js servers scaling automatically (2 → 10 pods)" },
      { step: "Cache", desc: "Redis executing sub-millisecond trending ranking scripts" },
      { step: "Queues", desc: "9 background worker queues keeping user actions snappy" },
      { step: "Database", desc: "PostgreSQL with connection pooling & cloud file storage" }
    ],
    codeSnippet: `-- Atomic Redis Lua time-decay trending score (<1ms)
local score = redis.call('ZSCORE', KEYS[1], ARGV[1])
if not score then score = 0 end
local decayed = tonumber(score) * math.exp(-0.05 * tonumber(ARGV[2]))
local new_score = decayed + tonumber(ARGV[3])
redis.call('ZADD', KEYS[1], new_score, ARGV[1])
return new_score`
  },
  {
    id: "isb-systems",
    title: "AI Company Data Analyst & HR Security (ISB Vietnam)",
    tagline: "Production tools shipped during full-stack internship",
    repo: "https://github.com/wokovn",
    category: "Enterprise AI & Security",
    tags: [
      "TypeScript",
      "Next.js 15",
      "React 19",
      "Vue 3",
      "Node.js",
      "PostgreSQL",
      "HashiCorp Vault",
      "MCP",
      "n8n",
      "Docker"
    ],
    highlight: "Automated hours of manual data work + protected sensitive HR contracts",
    description:
      "Delivered enterprise production systems at ISB Vietnam: Multi-Agent data analysis orchestrator, HashiCorp Vault PII encryption, and 5,600+ automated CI tests."
  },
  {
    id: "eshop-qa-testing",
    title: "EShop Automated Testing & Load Suite",
    tagline: "End-to-end browser, API, and 500-user stress verification",
    repo: "https://github.com/wokovn/Group06_HW2_Testing",
    category: "QA Engineering & Performance",
    tags: ["Playwright", "TypeScript", "Postman", "Newman", "k6", "GitHub Actions", "Allure"],
    highlight: "117 automated browser runs, 150+ API checks, caught 7 real backend bugs",
    description:
      "Multi-layer automated verification harness spanning cross-browser Page Object Model journeys, CI/CD REST contract assertions, and k6 stress profiles."
  },
  {
    id: "petcarex",
    title: "PetCareX: Multi-Branch Veterinary System",
    tagline: "Clean 30+ table database architecture built for zero slowdown",
    repo: "https://github.com/wokovn/PetCareX-ADB-HCMUS",
    category: "Database Engineering",
    tags: ["SQL Server (MSSQL)", "Node.js", "Express 5", "React 19", "Drizzle ORM", "Zod", "Vite"],
    highlight: "Eliminated database index fragmentation across 30+ normalized tables",
    description:
      "Multi-branch veterinary management system designed around ACID transactions, composite indexing, and database-level triggers."
  },
  {
    id: "vietnamese-tts",
    title: "Vietnamese News Reader & AI Voice Pipeline",
    tagline: "Scrapes news, summarizes with Gemini AI, and reads aloud in regional voices",
    repo: "https://github.com/wokovn/Project-LT-ML-23KHDL1-HCMUS",
    category: "AI & Audio Pipeline",
    tags: [
      "React 19",
      "Node.js",
      "Express",
      "Gemini API",
      "Puppeteer",
      "VieNeu-TTS",
      "FFmpeg",
      "Supabase"
    ],
    highlight: "Real Phase 3 AI voice outputs trained on 27.1h Vietnamese speech corpus",
    description:
      "Decoupled media pipeline aggregating news via Brave Search + Puppeteer, generating structured Gemini summaries, and synthesizing regional Vietnamese speech."
  }
];

export const experience = [
  {
    index: "01",
    kind: "WORK EXPERIENCE",
    company: "ISB Vietnam (IVC)",
    role: "Fullstack Software Engineer Intern (AI & Automation)",
    period: "08/2026 – 11/2026 (4 mos)",
    location: "HCMC, Vietnam",
    plainEnglish:
      "Shipped AI data analysis tools, secured enterprise HR contracts, and cut release CI wait time in half.",
    achievements: [
      "~8h → ~5m: Multi-Agent AI checking 5.8x rows (TS, Vue, PG)",
      "23/24 Security Fixes: Next.js 15 HR app + HashiCorp Vault",
      "3–18s → <0.2s: Fixed parser freezes & ~2s webhook alerts",
      "54% Faster CI: 5,600+ Vitest Docker tests (352s → 162s)"
    ]
  },
  {
    index: "02",
    kind: "EDUCATION",
    company: "VNUHCM - University of Science (HCMUS)",
    role: "B.S. in Information Technology (Software Engineering)",
    period: "09/2023 – 09/2027",
    location: "HCMC, Vietnam",
    plainEnglish:
      "Senior IT student (GPA 3.2/4.0) focused on high-concurrency backends, databases, and QA automation.",
    achievements: [
      "Senior IT student (Software Engineering) graduating 2027",
      "Led delivery across ArkNet, EShop QA, PetCareX & News AI",
      "Top grades: Web Dev (9.8), Mobile (9.1), SW Design (8.9)",
      "Core craft: Playwright E2E, k6 load, Redis/BullMQ & SQL"
    ],
    coursework: [
      { code: "CSC13008", name: "Web Application Development", score: 9.8 },
      { code: "CSC13009", name: "Mobile App Development", score: 9.1 },
      { code: "CSC13010", name: "Software Design", score: 8.9 },
      { code: "CSC13005", name: "Requirements Engineering", score: 8.6 },
      { code: "CSC14005", name: "Intro to Machine Learning", score: 8.6 },
      { code: "CSC10003", name: "Object-Oriented Programming", score: 8.6 }
    ]
  }
];

export const skillsData = {
  categories: [
    {
      id: "frontend",
      name: "Frontend & UI",
      skills: [
        {
          name: "TypeScript, React 19 & Next.js 15",
          tag: "Primary Stack",
          project: "ISB & ArkNet",
          desc: "SSR/CSR web apps & interactive flows"
        },
        {
          name: "Vue 3 & Interactive Graphs",
          tag: "Enterprise UI",
          project: "ISB Multi-Agent",
          desc: "Agent telemetry & admin consoles"
        },
        {
          name: "Tailwind CSS & Motion Physics",
          tag: "Design Systems",
          project: "Portfolio & Apps",
          desc: "Design tokens & responsive grids"
        }
      ]
    },
    {
      id: "backend",
      name: "Backend & APIs",
      skills: [
        {
          name: "Node.js (Express 5) & TypeScript",
          tag: "87.2 RPS Verified",
          project: "ArkNet & ISB",
          desc: "REST APIs & ~2s webhook routing"
        },
        {
          name: "Redis & BullMQ Queues",
          tag: "9 Worker Queues",
          project: "ArkNet Platform",
          desc: "Atomic Lua ranking & async workers"
        },
        {
          name: "Real-Time WebSockets (Socket.IO)",
          tag: "Live Updates",
          project: "ArkNet Platform",
          desc: "Presence & multi-server push"
        }
      ]
    },
    {
      id: "ai",
      name: "AI & Automation",
      skills: [
        {
          name: "Multi-Agent Systems (MCP)",
          tag: "~8h Work → 5m",
          project: "ISB Vietnam",
          desc: "Orchestrator + sandboxed sub-agents"
        },
        {
          name: "n8n, Gemini API & Prompting",
          tag: "Workflow Auto",
          project: "ISB & News AI",
          desc: "Structured JSON pipelines"
        },
        {
          name: "Puppeteer Scraping & TTS",
          tag: "27.1h Corpus",
          project: "News AI Voice",
          desc: "News crawl & async audio jobs"
        }
      ]
    },
    {
      id: "database",
      name: "Databases & Security",
      skills: [
        {
          name: "PostgreSQL & Drizzle ORM",
          tag: "Primary Database",
          project: "ArkNet & ISB",
          desc: "Schema design, pooling & migrations"
        },
        {
          name: "HashiCorp Vault & PII Crypto",
          tag: "23/24 Sec Fixes",
          project: "ISB HR Platform",
          desc: "Field DEK wrapping & blind indexes"
        },
        {
          name: "SQL Server (MSSQL)",
          tag: "30+ Table Schema",
          project: "PetCareX",
          desc: "COMB UUID indexes & stored procs"
        }
      ]
    },
    {
      id: "qa",
      name: "QA & Load Engineering",
      skills: [
        {
          name: "Playwright E2E & POM",
          tag: "117 Matrix Runs",
          project: "EShop QA Suite",
          desc: "Cross-browser checkout regression"
        },
        {
          name: "k6 Stress & Newman CI",
          tag: "500-VU Verified",
          project: "ArkNet & EShop",
          desc: "Soak latency & API contract gates"
        },
        {
          name: "Vitest + Testcontainers",
          tag: "5,600+ Tests",
          project: "ISB Vietnam CI",
          desc: "Isolated parallel Postgres suites"
        }
      ]
    },
    {
      id: "cloud",
      name: "Cloud & Infrastructure",
      skills: [
        {
          name: "Kubernetes HPA Scaling",
          tag: "2 → 10 Replicas",
          project: "ArkNet Platform",
          desc: "CPU-based pod autoscaling & health"
        },
        {
          name: "Docker & GitHub Actions",
          tag: "54% Faster CI",
          project: "ISB & EShop QA",
          desc: "Parallel build & artifact pipelines"
        },
        {
          name: "Nginx Gateway & ReDoS Guard",
          tag: "<0.2s Parsing",
          project: "ArkNet & ISB",
          desc: "Rate limits & linear-time regex"
        }
      ]
    }
  ]
};
