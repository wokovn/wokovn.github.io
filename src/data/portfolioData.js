export const personalInfo = {
  name: "Nguyễn Anh Khoa",
  handle: "wokovn",
  targetTitle: "Software Engineer",
  subTitle: "Distributed Backend Services, Full-Stack & Multi-Agent AI Systems",
  phone: "0855811187",
  email: "anhkhoa.nguyen4405@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  university: "VNUHCM - University of Science (HCMUS)",
  major: "Information Technology",
  graduation: "2023 - 2027",
  gpa: "3.2 / 4.0",
  github: "https://github.com/wokovn",
  linkedin: "https://www.linkedin.com/in/ng-anh-khoa/",
  customDomain: "https://wokovn.id.vn",
  summary: "Software Engineer with hands-on industry experience architecting distributed backend services, high-throughput event-driven microservices, and autonomous Multi-Agent AI engines. Strong engineering foundation in TypeScript, Node.js, React 19, Java (Spring Boot), Python (FastAPI), Redis, PostgreSQL, and Kubernetes autoscaling."
};

export const coreMetrics = [
  {
    label: "Peak Stress Throughput",
    value: "87.2 RPS",
    detail: "2.42x boost under 350 VUs (158K+ reqs)",
    badge: "ArkNet Stress Test",
    icon: "zap"
  },
  {
    label: "Automated Test Harness",
    value: "5,600+",
    detail: "Unit & integration tests cut by 2x runtime",
    badge: "Vitest + Docker CI",
    icon: "check-circle"
  },
  {
    label: "Multi-Agent Data Throughput",
    value: "5.8x",
    detail: "Rows analyzed (hours down to ~5 mins)",
    badge: "ISB Vietnam Engine",
    icon: "cpu"
  },
  {
    label: "ReDoS & PII Optimization",
    value: "<200ms",
    detail: "Down from 3-18s with Vault wrapped DEK",
    badge: "Vault + Regex Tuning",
    icon: "shield"
  }
];

