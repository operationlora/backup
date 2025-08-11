# Front Matter Guide (Posts)

Goal: keep post metadata consistent and predictable for templates and SEO.

- layout: post
- title: Post title
- subtitle: Optional short subtitle
- active: journal
- date: YYYY-MM-DD (unquoted)
- image:
  - feature: filename only under `img/postcover/` (e.g., `pc003.jpg`)
- header-img: Path for header background (e.g., `img/postcover/pc003.jpg`)
- tags: [tag01, tag02] (array, unquoted items)
- categories: [cat01, cat02] (array, unquoted items)
- comments: true|false (boolean)

Example
---
layout: post
title: "A Sample Post"
subtitle: "Optional subtitle"
active: journal
date: 2025-08-10
image:
  feature: "pc003.jpg"
header-img: "img/postcover/pc003.jpg"
tags: [tag01, tag02]
categories: [cat01]
comments: false
---

Notes
- Keep `image.feature` and `header-img` in sync. If you change the cover, update both.
- Use arrays for `tags` and `categories` (even if one item).
- Prefer unquoted scalars for booleans and dates.
