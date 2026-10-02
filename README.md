# Satwik Mukherjee — Digital Workspace

An immersive portfolio where visitors explore a developer's digital workspace (laptop, monitor,
server rack, file cabinet, terminal, phone) instead of scrolling a conventional resume — with a
fast, accessible **plain portfolio mode** for recruiters and mobile users.

> **Status:** Phase 10 — production build and deployment configuration are ready; the site is
> not deployed yet (see [Deployment](#deployment)). Phases 8 and 9 are deferred. See
> [Roadmap](#roadmap).

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
│   ├── public/             Static files served as-is (favicon, icons, Open Graph image)
│   ├── vercel.json         SPA rewrites, cache and security headers (CSP) for Vercel
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
├── render.yaml             Render Blueprint for the API
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

3. Optional: place the resume at `client/public/resume.pdf` and set `VITE_RESUME_URL=/resume.pdf`
   in `client/.env` to show the resume buttons locally. The file is **git-ignored and
   local-only** until a sanitized version (no phone number, no confidential details) is
   approved — see [Enabling the public resume](#enabling-the-public-resume).

## Environment variables

**`server/.env`**

| Variable          | Example                       | Purpose                                                 |
| ----------------- | ----------------------------- | ------------------------------------------------------- |
| `NODE_ENV`        | `development`                 | `production` disables dev logging/error details         |
| `PORT`            | `5000`                        | API port                                                |
| `CLIENT_URL`      | `http://localhost:5173`       | Allowed CORS origin(s), comma-separated                 |
| `MONGODB_URI`     | `mongodb+srv://…/portfolio?…` | Atlas connection string (database `portfolio`)          |
| `TRUST_PROXY`     | _(empty)_                     | Proxy hops for real client IPs; default 1 in production |
| `MONGODB_DB_NAME` | _(empty)_ / `portfolio-prod`  | Overrides the database named in `MONGODB_URI`           |

**`client/.env`**

| Variable          | Example                 | Purpose                                                                    |
| ----------------- | ----------------------- | -------------------------------------------------------------------------- |
| `VITE_API_URL`    | `http://localhost:5000` | API base URL, no trailing slash. Empty = same origin                       |
| `VITE_SITE_URL`   | `http://localhost:5173` | Public site URL for canonical/Open Graph tags, robots.txt and sitemap.xml  |
| `VITE_RESUME_URL` | _(empty)_               | Public resume path. Empty hides every resume button and drops `resume.pdf` |

Production builds (`vite build`) refuse to run unless `VITE_SITE_URL` is a valid `https://` URL
and `VITE_API_URL` is defined, so a deploy can never ship localhost links.

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

| Path         | Page                                                                              | Loading                                      |
| ------------ | --------------------------------------------------------------------------------- | -------------------------------------------- |
| `/`          | Landing — hero, workspace schematic, HUD footer                                   | main bundle                                  |
| `/portfolio` | Plain portfolio — 8 sections, scroll-spy nav, contact form                        | lazy chunk                                   |
| `/workspace` | Interactive workspace — 3D desk (2D on small screens), `?object=<id>`, `?view=2d` | lazy chunk; 3D scene is a further lazy chunk |
| `*`          | 404                                                                               | lazy chunk                                   |

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
- **Motion:** restrained and purposeful, chosen per page to protect bundle size:
  - Route changes cross-fade through the browser's View Transitions API (`viewTransition` on
    every router link) — no JavaScript animation cost, skipped where unsupported.
  - Landing and plain portfolio use CSS only: hero entrance, schematic "scan" reveal,
    scroll-reveal sections (`Reveal`, IntersectionObserver), a CSS-measured sliding indicator
    in the section nav and the contact confirmation.
  - The workspace uses Motion (`LazyMotion` + `domAnimation`, only in its own chunk) for the
    panel's slide-in/out and content cross-fade, and the 3D scene eases hover lift and a soft
    floor glow inside the render loop.
  - `prefers-reduced-motion` disables CSS animations and view transitions, shows revealed
    content immediately, limits Motion to fades and makes 3D camera moves instant.
- **Content:** profile text, nav and the workspace-object map live in `client/src/data/`, so
  the landing schematic, the 3D scene and the plain portfolio share one source.

## Interactive workspace

`/workspace` is a desk you explore: each object opens a panel with the same content as the plain
portfolio (shared components in `client/src/sections/content`, laid out with container queries
so they fit both a page and a narrow panel).

| Object          | Panel                                    |
| --------------- | ---------------------------------------- |
| 01 Laptop       | About me (+ interests)                   |
| 02 Monitor      | Experience                               |
| 03 Server rack  | Tech stack                               |
| 04 File cabinet | Projects                                 |
| 05 Terminal     | Developer journey (+ education, resume¹) |
| 06 Phone        | Contact                                  |
| 07 Shelf        | Interests                                |

¹ Only when `VITE_RESUME_URL` is set.

- **Navigation:** click an object or its numbered marker, or use the object dock (keyboard and
  screen-reader accessible). The panel has previous/next, a close button and closes on Escape
  (except while typing in a form). Panels are deep-linkable: `/workspace?object=monitor`.
- **3D scene** (`client/src/three`): React Three Fiber with primitives only — no model or HDR
  downloads. Object placement, marker anchors and camera poses live in `three/layout.js`.
  The camera eases to each object and the projection shifts so the object stays centred beside
  the side panel.
- **Performance:** the scene is its own lazy chunk (only fetched when 3D is shown), renders on
  demand (frames only while something moves), caps the pixel ratio at 1.5, and renders contact
  shadows and the environment once.
- **2D workspace:** used automatically on screens under 768 px and on short touch screens
  (phones in landscape) — the 3D chunk is never downloaded — when WebGL is unavailable or the
  scene fails to start, and on request via the "2D view" toggle (`?view=2d`). Same objects,
  same panels.
- **Reduced motion:** camera moves become instant and the pointer parallax and entrance dolly
  are disabled.

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

## Production build

```bash
cd client
npm run build     # needs VITE_SITE_URL (https) and VITE_API_URL — see Environment variables
npm run preview   # serves client/dist on http://localhost:4173
```

The build also:

- writes `robots.txt` and `sitemap.xml` (`/`, `/portfolio`, `/workspace`) for `VITE_SITE_URL`;
- fills the canonical link, Open Graph/Twitter tags (`og-image.png`, 1200×630) and the JSON-LD
  `Person` record in `index.html` from `VITE_SITE_URL` — public email and location only;
- deletes `dist/resume.pdf` unless `VITE_RESUME_URL` is set (a local, unsanitized copy can never
  be deployed by accident);
- emits fonts as separate files (never inlined), as the CSP only allows fonts from `'self'`.

**Security headers** (`client/vercel.json`, applied by Vercel): a strict Content-Security-Policy
(scripts, styles, fonts and images from the site itself; API calls to the site and
`*.onrender.com`; no framing), `nosniff`, `strict-origin-when-cross-origin` referrer,
`Permissions-Policy` denying camera/microphone/geolocation/payment, and
`Cross-Origin-Opener-Policy`. Hashed files in `/assets/` are cached for a year; every route
falls back to `index.html` for client-side routing.

## Deployment

Frontend on **Vercel**, API on **Render**, data in a separate **`portfolio-prod`** database on
the same Atlas cluster. Both hosts deploy from GitHub on every push to `main`; nothing is
deployed from a local machine. Both free tiers are enough for this site.

### 1. MongoDB Atlas

1. **Rotate the database user's password** (Database Access → Edit → Edit Password) and
   update `server/.env` — a password that has been shared anywhere should not reach production.
2. **Network Access:** Render's free tier has no fixed outbound IP. Add Render's outbound
   ranges if your service shows them (Render dashboard → service → Connect → Outbound);
   otherwise allow `0.0.0.0/0` and rely on the strong password and TLS.
3. **Seed the production database** from your machine (same cluster, different database):

   ```bash
   cd server
   MONGODB_DB_NAME=portfolio-prod npm run seed
   ```

   PowerShell: `$env:MONGODB_DB_NAME='portfolio-prod'; npm run seed; Remove-Item Env:MONGODB_DB_NAME`.
   Re-run it whenever content in `client/src/data` changes.

### 2. API on Render

1. Push the repository to GitHub (`.env` files and `resume.pdf` are git-ignored).
2. Render → **New → Blueprint** → select the repository. `render.yaml` creates the
   `satwik-portfolio-api` web service (root `server/`, `npm ci --omit=dev`, `npm start`,
   health check `/api/health`, Node 24, `MONGODB_DB_NAME=portfolio-prod`).
3. Enter the two secret values when prompted:
   - `MONGODB_URI` — the Atlas connection string with the rotated password.
   - `CLIENT_URL` — the Vercel URL you will use, e.g. `https://satwik-mukherjee.vercel.app`
     (comma-separate several; no trailing slash).
4. After the deploy, open `https://<service>.onrender.com/api/health` — expect
   `"environment": "production"` and `"database": "connected"`.

### 3. Frontend on Vercel

1. Vercel → **Add New → Project** → import the repository.
2. **Root Directory:** `client`. Framework preset **Vite** (build `npm run build`, output
   `dist`) is detected automatically.
3. **Environment Variables** (Production and Preview):

   | Variable          | Value                                                    |
   | ----------------- | -------------------------------------------------------- |
   | `VITE_API_URL`    | `https://<service>.onrender.com`                         |
   | `VITE_SITE_URL`   | `https://<project>.vercel.app` (must match `CLIENT_URL`) |
   | `VITE_RESUME_URL` | leave unset until a sanitized resume is committed        |

4. Deploy, then confirm the project's production URL matches `CLIENT_URL` on Render and
   `VITE_SITE_URL` on Vercel. If you change either, update the other side and redeploy
   (`VITE_*` values are baked in at build time).

### 4. Tighten and verify

- Replace `https://*.onrender.com` in the CSP `connect-src` (`client/vercel.json`) with the
  exact API origin, e.g. `https://satwik-portfolio-api.onrender.com`, and push.
- Run through the [pre-launch checklist](#pre-launch-checklist).

**Preview deployments** (Vercel branch/PR URLs) are not in `CLIENT_URL`, so their contact form
and analytics are rejected by the API and content comes from the bundled copy. Test the contact
form on the production URL, or add a preview origin to `CLIENT_URL` temporarily.

**Free-tier cold starts:** Render's free service sleeps after about 15 minutes without traffic
and takes up to a minute to wake. The site is built for this: content renders immediately from
the bundled copy, the first page load sends a warm-up request to `/api/health`, and the contact
form waits up to 30 seconds before showing the email fallback.

**Contact messages** have no admin UI yet: read them in Atlas → Browse Collections →
`portfolio-prod.contactmessages`. Nobody is notified of new messages, so check periodically.

### Enabling the public resume

Only once a sanitized PDF (no phone number, no confidential details) is approved:

1. Replace `client/public/resume.pdf` with the sanitized version and open it to double-check
   its text **and metadata** (title, author, subject, keywords).
2. Remove the `client/public/resume.pdf` line from `.gitignore` and commit the PDF.
3. Set `VITE_RESUME_URL=/resume.pdf` on Vercel and redeploy. The resume buttons appear on the
   landing page, the portfolio hero, the navigation and the workspace terminal.

### Pre-launch checklist

- [ ] `npm run lint`, `npm run format:check` and a production build pass locally.
- [ ] No `.env` file, credentials or unsanitized resume in Git (`git ls-files`).
- [ ] `/api/health` on Render reports `production` and `connected`.
- [ ] `/`, `/portfolio`, `/workspace` and a deep link (`/workspace?object=cabinet`) load on the
      production URL; refreshing a deep link does not 404.
- [ ] Projects and experience sections report `data-source="api"` (DevTools → Elements).
- [ ] Browser console shows no CSP violations on any page, including the 3D workspace.
- [ ] A test contact message arrives in `portfolio-prod.contactmessages` (delete it afterwards).
- [ ] Phone number appears nowhere: page source, `/api/*` responses, Open Graph tags, resume.
- [ ] Link previews look right (e.g. LinkedIn Post Inspector with the production URL).
- [ ] Mobile: `/workspace` shows the 2D workspace; `/portfolio` reads well at 360 px.

## Roadmap

1. ✅ Project setup
2. ✅ Base visual design (tokens, typography, landing page)
3. ✅ Plain portfolio (Hero, About, Experience, Skills, Projects, Education, Contact)
4. ✅ Express API + MongoDB models, validation, error handling
5. ✅ Frontend ↔ API integration
6. ✅ Interactive 3D workspace
7. ✅ Animations and transitions
8. ⏸ Mobile fallback — deferred. Already in place: responsive layouts, 2D workspace on phones
   (portrait and landscape) and without WebGL. Open: simplified 3D for tablets, real-device
   testing.
9. ⏸ Performance + SEO — deferred. Already in place: code-split routes and 3D scene, on-demand
   rendering, meta/Open Graph/JSON-LD, sitemap and robots.txt. Open: Lighthouse pass, 3D chunk
   size, image/structured-data refinements.
10. ✅ Production build and deployment configuration (Vercel + Render); going live needs the
    steps in [Deployment](#deployment).

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
- **Build fails with `Invalid production build configuration`** — set `VITE_SITE_URL` (https)
  and `VITE_API_URL` in Vercel's environment variables (or `client/.env` locally).
- **Production contact form fails with 403 / CORS errors** — the site's exact origin
  (scheme + host, no trailing slash) must be in Render's `CLIENT_URL`; redeploy after changing it.
- **Console shows `Refused to connect … violates … connect-src`** — `VITE_API_URL` is not covered
  by the CSP in `client/vercel.json`; update `connect-src` to the API origin.
- **First request after a quiet period is slow** — Render free tier waking up (up to a minute);
  see [Deployment](#deployment).
- **Placeholder shows "API unreachable"** — start the server, then confirm `VITE_API_URL` matches
  its port and `CLIENT_URL` matches the client's origin (CORS). Restart Vite after editing
  `client/.env`.
