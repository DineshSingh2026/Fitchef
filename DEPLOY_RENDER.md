# Get FitChef live on Render

Your repo is at **https://github.com/DineshSingh2026/Fitchef**. Use these steps so the site goes live.

## 1. Create / open the Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. **New → Web Service**.
3. Connect **GitHub** and select repo **DineshSingh2026/Fitchef**, branch **main**.

## 2. Build & start (copy exactly)

- **Build command:** `npm run render:build`
- **Start command:** `cd server && npm start`
- **Root directory:** leave blank.

## 3. Add a PostgreSQL database (required for signups)

1. In Render dashboard: **New → PostgreSQL**.
2. Create the DB and copy the **Internal Database URL** (or use the external one).
3. In your **Web Service → Environment**, add:
   - **Key:** `DATABASE_URL`  
   - **Value:** paste the PostgreSQL URL.

## 4. Required environment variables

In the Web Service **Environment** tab, add:

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | (from step 3) |
| `CLIENT_ORIGIN` | `https://YOUR-SERVICE-NAME.onrender.com` (your Web Service URL) |
| `ADMIN_API_KEY` | (any secret string for `/api/admin/subscribers`) |

Optional (for signup email notifications):

| Key | Value |
|-----|--------|
| `MAIL_USER` | your Gmail |
| `MAIL_APP_PASSWORD` | Gmail app password |

**Note:** Render sets `PORT` automatically; do not override it.

## 5. Initialize the database (once)

After the first deploy, run the schema once. From your machine (with `DATABASE_URL` set to your Render Postgres URL):

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL = "postgresql://..."   # paste your Render Postgres URL
psql $env:DATABASE_URL -f database/schema.sql
psql $env:DATABASE_URL -f database/app_settings.sql
```

**macOS/Linux:**
```bash
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/app_settings.sql
```

Or in Render: **Web Service → Shell** → then run the same `psql` commands if `psql` is available there.

## 6. Deploy

Click **Create Web Service** (or **Manual Deploy → Deploy latest commit**).  
When the build and deploy finish, open **https://YOUR-SERVICE-NAME.onrender.com** — the site and API are live.

- **Site:** `https://YOUR-SERVICE-NAME.onrender.com/`
- **API health:** `https://YOUR-SERVICE-NAME.onrender.com/api/health`
