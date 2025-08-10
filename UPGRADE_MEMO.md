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

---

Attempted Route B rollout (rolled back)

Date: 2025‑08‑10

Summary
- Switched CSS/JS to Bootstrap 4.6.2 (CSS + bundle) and updated navbar/grid directly in main templates.
- Resulted in site‑wide visual regressions (journal layout, gallery albums, navbar, footer social links). Rolled back to Route A baseline.

Observed regressions (probable causes)
- Navbar: custom CSS targets BS3 selectors (e.g., `.navbar-custom .nav li a`, `.navbar-default`). BS4 uses `.navbar-nav .nav-link`, `.nav-item`, different active state selectors, and `navbar-expand-*` structure. Mismatch broke spacing, sizes, and active styles.
- Grid offsets: partial mapping from `col-*-offset-*` → `offset-*-*` without auditing dependent custom CSS caused misalignment.
- Inline lists: BS3 `.list-inline > li` spacing broke in BS4 (now requires `.list-inline-item` on `<li>`). Footer social icons appeared incorrectly sized/spaced.
- Fixed header: BS3 `navbar-fixed-top` → BS4 `fixed-top`; requires compensating page top offset. Not addressed yet, leading to overlaps.
- Components drift: BS3 classes remain (`.pager`, nav structures). BS4 equivalents (`.pagination`, `.nav-item/.nav-link`) not fully migrated.

Screenshots
- See `screenshots/` (e.g., 截圖 2025‑08‑09 晚上8.07.21.png) for the visual regressions from this attempt.

Rollback actions
- Restored `_includes/head.html` to local BS3 CSS, `_includes/nav.html` to BS3 navbar markup, grid offsets in includes/layouts to BS3, and JS runtime to jQuery 3.7.1 + jQuery Migrate 3.4.1 + Bootstrap 3.4.1.
- Verified `jekyll build` succeeds.

Safer BS4 upgrade plan (do in a branch)
1) Add parallel BS4 partials/layouts
   - `_includes/head-bs4.html`, `nav-bs4.html`; `_layouts/page-bs4.html`, `post-bs4.html`. Point only a test page at them initially.
2) Refactor custom CSS for BS4
   - Map selectors: `.navbar-custom .nav li a` → `.navbar-custom .navbar-nav .nav-link` (and active variants).
   - Lists: add `.list-inline-item` to footer/social `<li>` or polyfill spacing in CSS.
   - Grid: complete `col-*-offset-*` → `offset-*-*` mapping; confirm no rules depend on BS3 structure.
   - Fixed header: add top padding/margin to body/content for `fixed-top` to prevent overlap.
   - Optional: migrate `.pager` → `.pagination` (or keep BS3 look via custom CSS initially).
3) Runtime order
   - jQuery 3.7.1 → jQuery Migrate 3.5.2 (transitional) → `bootstrap.bundle.min.js` (Popper included).
4) Smoke tests (evergreen browsers)
   - Pages: home, gallery, journal, shop. Validate navbar collapse, dropdowns, modals, tooltips/popovers, magnific popups, kenburns.
5) Remove Migrate after console is clean; prune unused plugins (cycle, tinycarousel, mousewheel) if not referenced.

Notes
- Keep Route A as stable baseline until BS4 parity is visually confirmed via screenshots.
- SRI/CDN: use jsDelivr for Bootstrap 4.6.2 (provided integrity), jQuery official CDN with SRI. Self‑host later if desired.
