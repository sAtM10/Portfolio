# Satwik Mukherjee — Digital Workspace

An immersive portfolio where visitors explore a developer's digital workspace (laptop, monitor,
server rack, file cabinet, terminal, phone) instead of scrolling a conventional resume — with a
fast, accessible **plain portfolio mode** for recruiters and mobile users.

> **Status:** Phase 2 of 10 complete — base visual design and landing page. See [Roadmap](#roadmap).

## Tech stack

| Layer    | Tools                                                                     |
| -------- | ------------------------------------------------------------------------- |
| Frontend | React 19, Vite 8, React Router 8, Tailwind CSS 4, Motion (Framer Motion)  |
| 3D       | Three.js, React Three Fiber, @react-three/drei (lazy-loaded, desktop only) |
| Backend  | Node.js 24, Express 5, Mongoose 9, Zod, Helmet, CORS, express-rate-limit  |
| Database | MongoDB Atlas                                                             |
| Tooling  | ESLint 10 (flat config), Prettier 3                                       |

The backend uses Node's built-in `--env-file-if-exists` and `--watch` flags, so it needs no
`dotenv` or `nodemon`.

## Folder structure

```
portfolio/
├── client/                 React app (runs independently)
│   ├── public/             Static files served as-is (favicon, robots.txt, resume)
│   └── src/
│       ├── components/     Reusable UI building blocks
│       ├── sections/       Page sections (About, Experience, Projects…)
│       ├── pages/          Route-level pages
│       ├── three/          3D workspace scene (code-split)
│       ├── hooks/          Custom React hooks
│       ├── services/       API client
│       ├── data/           Static content / fallbacks
│       ├── assets/         Images and media imported by code
│       ├── utils/          Pure helpers
│       └── styles/         Global CSS and Tailwind theme
├── server/                 Express API (runs independently)
│   └── src/
│       ├── config/         Environment + database config
│       ├── controllers/    Request/response handling
│       ├── models/         Mongoose schemas
│       ├── routes/         Route definitions
│       ├── services/       Business/data logic
│       ├── middleware/     Error handling, validation, rate limiting
│       ├── utils/          Shared helpers
│       ├── app.js          Express app factory
│       └── server.js       Entry point
├── .editorconfig  .gitattributes  .gitignore  .nvmrc  .prettierrc.json
└── package.json            Convenience scripts only (no dependencies)
```

## Prerequisites

- **Node.js ≥ 22.12** (24 LTS recommended — see `.nvmrc`). Vite 8, ESLint 10, React Router 8
  and Mongoose 9 will not run on older versions.
- npm 10+
- A MongoDB Atlas cluster (needed from Phase 4)

## Local setup

```bash
# 1. Install dependencies for both apps
npm run install:all

# 2. Create env files from the examples
cp client/.env.example client/.env
cp server/.env.example server/.env
```

On Windows PowerShell use `Copy-Item client/.env.example client/.env` (and the same for server).

3. Put the resume PDF at `client/public/resume.pdf` (served at `/resume.pdf`). It is
   currently git-ignored because it contains a phone number — remove that `.gitignore` entry once
   a publishable version is in place.

## Environment variables

**`server/.env`**

| Variable      | Example                 | Purpose                                         |
| ------------- | ----------------------- | ----------------------------------------------- |
| `NODE_ENV`    | `development`           | `production` disables dev logging/error details |
| `PORT`        | `5000`                  | API port                                        |
| `CLIENT_URL`  | `http://localhost:5173` | Allowed CORS origin(s), comma-separated         |
| `MONGODB_URI` | `mongodb+srv://…`       | Atlas connection string (Phase 4)               |

**`client/.env`**

| Variable       | Example                 | Purpose                                         |
| -------------- | ----------------------- | ----------------------------------------------- |
| `VITE_API_URL` | `http://localhost:5000` | API base URL, no trailing slash. Empty = same origin |

`VITE_*` values are embedded in the browser bundle — never put secrets there. `.env` files are
git-ignored; only `.env.example` is committed.

## Running locally

Use two terminals:

```bash
npm run dev:server   # API  → http://localhost:5000/api/health
npm run dev:client   # App  → http://localhost:5173
```

Or run inside each folder: `cd server && npm run dev`, `cd client && npm run dev`.

## Scripts (from the repo root)

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run install:all`  | Install client and server dependencies        |
| `npm run dev:client`   | Vite dev server with HMR                      |
| `npm run dev:server`   | Express with auto-restart on file changes     |
| `npm run build`        | Production build of the client → `client/dist` |
| `npm run lint`         | ESLint on both apps                           |
| `npm run format`       | Prettier on both apps (`format:check` in CI)  |

## Routes (client)

| Path         | Page                                                     | Loading       |
| ------------ | -------------------------------------------------------- | ------------- |
| `/`          | Landing — hero, workspace schematic, HUD footer           | main bundle   |
| `/portfolio` | Plain portfolio (placeholder until Phase 3)              | lazy chunk    |
| `/workspace` | Interactive 3D workspace (placeholder until Phase 6)     | lazy chunk    |
| `*`          | 404                                                      | lazy chunk    |

## Design system

All tokens live in `client/src/styles/index.css` (`@theme`). Tailwind's default palette is
reset, so only semantic colors exist — `canvas`, `surface`, `raised`, `line`, `fg`,
`fg-muted`, `fg-subtle`, `accent` (warm amber "desk lamp"), `ambient` (cool "monitor glow"),
`success`, `danger`. Every text color passes WCAG AA (≥ 4.5:1) on every surface.

- **Type:** Instrument Sans (UI/headings) + JetBrains Mono (labels, buttons, HUD), self-hosted
  via Fontsource — no third-party font requests.
- **Primitives:** `Button` (primary / secondary / ghost; renders Link, a or button),
  `Panel` (glass surface), `Container`, `Eyebrow`.
- **Motion:** CSS-only entrance (`animate-rise`) for now; everything is disabled under
  `prefers-reduced-motion: reduce`.
- **Content:** profile text, nav and the workspace-object map live in `client/src/data/`, so
  the landing schematic, the 3D scene and the plain portfolio share one source.

## API endpoints

| Method | Path          | Status      | Description         |
| ------ | ------------- | ----------- | ------------------- |
| GET    | `/api/health` | ✅ live     | Liveness check      |
| GET    | `/api/projects`, `/api/projects/:id`     | Phase 4 | Projects    |
| GET    | `/api/experience`, `/api/experience/:id` | Phase 4 | Experience  |
| POST   | `/api/contact` | Phase 4    | Contact form        |
| POST   | `/api/events`  | Phase 4    | Lightweight analytics |

Errors always use the shape `{ "error": { "message": "…" } }`.

## Roadmap

1. ✅ Project setup
2. ✅ Base visual design (tokens, typography, landing page)
3. Plain portfolio (Hero, About, Experience, Skills, Projects, Education, Contact)
4. Express API + MongoDB models, validation, error handling
5. Frontend ↔ API integration
6. Interactive 3D workspace
7. Animations and transitions
8. Mobile fallback
9. Performance + SEO
10. Production build and deployment

## Troubleshooting

- **`SyntaxError` / "Unsupported engine" on install or `vite` crashes** — check `node -v`; you
  need ≥ 22.12.
- **`Port 5173 is already in use`** — the client uses `strictPort`; stop the other process or
  change `server.port` in `client/vite.config.js`.
- **`EADDRINUSE` on 5000** — change `PORT` in `server/.env` *and* `VITE_API_URL` in
  `client/.env`.
- **Placeholder shows "API unreachable"** — start the server, then confirm `VITE_API_URL` matches
  its port and `CLIENT_URL` matches the client's origin (CORS). Restart Vite after editing
  `client/.env`.
