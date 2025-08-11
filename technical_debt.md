# Technical Debt Backlog (frozen baseline)

Status: Route A (Bootstrap 3 + jQuery) stabilized on 2025‑08‑10. Major cleanup complete (self‑hosted core JS, plugin pruning, conditional loads, image lazy fix). This file tracks only deferred items. Day‑to‑day work focuses on PRD features (Stripe Payment Links + Workers + SendGrid).

Policy
- Do not action these unless a trigger occurs (below).
- Use small, reversible changes; keep site lightweight.

Triggers
- Need to change framework or add interactive features.
- Performance or compatibility regression attributable to legacy libs.
- Content scale makes current patterns painful (e.g., front matter drift).

Deferred items (by priority)
- P2 – Front matter normalization
  - Unify `image`/`header-img`/`images` and ensure `tags`/`categories` are arrays.
  - Status: baseline normalized across existing posts (2025‑08‑11). Keep standard for new posts.
- P3 – BS3‑tied custom CSS
  - Notes: selectors tightly couple to BS3 DOM; upgrade risk if moving to BS4/5.
  - Action: only when migrating; refactor selectors in parallel BS5 templates.
- P3 – Plugin modernization (only if needed)
  - Magnific → GLightbox or PhotoSwipe; Kenburns → lightweight alternative or CSS.
  - Keep Isotope; consider vanilla init or alternative if issues arise.
- P3 – Font strategy (optional)
  - Unify homepage fonts / self‑host if needed; otherwise keep Google Fonts.
- P3 – Search/tags/categories efficiency (optional)
  - Current Liquid loops acceptable at current scale; revisit if content grows.

Notes
- Completed upgrade history and rationale preserved in Git history (see UPGRADE_MEMO.md prior to rename).
- Current priority is implementing PRD: Stripe Payment Links, Cloudflare Workers webhook, SendGrid notifications.

Completed (recent)
- Journal listing: overflow fix, flex grid, responsive 3/2/1 cols, centered rows.
- Inline styles removed from journal index; moved to css/journal.css.
- Conditional load for Isotope/scripts on posts with masonry galleries.
- Front matter normalized (layout/active/date/comments) for all posts.
- Minor Liquid bug fix in `journal/category/index.html`.
