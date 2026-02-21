# Fix "Something went wrong" on Early Access (live server)

The early access form shows an error because the **database is not set up** on Render. Do these steps once.

---

## 1. Add a PostgreSQL database on Render (if you don’t have one)

1. Go to **https://dashboard.render.com**
2. Click **New +** → **PostgreSQL**
3. Name it (e.g. `fitchef-db`), choose a region, click **Create Database**
4. Wait until it shows **Available**
5. Open the database → **Connections** → copy the **Internal Database URL**

---

## 2. Set DATABASE_URL on your Web Service

1. Open your **Fitchef** Web Service
2. Go to **Environment**
3. Add (or edit):
   - **Key:** `DATABASE_URL`
   - **Value:** paste the **Internal Database URL** from step 1
4. **Save Changes** (Render will redeploy)

---

## 3. Create the `subscribers` table (one-time)

After the redeploy, run the SQL once so the early access signups can be stored.

**Option A – From your PC (with PostgreSQL client installed):**

1. In Render: open your **PostgreSQL** service → **Connections** → copy the **External Database URL**
2. Open PowerShell (or Terminal) in your project folder (where the `database` folder is)
3. Run (replace `YOUR_EXTERNAL_URL` with the URL from step 1):

**Windows PowerShell:**
```powershell
$env:DATABASE_URL = "YOUR_EXTERNAL_URL"
psql $env:DATABASE_URL -f database/schema.sql
psql $env:DATABASE_URL -f database/app_settings.sql
```

**macOS/Linux:**
```bash
export DATABASE_URL="YOUR_EXTERNAL_URL"
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/app_settings.sql
```

**Option B – Using an online SQL runner:**

1. In Render, open your Postgres → **Info** or **Connect** and get the **External** connection details (host, port, database name, user, password)
2. Use a tool like **pgAdmin**, **DBeaver**, or **Render’s Shell** (if it has `psql`) to connect and run the contents of `database/schema.sql`, then `database/app_settings.sql`

---

## 4. Test again

Open **https://fitchef.onrender.com**, enter an email in “Be Among the First”, and click **Submit**. You should see a success message and no error.

---

**Summary:** Set `DATABASE_URL` on the Web Service and run `schema.sql` (and `app_settings.sql`) once against that database. After that, early access signups will work.
