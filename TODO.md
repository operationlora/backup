# ToDo List — Photorama Shop MVP

This checklist tracks the work to align the site with PRD.md.
Tip: Convert each item into a GitHub Issue and paste the issue link next to it.

## How to Use
- Create an Issue per task; add labels: `type`, `priority`, `MVP`.
- Add the Issue link in parentheses after the task, e.g., `(#123)`.
- Assign an owner and due date in the Issue. One PR per task where possible.

## MVP
- [ ] Data: add `_data/shop.yml` with sample items (id, title, price, image, category, description, stripe_link) — or create `_shop/*.md` items with equivalent front matter.
- [ ] Data: add `_data/categories.yml` based on PRD categories.
- [ ] Config: add `collections.shop` (output: true, permalink: `/shop/:path/`) in `_config.yml`.
- [ ] Config: enable plugins `jekyll-feed`, `jekyll-sitemap` (and keep `jekyll-paginate`).
- [ ] Templates: create `_layouts/product.html` with Buy button linking to `stripe_link`.
- [ ] Templates: create `_includes/product-card.html` for grid/list reuse.
- [ ] Pages: generate product pages via the `shop` collection.
- [ ] Listing: add `shop/index.html` (or update `index.html`) to render a product grid.
- [ ] Search/Filter: add `js/shop-filter.js` for name/category filtering on the listing page.
- [ ] Stripe: define a `stripe_link` for each product and add success/cancel pages.
- [ ] Workers: scaffold `workers/webhook-handler.js` (verify Stripe signature, parse order, call SendGrid).
- [ ] Workers: add `wrangler.toml` and document env vars (`STRIPE_WEBHOOK_SECRET`, `SENDGRID_API_KEY`, `SELLER_EMAIL`).
- [ ] CI: add `.github/workflows/deploy.yml` to build Jekyll with Bundler and deploy to Pages.
- [ ] CI: add Worker deploy step/workflow (or document manual `wrangler publish`).
- [ ] Styles: migrate to `assets/css/main.scss`; remove/retire Grunt/LESS references.
- [ ] Content: add `privacy/` and `terms/` pages; update `_config.yml` nav.
- [ ] SEO: add `jekyll-seo-tag` and Open Graph/Twitter meta; ensure `jekyll-sitemap` works.
- [ ] Performance: optimize images, add `loading="lazy"` and explicit width/height.
- [ ] Accessibility: alt text on images, focus states, keyboard-friendly menus.

## Post-MVP / Enhancements
- [ ] Analytics: integrate GA4 or Plausible with anonymized IP.
- [ ] UX: add category pages and breadcrumbs.
- [ ] Content tooling: add a lightweight CMS flow or scripts to validate shop data.
- [ ] R&D: begin Astro + Sveltia CMS migration plan (per PRD 9.x).

## Project Hygiene
- [ ] Set up GitHub Project board (columns: Backlog, In Progress, Review, Done, Blocked).
- [ ] Define labels: `type:feature`, `type:bug`, `type:chore`, `MVP`, `priority:P0/P1/P2`.
- [ ] Create Milestone "MVP" and assign relevant Issues.