export const projects = [
  {
    id: "arknet",
    title: "ArkNet: Scalable Distributed Social Platform",
    tagline: "Microservices backend with hybrid push/pull feed, Redis Lua trending, and Kubernetes HPA",
    repo: "https://github.com/wokovn/SocialMediaProject",
    category: "Distributed Systems & Cloud",
    tags: ["TypeScript", "Node.js (Express 5)", "React 19", "PostgreSQL", "Drizzle ORM", "Redis", "BullMQ", "Socket.IO", "Docker", "Kubernetes"],
    highlight: "87.2 RPS under 350 concurrent users with 0 downtime fallback",
    description: "A production-grade, microservices-oriented social platform engineered for high concurrency, real-time engagement, and resilient background media processing.",
    architecture: [
      { step: "Client", desc: "React 19 SPA (Vite) with Socket.IO client" },
      { step: "Ingress", desc: "Nginx reverse proxy with path-based routing & rate limiting" },
      { step: "Core API", desc: "Express 5 stateless backend pods scaled with Kubernetes HPA (2 to 10 replicas)" },
      { step: "Cache & PubSub", desc: "Redis cluster with atomic Lua scripts for time-decayed ranking & feed cache" },
      { step: "Job Queue", desc: "9 BullMQ asynchronous worker queues for fanout, ranking, like/comment sync & media" },
      { step: "Storage & DB", desc: "PostgreSQL (Supabase) with transactional connection pooling & Supabase S3" }
    ],
    benchmarks: {
      baseline: { rps: 36.0, errorRate: "28.4%", mediaSuccess: "34.5%", pods: 2 },
      optimized: { rps: 87.2, errorRate: "0.8%", mediaSuccess: "86.2%", pods: "Up to 10 (HPA)" }
    },
    codeSnippet: `-- Time-decayed ranking atomic Lua script in Redis
local score = redis.call('ZSCORE', KEYS[1], ARGV[1])
if not score then score = 0 end
local new_score = (tonumber(score) * math.exp(-0.05 * tonumber(ARGV[2]))) + tonumber(ARGV[3])
redis.call('ZADD', KEYS[1], new_score, ARGV[1])
return new_score`
  },
  {
    id: "vietnamese-tts",
    title: "News Summary & Vietnamese Regional TTS System",
    tagline: "Full-Stack AI & GPU Voice Synthesis with dialect support (Bắc, Trung, Nam)",
    repo: "https://github.com/wokovn/Project-LT-ML-23KHDL1-HCMUS",
    category: "AI & Audio Engineering",
    tags: ["React 19", "Node.js", "Express", "FastAPI", "Python", "PyTorch (CUDA)", "Gemini API", "Puppeteer", "FFmpeg", "Supabase"],
    highlight: "27.1h Vietnamese speech corpus EDA + multi-dialect neural synthesis runtime",
    description: "A multi-service platform combining real-time news scraping, Gemini AI context-aware summarization, and GPU-accelerated Vietnamese speech synthesis with regional dialect adaptability.",
    architecture: [
      { step: "Crawler", desc: "Brave Search API + Puppeteer headless scraper" },
      { step: "AI Summarizer", desc: "Google Gemini API context-aware structured summarizer" },
      { step: "FastAPI Engine", desc: "GPU-accelerated PyTorch (CUDA) vnTTS neural inference server" },
      { step: "Transcoder", desc: "FFmpeg pipeline converting WAV to streaming MP3 (64k)" },
      { step: "Audio Storage", desc: "Supabase public audio buckets with streaming playback" }
    ],
    dialects: [
      { name: "Giọng Bắc (Hà Nội)", sampleText: "Chào mừng bạn đến với hệ thống tóm tắt tin tức tự động và tổng hợp giọng nói tiếng Việt.", pitch: "Trong trẻo, chuẩn âm sắc" },
      { name: "Giọng Trung (Huế)", sampleText: "Dạ thưa quý vị, đây là bản tin tổng hợp kinh tế xã hội được AI xử lý tức thì.", pitch: "Trầm ấm, âm sắc đặc trưng miền Trung" },
      { name: "Giọng Nam (Sài Gòn)", sampleText: "Xin chào cả nhà, hôm nay công nghệ AI đã có thể chuyển toàn bộ bài báo thành giọng nói siêu mượt.", pitch: "Phóng khoáng, tự nhiên, gần gũi" }
    ]
  },
  {
    id: "isb-systems",
    title: "Multi-Agent Engine & Enterprise HR Platform",
    tagline: "Production systems built during internship at ISB Vietnam",
    repo: "https://github.com/wokovn",
    category: "Enterprise AI & Systems",
    tags: ["TypeScript", "Next.js 15", "React 19", "Vue 3", "Node.js", "Java 21", "Spring Boot 4", "HashiCorp Vault", "n8n", "vLLM", "Docker"],
    highlight: "Multi-Agent decomposition engine + Vault-managed field-level PII encryption",
    description: "Architected enterprise-grade systems at ISB Vietnam, delivering high-impact Multi-Agent query decomposition, high-security PII encryption, and massive test suite optimization.",
    features: [
      {
        title: "Multi-Agent Deep-Analysis Engine",
        detail: "Lead Agent decomposes complex business queries and delegates to parallel Helper Agents with in-memory SQLite sandboxes and automated citation verification, boosting analyzed data rows by 5.8x and cutting analysis time from hours to ~5 minutes."
      },
      {
        title: "Vault-Managed PII Encryption with Blind Indexing",
        detail: "Engineered field-level encryption with wrapped Data Encryption Keys (DEK) and HMAC blind indexing, allowing exact searches on encrypted PII without decrypting entire tables."
      },
      {
        title: "ReDoS & Performance Tuning",
        detail: "Optimized vulnerable Catastrophic Backtracking regex patterns in contract parsers, dropping execution latency from 3-18 seconds down to under 200ms."
      },
      {
        title: "5,600+ Test Harness & CI/CD",
        detail: "Constructed isolated per-worker Docker PostgreSQL containers for parallel testing, cutting full pipeline execution from 352s down to 162s."
      }
    ]
  },
  {
    id: "petcarex",
    title: "PetCareX: Database-First Multi-Branch System",
    tagline: "Advanced 3NF relational schema, indexing strategies, and automated triggers",
    repo: "https://github.com/wokovn/PetCareX-ADB-HCMUS",
    category: "Database Engineering",
    tags: ["SQL Server (MSSQL)", "Node.js", "Express 5", "React 19", "Drizzle ORM", "Zod", "Vite"],
    highlight: "30+ entities 3NF normalization with Sequential UUID index optimization",
    description: "A comprehensive veterinary clinic management system engineered for strict ACID transactions, complex check constraints, and high-volume query efficiency across multiple branches.",
    features: [
      {
        title: "Index Fragmentation Mitigation",
        detail: "Adopted Sequential UUIDs (COMB) to prevent random B-Tree page splits, coupled with composite clustered and non-clustered indexes on high-frequency join keys."
      },
      {
        title: "Automated Triggers & Stored Procs",
        detail: "Encapsulated real-time inventory synchronization, tiered customer loyalty updates, and audit trails directly in the database layer for atomic consistency."
      }
    ]
  },
  {
    id: "microservices-testing",
    title: "EShop Microservices Automated QA Harness",
    tagline: "End-to-end testing, API regression, and stress testing with CI/CD integration",
    repo: "https://github.com/wokovn/Group06_HW2_Testing",
    category: "QA Engineering & CI/CD",
    tags: ["Playwright", "Postman", "Newman", "Apache JMeter", "GitHub Actions", "Docker"],
    highlight: "Automated E2E test suites + JMeter stress tests integrated into CI/CD pipelines",
    description: "A multi-layer test suite covering cross-browser UI journeys, REST API contract regressions, and high-concurrency JMeter load testing."
  }
];

