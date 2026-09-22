import { neon } from '@neondatabase/serverless';

const dbUrl = 'postgresql://neondb_owner:npg_dDhN7Puc5jYM@ep-falling-term-az28w7vu-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(dbUrl);

const domainsData = [
  {
    "id": "technical-skill-building",
    "title": "Technical Skill Building",
    "code": "DOM_01",
    "icon": "code",
    "description": "Fostering core computing competencies through hands-on technical workshops, GSoC preparation, LLM prompt engineering, and code debugging sessions.",
    "highlights": ["Hands-on GSoC & LLM Workshops", "Prompt Engineering & Debugging", "GitHub Workflow & Git Practices"]
  },
  {
    "id": "events-collaboration",
    "title": "Events & Collaboration",
    "code": "DOM_02",
    "icon": "calendar",
    "description": "Organizing flagship departmental hackathons, branch welcome galas, and competitive technical challenges in partnership with student clubs.",
    "highlights": ["PromptOps Technical Competition", "Lumière Branch Entry Gala", "SJEC CSE Hackathons"]
  },
  {
    "id": "leadership-governance",
    "title": "Leadership & Governance",
    "code": "DOM_03",
    "icon": "shield",
    "description": "Structuring student-led committees, departmental governance, executive roles, and peer mentorship networks to empower future tech leaders.",
    "highlights": ["Student Executive Council", "Faculty-Guided Governance", "Peer Mentorship Networks"]
  },
  {
    "id": "industry-readiness",
    "title": "Industry Readiness",
    "code": "DOM_04",
    "icon": "cpu",
    "description": "Connecting academic study with industry expectations via expert technical sessions, cloud platform insights, and AI career pathways.",
    "highlights": ["Salesforce Agentforce Sessions", "AI & Cloud Career Pathways", "Industry Expert Dialogues"]
  }
];

async function initDomainsTable() {
  console.log('Connecting to Neon Postgres to create domains table...');
  await sql`
    CREATE TABLE IF NOT EXISTS domains (
      id VARCHAR(100) PRIMARY KEY,
      title TEXT NOT NULL,
      code VARCHAR(20) NOT NULL,
      icon VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      highlights JSONB DEFAULT '[]'::jsonb,
      order_index INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log('✓ Table domains created');

  for (let i = 0; i < domainsData.length; i++) {
    const d = domainsData[i];
    await sql`
      INSERT INTO domains (id, title, code, icon, description, highlights, order_index)
      VALUES (${d.id}, ${d.title}, ${d.code}, ${d.icon}, ${d.description}, ${JSON.stringify(d.highlights)}::jsonb, ${i + 1})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        code = EXCLUDED.code,
        icon = EXCLUDED.icon,
        description = EXCLUDED.description,
        highlights = EXCLUDED.highlights,
        order_index = EXCLUDED.order_index;
    `;
  }
  console.log('✓ Seeded initial 4 domains into Neon Postgres');
}

initDomainsTable().catch(console.error);
