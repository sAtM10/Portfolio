# Satwik Mukherjee — Digital Workspace

An immersive portfolio where visitors explore a developer's digital workspace (laptop, monitor,
server rack, file cabinet, terminal, phone) instead of scrolling a conventional resume — with a
fast, accessible **plain portfolio mode** for recruiters and mobile users.

> **Status:** Phase 5 of 10 complete — frontend connected to the API. See [Roadmap](#roadmap).

## Tech stack

| Layer    | Tools                                                                      |
| -------- | -------------------------------------------------------------------------- |
| Frontend | React 19, Vite 8, React Router 8, Tailwind CSS 4, Motion (Framer Motion)   |
| 3D       | Three.js, React Three Fiber, @react-three/drei (lazy-loaded, desktop only) |
| Backend  | Node.js 24, Express 5, Mongoose 9, Zod, Helmet, CORS, express-rate-limit   |
| Database | MongoDB Atlas                                                              |
| Tooling  | ESLint 10 (flat config), Prettier 3                                        |

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
│       ├── config/         Environment, database connection, shared constants
│       ├── controllers/    Request/response handling (thin)
│       ├── models/         Mongoose schemas
│       ├── routes/         Route definitions
│       ├── services/       Data access / business logic
│       ├── validators/     Zod request schemas
│       ├── middleware/     Validation, rate limiting, DB guard, 404, errors
│       ├── utils/          HttpError, serializer
│       ├── app.js          Express app factory
│       └── server.js       Entry point (connects to MongoDB, then listens)
│   └── scripts/seed.js     Idempotent seed from client/src/data
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

3. Place the resume at `client/public/resume.pdf` (served at `/resume.pdf`). It is
   **git-ignored and local-only** until a sanitized version (no phone number, no confidential
   details) is approved for deployment — remove the `.gitignore` entry only then.

## Environment variables

**`server/.env`**

| Variable      | Example                       | Purpose                                                 |
| ------------- | ----------------------------- | ------------------------------------------------------- |
| `NODE_ENV`    | `development`                 | `production` disables dev logging/error details         |
| `PORT`        | `5000`                        | API port                                                |
| `CLIENT_URL`  | `http://localhost:5173`       | Allowed CORS origin(s), comma-separated                 |
| `MONGODB_URI` | `mongodb+srv://…/portfolio?…` | Atlas connection string (database `portfolio`)          |
| `TRUST_PROXY` | _(empty)_                     | Proxy hops for real client IPs; default 1 in production |

**`client/.env`**

| Variable       | Example                 | Purpose                                              |
| -------------- | ----------------------- | ---------------------------------------------------- |
| `VITE_API_URL` | `http://localhost:5000` | API base URL, no trailing slash. Empty = same origin |

`VITE_*` values are embedded in the browser bundle — never put secrets there. `.env` files are
git-ignored; only `.env.example` is committed.

## MongoDB Atlas setup

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. **Database Access** → add a user with _Read and write to any database_.
3. **Network Access** → add your current IP (and later your host's outbound IPs).
4. **Connect → Drivers** → copy the `mongodb+srv://` string into `server/.env` as
   `MONGODB_URI`, insert `/portfolio` before the `?`, and replace `<db_password>`
   (URL-encode `@ : / ? # %` if present). Never paste the password anywhere else.
5. Load the content: `cd server && npm run seed`.

**Collections:** `projects`, `experiences` (seeded from `client/src/data`),
`contactmessages` (form submissions — name, email, subject, message, status; no IP or
browser data), `siteevents` (anonymous analytics; a TTL index deletes them after 365 days).

**Seeding:** `npm run seed` is idempotent — it inserts new entries, updates changed ones,
leaves identical ones alone, reports database-only entries without deleting them, and never
touches contact messages or events. Edit content in `client/src/data/`, then re-run it.

## Running locally

Use two terminals:

```bash
npm run dev:server   # API  → http://localhost:5000/api/health
npm run dev:client   # App  → http://localhost:5173
```

Or run inside each folder: `cd server && npm run dev`, `cd client && npm run dev`.

## Scripts (from the repo root)

| Script                | What it does                                   |
| --------------------- | ---------------------------------------------- |
| `npm run install:all` | Install client and server dependencies         |
| `npm run dev:client`  | Vite dev server with HMR                       |
| `npm run dev:server`  | Express with auto-restart on file changes      |
| `npm run build`       | Production build of the client → `client/dist` |
| `npm run lint`        | ESLint on both apps                            |
| `npm run format`      | Prettier on both apps (`format:check` in CI)   |

## Routes (client)

| Path         | Page                                                       | Loading     |
| ------------ | ---------------------------------------------------------- | ----------- |
| `/`          | Landing — hero, workspace schematic, HUD footer            | main bundle |
| `/portfolio` | Plain portfolio — 8 sections, scroll-spy nav, contact form | lazy chunk  |
| `/workspace` | Interactive 3D workspace (placeholder until Phase 6)       | lazy chunk  |
| `*`          | 404                                                        | lazy chunk  |

## Editing content

All portfolio text lives in `client/src/data/` — no component changes needed:

| File                   | Content                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `profile.js`           | Name, role, headline, about paragraphs, email, location, links |
| `experience.js`        | Jobs (ISO `YYYY-MM` dates; `endDate: null` = Present)          |
| `projects.js`          | Professional + personal projects                               |
| `skills.js`            | Skill groups; `primary: true` highlights the daily stack       |
| `journey.js`           | Developer-journey timeline                                     |
| `education.js`         | Degree and certifications                                      |
| `interests.js`         | Interests (icon keys map to icons in `InterestsSection.jsx`)   |
| `portfolioSections.js` | Section order and anchor ids (used by the landing legend too)  |

**Project links are optional.** Set `githubUrl` / `liveUrl` to a real URL and the card shows a
"Code" / "Live demo" button; leave them `null` and no button renders. Never add placeholder URLs.

**Privacy rules:** public contact details are limited to email and location — no phone number
anywhere (source, metadata, API responses or `resume.pdf`). Professional projects stay high-level:
role, stack and general contribution only, with no internal URLs, vendor names, credentials,
architecture or customer/business details.

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

## Frontend ↔ API

**Content (projects, experience).** The plain portfolio renders instantly from the bundled copy
in `client/src/data` and then swaps in the API response (`useApiContent`, session-cached).
If the API is slow, asleep or down, visitors still see complete content; if it answers with an
empty list, the section shows an empty state. Each section exposes `data-source="api"` or
`"fallback"` for debugging.

**Contact form.** `POST /api/contact` with client-side validation first; server field errors
(400 `details`) are shown inline on the matching fields, rate limits and outages show a banner
with the email address as a fallback. A successful send records `contact_submit`.

**Analytics.** Anonymous events are sent with `navigator.sendBeacon` as `text/plain` JSON (no
CORS preflight, survives navigation) and are never sent when the browser signals Global Privacy
Control or Do Not Track. No cookies, IDs, IPs or user agents are stored; a `sessionStorage` flag
only prevents counting a reload as a new visit.

| Event             | Sent when                                    | Metadata                                  |
| ----------------- | -------------------------------------------- | ----------------------------------------- |
| `portfolio_visit` | First page load in a browser-tab session     | —                                         |
| `plain_mode_open` | `/portfolio` is opened                       | —                                         |
| `workspace_enter` | `/workspace` is opened                       | —                                         |
| `resume_open`     | A resume link is clicked                     | `source`: `landing`, `portfolio` or `nav` |
| `project_open`    | A project's Code / Live demo link is clicked | `projectSlug`, `link`                     |
| `contact_submit`  | A contact message is accepted by the API     | —                                         |

## API endpoints

| Method | Path                                                                                           | Success                                 | Errors                     | Rate limit   |
| ------ | ---------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------- | ------------ |
| GET    | `/api/health`                                                                                  | 200 `{ data: { status, database, … } }` | —                          | —            |
| GET    | `/api/projects` — optional `?category=professional` or `personal`, `?featured=true` or `false` | 200 `{ data: [...] }` sorted by `order` | 400 bad filter             | 300 / 15 min |
| GET    | `/api/projects/:id` — slug (preferred) or ObjectId                                             | 200 `{ data }`                          | 400, 404                   | 300 / 15 min |
| GET    | `/api/experience`                                                                              | 200 `{ data: [...] }`                   | —                          | 300 / 15 min |
| GET    | `/api/experience/:id` — slug or ObjectId                                                       | 200 `{ data }`                          | 400, 404                   | 300 / 15 min |
| POST   | `/api/contact` `{ name, email, subject?, message }`                                            | 201 `{ data: { received: true } }`      | 400 (field `details`), 429 | 5 / 15 min   |
| POST   | `/api/events` `{ eventType, metadata?, path? }`                                                | 204                                     | 400, 429                   | 60 / min     |

- Responses are always `{ "data": … }` or `{ "error": { "message", "details"? } }`;
  `_id`, `__v`, `published` and timestamps are never exposed (`id` is returned instead).
- `eventType`: `portfolio_visit`, `workspace_enter`, `project_open`, `resume_open`,
  `contact_submit`, `plain_mode_open`. `metadata`: ≤ 5 simple keys with short primitive values.
- `POST /api/events` also accepts `text/plain` JSON (beacons, 2 KB limit). Both POST routes reject
  requests whose `Origin` is not in `CLIENT_URL` (403), so **`CLIENT_URL` must list every origin
  the site is served from**.
- Security: Helmet headers, CORS allow-list (`CLIENT_URL`), 20 KB body limit, Zod validation,
  Mongoose `sanitizeFilter` + `strictQuery`, in-memory rate limits (IPs never stored),
  contact-form honeypot, 503 while the database is unreachable.
- No admin endpoints yet; `published` (projects/experience) and contact `status` are ready for
  a future authenticated admin panel.

## Roadmap

1. ✅ Project setup
2. ✅ Base visual design (tokens, typography, landing page)
3. ✅ Plain portfolio (Hero, About, Experience, Skills, Projects, Education, Contact)
4. ✅ Express API + MongoDB models, validation, error handling
5. ✅ Frontend ↔ API integration
6. Interactive 3D workspace
7. Animations and transitions
8. Mobile fallback
9. Performance + SEO
10. Production build and deployment

## Troubleshooting

- **`[db] MONGODB_URI still contains the <db_password> placeholder`** — put the real password in
  `server/.env`.
- **`[db] Authentication failed`** — wrong username/password, or special characters not
  URL-encoded.
- **`[db] Could not reach the cluster`** — add your current IP in Atlas → Network Access.
- **`GET /api/projects` returns `{ "data": [] }`** — run `npm run seed` in `server/`.
- **`429 Too many …`** — rate limit hit; limits reset after the window (or on server restart in
  development).

- **`SyntaxError` / "Unsupported engine" on install or `vite` crashes** — check `node -v`; you
  need ≥ 22.12.
- **`Port 5173 is already in use`** — the client uses `strictPort`; stop the other process or
  change `server.port` in `client/vite.config.js`.
- **`EADDRINUSE` on 5000** — change `PORT` in `server/.env` _and_ `VITE_API_URL` in
  `client/.env`.
- **Placeholder shows "API unreachable"** — start the server, then confirm `VITE_API_URL` matches
  its port and `CLIENT_URL` matches the client's origin (CORS). Restart Vite after editing
  `client/.env`.
