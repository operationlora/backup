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
- Added SRI for jQuery 3.7.1. Bootstrap 3.4.1 JS now uses jsDelivr CDN with official SRI in `_includes/scripts.html`.
- jQuery Migrate: disabled by default. If temporarily re‑enabled for debugging, add SRI (matching exact CDN asset) or self‑host under `js/`.
- If you prefer CDN for Bootstrap CSS 3.4.1, update `_includes/head.html` to the CDN URL and add SRI; otherwise keep the local CSS.

Low‑risk improvements (consolidated)
- Self‑host core JS (jQuery 3.7.1, Bootstrap 3.4.1) to avoid CDN dependency during demos.
- Prune legacy plugins and unused assets: keep magnific/kenburns; audit/remove cycle, tinycarousel, mousewheel if unused. Done: removed `js/zepto.min.js` and redundant `js/jquery.isotope.min.js`.
- Move remaining inline styles into CSS: create classes in `css/main.css`. Done: navbar, newsletter. Next: tag/category section headings and any residual per‑page styles.
- Continue CSS variableization in `css/main.css` (e.g., #f2f2f2, #808080, #404040, #6ec54d) to reduce hardcoded colors.
- Unify fonts across homepage by retiring Josefin in `css/WYSIWYG.css` if consistent typography is desired.
- Conditional plugin loading on posts: include Magnific only when images/`a.popup` exist or via a `use_magnific: true` front matter flag.
- Image hygiene: ensure `loading="lazy"`/`decoding="async"` on non‑critical images; consider laziness for non‑first hero images on home.

Completed (2025‑08‑10)
- Centralized core scripts via `_includes/scripts.html` across home/page/post.
- Consolidated runtime: load core scripts from default/home layouts before page content; removed per‑page jQuery 2.1.1 includes in gallery pages.
- Fixed categories cloud variable bug in `_layouts/post.html` (use `category` consistently).
- Added SRI for Bootstrap 3.4.1 JS (jsDelivr) and kept jQuery 3.7.1 SRI.
  - Later: switched to self‑hosted core JS to remove CDN dependency.
- Moved navbar inline styles to CSS classes in `css/main.css` (`.navbar-outer`, `.navbar-menu`, `.navbar-logo`).
- Pruned unused assets: removed `js/zepto.min.js` and redundant `js/jquery.isotope.min.js`.

- Newsletter: corrected TinyLetter popup target to `photorgasms` and replaced inline styles with CSS classes (`.newsletter-section`, `.newsletter-form`, `.newsletter-input`, `.newsletter-submit`).
- Footer external links hardened: add `rel="noopener noreferrer"` with `target="_blank"`; removed `target` from `mailto:`.
- Performance hints: added `preconnect` and `dns-prefetch` for `code.jquery.com` and `cdn.jsdelivr.net` in `_includes/head.html`.
- Subgallery images: enabled `loading="lazy"` and `decoding="async"` in `_includes/subgallery.html`.
- jQuery Migrate gating: made inclusion conditional via `site.jquery_migrate` flag in `_includes/scripts.html` and `_config.yml`.
- jQuery Migrate removal: default set to false; replaced deprecated usages (`window.load` → `on('load')`, `.bind` → `.on`). Console clean across home/gallery/shop.
- Home: removed unused `jquery.cycle.min.js` (kenburns mode is used).

- Plugin includes pruned (home/post): dropped Modernizr, Retina, Mousewheel, TinyCarousel, Lazy Line Painter. Kept Kenburns/Isotope/Magnific where required.
  - Core runtime now loaded from local files: `js/vendor/jquery-3.7.1.min.js`, optional `jquery-migrate-3.4.1.min.js`, and `bootstrap-3.4.1.min.js`.
  - Removed unused plugin files from repo: `js/modernizr.js`, `js/retina.min.js`, `js/jquery.mousewheel.min.js`, `js/jquery.cycle.min.js`, `js/jquery.tinycarousel.min.js`, `js/jquery.lazylinepainter.min.js`.

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

---

Current state and maintainability (2025‑08‑10)

Summary
- Overall acceptable but aging. Structure is modular (Jekyll layouts/includes), config is sane, and OG/canonical are set. Maintainability is medium: workable day‑to‑day, but upgrades are risky due to BS3‑specific CSS and multiple legacy plugins.

Strengths
- Modular templates: `_layouts` + `_includes` used correctly; `head.html` centralizes SEO/OG.
- Config hygiene: `site.url`/`baseurl` used for links; nav driven by `site.nav`.
- Content organization: galleries/posts logic clear; this memo documents upgrade paths and risks.

Key technical debt / risks
- Legacy plugins: magnific, isotope, cycle, tinycarousel, mousewheel, kenburns, lazylinepainter, retina. Several rely on older jQuery APIs and increase fragility during framework changes.
- Inline styles: present in newsletter/footer, etc., making styling harder to unify/control.
- BS3‑tied custom CSS: selectors such as `.navbar-custom .nav li a`, `.pager` tightly couple to BS3 DOM; upgrading without refactoring causes layout breakage.

<!-- Consolidated into earlier "Low‑risk improvements (consolidated)" section to remove duplication. -->

Future upgrade guidance
- Use parallel BS4/BS5 partials/layouts on a test page to achieve CSS parity before switching globally. Keep jQuery Migrate during transition; remove after console is clean. Document results with screenshots in `screenshots/`.

---

Post Front Matter Normalization Plan (Proposal)

Goals
- Unify post/page front matter for reliable SEO/OG and templates.
- Remove ambiguity in `image`/`header-img`/`images` usage and tags/categories types.

Scope
- All Markdown/posts under `_posts/` and any pages using post-like layouts that surface OG images.

Audit (discovery report)
- Scan front matter to find irregular cases:
  - `image` present as an object (e.g., `{ feature: ..., path: ..., src: ... }`).
  - Only `header-img` present; missing `image`.
  - `images` array present; first item is a string vs. object with `image_path`.
  - `tags`/`categories` typed as string vs. array.
- Output a CSV/markdown report (path, detected pattern, proposed fix).

Normalization rules (target schema)
- `image`: string, root-relative path (e.g., `/img/...`).
- If `image` is an object: map first matching key in `[feature, path, src, url]` → `image` string.
- If no `image` but `header-img` exists: set `image = header-img` (keep `header-img` for compatibility or drop after migration).
- If neither exists but `images` array exists:
  - If first item is a string: set `image = item`.
  - If first item is an object: set `image = item.image_path` if present.
- `tags`: ensure array (wrap single string into array).
- `categories`: ensure array (wrap single string into array).

Migration tooling
- Provide a script with:
  - `--audit` (read-only): prints report, no writes.
  - `--dry-run`: shows proposed diffs; no file changes.
  - `--write` + `--backup`: writes changes and creates `*.bak` of originals.
- Implementation options:
  - Ruby (fits Jekyll stack; use `front_matter_parser` or manual split + `YAML.load` / `YAML.dump`).
  - Node.js (use `gray-matter` + `js-yaml`), preserves body verbatim.

Template hardening (optional, quick safety net)
- In `_includes/head.html`, when computing the primary image:
  - If `page.image` is a map, check keys `[feature, path, src, url]`.
  - Else, if `page.images` exists, derive first image (string or `image_path`).
- Keep this only as fallback until content is normalized.

Rollout plan
1) Run `--audit`, share report for sign-off.
2) Pilot: run `--write --backup` on 3–5 posts; review git diff.
3) Full run across `_posts/` with backups.
4) Build locally (`jekyll build`) and spot-check OG/canonical and hero images.
5) Optional: add a pre-commit check to flag non-normalized patterns.

Validation & success criteria
- `jekyll build` completes without errors.
- Random sample: OG image meta points to a 200 asset; no URL-encoded object literals.
- Grep shows no posts with `image:` as an object map.
- Tags/categories are arrays in all posts.

Risks & rollback
- YAML serialization may alter quoting/flow style; mitigate with `--dry-run` and backups.
- Heuristics could overwrite intentional custom structures; scope changes to matched patterns only and manual review outliers.

Estimate
- Audit/report: ~0.5h
- Script implementation: ~1–2h
- Pilot + full run + verification: ~1h
