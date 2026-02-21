# FitChef – Ready to Deploy

This project has been tested and is configured for production deployment on Render.

---

## What was tested

- **Production build:** `npm run render:build` completes successfully; frontend outputs to `client/dist`.
- **Backend API:** Health (`/api/health`), contact (`/api/contact`), and subscribe (`/api/subscribe`) respond correctly.
- **Frontend–backend connection:** In production the app is served from one origin; the frontend uses base URL `/api` (no `VITE_API_URL` needed when backend serves the app).
- **Static serving:** In production the Express server serves `client/dist` and falls back to `index.html` for SPA routes.
- **Error handling:** Frontend shows clear messages for 409 (already registered), 503 (unavailable), and network errors.

---

## Deploy on Render (quick reference)

| Setting | Value |
|--------|--------|
| **Build Command** | `npm run render:build` |
| **Start Command** | `cd server && npm start` |
| **Root Directory** | *(leave blank)* |

**Required environment variables:**

- `NODE_ENV` = `production`
- `DATABASE_URL` = *(Render Postgres Internal URL)*
- `CLIENT_ORIGIN` = *(your Web Service URL, e.g. https://fitchef.onrender.com)*
- `ADMIN_API_KEY` = *(any secret string)*

**After first deploy:** Run `database/schema.sql` and `database/app_settings.sql` once against your database (see `RENDER_SETUP.md`).

---

## Run locally (production mode)

```bash
npm run render:build
cd server && NODE_ENV=production PORT=5000 node server.js
```

Then open http://localhost:5000 — the full app (API + frontend) runs from one server.

---

## Repo and docs

- **Repo:** https://github.com/DineshSingh2026/Fitchef  
- **Full Render steps:** `RENDER_SETUP.md`  
- **Deployment details and troubleshooting:** `RENDER_DEPLOYMENT.md`