export const experience = [
  {
    company: "ISB Vietnam",
    role: "Fullstack Software Engineer Intern (Backend, Full-Stack & AI Systems)",
    period: "08/2026 - 11/2026",
    location: "Ho Chi Minh City, Vietnam",
    summary: "Engineered core backend platforms, Multi-Agent query engines, security infrastructures, and automated testing pipelines for production enterprise applications.",
    achievements: [
      "Architected a Multi-Agent Orchestration Engine (TypeScript, Vue 3, PostgreSQL, MCP) with Lead/Helper agent decomposition and SQLite sandbox, boosting analyzed rows by 5.8x.",
      "Built enterprise HR contract renewal platform (Next.js 15, React 19, Node.js) with Vault-managed field-level PII encryption (wrapped DEK) and HMAC blind indexing.",
      "Optimized ReDoS regex bottlenecks (cutting parsing latency from 3-18s down to <200ms) and webhook event routing (1 minute down to ~2s).",
      "Constructed a 1-to-N Bulk CV Screening & Matching Engine in Java 21 / Spring Boot 4 / MyBatis with Grouped Rollups APIs eliminating N+1 queries.",
      "Built the automated testing harness with 5,600+ tests (Vitest + Docker test containers), cutting CI/CD runtime from 352s to 162s."
    ]
  },
  {
    company: "VNUHCM - University of Science (HCMUS)",
    role: "Bachelor of Information Technology",
    period: "09/2023 - 2027",
    location: "Ho Chi Minh City, Vietnam",
    summary: "Top national university for computer science in Vietnam. Maintained a 3.2 / 4.0 GPA while spearheading high-concurrency distributed systems and AI research projects.",
    achievements: [
      "Specialized in Software Engineering, Advanced Database Systems, and Distributed Computing.",
      "Lead developer for multiple capstone-level projects: ArkNet (Distributed Social Platform), Vietnamese Regional TTS & News AI.",
      "Recognized for top performance in Advanced Database Optimization and Automated Testing."
    ]
  }
];

export const skillsData = {
  categories: [
    {
      id: "backend",
      name: "Backend & Distributed",
      skills: [
        { name: "Node.js & Express 5", level: "Advanced", desc: "Stateless microservices, REST APIs, streaming, auth" },
        { name: "TypeScript / JavaScript", level: "Advanced", desc: "Type-safe architectures, async pipelines, strict typing" },
        { name: "Java 21 & Spring Boot 4", level: "Proficient", desc: "Enterprise services, MyBatis, RBAC, Grouped Rollups" },
        { name: "Python & FastAPI", level: "Proficient", desc: "Asynchronous API gateways, ML/TTS model serving" },
        { name: "WebSockets & Socket.IO", level: "Proficient", desc: "Real-time notifications, presence, Redis adapter" }
      ]
    },
    {
      id: "database",
      name: "Databases & In-Memory",
      skills: [
        { name: "PostgreSQL & Drizzle ORM", level: "Advanced", desc: "Relational modeling, migrations, connection pooling" },
        { name: "Redis & BullMQ", level: "Advanced", desc: "Atomic Lua scripts, pipelines, 9 async worker queues" },
        { name: "SQL Server (MSSQL)", level: "Proficient", desc: "3NF design, Sequential UUIDs, Triggers, Stored Procs" },
        { name: "In-Memory SQLite", level: "Proficient", desc: "Isolated sandboxes for safe agent data analysis" }
      ]
    },
    {
      id: "ai",
      name: "AI & Agent Systems",
      skills: [
        { name: "Multi-Agent Systems (MCP)", level: "Advanced", desc: "Lead/Helper decomposition, parallel tool delegation" },
        { name: "LLM APIs & Prompt Eng", level: "Advanced", desc: "Gemini SDK, vLLM, Ollama, context-aware summarization" },
        { name: "Neural TTS & PyTorch", level: "Proficient", desc: "vnTTS, XTTSv2, regional Vietnamese voice synthesis" }
      ]
    },
    {
      id: "frontend",
      name: "Frontend & UI Engineering",
      skills: [
        { name: "React 19 & Next.js 15", level: "Advanced", desc: "Server components, modern hooks, state management" },
        { name: "Tailwind CSS & Modern CSS", level: "Advanced", desc: "Responsive glassmorphism, dark aesthetic, animations" },
        { name: "Vue 3 & Angular 21", level: "Proficient", desc: "Enterprise dashboard components, state reactivity" },
        { name: "Vite & Modern Tooling", level: "Advanced", desc: "Zero-latency HMR, production bundling" }
      ]
    },
    {
      id: "devops",
      name: "DevOps, Cloud & QA",
      skills: [
        { name: "Docker & Containerization", level: "Advanced", desc: "Multi-stage builds, compose orchestration" },
        { name: "Kubernetes (K8s HPA)", level: "Proficient", desc: "Horizontal Pod Autoscaler (2-10 pods), Ingress routing" },
        { name: "Automated QA & Vitest", level: "Advanced", desc: "5,600+ test suite, Docker test containers, Playwright" },
        { name: "HashiCorp Vault & Security", level: "Proficient", desc: "Field-level PII wrapped DEK, blind indexing, ReDoS fix" }
      ]
    }
  ]
};

