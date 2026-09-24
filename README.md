# 🟢 CIPHER — CSE Department Association Platform

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cipher-buildblazer.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Neon Postgres](https://img.shields.io/badge/Neon_Postgres-Serverless-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Official web platform and management portal for **CIPHER**, the premier student association of the Department of Computer Science & Engineering at **St Joseph Engineering College (SJEC), Mangalore**.

Built specifically for the **Build Blazer** competition.

---

## 🌐 Live Production Links & Documentation

- 🚀 **Live Web Application**: [cipher-buildblazer.vercel.app](https://cipher-buildblazer.vercel.app/)
- 🎨 **Figma Design Reference**: [Figma Design Specification Document](https://drive.google.com/file/d/1a9WW5a8rrhsv_C1jgfWs8K5ipaLAdxD8/view)
- 📦 **GitHub Repository**: [github.com/Vanillaaz/cipher-buildblazer](https://github.com/Vanillaaz/cipher-buildblazer)

---

## 🏛️ System Architecture

The platform consists of a **High-Performance Public Web Application** and an **Integrated Admin Management Portal**, powered by a **Serverless Neon PostgreSQL** database layer.

```
cipher-buildblazer/
├── public/                 # Static public assets, fonts, and graphics
├── src/                    # Main Website Application (React 19 + TypeScript + Vite)
│   ├── components/         # Modular Component Library
│   │   ├── common/         # Buttons, Modals, Cards, Section Headings
│   │   ├── layout/         # Header, Footer, Page Container Systems
│   │   ├── sections/       # Hero, About, Domains, Team, Events, Archive, Join
│   │   └── ui/             # Canvas Glyph Wordmarks, Contour System, Custom Cursor
│   ├── data/               # Static fallback datasets & JSON schemas
│   ├── pages/              # Primary Page Layout Views
│   ├── services/           # Neon DB API layer & FormSubmit email dispatchers
│   └── types/              # TypeScript Type Definitions & Interfaces
├── admin/                  # Dedicated Admin Control Portal
│   ├── src/                # Admin React 19 App (CRUD for Events, Team & Domains)
│   ├── package.json        # Admin dependencies
│   └── vite.config.ts      # Admin Vite configuration
├── schema.sql              # Neon PostgreSQL Database Initialization Schema
├── init_db.mjs             # Node script to seed Events & Team database records
├── init_domains_db.mjs     # Node script to seed Domain capabilities database records
└── package.json            # Main workspace dependencies & build scripts
```

---

## ✨ Key Features & Technical Highlights

### 1. 🔣 Interactive HTML5 Canvas ASCII Glyph Wordmark
- **Real-Time ASCII Particle Morphing (`CipherGlyphWordmark.tsx`)**: Utilizes a custom 2D HTML5 canvas renderer that streams dynamic matrix characters that seamlessly morph into the bold `CIPHER` typography based on proximity and mouse position.
- **Multi-Neon Transition Spectrum**: Features a smooth color transition palette (`Pure White` → `Cyber Cyan` → `Electric Green` → `Neon Magenta` → `Bright White`) on mouse hover.
- **Preloaded Typography**: Enforces strict loading of `Space Grotesk` (700 bold weight) to eliminate Font-Unstyled-Flash (FOUT).

### 2. ⚡ Integrated Admin Control Portal (`/admin`)
- **Full CRUD Operations**: Real-time management interface to add, edit, toggle, and delete **Department Events**, **Leadership Team Members**, and **Technical Domains**.
- **Live Metrics Dashboard**: Real-time header telemetry counting total active team members, published events, and core technical domains.
- **Dynamic Icon Picker**: Icon picker supporting Lucide React icons for domain capabilities.

### 3. 🐘 Serverless Neon Postgres Database Layer (`src/services/api.ts`)
- **Serverless SQL Pooling**: Powered by `@neondatabase/serverless` HTTP SQL querying for zero-cold-start performance on serverless deployments.
- **Graceful Fallback Resilience**: If offline or during database updates, the web client gracefully falls back to local static JSON data.

### 4. 💻 Cyberpunk Terminal Bootloader (`IntroSequence.tsx`)
- **Retro Hardware Diagnostics**: Interactive boot sequence modal rendering system checks, memory tests, and ASCII art headers.
- **Audio Feedback Controls**: Integrated sound effects system with toggle controls.
- **Unique Typography**: Custom styling powered by `Pirata One` font.

### 5. 📸 Interactive Department Photo Stack Deck (`ImageRevealStack.tsx`)
- **12-Photo Library Deck**: Showcases department moments including Lumière Galas, PromptOps 2026 Hackathons, GSoC & LLM Workshops, and Cyber Security Seminars.
- **Pop & Fly-Out Motion**: Interactive card pop-and-slide animation revealing photos sequentially.

### 6. 📄 Symmetrical Event Dialogs & Verbatim Summaries (`EventModal.tsx`)
- **50/50 Split Dialog**: Displays key takeaways, category metadata, and photo galleries for major department activities.
- **Verbatim Documentation**: Aligned with official CSE department event reports.

### 7. 📬 Dual-Tier Student Join Application Portal (`joinService.ts`)
- **Neon DB Storage**: Persists incoming student applications directly to the database.
- **Direct Email Dispatch**: Sends structured application payloads directly to `cipher@sjec.ac.in` via FormSubmit gateway.
- **LocalStorage Backup**: Stores offline backup records with unique Request IDs (`REQ-XXXXXXXX`).

### 8. 📱 Mobile Ergonomics & Responsive Engineering
- **Touch-Device Detection**: Automatically disables floating cursor ring on touch devices (`pointer: coarse` / `hover: none`) to allow native touch scrolling.
- **Responsive Layout**: Tightened vertical spacing on mobile viewports for clean presentation without overflow.

---

## 📊 Database Schema

The application connects to a Neon PostgreSQL database with the following table structure:

```sql
-- 1. Department Events Table
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    takeaways JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Core Team',
    image_url TEXT NOT NULL,
    linkedin_url TEXT,
    github_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Department Technical Domains Table
CREATE TABLE IF NOT EXISTS domains (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Student Join Applications Table
CREATE TABLE IF NOT EXISTS join_applications (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    usn TEXT NOT NULL,
    semester TEXT NOT NULL,
    domain TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router DOM 7 |
| **Language** | TypeScript 5.7 |
| **Build System** | Vite 6 |
| **Styling & Design** | Tailwind CSS 4, Vanilla CSS Grid/Flexbox |
| **Database & Pooling** | Neon PostgreSQL Serverless (`@neondatabase/serverless`) |
| **Icons & Media** | Lucide React, Canvas 2D Rendering |
| **Form Gateway** | FormSubmit Email API Dispatcher |
| **Hosting & CDN** | Vercel Serverless Edge Network |

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Main Website Setup

```bash
# Clone the repository
git clone https://github.com/Vanillaaz/cipher-buildblazer.git
cd cipher-buildblazer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit the app at `http://localhost:5173`.

### 2. Admin Portal Setup

```bash
# Open a new terminal and navigate to the admin directory
cd admin

# Install admin portal dependencies
npm install

# Start local admin development server
npm run dev
```

Visit the admin dashboard at `http://localhost:5174`.

### 3. Database Initialization (Optional)

To seed your own Neon Postgres instance with default dataset records:

```bash
# Set your DATABASE_URL in a .env file
echo "DATABASE_URL=your_neon_postgres_connection_string" > .env

# Run database table initialization scripts
node init_db.mjs
node init_domains_db.mjs
```

### 4. Production Build & Validation

```bash
# Type check and build main website
npm run build

# Type check and build admin portal
cd admin
npm run build
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Neon PostgreSQL Connection String
DATABASE_URL=postgresql://neondb_owner:npg_key@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
VITE_NEON_DATABASE_URL=postgresql://neondb_owner:npg_key@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

## 👥 Credits & Organization

Organized and maintained by **CIPHER (CSE Student Association)**  
Department of Computer Science & Engineering  
**St Joseph Engineering College (SJEC)**, Vamanjoor, Mangalore  
In collaboration with **AgentBlazer Club**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
