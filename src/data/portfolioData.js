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
  summary: "Software Engineer with hands-on industry experience architecting distributed backend services, high-throughput event-driven modular backend, and autonomous Multi-Agent AI engines. Strong engineering foundation in TypeScript, Node.js, React 19, Java (Spring Boot), Python (FastAPI), Redis, PostgreSQL, and Kubernetes autoscaling."
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
    tagline: "Stateless Express 5 backend with hybrid push/pull feed, Redis Lua trending, and Kubernetes HPA",
    repo: "https://github.com/wokovn/SocialMediaProject",
    category: "Distributed Systems & Cloud",
    tags: ["TypeScript", "Node.js (Express 5)", "React 19", "PostgreSQL", "Drizzle ORM", "Redis", "BullMQ", "Socket.IO", "Docker", "Kubernetes"],
    highlight: "87.2 RPS under 350 concurrent users with 0 downtime fallback",
    description: "A production-grade, modular Node.js backend engineered for high concurrency, real-time engagement via WebSockets, and resilient background media processing.",
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
      { step: "Transcoder", desc: "FFmpeg pipeline converting WAV to MP3 audio (64k)" },
      { step: "Audio Storage", desc: "Supabase public audio buckets with storage delivery" }
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
    id: "modular backend-testing",
    title: "EShop modular backend Automated QA Harness",
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
      name: "Backend & Distributed Systems",
      skills: [
        { 
          name: "TypeScript & Node.js (Express 5)", 
          tag: "Production Core", 
          project: "ArkNet & ISB Vietnam", 
          desc: "Kiến trúc stateless modular backend, xác thực bảo mật, streaming và chịu tải 87.2 RPS trên Kubernetes." 
        },
        { 
          name: "Redis & BullMQ", 
          tag: "High Concurrency", 
          project: "ArkNet Platform", 
          desc: "Viết script Lua nguyên tử tính điểm ranking trending <1ms, 9 worker queues cô lập tác vụ nền." 
        },
        { 
          name: "Java 21 & Spring Boot 4", 
          tag: "Enterprise System", 
          project: "ISB Vietnam", 
          desc: "Xây dựng engine lọc CV 1-to-N hàng loạt, tối ưu truy vấn MyBatis triệt tiêu hoàn toàn lỗi N+1." 
        },
        { 
          name: "Python & FastAPI", 
          tag: "AI Model Serving", 
          project: "HCMUS vnTTS", 
          desc: "API gateway bất đồng bộ điều phối mô hình âm thanh AI chạy trên GPU Nvidia CUDA." 
        },
        { 
          name: "WebSockets & Socket.IO", 
          tag: "Real-time Event", 
          project: "ArkNet Platform", 
          desc: "Phân phối thông báo, trạng thái trực tuyến (presence) và tin nhắn thời gian thực qua Redis adapter." 
        }
      ]
    },
    {
      id: "database",
      name: "Databases & Security Architecture",
      skills: [
        { 
          name: "PostgreSQL & Drizzle ORM", 
          tag: "Relational Modeling", 
          project: "ArkNet & ISB", 
          desc: "Mô hình hóa dữ liệu quan hệ, transactional pooling, viết migration an toàn cho production." 
        },
        { 
          name: "HashiCorp Vault & Data Security", 
          tag: "Enterprise Security", 
          project: "ISB Vietnam", 
          desc: "Mã hóa thông tin cá nhân (PII) cấp trường với Wrapped DEK; truy vấn qua HMAC Blind Index." 
        },
        { 
          name: "SQL Server (MSSQL)", 
          tag: "Database Tuning", 
          project: "PetCareX System", 
          desc: "Chuẩn hóa 3NF, áp dụng Sequential UUID (COMB) triệt tiêu 100% tình trạng phân mảnh đĩa." 
        },
        { 
          name: "In-Memory SQLite", 
          tag: "Agent Sandboxing", 
          project: "ISB Vietnam", 
          desc: "Tạo môi trường phân tích dữ liệu biệt lập trong RAM, bảo vệ cơ sở dữ liệu chính khi AI chạy code." 
        }
      ]
    },
    {
      id: "ai",
      name: "AI & Autonomous Agent Systems",
      skills: [
        { 
          name: "Multi-Agent Orchestration (MCP)", 
          tag: "Autonomous AI", 
          project: "ISB Vietnam", 
          desc: "Kiến trúc Lead/Helper agent phân tách truy vấn phức tạp, xử lý dữ liệu tăng 5.8x row volume." 
        },
        { 
          name: "LLM APIs & Prompt Engineering", 
          tag: "Production AI", 
          project: "News Intelligence", 
          desc: "Tích hợp Gemini SDK & vLLM: Tự động trích xuất tin tức, loại bỏ rác và tóm tắt sự kiện dưới 8 giây." 
        },
        { 
          name: "Neural Audio & PyTorch", 
          tag: "HCMUS Research", 
          project: "vnTTS Corpus", 
          desc: "Khám phá dataset 27.1h (14,475 mẫu âm thanh tiếng Việt) và thực thi suy luận mô hình trên GPU." 
        }
      ]
    },
    {
      id: "frontend",
      name: "Frontend & UI Engineering",
      skills: [
        { 
          name: "React 19 & Next.js 15", 
          tag: "Modern Frontend", 
          project: "ArkNet & ISB Platform", 
          desc: "Tối ưu Server Components, client state reactive, kiến trúc giao diện tương tác cao không độ trễ." 
        },
        { 
          name: "Tailwind CSS & Motion", 
          tag: "Neobrutal UI", 
          project: "Portfolio & Dashboards", 
          desc: "Phong cách Neobrutalism sắc sảo, scrollytelling physics, hiệu ứng spring chuyển động phi tuyến tính." 
        },
        { 
          name: "Vue 3 & TypeScript", 
          tag: "Enterprise Dashboard", 
          project: "ISB Vietnam", 
          desc: "Phát triển portal nội bộ cho quản trị viên theo dõi hoạt động agent và báo cáo nhân sự." 
        }
      ]
    },
    {
      id: "devops",
      name: "DevOps, Cloud & Automated QA",
      skills: [
        { 
          name: "Kubernetes (K8s HPA)", 
          tag: "Cloud Autoscaling", 
          project: "ArkNet Stress Lab", 
          desc: "Cấu hình Horizontal Pod Autoscaler tự động co giãn từ 2 lên 10 pods theo tải CPU/RAM." 
        },
        { 
          name: "Vitest & Automated QA", 
          tag: "5,600+ Test Suite", 
          project: "ISB & PetCareX", 
          desc: "Thiết kế bộ kiểm thử tự động toàn diện, Playwright E2E, chạy song song cắt 50% thời gian CI." 
        },
        { 
          name: "Docker & Testcontainers", 
          tag: "Containerization", 
          project: "CI/CD Pipeline", 
          desc: "Đóng gói multi-stage builds, khởi tạo database tạm thời cô lập cho từng luồng kiểm thử." 
        }
      ]
    }
  ]
};

