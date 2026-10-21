# SEOFlow Tools 🚀
> **100% Free, Privacy-Focused SEO Toolkit, URL Shortener & Redirect Management Suite**

SEOFlow Tools is a high-performance web application designed for digital marketers, webmasters, developers, and content creators. It combines **24+ free SEO tools**, a **URL shortener with live QR code generation**, **redirect management utilities**, and a **10-article comprehensive SEO Knowledge Hub** into a single, cohesive, responsive interface.

---

## ✨ Key Highlights

- **100% Free & Open**: Zero paid API dependencies. No accounts, subscriptions, credit cards, or user API keys required.
- **Warm, Sophisticated Emerald Theme**: Completely redesigned with a warm ivory light background (`#FAF9F5`), deep forest dark mode (`#0D1310`), and rich emerald accents (`#059669`, `#10b981`). Blue theme has been completely removed across the entire application.
- **Redesigned Hero with Integrated Media**: Prominent hero section featuring the user's provided workspace studio render (`/images/homepage-hero.jpg`), live tool search, and dual CTAs.
- **Dedicated SEO Blog (10 Complete Guides)**: 10 comprehensive, 900–1,300 word guides with table of contents, working anchor links, pro tips, common mistakes, FAQs, and JSON-LD structured data.
- **Privacy & Local-First Processing**: Keyword density, text readability, slugs, sitemaps, robots.txt, schema JSON-LD, and SERP previews run **100% client-side** in your browser. Your content is never stored or tracked.
- **SSRF-Protected Server Companion**: Built-in Express companion server performs real-time redirect chain tracing, broken link checks, and live HTML crawling with strict IP resolution and defense against private network access (SSRF protection).
- **Responsive & Modern Design**: Built with React 19, Tailwind CSS v4, and Lucide icons. Includes Light, Dark, and System theme synchronisation with zero-flicker loading.
- **Production-Ready & Code-Split**: 34 client-side routes, fully typed with TypeScript, code-split with dynamic `React.lazy()` chunks under 50kB gzip.
- **Accessible & Transparent**: WCAG 2.1 AA accessible color contrasts, keyboard navigable, screen-reader friendly, with direct developer contact via `Askhmzkiani@gmail.com`.

---

## 📚 Complete Blog & Knowledge Hub (10 Guides)

All 10 articles are live at `/blog` and individually routable:

| # | Article Title | Slug & Route | Assigned Image | Status |
| :-: | :--- | :--- | :--- | :--- |
| **1** | The Complete Guide to URL Shorteners | `/blog/url-shortener-guide` | `/images/blog/article-1-url-shortener.svg` | Placeholder (Pending Upload) |
| **2** | How to Perform a Website SEO Audit | `/blog/website-seo-audit-guide` | `/images/blog/article-2-seo-audit.png` | **Integrated (User Provided)** |
| **3** | Meta Tags Explained for Beginners | `/blog/meta-tags-guide` | `/images/blog/article-3-meta-tags.jpg` | **Integrated (User Provided)** |
| **4** | Keyword Density & Content Optimization | `/blog/keyword-density-guide` | `/images/blog/article-4-keyword-density.svg` | Placeholder (Pending Upload) |
| **5** | Robots.txt Explained: Crawler Directives | `/blog/robots-txt-guide` | `/images/blog/article-5-robots-txt.svg` | Placeholder (Pending Upload) |
| **6** | XML Sitemaps: Practical Implementation | `/blog/xml-sitemap-guide` | `/images/blog/article-6-xml-sitemap.svg` | Placeholder (Pending Upload) |
| **7** | Schema Markup & Structured Data Guide | `/blog/schema-markup-guide` | `/images/blog/article-7-schema-markup.svg` | Placeholder (Pending Upload) |
| **8** | URL Redirects and SEO: 301, 302, 307 | `/blog/redirects-seo-guide` | `/images/blog/article-8-redirects-seo.png` | **Integrated (User Provided)** |
| **9** | UTM Parameters & Campaign Tracking | `/blog/utm-tracking-guide` | `/images/blog/article-9-utm-tracking.svg` | Placeholder (Pending Upload) |
| **10** | Best Free SEO Tools for Website Owners | `/blog/free-seo-tools-guide` | `/images/blog/article-10-free-seo-tools.jpg` | **Integrated (User Provided)** |
| **Hero** | Homepage Hero Studio Workspace | `/` (Homepage Hero) | `/images/homepage-hero.jpg` | **Integrated (User Provided)** |

