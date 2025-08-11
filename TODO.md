# ToDo List — Photorama Shop MVP

This checklist tracks the work to align the site with PRD.md.
Tip: Convert each item into a GitHub Issue and paste the issue link next to it.

## How to Use
- Create an Issue per task; add labels: `type`, `priority`, `MVP`.
- Add the Issue link in parentheses after the task, e.g., `(#123)`.
- Assign an owner and due date in the Issue. One PR per task where possible.

## MVP
- [x] Data: have `_shop/*.md` items with front matter (sample products exist).
- [ ] Data: add `_data/categories.yml` if needed for richer filters (optional for MVP).
- [x] Config: `collections.shop` (output: true, permalink: `/shop/:path/`) in `_config.yml`.
- [x] Config: enable plugins `jekyll-feed`, `jekyll-sitemap` (kept `jekyll-paginate`).
- [x] Templates: `_layouts/product.html` with Buy button linking to `stripe_link`.
- [ ] Templates: `_includes/product-card.html` for grid/list reuse (optional; current grid works).
- [x] Pages: generate product pages via the `shop` collection.
- [x] Listing: `shop/index.html` renders product grid.
- [x] Search/Filter: added `js/shop-filter.js` for name/category filtering on the shop listing page.
- [ ] Stripe: REAL payment links for each product (blocked: waiting for Stripe approval).
- [x] Pages: add `success/` and `cancel/` pages for Stripe return URLs.
- [x] Workers: scaffold `workers/webhook-handler.js` (parse event, SendGrid notify; signature TODO after secrets set).
- [x] Workers: add `wrangler.toml` and document env vars (`STRIPE_WEBHOOK_SECRET`, `SENDGRID_API_KEY`, `SELLER_EMAIL`).
- [x] CI: add `.github/workflows/deploy.yml` (manual run; Pages can remain default for now).
- [ ] CI: add Worker deploy step/workflow (or document manual `wrangler publish`).
- [ ] Styles: migrate to `assets/css/main.scss` (defer; keep current CSS for MVP simplicity).
- [x] Content: add `terms/` and `privacy/` (merged under Terms & Privacy); nav updated to single entry.
- [ ] SEO: consider `jekyll-seo-tag` later (current OG/Twitter meta exists; avoid duplication for now). Ensure sitemap works (done).
- [ ] Performance: image optimizations, add more `loading="lazy"` and width/height where missing (ongoing).
- [ ] Accessibility: audit alt text/focus states/keyboard menus (ongoing; shop image swap and focus improved).

## Post-MVP / Enhancements
- [ ] Analytics: integrate GA4 or Plausible with anonymized IP.
- [ ] UX: add category pages and breadcrumbs.
- [ ] Content tooling: add a lightweight CMS flow or scripts to validate shop data.
- [ ] R&D: begin Astro + Sveltia CMS migration plan (per PRD 9.x).

## Completed (recent)
- Rename PRD/TODO to use “shop” naming.
- Remove invalid search script include from `search.html` to avoid console errors.
- Add Journal quick search (`js/journal-filter.js`) and style.
- Shop search input readability fix in `css/photorama-shop.css`.
- Newsletter: switch to Buttondown form (`_includes/newsletter.html`) with `buttondown_username` config.
- Social icons: remove Flickr/DeviantArt/GitHub/Email/Feed, add YouTube (`youtube_username`).
- Feed cleanup: remove root `feed.xml` (use `jekyll-feed`).

## Project Hygiene
- [ ] Set up GitHub Project board (columns: Backlog, In Progress, Review, Done, Blocked).
- [ ] Define labels: `type:feature`, `type:bug`, `type:chore`, `MVP`, `priority:P0/P1/P2`.
- [ ] Create Milestone "MVP" and assign relevant Issues.
