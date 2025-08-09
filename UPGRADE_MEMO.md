Upgrade Memo

Scope: Bootstrap/jQuery upgrade path and follow-ups for the Photorama demo site.

Route A (implemented)
- jQuery: Upgrade to 3.7.1 with SRI; add jQuery Migrate 3.4.1 as a compatibility layer.
- Bootstrap: Upgrade JS runtime to 3.4.1 (final 3.x). CSS remains from repo’s 3.x file.
- Placement: jQuery → jQuery Migrate → Bootstrap → plugins (existing order preserved).

What to verify
- Navbar toggle works at mobile widths.
- Home animations (kenburns/cycle) still run; console shows no jQuery Migrate errors that break UX.
- Gallery popups (magnific) and product pages render/zoom as expected.

Notes on SRI
- Added SRI for jQuery 3.7.1. For jQuery Migrate and Bootstrap 3.4.1 JS, add SRI after confirming exact CDN URL and published hashes, or self‑host the files under js/.
- If you prefer CDN for Bootstrap CSS 3.4.1, update _includes/head.html to the CDN URL and add SRI; otherwise keep the local CSS.

Optional next steps (low risk)
- Self‑host Bootstrap 3.4.1 JS and jQuery Migrate to avoid relying on external CDNs during demos.
- Remove legacy plugins if unused (cycle, tinycarousel, mousewheel); keep only magnific/kenburns actually used.
- Continue CSS variableization in css/main.css (e.g., #f2f2f2, #808080, #404040, #6ec54d) to reduce hardcoded colors.
- Unify fonts across homepage by retiring Josefin in css/WYSIWYG.css if consistent typography is desired.

Route B (future): Bootstrap 4.6.2 (with SRI)
Impact summary
- Navbar markup:
  - navbar-default → navbar-light or navbar-dark (keep navbar-custom class);
  - navbar-fixed-top → fixed-top;
  - navbar-toggle → navbar-toggler (add aria-controls/expanded/label);
  - remove .navbar-header; place brand and toggler directly under .navbar;
  - .navbar-right → ml-auto.
- Grid:
  - col-*-offset-* → offset-*-* (e.g., col-lg-8 offset-lg-2 col-md-10 offset-md-1).
- JS:
  - bootstrap.min.js → bootstrap.bundle.min.js (includes Popper).
- Utilities/classes rename audit for any Bootstrap components used (alerts, forms, etc.).

Execution checklist for Route B
1) Swap CDN links to Bootstrap 4.6.2 CSS/JS bundle with SRI; keep jQuery 3.7.1 (no migrate ideally).
2) Update navbar in _includes/nav.html per mapping above; validate collapse behavior.
3) Update grid offsets in _layouts/page.html and _layouts/post.html.
4) Smoke test all pages (home/gallery/journal/shop) for layout, spacing, and interactivity.
5) Remove jQuery Migrate once console is clean.

De‑risk tips
- Cut a branch; do changes in small commits (navbar → grid → others) and smoke test each step.
- If any plugin fails on jQuery 3.x without Migrate, pin it to a compatible version or replace with a modern alternative.

