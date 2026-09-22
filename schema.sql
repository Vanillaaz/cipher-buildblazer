-- =====================================================================
-- CIPHER CSE Association — Neon PostgreSQL Database Schema
-- =====================================================================

-- 1. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    display_date VARCHAR(50) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    location TEXT NOT NULL,
    organizer TEXT NOT NULL,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo TEXT NOT NULL,
    bio TEXT NOT NULL,
    department TEXT NOT NULL,
    github TEXT,
    linkedin TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. STUDENT JOIN APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS join_applications (
    id VARCHAR(100) PRIMARY KEY,
    full_name TEXT NOT NULL,
    usn TEXT NOT NULL,
    email TEXT NOT NULL,
    year_semester TEXT NOT NULL,
    area_of_interest TEXT NOT NULL,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- INITIAL SEED DATA
-- =====================================================================

-- Seed Events
INSERT INTO events (id, title, category, date, display_date, short_description, description, image, gallery, location, organizer, featured)
VALUES 
(
  'promptops-llm-agents-2026',
  'PromptOps & LLM Agents Workshop',
  'Workshop',
  '2026-05-15',
  '15 MAY 2026',
  'Hands-on technical deep-dive into autonomous AI agents, prompt engineering, and LLM orchestration.',
  'Master the Future: Hands-on GSOC & LLMs Workshop organized by CIPHER CSE Association. Participants built real-world AI workflows and learned autonomous agent deployment.',
  '/assets/images/events/promptops-1.jpg',
  '["/assets/images/events/promptops-1.jpg"]'::jsonb,
  'Academic Block III, SJEC',
  'CIPHER CSE Association',
  true
),
(
  'cipher-hack-2026',
  'CIPHER Hackathon 2026',
  'Competition',
  '2026-04-10',
  '10 APR 2026',
  '24-hour hackathon building cutting-edge open source tools, web apps, and AI solutions.',
  'State-level hackathon bringing together top engineering talent to solve real-world industry challenges.',
  '/assets/images/events/gsoc-1.jpg',
  '["/assets/images/events/gsoc-1.jpg"]'::jsonb,
  'Kalam Auditorium, SJEC',
  'CIPHER CSE Association',
  true
)
ON CONFLICT (id) DO NOTHING;

-- Seed Team Members
INSERT INTO team_members (id, name, role, photo, bio, department, github, linkedin, order_index)
VALUES
(
  'venisha-fernandes',
  'Venisha Fernandes',
  'President',
  '/assets/images/team/venisha.jpg',
  'Leading CIPHER CSE Association with vision and technical innovation.',
  'Department of CSE',
  'https://github.com',
  'https://linkedin.com',
  1
),
(
  'shawn-dsouza',
  'Shawn D''Souza',
  'Vice President',
  '/assets/images/team/shawn.jpg',
  'Guiding technical projects and student community workshops.',
  'Department of CSE',
  'https://github.com',
  'https://linkedin.com',
  2
)
ON CONFLICT (id) DO NOTHING;
