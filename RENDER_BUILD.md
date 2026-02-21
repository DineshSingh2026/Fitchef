# Render deployment – FitChef static site

If the build fails with **"find package 'vite'"** or **"vite: not found"**, use these settings.

## Static Site (frontend)

1. **Dashboard:** Create a **Static Site** and connect repo `DineshSingh2026/Fitchef`.
2. **Root directory:** Leave **empty** (repo root).
3. **Build command (copy exactly):**
   ```bash
   cd client && npm install && npx vite build
   ```
4. **Publish directory:** `client/dist`
5. **Environment (optional):** Add `VITE_API_URL` = your backend API URL + `/api` (e.g. `https://your-api.onrender.com/api`).

Vite and other build tools are in **dependencies** so they install even when Render uses production installs. Redeploy after pushing.
