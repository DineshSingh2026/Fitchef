# FitChef – Render setup (full checklist)

Use this as the single source of truth to get the site live on Render.

---

## 1. Create a PostgreSQL database (do this first)

1. **Dashboard:** https://dashboard.render.com  
2. **New +** → **PostgreSQL**  
3. **Name:** `fitchef-db` (or any name)  
4. **Region:** Choose one (e.g. Oregon).  
5. **Create Database**  
6. Wait until status is **Available**  
7. Open the database → **Connections**  
8. **Copy** the **Internal Database URL** (starts with `postgresql://`).  
   - You will paste this as `DATABASE_URL` in the Web Service.

---

## 2. Create the Web Service

1. **New +** → **Web Service**  
2. **Connect** repository: **GitHub** → select **DineshSingh2026/Fitchef**  
3. **Branch:** `main`

---

## 3. Build & start (copy exactly)

| Field | Value |
|-------|--------|
| **Name** | `fitchef` |
| **Region** | Same as your database (recommended) |
| **Root Directory** | *(leave blank)* |
| **Runtime** | **Node** |
| **Build Command** | `npm run render:build` |
| **Start Command** | `cd server && npm start` |

Do **not** add a space in `render:build` (it must be `render:build`, not `render : build`).

---

## 4. Environment variables (set every one)

In **Environment** → **Add Environment Variable**, add these **before** the first deploy:

| Key | Value | Required? |
|-----|--------|-----------|
| `NODE_ENV` | `production` | Yes |
| `DATABASE_URL` | Paste the **Internal Database URL** from step 1 | Yes (for subscribe + contact) |
| `CLIENT_ORIGIN` | Your Web Service URL, e.g. `https://fitchef.onrender.com` | Yes |
| `ADMIN_API_KEY` | Any long random secret (e.g. `your-secret-key-xyz-123`) | Yes (for `/api/admin/subscribers`) |
| `MAIL_USER` | Your Gmail address (for signup notifications) | Optional |
| `MAIL_APP_PASSWORD` | Gmail App Password (from Google Account → Security → App passwords) | Optional |

**Important:**

- Do **not** set `PORT` – Render sets it automatically.  
- Set **CLIENT_ORIGIN** to the exact URL Render gives your service (e.g. `https://fitchef-xxxx.onrender.com`). You can set it after the first deploy if you don’t know the URL yet.

---

## 5. Deploy

1. Click **Create Web Service** (or **Deploy**).  
2. Wait for the build to finish (Logs tab).  
3. Note your live URL (e.g. `https://fitchef-xxxx.onrender.com`).  
4. If you didn’t set **CLIENT_ORIGIN** yet: **Environment** → set `CLIENT_ORIGIN` to that URL → Save (Render will redeploy).

---

## 6. Initialize the database (one-time)

After the first successful deploy, run the SQL migrations **once** so subscribe and contact work.

**Option A – From your PC (with PostgreSQL client):**

1. In Render: open your **PostgreSQL** service → **Connections** → copy the **External Database URL** (for access from your machine).  
2. From the project root (where `database/` lives), run:

**Windows (PowerShell):**

```powershell
$env:DATABASE_URL = "postgresql://..."   # paste External URL here
psql $env:DATABASE_URL -f database/schema.sql
psql $env:DATABASE_URL -f database/app_settings.sql
```

**macOS / Linux:**

```bash
export DATABASE_URL="postgresql://..."   # paste External URL here
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/app_settings.sql
```

**Option B – From Render Shell (if `psql` is available):**

1. Web Service → **Shell**  
2. Run the same `psql $DATABASE_URL -f database/schema.sql` and `... app_settings.sql` from the repo root.

---

## 7. Verify the site is live

- **Homepage:** `https://YOUR-SERVICE-NAME.onrender.com/`  
  → FitChef “launching soon” page.

- **API health:** `https://YOUR-SERVICE-NAME.onrender.com/api/health`  
  → JSON: `{"success":true,"message":"FitChef API is running.","db":"ok"}`  
  - If `db` is `unconfigured` or `error`, check `DATABASE_URL` and that you ran `schema.sql` and `app_settings.sql`.

- **Subscribe:** Use the form on the site; it should return success and the email should appear in the database (and optionally trigger the notification email if `MAIL_USER` / `MAIL_APP_PASSWORD` are set).

---

## Quick reference – parameters to set on Render

| Parameter | Where | Value |
|-----------|--------|--------|
| Build Command | Web Service → Build & Deploy | `npm run render:build` |
| Start Command | Web Service → Build & Deploy | `cd server && npm start` |
| Root Directory | Web Service → Build & Deploy | *(empty)* |
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | Environment | Internal Database URL from Postgres service |
| `CLIENT_ORIGIN` | Environment | `https://YOUR-WEB-SERVICE-URL.onrender.com` |
| `ADMIN_API_KEY` | Environment | Any secret string |
| `MAIL_USER` | Environment | (optional) Gmail |
| `MAIL_APP_PASSWORD` | Environment | (optional) Gmail app password |

That’s everything you need to get the deployment live.
