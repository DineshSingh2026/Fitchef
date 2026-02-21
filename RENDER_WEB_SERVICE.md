# Render Web Service – FitChef (API + frontend in one)

Use these settings so **one Web Service** serves both the API and the React site.

## 1. Build & start

- **Build command:**
  ```bash
  npm run render:build
  ```
  Or step by step:
  ```bash
  npm install && cd server && npm install && cd ../client && npm install && npm run build
  ```
  (This installs server + client deps and builds the React app into `client/dist`.)

- **Start command:**
  ```bash
  cd server && npm start
  ```

- **Root directory:** leave empty (repo root).

## 2. Environment variables

In the Render dashboard, set:

| Variable          | Description |
|-------------------|-------------|
| `NODE_ENV`        | `production` |
| `PORT`            | Set by Render (leave as is) |
| `DATABASE_URL`    | Your Render PostgreSQL URL (or external DB URL) |
| `CLIENT_ORIGIN`   | Your Render URL, e.g. `https://fitchef-xxxx.onrender.com` (same service URL) |
| `ADMIN_API_KEY`   | A secret key for `/api/admin/subscribers` |
| `MAIL_USER`       | Gmail for signup notifications (optional) |
| `MAIL_APP_PASSWORD` | Gmail app password (optional) |

## 3. After deploy

- **Site:** `https://your-service.onrender.com/` → serves the React app.
- **API:** `https://your-service.onrender.com/api/health`, `/api/subscribe`, etc.

Run the DB migrations once (e.g. from your machine or Render shell):

```bash
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/app_settings.sql
```
