# MIDNIGHT_OIL // SYSTEM_MANUAL

Welcome to the **Midnight Oil** platform. You have been granted access to the Deepmind CoDeNet Stalker (v0.8.2), a high-intensity AI protocol for source-logic auditing.

## 🏗️ PROJECT_STRUCTURE

### /client
- **Framework**: React + Vite + Tailwind CSS.
- **Design**: Zero-radius "Blocky UI", CRT scanlines, and terminal aesthetics.
- **Key Modules**:
  - `src/pages/Review.jsx`: The core audit engine (Paste/GitHub input).
  - `src/pages/Dashboard.jsx`: Tactical overview and mission-brief.
  - `src/pages/History.jsx`: Historical forensic archive.
  - `src/pages/AdminDashboard.jsx`: Central command metrics.

### /server
- **Runtime**: Node.js + Express.
- **Intelligence**: Google Gemini 1.5 Flash API.
- **Endpoints**:
  - `POST /api/analyze`: Ingests source code and returns a structured AI audit.
  - `GET /api/admin/stats`: Heartbeat for system-wide metrics.

### /database
- **Provider**: Supabase (PostgreSQL).
- **Storage**: The `reviews` table archives every diagnostic session for future reference.

---

## ⚡ ACTIVATION_SEQUENCE

### 1. Environment Configuration
Create a `.env` file in the **root** (or separate `/client/.env` and `/server/.env` files):

**Server `.env`**:
```env
PORT=5000
GEMINI_API_KEY=your_google_ai_key_here
```

**Client `.env`**:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Dependency Uplink
Run this in both the `/client` and `/server` directories:
```bash
npm install
```

### 3. Initiate Kernels
**Start Backend (Terminal A)**:
```bash
cd server
node index.js
```

**Start Frontend (Terminal B)**:
```bash
cd client
npm.cmd run dev
```

---

## 📟 OPERATIONAL_FAQ

**"How do I start an audit?"**
Navigate to the `AUDIT` node. Paste your code into the terminal buffer or provide a public GitHub URL. Press `INITIATE_DIAGNOSTIC`.

**"Where are my results saved?"**
Every successful audit is hashed and stored in the `ARCHIVE` tier. You can search by project name or language.

**"What is the Health Index?"**
A real-time interpretation of code integrity. 10.0 is optimal; anything below 5.0 is a critical logic breach.

---
> [!IMPORTANT]
> This system is designed for high-ready technical personnel. Every breach found must be stabilized immediately.