---

## 🛠️ Complete Tool Catalog (24 Tools)

### 1. 🔗 URL & Link Tools
- **URL Shortener** (`/url-shortener`): Instant short links, custom aliases, dynamic QR codes (PNG download), and local click tracking table.
- **Redirect Rule Generator** (`/redirect-generator`): 301/302/307 rules for Apache `.htaccess`, Nginx rewrite/return, and HTML meta refresh.
- **Redirect Chain Checker** (`/redirect-checker`): Multi-hop HTTP status inspection, loop detection, and target destination verification.
- **UTM Campaign Builder** (`/utm-builder`): GA4-compliant campaign tracking links with channel presets.
- **Broken Link Checker** (`/broken-link-checker`): Safe webpage link auditing and status code reporting.

### 2. ⚡ On-Page & Technical SEO
- **SEO Analyzer / Page Auditor** (`/seo-analyzer`): Dual-mode audit (Live URL crawl or instant client-side HTML paste).
- **Meta Tag Generator** (`/meta-tag-generator`): Title, description, Open Graph, and Twitter Card generator.
- **SERP Preview Simulator** (`/serp-preview`): Google search snippet simulation for desktop and mobile viewports.
- **Open Graph Preview** (`/open-graph-preview`): Live social share card mockups for Facebook, Twitter/X, and LinkedIn.
- **Canonical URL Checker** (`/canonical-checker`): Canonical tag validator with duplicate and relative link alerts.
- **Schema Markup Generator** (`/schema-generator`): JSON-LD structured data for 8 schema types with Schema.org validation.
- **Image Alt Text Helper** (`/image-alt-helper`): WCAG-compliant image accessibility helper generating descriptive alt attributes.

### 3. ✍️ Content & Keywords
- **Keyword Density Checker** (`/keyword-density`): Focus keyword density % and 1/2/3-word n-gram frequency breakdown.
- **Keyword Suggestion Tool** (`/keyword-suggestions`): 40+ long-tail ideas, questions, and commercial intent modifiers.
- **Keyword Grouping Tool** (`/keyword-grouping`): Semantic keyword clustering based on root token analysis with CSV/JSON exports.
- **Word & Character Counter** (`/word-counter`): Real-time counting of words, characters, sentences, paragraphs, and reading time.
- **Readability Score Checker** (`/readability-checker`): Flesch Reading Ease and Flesch-Kincaid Grade Level formulas.

### 4. 🗺️ Crawling & Indexing
- **XML Sitemap Generator** (`/sitemap-generator`): Converts lists of URLs into RFC-compliant `sitemap.xml`.
- **XML Sitemap Validator** (`/sitemap-validator`): DOMParser-based XML schema validation for `<urlset>` and `<sitemapindex>`.
- **Robots.txt Generator** (`/robots-txt-generator`): Directives for user-agents, allow/disallow paths, and AI bot blocking.
- **HTTP Status Code Reference** (`/http-status-codes`): Searchable 2xx, 3xx, 4xx, and 5xx index with SEO impact notes.

### 5. 🔤 URL Utilities
- **URL Slug Generator** (`/slug-generator`): Permalink generator with custom separators and stop-word filtering.
- **URL Parser & Inspector** (`/url-parser`): Dissects URLs into protocol, host, port, path, and query parameter tables.
- **URL Encoder / Decoder** (`/url-encoder-decoder`): Bidirectional URI encoding and decoding.

---

## 🔒 Security & SSRF Defense

The companion Express server is equipped with a robust security filter to prevent **Server-Side Request Forgery (SSRF)**:
1. **DNS Resolution Verification**: Target hostnames are resolved via `dns.promises.lookup()` prior to making any request.
2. **Private Network IP Blocking**: Blocks loopback (`127.0.0.0/8`, `::1`), private ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and cloud metadata (`169.254.0.0/16`).
3. **Protocol Enforcement**: Only `http:` and `https:` schemes are permitted.
4. **Denial-of-Service Defense**: Responses capped at 2MB ceiling with 5–10 second timeouts.

