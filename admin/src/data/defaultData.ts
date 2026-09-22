import { EventItem, TeamMember, DomainItem } from '../types';

export const DEFAULT_EVENTS: EventItem[] = [
  {
    id: "promptops-2026",
    title: "PROMPT OPS-2K26 — AI Prompt Engineering Challenge",
    category: "Competition",
    date: "2026-03-25",
    displayDate: "25 MAR 2026",
    shortDescription: "Technical competition focused on prompt engineering, AI tools, JSON conversion, and Gemini AI security extraction.",
    description: "Organized by the AgentBlazer Club and CIPHER under the guidance of Ms. Nisha J Roche, Ms. Jaishma K, and HOD Dr. Melwyn D’Souza, this technical competition focused on prompt engineering and AI tools (mapped to PO4, PO5, PO8, PO11).\n\nTrack 1 (1st Year) featured invitation generation, logo recreation, and image recreation rounds, with Chinmayee, Chris Royston Monteiro, and Deeksha Ravi Moger taking top honors.\n\nTrack 2 (2nd Year) tested students in JSON conversion, Python code debugging, and a Gemini AI security prompt extraction challenge, with Harimurali KS, Venus Suhani D’Lima, and Venisha Snehal D’Souza securing top positions.",
    image: "/assets/images/events/promptops-1.jpg",
    gallery: [
      "/assets/images/events/promptops-1.jpg",
      "/assets/images/events/promptops-2.jpg",
      "/assets/images/events/promptops-3.jpg",
      "/assets/images/events/promptops-4.jpg",
      "/assets/images/events/promptops-5.jpg",
      "/assets/images/events/promptops-6.jpg"
    ],
    location: "Computer Center, SJEC",
    organizer: "CIPHER & AgentBlazer Club",
    featured: true
  },
  {
    id: "gsoc-llm-workshop",
    title: "Master the Future: Hands-on GSOC & LLMs Workshop",
    category: "Workshop",
    date: "2026-02-14",
    displayDate: "14 FEB 2026",
    shortDescription: "Hands-on GitHub workflow training, GSOC proposal guidance, RAG, and LLM framework deployment.",
    description: "Organized by the Department of CSE in association with the AgentBlazer Club and CIPHER, this workshop was conducted by Mr. Anas Khan (Software Development Engineer at HackerRank) for approximately 55 participants. The hands-on session provided practical GitHub workflow training (forking, cloning, pull requests), guidance on Google Summer of Code (GSOC) participation, and an overview of the AI ecosystem.\n\nKey technical topics covered included LLM parameters (Temperature, Top-P, Max Tokens), prompt strategies, Retrieval Augmented Generation (RAG), function calling, Gemini AI, and development frameworks such as LangChain, LlamaIndex, CrewAI, Gradio, and Streamlit.\n\nThe session opened with a welcome by Club VP Mr. Ajay D'Souza and concluded with a token of appreciation presented by Faculty Coordinator Ms. Nisha J Roche, along with a vote of thanks by Student President Mr. Ruben Saldanha and support from HOD Dr. Melwyn D'Souza.",
    image: "/assets/images/events/gsoc-main.jpg",
    gallery: [
      "/assets/images/events/gsoc-main.jpg",
      "/assets/images/events/gsoc-1.jpg",
      "/assets/images/events/gsoc-2.jpg",
      "/assets/images/events/gsoc-3.jpg"
    ],
    location: "Academic Block III Auditorium, SJEC",
    organizer: "CIPHER & AgentBlazer Club",
    featured: true
  },
  {
    id: "cybersecurity-pathways",
    title: "Cyber Security and Career Pathways Session",
    category: "Industry Session",
    date: "2026-04-01",
    displayDate: "01 APR 2026",
    shortDescription: "Practical exposure to OSINT, Shodan, CVE management, SQL Injection, and Security Analyst careers.",
    description: "Organized by the Department of CSE in association with the AgentBlazer Club and CIPHER, this hands-on workshop was delivered by Mr. Suhas Nayak (Tech Lead – SecOps, Ingersoll Rand) for 6th-semester students (mapped to PO6, PO7, PO9, PO11).\n\nThe session provided practical exposure to core security concepts, live tool demonstrations including Shodan, OSINT techniques, Google Dorking, CVE management, SQL Injection, and the Cyber Kill Chain model.\n\nIt concluded with actionable guidance on career roles such as Security Analyst, SOC Analyst, Ethical Hacker, and Cloud Security Engineer.",
    image: "/assets/images/events/cyber-1.jpg",
    gallery: [
      "/assets/images/events/cyber-1.jpg",
      "/assets/images/events/cyber-2.jpg",
      "/assets/images/events/cyber-3.jpg",
      "/assets/images/events/cyber-4.jpg",
      "/assets/images/events/cyber-5.jpg",
      "/assets/images/events/cyber-6.jpg"
    ],
    location: "Seminar Hall, Department of CSE",
    organizer: "CIPHER & AgentBlazer Club",
    featured: true
  },
  {
    id: "lumiere-gala",
    title: "Lumière – The Annual Departmental Gala",
    category: "Flagship Gala",
    date: "2025-10-29",
    displayDate: "29 OCT 2025",
    shortDescription: "Official CSE branch entry programme welcome gathering under the theme 'Where Glam Meets Glow'.",
    description: "The Department of Computer Science and Engineering (CSE) held its branch entry programme, 'Lumière – The Gala,' on 29 October 2025 at the Kalam Auditorium. Organised by the CIPHER Association, the event welcomed students into the department through a formal gathering centred on the theme 'Where Glam Meets Glow.'\n\nThe venue featured coordinated red, gold, and black décor, floral arrangements, illuminated panels, and a central Lumière backdrop. The programme provided students with an opportunity to interact with peers and take part in a shared departmental event beyond academics, highlighting the role of the CIPHER Association in organising student-led activities. The event concluded as a formal branch entry that marked the students' transition into the department and reinforced a sense of collective identity.",
    image: "/assets/images/events/lumiere-1.jpg",
    gallery: [
      "/assets/images/events/lumiere-1.jpg",
      "/assets/images/events/lumiere-2.jpg",
      "/assets/images/events/lumiere-3.jpg",
      "/assets/images/events/lumiere-4.jpg",
      "/assets/images/events/lumiere-5.jpg",
      "/assets/images/events/lumiere-6.jpg",
      "/assets/images/events/lumiere-7.jpg",
      "/assets/images/events/lumiere-8.jpg"
    ],
    location: "Kalam Auditorium, SJEC",
    organizer: "CIPHER Cultural Domain",
    featured: true
  },
  {
    id: "demystifying-generative-models",
    title: "Demystifying Generative Models Workshop",
    category: "Workshop",
    date: "2026-03-18",
    displayDate: "18 MAR 2026",
    shortDescription: "Peer-learning hands-on session detailing LLM Council governance, transformers, and model evaluation.",
    description: "Under the guidance of Ms. Nisha J. Roche, 6th-semester CSE students Prajwal Royston Corderio and Chacko P Abraham led a hands-on peer-learning workshop on Generative AI (mapped to PO4, PO6, PO7, PO11).\n\nThe session detailed AI governance frameworks (LLM Council), transformer mechanisms, and prompt engineering, alongside comparisons of LLaMA, Groq, Mistral AI, ChatGPT, GitHub Copilot, and Perplexity. Students engaged in an AI quiz, a three-stage model evaluation challenge, and a feature-modification coding task before a valedictory session to end the program.",
    image: "/assets/images/events/promptops-7.jpg",
    gallery: [
      "/assets/images/events/promptops-7.jpg",
      "/assets/images/events/promptops-8.jpg",
      "/assets/images/events/promptops-9.jpg"
    ],
    location: "Computer Center 2, SJEC",
    organizer: "CIPHER & AgentBlazer Club",
    featured: false
  },
  {
    id: "agentforce-technical-session",
    title: "Salesforce Agentforce & AI Pathways Session",
    category: "Industry Session",
    date: "2025-08-28",
    displayDate: "28 AUG 2025",
    shortDescription: "Inaugural session by Salesforce executives on Agentforce autonomous AI and Trailblazer careers.",
    description: "Held alongside the AgentBlazer Club launch, Salesforce executives Mr. Santhosh Rebello and Mr. Stephen Pinto delivered an expert session on Agentforce and AI career opportunities (Ref: CSE/AB/2025-26/02).\n\nThey traced AI evolution through Predictive, Copilot, and Agentic AI (autonomous systems using Salesforce Data Cloud), highlighted key career pathways in Salesforce Administration, Analytics, and Solution Development, and urged students to build adaptability within the Trailblazer ecosystem.",
    image: "/assets/images/agentblazer-logo.jpg",
    gallery: [
      "/assets/images/agentblazer-logo.jpg",
      "/assets/images/events/gsoc-26.jpg",
      "/assets/images/events/gsoc-27.jpg"
    ],
    location: "Kalam Auditorium, SJEC",
    organizer: "CIPHER & AgentBlazer Club",
    featured: false
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "elston-pereira",
    name: "Elston Pereira",
    role: "PRESIDENT",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Elston_Pereira.png",
    bio: "Leading CIPHER association strategy, overall event execution, and departmental initiatives.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/elston-pereira-452138297/"
  },
  {
    id: "raynell-lewis",
    name: "Raynell Lewis",
    role: "VICE PRESIDENT",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Raynell_Lewis.jpg",
    bio: "Assisting executive leadership, inter-club coordination, and student engagement.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/raynell-lewis-8778a4394/"
  },
  {
    id: "chaithra-rm",
    name: "Chaithra RM",
    role: "SECRETARY",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Chaithra_RM.jpg",
    bio: "Managing official association documentation, communications, and meeting agendas.",
    category: "executive"
  },
  {
    id: "nazmin-ziya",
    name: "Nazmin Ziya",
    role: "TREASURER",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Nazmin_Ziya.jpg",
    bio: "Overseeing financial planning, event budgeting, and departmental allocation.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/nazmin-ziya/"
  },
  {
    id: "jeslin-ninora",
    name: "Jeslin Ninora",
    role: "JOINT TREASURER",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Jeslin_Ninora.jpg",
    bio: "Assisting with treasury management, expense tracking, and event auditing.",
    category: "executive"
  },
  {
    id: "ruben-saldana",
    name: "Ruben Saldana",
    role: "OPERATIONS HEAD",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Ruben_Saldana.webp",
    bio: "Directing event logistics, venue coordination, and operational execution.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/ruben-saldanha-5800561b5/"
  },
  {
    id: "himansh-ullal",
    name: "Himansh Ullal",
    role: "DESIGN HEAD",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Himansh_Ullal.jpg",
    bio: "Leading visual branding, graphic design, promotional assets, and UI aesthetics.",
    category: "executive"
  },
  {
    id: "shamitha-kv",
    name: "Shamitha KV",
    role: "CULTURAL HEAD",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Shamitha_KV.jpg",
    bio: "Coordinating cultural performances, branch entry galas, and creative showcases.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/shamitha-kv/"
  },
  {
    id: "parthipan-j",
    name: "Parthipan J",
    role: "CONTENT HEAD",
    department: "CIPHER Executive Council",
    photo: "/assets/images/team/Parthipan_J.jpg",
    bio: "Directing editorial content, event reports, social media copy, and announcements.",
    category: "executive",
    linkedin: "https://www.linkedin.com/in/parthipanj/"
  }
];

