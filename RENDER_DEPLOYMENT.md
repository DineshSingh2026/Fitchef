# FitChef – Production deployment on Render

Professional deployment guide for **React (Vite) + Node/Express + PostgreSQL** on Render.

---

## 1. Backend optimization (production-ready)

- **PORT:** Server uses `process.env.PORT || 5000`. Render sets `PORT` automatically; do not override.
- **Listen:** `app.listen(PORT, () => { console.log('Server running on port ${PORT}'); });`
- **PostgreSQL:** Connection uses `process.env.DATABASE_URL` with `ssl: { rejectUnauthorized: false }` in production (required for Render Postgres).
- **No nodemon in production:** `npm start` runs `node server.js` only.
- **CORS:** Configured with `CLIENT_ORIGIN`; supports credentials and common methods/headers.
- **Environment variables:** All secrets and URLs come from env (see below).

---

## 2. Frontend optimization (Vite)

- **Build command:** `npm run build`
- **Output directory:** `dist` (Vite default)
- **API base URL:** All API calls use `import.meta.env.VITE_API_URL || '/api'`. No hardcoded `localhost`. Set `VITE_API_URL` only when frontend is a separate Static Site (e.g. `https://your-backend.onrender.com/api`).

---

## 3. Environment variables

### Backend (Web Service → Environment)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | Do not set (Render sets it) | — |
| `DATABASE_URL` | PostgreSQL connection string (Render Postgres Internal URL) | Yes |
| `CLIENT_ORIGIN` | Frontend origin (e.g. `https://your-app.onrender.com` or Static Site URL) | Yes if separate frontend |
| `ADMIN_API_KEY` | Secret for `/api/admin/subscribers` | Yes |
| `JWT_SECRET` | For future auth (set any long random string) | Recommended |
| `MAIL_USER` or `EMAIL_USER` | Gmail for notifications | Optional |
| `MAIL_APP_PASSWORD` or `EMAIL_PASS` | Gmail App Password | Optional |

### Frontend (Static Site → Environment, only if deploying frontend separately)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Full API base, e.g. `https://your-backend.onrender.com/api` |

---

## 4. Deployment strategies on Render

### Option A: Single Web Service (recommended – backend serves frontend)

One service serves both API and React build.

| Setting | Value |
|---------|--------|
| **Type** | Web Service |
| **Build Command** | `npm run render:build` |
| **Start Command** | `npm start` |
| **Root Directory** | *(blank)* |
| **Publish Directory** | *(not used)* |

- No separate Static Site. Backend serves `client/dist` in production.
- Frontend uses relative `/api`; no `VITE_API_URL` needed.
- **Environment variables:** Set only on the Web Service (see Backend table above).

---

### Option B: Backend Web Service + Frontend Static Site

Two services: one API, one static frontend.

**Backend (Web Service)**

| Setting | Value |
|---------|--------|
| **Build Command** | `npm install && cd server && npm install` |
| **Start Command** | `npm start` |
| **Root Directory** | *(blank)* |

- Set `CLIENT_ORIGIN` to your Static Site URL (e.g. `https://fitchef-frontend.onrender.com`).

**Frontend (Static Site)**

| Setting | Value |
|---------|--------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Root Directory** | `client` |

- **Environment variable:** `VITE_API_URL=https://your-backend-name.onrender.com/api` (your Web Service URL + `/api`).

---

## 5. Error prevention (common Render failures)

| Issue | Cause | Correction |
|-------|--------|------------|
| **Missing PORT** | App listens on fixed port (e.g. 5000) | Use `const PORT = process.env.PORT \|\| 5000` and do not set `PORT` on Render. |
| **Wrong start command** | e.g. `npm run dev` or `nodemon` | Use `npm start` (installs server deps then runs `node server.js`). |
| **Database SSL issue** | Render Postgres requires SSL | Use `ssl: { rejectUnauthorized: false }` in production for `pg` Pool (already configured). |
| **Incorrect build directory** | Static Site publish path wrong | For Vite: **Publish Directory** = `dist`. For Option A, backend serves `client/dist`; no publish dir. |
| **Localhost API usage** | Frontend calls `http://localhost:5000` | Use `VITE_API_URL` (or leave empty when backend serves frontend). No hardcoded localhost in code. |
| **Build script typo** | `npm run render : build` (spaces) | Use exactly `npm run render:build`. |
| **DB not initialized** | Tables missing | Run `database/schema.sql` and `database/app_settings.sql` once against `DATABASE_URL`. |

---

## 6. Updated package.json examples

**Root `package.json` (monorepo):**

```json
{
  "name": "fitchef",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "server:dev": "cd server && npm run dev",
    "client:dev": "cd client && npm run dev",
    "server:start": "cd server && npm start",
    "client:build": "cd client && npm run build",
    "build": "npm run client:build",
    "install:all": "npm install && cd server && npm install && cd ../client && npm install",
    "render:build": "npm run install:all && cd client && npm run build",
    "start": "cd server && npm start"
  }
}
```

**Server `server/package.json` (production start = node only, no nodemon):**

```json
{
  "name": "fitchef-server",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js",
    "test": "cross-env NODE_ENV=test node --test tests/integration.test.js"
  }
}
```

**Client `client/package.json` (Vite build → dist):**

```json
{
  "scripts": {
    "build": "npx vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

---

## 7. Updated server.js example

```javascript
import { app } from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 8. Folder structure (reference)

```
Fitchef 21 feb/
├── client/                 # React (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js   # uses VITE_API_URL || '/api'
│   │   └── ...
│   ├── .env.example
│   ├── package.json        # "build": "npx vite build" → dist/
│   └── vite.config.js
├── server/                 # Express API
│   ├── config/
│   │   └── db.js           # Pool + SSL in production
│   ├── routes/
│   ├── controllers/
│   ├── .env.example
│   ├── package.json        # "start": "node server.js"
│   └── server.js
├── database/
│   ├── schema.sql
│   └── app_settings.sql
├── package.json            # root: render:build, install:all
├── RENDER_SETUP.md         # Step-by-step checklist
└── RENDER_DEPLOYMENT.md    # This file
```

---

## 9. Deployment checklist

- [ ] **Backend:** Web Service created; Build = `npm run render:build`, Start = `npm start`.
- [ ] **Env:** `NODE_ENV=production`, `DATABASE_URL`, `CLIENT_ORIGIN` (if needed), `ADMIN_API_KEY`, `JWT_SECRET`; optional mail vars.
- [ ] **Database:** Render Postgres created; run `schema.sql` and `app_settings.sql` once.
- [ ] **No PORT** set in Render (use Render’s default).
- [ ] **Frontend (Option A):** No extra config; backend serves `client/dist`.
- [ ] **Frontend (Option B):** Static Site with Build = `npm run build`, Publish = `dist`, Root = `client`, `VITE_API_URL` set.
- [ ] **Verify:** `https://your-service.onrender.com/api/health` returns `{"success":true,"db":"ok"}` and site loads.
