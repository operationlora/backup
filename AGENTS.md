# Repository Guidelines

## Project Structure & Module Organization
- Site: Jekyll-based. Content lives in `_posts/` (Markdown posts), `about/`, `gallery/`, `journal/`, and `_shop/` (collection; outputs to `shop/`).
- Templates: `_layouts/` (page skeletons) and `_includes/` (partials).
- Assets: `css/`, `js/`, `img/`, `fonts/`. Do not edit `_site/` (generated output).
- Config: `_config.yml` controls `url`, `baseurl`, navigation, pagination, and plugins.

## Build, Test, and Development Commands
- Install Jekyll: `gem install jekyll` (or use Bundler if you prefer).
- Run locally: `jekyll serve --baseurl ''` then visit `http://localhost:4000/`.
- Build for production: `jekyll build` writes the site to `_site/`.
- Sanity check: `jekyll doctor` reports common config/content issues.
- Legacy tooling: `Gruntfile.js` exists but LESS sources are not present; you typically do not need `grunt`. If you do add `less/` or custom JS bundles, run `npm install && grunt`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML, YAML, and Liquid.
- Posts: name as `_posts/YYYY-MM-DD-title.md`; front matter should include `layout: post`, `title`, `date`, optional `tags`, `categories`, `comments`.
- Links/assets: prefer `{{ site.url }}{{ site.baseurl }}` or `{{ site.baseurl }}` to avoid hardcoded paths. Place images in `img/` and optimize.
- Filenames: kebab-case; avoid spaces and uppercase.

## Testing Guidelines
- No automated tests in this repo. Ensure `jekyll build` completes without errors.
- Manually verify key pages: `about/`, `gallery/`, `journal/`, and a sample post.
- When adding tags/categories, also add corresponding pages under `journal/tag/` and `journal/category/` so filters render.

## Commit & Pull Request Guidelines
- Commits: imperative mood and focused (e.g., `gallery: tweak masonry spacing`).
- PRs: include a concise summary, linked issues, steps to verify locally, and before/after screenshots for visual changes.
- Document configuration changes in the PR (notably `_config.yml` `url`, `baseurl`, and `nav`).

## Security & Configuration Tips
- Do not hardcode absolute links; use `site.url`/`site.baseurl`.
- Avoid editing or committing generated `_site/` files; change sources instead.
