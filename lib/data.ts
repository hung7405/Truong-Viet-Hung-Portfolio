export const profile = {
  name: "Truong Viet Hung",
  alias: "Hung Truong",
  role: "AI Engineer",
  tagline:
    "Final-year Data Science @ Swinburne × AI Engineer Intern @ Payoo — building production-oriented AI: multi-agent automation, enterprise RAG, backend systems.",
  location: "Ho Chi Minh City, Vietnam",
  email: "viethungtruong07042005@gmail.com",
  phone: "+84 813 815 081",
  github: "https://github.com/hung7405",
  linkedin: "https://linkedin.com/in/vi%E1%BB%87t-h%C6%B0ng-tr%C6%B0%C6%A1ng-5516b3312",
  cv: "/cv",
  availability: "AI Engineer Intern @ Payoo — open to collaboration",
  hero_metrics: [
    { value: "2–3h → 15–20m", label: "Merchant assessment time (Payoo multi-agent)" },
    { value: "3", label: "Applied AI initiatives shipped" },
    { value: "3", label: "Production-style projects" },
    { value: "6.5 IELTS", label: "English · DET 130" },
  ],
};

export const skills = [
  { group: "Programming", items: ["Python", "SQL", "JavaScript/TypeScript", "Pandas"] },
  { group: "AI / ML", items: ["LLMs", "RAG", "Agentic AI", "LangChain", "Embeddings", "Vector Search", "pgvector/HNSW"] },
  { group: "Backend / Data", items: ["FastAPI", "REST APIs", "WebSockets", "PostgreSQL", "Redis", "SQLAlchemy", "NestJS", "Socket.IO", "ARQ"] },
  { group: "Cloud / Tools", items: ["Docker", "Docker Compose", "AWS EC2", "Playwright", "Git", "Linux"] },
];

export const proficiency: Record<string, number> = {
  Python: 90,
  SQL: 85,
  "FastAPI": 85,
  "RAG / Retrieval": 85,
  "Agentic AI / LangChain": 83,
  "PostgreSQL / pgvector": 82,
  "TypeScript": 75,
  "Docker / AWS EC2": 78,
  "Playwright": 80,
  "Redis": 78,
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: "production" | "deployed" | "completed";
  featured?: boolean;
  period: string;
  team: string;
  org: string;
  image: string;
  metric: string;
  highlights: string[];
  architecture: string[];
};

export const projects: Project[] = [
  {
    slug: "merchant-multi-agent",
    title: "Merchant Validation — Multi-Agent System",
    category: "Agentic AI · Production",
    description:
      "Parallel multi-agent merchant due-diligence: website analysis, registry verification, social intelligence, trust assessment.",
    longDescription:
      "Built at Payoo. Separated evidence collection into parallel agents (website, business-registry, social, trust), cross-checking heterogeneous sources with LLMs + Playwright + web search + structured extraction. Async execution on FastAPI + PostgreSQL + Redis/ARQ with session tracking and fallbacks.",
    tech: ["Python", "FastAPI", "LangChain", "Playwright", "PostgreSQL", "Redis", "ARQ", "Docker"],
    status: "production",
    featured: true,
    period: "Apr 2026 — Present",
    team: "AI Team",
    org: "Payoo",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    metric: "2–3h → 15–20 min per merchant",
    highlights: [
      "Designed 4 parallel agents for independent evidence collection",
      "LLM + Playwright + search + structured extraction cross-check",
      "Async FastAPI services with session tracking & fallback handling",
    ],
    architecture: ["Next.js / API client", "FastAPI orchestrator", "4 Agents (website · registry · social · trust)", "Playwright + Search tools", "PostgreSQL + Redis/ARQ", "LLM synthesis → trust report"],
  },
  {
    slug: "spamguard",
    title: "SpamGuard — Multi-Modal AI Security Platform",
    category: "ML · MLOps",
    description: "Text, URL & executable-file threat classification with FastAPI serving + Docker on AWS EC2.",
    longDescription:
      "End-to-end ML pipelines: preprocessing → training → evaluation → inference artifacts for three threat modalities. FastAPI + SQLAlchemy + PostgreSQL persists scan history; containerized with Docker and deployed on EC2.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "AWS EC2", "scikit-learn"],
    status: "deployed",
    featured: true,
    period: "2025 — 2026",
    team: "Solo",
    org: "Personal",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
    metric: "3 modalities · 1 Docker image · EC2 live",
    highlights: [
      "Unified pipeline for text / URL / binary threat classification",
      "Model-serving backend with scan-history persistence",
      "Docker Compose + EC2 deployment",
    ],
    architecture: ["Upload API", "Preprocess + Feature extract", "3 Model heads", "FastAPI inference", "PostgreSQL scan history", "Docker → EC2"],
  },
  {
    slug: "foodly",
    title: "Foodly — AI Real-Time Local Commerce",
    category: "Backend · AI Product",
    description: "NestJS + pgvector/HNSW semantic discovery, LLM/Vision search, real-time reservations.",
    longDescription:
      "Modular NestJS/PostgreSQL backend with pgvector/HNSW semantic retrieval and hybrid recommendations. LLM/Vision powers visual + conversational discovery. Concurrency-safe reservations via optimistic locking, 15-min TTL holds, Socket.IO live updates.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "pgvector", "Redis", "Socket.IO", "LLM/Vision", "Docker"],
    status: "completed",
    featured: true,
    period: "2025 — 2026",
    team: "Team",
    org: "Personal",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop",
    metric: "HNSW semantic search + realtime holds",
    highlights: [
      "pgvector/HNSW semantic retrieval + hybrid recommendations",
      "LLM/Vision conversational discovery",
      "Optimistic locking + TTL holds + Socket.IO sync",
    ],
    architecture: ["Client", "NestJS modules", "pgvector HNSW index", "LLM/Vision service", "Redis TTL holds", "Socket.IO realtime"],
  },
];

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "Payoo",
    period: "Apr 2026 — Present",
    location: "Ho Chi Minh City, Vietnam",
    current: true,
    summary: "Three applied AI initiatives: multi-agent merchant intelligence, enterprise RAG, SME acquisition automation.",
    bullets: [
      "Engineered multi-agent merchant due-diligence workflows — assessment time 2–3h → 15–20 min",
      "Contributed to enterprise Confluence RAG: ingestion, chunking, embeddings, vector retrieval, source-grounded generation",
      "Built SME acquisition workflows: Facebook Ads + LangChain content agents + automated lead collection",
    ],
    tech: ["Python", "FastAPI", "LangChain", "Playwright", "PostgreSQL", "Redis", "Docker"],
  },
];

export const education = {
  degree: "Bachelor of Data Science",
  school: "Swinburne University of Technology — HCMC Campus",
  period: "Expected Sep 2027 · GPA 3.2/4.0",
  coursework: ["Machine Learning", "Foundation of Large Language Models", "Database Foundations", "Cloud Computing"],
  certs: ["SQL Associate — DataCamp"],
  languages: "Vietnamese (Native) · English (IELTS 6.5, DET 130)",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];