export const DEFAULT_DOMAINS: DomainItem[] = [
  {
    id: "technical-skill-building",
    title: "Technical Skill Building",
    code: "DOM_01",
    icon: "code",
    description: "Fostering core computing competencies through hands-on technical workshops, GSoC preparation, LLM prompt engineering, and code debugging sessions.",
    highlights: ["Hands-on GSoC & LLM Workshops", "Prompt Engineering & Debugging", "GitHub Workflow & Git Practices"]
  },
  {
    id: "events-collaboration",
    title: "Events & Collaboration",
    code: "DOM_02",
    icon: "calendar",
    description: "Organizing flagship departmental hackathons, branch welcome galas, and competitive technical challenges in partnership with student clubs.",
    highlights: ["PromptOps Technical Competition", "Lumière Branch Entry Gala", "SJEC CSE Hackathons"]
  },
  {
    id: "leadership-governance",
    title: "Leadership & Governance",
    code: "DOM_03",
    icon: "shield",
    description: "Structuring student-led committees, departmental governance, executive roles, and peer mentorship networks to empower future tech leaders.",
    highlights: ["Student Executive Council", "Faculty-Guided Governance", "Peer Mentorship Networks"]
  },
  {
    id: "industry-readiness",
    title: "Industry Readiness",
    code: "DOM_04",
    icon: "cpu",
    description: "Connecting academic study with industry expectations via expert technical sessions, cloud platform insights, and AI career pathways.",
    highlights: ["Salesforce Agentforce Sessions", "AI & Cloud Career Pathways", "Industry Expert Dialogues"]
  },
  {
    id: "ai-agentic-workflows",
    title: "Artificial Intelligence & Agentic Workflows",
    code: "DOM_05",
    icon: "terminal",
    description: "Building autonomous AI agents, prompt engineering pipelines, and LLM orchestration systems.",
    highlights: ["Autonomous AI Agents", "LLM Orchestration", "Prompt Engineering"]
  }
];
