# 🟢 CIPHER — CSE Department Association Platform

Official web platform for **CIPHER**, the premier student association of the Department of Computer Science & Engineering at **St Joseph Engineering College (SJEC), Mangalore**.

Built for the **Build Blazer** competition.

---

## 🌐 Live Links & References

- 🚀 **Live Production Web Application**: [https://cipher-buildblazer.vercel.app/](https://cipher-buildblazer.vercel.app/)
- 🎨 **Official Design Specification**: [Figma Design Reference](https://drive.google.com/file/d/1a9WW5a8rrhsv_C1jgfWs8K5ipaLAdxD8/view)
- 📦 **GitHub Repository**: [https://github.com/Vanillaaz/cipher-buildblazer](https://github.com/Vanillaaz/cipher-buildblazer)

---

## ✨ Key Features & Architectural Highlights

### 1. Matrix Cyber-Tech Visual Identity & Decoding Headings
- **Glitch / Scramble Reveal (`TechnicalSectionHeading.tsx`)**: Section headers feature a frame-by-frame character scramble decryption animation triggered via `IntersectionObserver`.
- **Custom Cyber Cursor (`CustomCursor.tsx`)**: Global matrix green cursor ring and center point floating on a high `z-index` overlay above all page modals.
- **Continuous Contour Background (`ContourBackground.tsx`)**: Subtle dark green topographic contour SVG vectors with terminal grid texturing.

### 2. Interactive Department Photo Stack Deck (`ImageRevealStack.tsx`)
- **12-Photo Library Deck**: High-resolution gallery covering Lumière Galas, PromptOps 2026 Hackathons, GSoC & LLM Workshops, Cyber Security Seminars, and Student Body Events.
- **Card Pop & Fly-Out Motion**: Clicking anywhere inside the frame triggers a card pop-and-slide animation, revealing fresh photos continuously.

### 3. Symmetrical Event Modals & Verbatim Reports (`EventModal.tsx`)
- **50/50 Split Dialog**: Displays key takeaways, category metadata, and non-overlapping photo galleries for 6 major department events.
- **Verbatim DOCX Integration**: Event details match verbatim report summaries from official CSE department documentation.

### 4. Interactive Team & Governance Gallery (`TeamSection.tsx`)
- **Horizontal Scroll Track**: Compact team member cards featuring grayscale-to-color hover focus, role badges, and verified LinkedIn profile links.

### 5. Automated Email Application Dispatch (`joinService.ts`)
- **Direct Email Delivery**: Student join applications format form fields into structured JSON payloads and dispatch them directly to `cipher@sjec.ac.in` via FormSubmit AJAX gateway.
- **Local Backup**: Stores application records with unique Request IDs in `localStorage` as an offline fail-safe.

### 6. Desktop Viewport Frame Layout (`PageContainer.tsx`)
- **Single Viewport Sizing**: Every section is scaled with `min-h-[calc(100vh-3.5rem)] flex flex-col justify-center` so full sections fit in a single desktop screen without body scrolling.

---

## 🛠️ Technology Stack

- **Core Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Design System
- **Icons & Graphics**: Lucide React & Custom SVG Topographic Vectors
- **Deployment**: [Vercel](https://vercel.com)

---

## 💻 Local Development Setup

Follow these steps to run the application locally:

```bash
# 1. Clone your repository fork
git clone https://github.com/Vanillaaz/cipher-buildblazer.git
cd cipher-buildblazer

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build & Type Checking

To build the static bundle for production deployment:

```bash
# Run TypeScript compilation & Vite build
npm run build

# Preview production build locally
npm run preview
```

---

## 👥 Organization & Credits

Organized by **CIPHER (CSE Association)**, Department of Computer Science & Engineering, St Joseph Engineering College (SJEC), Vamanjoor, Mangalore, in collaboration with **AgentBlazer Club**.
