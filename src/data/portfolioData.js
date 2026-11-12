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
    "Full-Stack Software Engineer building fast, reliable web applications and AI automation tools, with hands-on production delivery at ISB Vietnam across TypeScript, Node.js, React, Next.js, Vue 3, PostgreSQL, and Docker.",
  recruiterQuickRead: {
    bestFitRoles: [
      "Full-Stack Software Engineer (TypeScript / React / Node.js)",
      "Frontend Engineer (React / Next.js / Vue 3)",
      "Backend / AI Systems Engineer"
    ],
    highlights: [
      "Production internship at ISB Vietnam delivering secure HR & AI analytics products",
      "Strong CS foundation at VNUHCM-US (HCMUS), GPA 3.2/4.0, graduating 2027",
      "Delivered measurable wins: 54% faster CI checks, 5.8x AI data coverage, 23 security fixes"
    ],
    languages: "Vietnamese (Native) · English (Professional working proficiency)"
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
    location: "Ho Chi Minh City, Vietnam",
    plainEnglish:
      "Built internal AI data analysis tools, secured sensitive employee contract systems, and sped up the engineering team's automated release checks by half.",
    achievements: [
      "Built a Multi-Agent AI Analysis Assistant (TypeScript, Vue 3, PostgreSQL) that turned ~8 hours of manual data analysis into ~5 minutes while checking 5.8x more data rows.",
      "Delivered the enterprise HR Contract Renewal app (Next.js 15, React 19, Node.js) with field-level PII encryption (HashiCorp Vault) and resolved 23/24 security audit findings.",
      "Fixed slow text-parsing bottlenecks (3–18 seconds cut to under 0.2 seconds) and sped up webhook notifications from ~1 minute to ~2 seconds.",
      "Created a 5,600+ automated test suite using isolated Docker databases, cutting CI wait times by 54% (352s → 162s) for every team deployment."
    ]
  },
  {
    index: "02",
    kind: "EDUCATION",
    company: "VNUHCM - University of Science (HCMUS)",
    role: "B.S. in Information Technology (Software Engineering)",
    period: "09/2023 – 09/2027",
    location: "Ho Chi Minh City, Vietnam",
    plainEnglish:
      "Senior-year IT student (GPA 3.2 / 4.0) specializing in Software Engineering, high-concurrency web systems, and database architecture.",
    achievements: [
      "Led architecture and full-stack delivery across capstone team projects: ArkNet (Social Platform), EShop QA Suite, PetCareX Database System, and News AI Voice.",
      "Strong practical coursework results: Web Development (9.8/10), Mobile App Development (9.1/10), Software Design (8.9/10), and Machine Learning (8.6/10).",
      "Applied engineering best practices across automated E2E browser testing (Playwright), CI API contract verification, and load benchmarking."
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
      name: "Frontend & UI Craft",
      skills: [
        {
          name: "TypeScript, React 19 & Next.js 15",
          tag: "Primary Stack",
          project: "ISB & ArkNet",
          desc: "Responsive web interfaces, clean state management, server/client rendering, and accessible interactive flows."
        },
        {
          name: "Vue 3 & Interactive Workflows",
          tag: "Enterprise UI",
          project: "ISB Multi-Agent",
          desc: "Visual agent execution graphs, recovery dashboards, and internal enterprise admin consoles."
        },
        {
          name: "Tailwind CSS & Motion Physics",
          tag: "Design Systems",
          project: "Portfolio & Apps",
          desc: "Consistent design tokens, spring animations, HiDPI vector graphics, and mobile-first responsive layouts."
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
          desc: "Scalable REST APIs, webhook event routing (~1m → ~2s), and secure input validation."
        },
        {
          name: "Redis & BullMQ Background Jobs",
          tag: "9 Worker Queues",
          project: "ArkNet Platform",
          desc: "Caching, fast feed ranking scripts, and background job processing so user pages stay fast."
        },
        {
          name: "Real-Time WebSockets (Socket.IO)",
          tag: "Live Updates",
          project: "ArkNet Platform",
          desc: "Instant live notifications, presence, and multi-server messaging."
        }
      ]
    },
    {
      id: "ai",
      name: "AI Tools & Automation",
      skills: [
        {
          name: "Multi-Agent Systems (MCP)",
          tag: "~8h Work → 5m",
          project: "ISB Vietnam",
          desc: "Coordinating multiple specialized AI agents with isolated data sandboxes and automated fact checks."
        },
        {
          name: "n8n, Gemini API & Prompt Design",
          tag: "Workflow Auto",
          project: "ISB & News AI",
          desc: "End-to-end automated workflows connecting web data, LLMs, and reliable JSON outputs."
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
          desc: "Clean relational table design, connection pooling, and safe schema migrations."
        },
        {
          name: "HashiCorp Vault & Data Protection",
          tag: "23/24 Sec Fixes",
          project: "ISB HR Platform",
          desc: "Encrypting sensitive employee PII fields while still keeping exact database search fast."
        },
        {
          name: "SQL Server (MSSQL)",
          tag: "30+ Table Schema",
          project: "PetCareX",
          desc: "Normalized relational modeling, index optimization, triggers, and stored procedures."
        }
      ]
    },
    {
      id: "devops",
      name: "Cloud, DevOps & Automated QA",
      skills: [
        {
          name: "Docker & Kubernetes Scaling",
          tag: "2 → 10 Replicas",
          project: "ArkNet & ISB CI",
          desc: "Containerized apps, automatic server scaling during traffic spikes, and fast CI test containers."
        },
        {
          name: "Playwright, Vitest & k6 Testing",
          tag: "5,600+ Tests",
          project: "ISB & EShop QA",
          desc: "Automated browser journeys, API checks, and high-concurrency stress tests before shipping."
        }
      ]
    }
  ]
};