---

## 💻 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@custom-variant dark`
- **Icons**: [Lucide React](https://lucide.dev/) (Tree-shaken map for optimal bundle footprint)
- **QR Codes**: [QRCode](https://github.com/soldair/node-qrcode) (Canvas & PNG stream output)
- **Backend**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) with native ES Modules

---

## 🚀 Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Frontend (Vite Dev Server)**:
   ```bash
   npm run dev
   ```
   > Opens at `http://localhost:5173`. Proxies `/api` requests to port 3001.

3. **Start Companion API Server**:
   ```bash
   npm run server
   ```
   > Starts the Express server at `http://localhost:3001`.

---

## 🌐 Production Domain & Base URL Configuration

The application features an intelligent, environment-aware Base URL resolver ([`src/utils/config.ts`](file:///src/utils/config.ts)) that handles URL shortening, QR codes, Open Graph metadata, and canonical links:

1. **Local Development (Automatic)**:
   - When running locally, the app automatically detects the browser origin (`http://localhost:5173`).
   - Short links generated during local testing resolve to `http://localhost:5173/r/<code-here>`.
   - Your local testing workflow is completely preserved without requiring any configuration.

2. **Production Deployment (Netlify or Custom Domain)**:
   - In production, the base domain is resolved dynamically via `window.location.origin` (e.g. `https://your-site.netlify.app`), or overridden by setting the `VITE_SITE_URL` environment variable.
   - **`localhost` is never hardcoded as the production domain.**
   - Both the generated short URL display and the redirect route handler (`/r/:code`) share the exact same base domain.

### ⚙️ Setting the Production URL via Environment Variables

To explicitly set a canonical production domain (especially if using custom domains or redirect subdomains):

1. **Local Testing with `.env`**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_SITE_URL` to your preferred testing domain:
   ```env
   VITE_SITE_URL=https://your-custom-domain.com
   ```
   *(Note: Vite client variables must begin with `VITE_`)*

2. **Netlify Dashboard Configuration**:
   - Go to **Netlify Dashboard** &rarr; Select your site.
   - Navigate to **Site configuration** &rarr; **Environment variables**.
   - Click **Add a variable**:
     - **Key**: `VITE_SITE_URL`
     - **Value**: `https://your-custom-domain.com` (or your Netlify subdomain `https://your-app-name.netlify.app`, without trailing slash).
   - Trigger a new deployment (**Deploys** &rarr; **Trigger deploy** &rarr; **Deploy site**).

> **Note**: Even if you do not set `VITE_SITE_URL`, the application will automatically and safely fall back to the deployed browser origin (`window.location.origin`), ensuring short links and QR codes work immediately upon first deploy.

---

## 🚀 Netlify Deployment Guide

This repository is pre-configured for seamless Netlify deployment with zero manual routing setup needed.

### 1. Build & Directory Settings
- **Base directory**: `/` (leave empty or default)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 2. Pre-Configured Files Included
- **`netlify.toml`**: Contains build instructions, security headers (`X-Frame-Options`, `X-Content-Type-Options`), and SPA redirect rules.
- **`public/_redirects`**: Automatically copied to `dist/_redirects` during `npm run build` to route all single-page application URLs (`/*`) to `/index.html` with HTTP 200:
  ```text
  /*    /index.html   200
  ```
  This guarantees that direct visits to routes like `/url-shortener`, `/seo-analyzer`, `/blog/meta-tags-guide`, or `/r/:code` never return a Netlify 404 error.

---

## 📦 Production Build & Testing Locally

```bash
# Compile TypeScript and build production bundle
npm run build

# Preview the production build locally
npm run preview

# Optional: Run the production companion server (Express serving dist/)
npm run start
```

---

## 📬 Contact & Support

- **Contact**: Hamza Kiani
- **Email**: [Askhmzkiani@gmail.com](mailto:Askhmzkiani@gmail.com)
- **Project**: [SEOFlow Tools](https://github.com/Hmzkiani/url)

