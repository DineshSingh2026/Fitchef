# FitChef — Gourmet Wellness, Delivered.

**Launching Soon — Exclusively for Discerning Palates.**

Production-ready full stack pre-launch site: React (Vite) + Node/Express + PostgreSQL. Luxury dark theme, early access signup, and admin subscriber list.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Helmet, CORS, rate limiting
- **Database:** PostgreSQL

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

---

## Quick Start

### 1. Clone and install

```bash
cd "Fitchef 21 feb"
npm run install:all
```

Or manually:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Database

Project uses **username:** `fitchef_user`, **database:** `fitchef`, **port:** `5432`. Run once as PostgreSQL superuser (e.g. `postgres`):

```bash
psql -U postgres -f database/init.sql
```

Then create the tables (as the app user):

```bash
psql -U fitchef_user -d fitchef -f database/schema.sql
psql -U fitchef_user -d fitchef -f database/app_settings.sql
```

(When prompted, use the password you set for `fitchef_user`.) The `app_settings` table stores the WhatsApp contact number (+91 9502575669) for the floating chat button.

### 3. Environment

**Server** — `server/.env` is already set with:

- `PORT=5000` (app port)
- `DATABASE_URL=postgresql://fitchef_user:***@localhost:5432/fitchef` (password in URL is URL-encoded)
- `CLIENT_ORIGIN=http://localhost:5173`
- `ADMIN_API_KEY` — change in production
- `MAIL_USER` and `MAIL_APP_PASSWORD` — Gmail address and [App Password](https://support.google.com/accounts/answer/185833) so new signups trigger an email to **bodybank.fit369@gmail.com**. If unset, signups still work but no email is sent.

To start from scratch: copy `server/.env.example` to `server/.env` and set values.

**Client** (optional for dev):

- `client/.env`: set `VITE_API_URL` only if the API is on another origin. For local dev with proxy, leave unset.

### 4. Run development

From project root:

```bash
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:5000  

Or run separately:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### 5. Run tests (DB + API)

From project root (uses `server/.env` for `DATABASE_URL` and `ADMIN_API_KEY`):

```bash
npm test
```

This runs the full integration suite: **database connection** (pool connect, `subscribers` table), **health** (`GET /api/health`), **subscribe** (valid, invalid, missing email, duplicate, trim), and **admin** (401 without key, 401 wrong key, 200 with `X-API-Key` or `apiKey` query). Requires PostgreSQL running and schema applied.

### 6. Build for production

```bash
npm run build
```

Serves the built client from `client/dist`. Backend runs separately (e.g. `cd server && npm start`).

---

## API

### Public

- **POST /api/subscribe**  
  Body: `{ "email": "user@example.com" }`  
  - 201: `{ "success": true, "message": "Successfully subscribed for early access." }`  
  - 409: `{ "success": false, "message": "Email already registered." }`  
  - 400: validation error

- **GET /api/contact**  
  Returns `{ "success": true, "whatsappNumber": "919502575669" }` for the WhatsApp support link (number stored in `app_settings`).

### Admin (API key required)

- **GET /api/admin/subscribers**  
  Header: `X-API-Key: your-admin-api-key`  
  Or query: `?apiKey=your-admin-api-key`  
  Response: `{ "success": true, "count": N, "subscribers": [...] }`

---

## Deployment (Render)

### Backend (Web Service)

1. New → **Web Service**.
2. Connect repo (or push this folder to GitHub and connect).
3. **Root directory:** leave default or set to repo root.
4. **Build command:** `cd server && npm install`
5. **Start command:** `cd server && npm start`
6. **Environment:**
   - `NODE_ENV=production`
   - `PORT` (Render sets this)
   - `DATABASE_URL` — create a PostgreSQL database on Render and use its Internal/External URL.
   - `CLIENT_ORIGIN` — your frontend URL (e.g. `https://fitchef.onrender.com` or custom domain).
   - `ADMIN_API_KEY` — generate a strong random string and add as secret.
7. Deploy.

### Frontend (Static Site)

1. New → **Static Site**.
2. Connect same repo.
3. **Root directory:** leave default.
4. **Build command:** `cd client && npm install && npm run build`
5. **Publish directory:** `client/dist`
6. **Environment:**  
   - `VITE_API_URL` = your backend URL + `/api` (e.g. `https://fitchef-api.onrender.com/api`)
7. Deploy.

### Database

- Use Render PostgreSQL: create from Dashboard, copy **Internal Database URL** for the backend `DATABASE_URL`.
- Run the schema once (Render’s psql or any client):

```bash
psql $DATABASE_URL -f database/schema.sql
```

---

## Security

- Email validated and trimmed server-side; parameterized queries (no SQL injection).
- Helmet and CORS enabled; rate limiting on API and stricter on `/api/subscribe`.
- Admin route protected by `ADMIN_API_KEY`; keep it secret and use HTTPS in production.

---

## Project structure

```
fitchef/
├── client/                 # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Hero, About, Features, EarlyAccess, Footer
│   │   ├── pages/          # Landing
│   │   ├── App.jsx, main.jsx, index.css
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/db.js
│   ├── controllers/subscribeController.js
│   ├── middleware/errorHandler.js, rateLimiter.js, logger.js, adminAuth.js
│   ├── routes/subscribeRoutes.js
│   ├── server.js
│   ├── .env, .env.example
│   └── package.json
├── database/
│   └── schema.sql
├── package.json
└── README.md
```

---

© 2026 FitChef. Launching Soon.
