# 🌟 Lumina

**Lumina** is a real‑time presentation + resource sharing platform. Presenters upload decks and supporting files, share a link/QR, and attendees follow along while taking **private notes**—without missing key moments.

---

## ✨ Features

### Presenter
- Create & manage presentations (public/private, rename, delete)
- Upload resources: **PDF, images, links, videos** (stored in Supabase Storage)
- **Presenter‑controlled current resource** (real‑time via Supabase Realtime)
- Share **link & QR code** for quick audience access
- Analytics (planned): live viewers, total views, downloads, questions

### Viewer
- Join by link/QR (**no account required** option)
- Follow presenter’s “current resource” in real time
- **Independent browsing** of resources (if enabled)
- **Private notes** tied to presentation
- Ask questions (planned), optional resource downloads

### System
- **Auth**: Supabase Auth (presenters sign up/sign in)
- **Database**: Supabase Postgres
- **Storage**: Supabase Storage (files)
- **Realtime**: Supabase Realtime channels
- **Editor**: TipTap with advanced extensions (tables, tasks, alignment, color, etc.)
- **QR**: `next-qrcode` / `qrcode.react`
- **PDF Viewer**: `react-pdf` + `pdfjs-dist`
- **UI**: Radix primitives + Tailwind + Lucide icons
- **Next.js App Router** (React 19, Next 15)

---

## 🛠️ Tech Stack

- **Framework:** Next.js **15** (App Router), React **19**
- **Backend (API Routes):** Next.js API Routes
- **Database/Auth/Storage/Realtime:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **UI & Styling:** Tailwind CSS, Radix UI, Lucide Icons
- **Forms & Validation:** `react-hook-form`, `zod`
- **Rich Text:** TipTap (`@tiptap/react`, `@tiptap/starter-kit` + extensions)
- **Dates:** `date-fns`
- **PDF:** `react-pdf`, `pdfjs-dist`
- **QR:** `next-qrcode`, `qrcode.react`
- **Theming:** `next-themes`
- **Shortcuts & Utils:** `react-hotkeys-hook`, `lodash.throttle`

---

## 📦 Installation

```bash
git clone https://github.com/your-username/lumina.git
cd lumina
npm install
```

---

## ▶️ Development

Create a `.env.local` with your Supabase project details:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# If you use server-side helpers that need elevated access, keep these ONLY on the server (not prefixed with NEXT_PUBLIC)
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

Build & run production:

```bash
npm run build
npm start
```

---

## 🧱 Project Structure (suggested)

```
lumina/
├─ app/                     # Next.js App Router (routes, layouts, API routes)
│  ├─ (public)/             # Public routes
│  ├─ api/                  # Next.js API routes
│  └─ dashboard/            # Presenter dashboard
├─ components/              # UI components (editor, forms, layout)
├─ lib/
│  ├─ supabase/             # Supabase client (browser + server helpers)
│  └─ utils/                # helpers (auth, formatting, etc.)
├─ styles/                  # Tailwind & globals
├─ public/                  # Static assets
└─ README.md
```

---

## ✍️ Editor (TipTap) – Advanced Extensions

Installed (from `package.json`):  
- Core: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`
- Formatting: bold, italic, underline, strike, highlight, link, code/code-block, blockquote, hr, heading, paragraph, text, typography
- Lists: bullet list, ordered list, list item, task list, task item
- Tables: table, table row, table header, table cell
- Layout: text align, text style, color, placeholder
- Extras: subscript, superscript, character count, history, image

> Example UI includes buttons for **font family**, **font size**, **alignment**, **tables**, **tasks**, **colors**, **sup/sub**, **undo/redo**, etc.

---

## 🔐 Auth & Data

- **Presenters** authenticate with Supabase Auth.  
- **Viewers** can join anonymous sessions (no auth) unless presenters require sign‑in.  
- Data model (high level):
  - `profiles` (presenter)
  - `presentations`
  - `resources` (per presentation, with storage keys)
  - `viewer_notes` (private to viewer, keyed by presentation + anonymous or user id)
  - `questions` (optional; live Q&A)
  - `events` (analytics; optional)

---

## 🌐 Deployment

- **Netlify** or **Vercel** supported.  
- Set environment variables (same as `.env.local`) in your hosting provider.  
- For Netlify, add **Next.js plugin** if needed and ensure Node 18+ runtime.

---

## 📸 Screenshots

Create a `screenshots/` folder and drop images, then link them here:

| Presenter Dashboard | Resource Viewer | Notes (TipTap) |
| --- | --- | --- |
| ![Dashboard](./screenshots/dashboard.png) | ![Viewer](./screenshots/viewer.png) | ![Notes](./screenshots/notes.png) |

> You can export placeholder images from your design tool and replace as you capture real UI.

---

## 🧭 Roadmap

- [x] Supabase Auth + Storage + Realtime MVP
- [x] Presenter‑controlled current resource
- [x] Private notes with TipTap
- [ ] Live Q&A (moderated)
- [ ] Analytics dashboard (views, downloads, engagement)
- [ ] Advanced permissions & sharing
- [ ] Offline‑first mode

---

## 🤝 Contributing

PRs are welcome! Open an issue to discuss features or bugs.  
Use feature branches and conventional commits when possible.

---

## 📄 License

MIT © 2025 Your Name
