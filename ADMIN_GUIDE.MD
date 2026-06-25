# Smesh.dev Admin Dashboard — Runbook & Setup Guide

This repository contains the standalone, static Astro admin dashboard for **smesh.dev**. It integrates client-side with Supabase for data management (blogs, portfolio, leads, gated resources) and secure magic link authentication.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the project with the following keys:

```env
PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> [!NOTE]
> During local builds (`npm run build`), Astro compiles the routes statically. The Supabase client includes resilient default fallback placeholders to ensure build compilation succeeds even if environment variables are not loaded.

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Local Server**:
   ```bash
   npm run dev
   ```
   * Access the dashboard at `http://localhost:4321/` (will redirect to `/login` if not authenticated).
3. **Build & Verify Production Assets**:
   ```bash
   npm run build
   ```
   * Compilation outputs a purely static folder (`dist/`) containing the compiled pages and client assets.

---

## 🔒 Security & Deployment Architecture

### 1. Client-Side Authentication (`AuthGuard.astro`)
* **How it works**: Protected pages include the `<AuthGuard />` component. This component runs client-side JS to check the active Supabase session. If no session is active, it redirects to `/login` immediately.

### 2. Manual Deployment Trigger
To protect API credentials, the dashboard does **not** call the GitHub API directly.
* **Mechanism**: Clicking the **"🚀 Deploy Site"** button in the dashboard layout inserts a record into the `deployments` table in Supabase.
* **Webhook Link**: Configure a database webhook on Supabase:
  * **Table**: `deployments`
  * **Event**: `INSERT`
  * **Method**: `POST`
  * **URL**: `https://api.github.com/repos/YOUR_USERNAME/smesh-dev/dispatches`
  * **Headers**:
    * `Authorization`: `Bearer YOUR_GITHUB_PAT` (token stored securely on Supabase servers)
    * `Accept`: `application/vnd.github.v3+json`
    * `Content-Type`: `application/json`
  * **Body**: `{"event_type": "supabase-content-updated"}`

---

## ☁️ GitHub Pages Deployment (`admin.smesh.dev`)

Set up a standard deployment workflow in `.github/workflows/deploy.yml` inside the new repository:

```yaml
name: Deploy Admin Dashboard

on:
  push:
    branches: [main]

jobs:
  build-deploy-admin:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Build admin
        env:
          PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### DNS / Pages Domain Setup:
1. In your domain registrar (or DNS provider):
   * Add a `CNAME` record:
     * **Name**: `admin`
     * **Value**: `YOUR_GITHUB_USERNAME.github.io`
2. Create a file called `CNAME` (no extension) in the `public/` directory with the content:
   `admin.smesh.dev`
3. Under the new repository settings → Pages:
   * Set Custom Domain to `admin.smesh.dev`.
