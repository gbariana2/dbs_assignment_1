# Campus Coffee Roulette — Design, Build, Ship Assignment 1

A quiet way for Chicago grad students to connect across programs. One match per week. Thirty minutes. No pressure.

This repository is the output of Assignment 1 for Design, Build, Ship (MPCS 51238) — 25 landing page iterations for the same concept, plus a gallery page that tells the story of the process.

Live site: https://dbs-assignment-1-ten.vercel.app/
GitHub: https://github.com/gbariana2/dbs_assignment_1

---

## The Concept

Campus Coffee Roulette pairs grad students from different programs for a single coffee — no networking pressure, no agenda. The product is simple. The design challenge was to explore how many different ways you could tell that story.

---

## What's in the Repository

Each version lives in its own folder (`/v1` through `/v25`), each containing an `index.html` and accompanying CSS. The root `index.html` is the gallery page — a curated walkthrough of the full process with descriptions for each version.

```
/
├── index.html          # Gallery page
├── v1/index.html       # Warm & approachable — the original direction
├── v2/index.html       # Brutalist
├── v3/index.html       # Retro diner
...
├── v25/index.html      # The final iteration
```

Built in pure HTML and CSS throughout — no frameworks, no external APIs.

---

## The Process

The first 15 versions were deliberately divergent. Brutalist manifestos, terminal interfaces, scrapbook collages, SaaS launch pages, Japanese wabi-sabi, newspaper broadsheets — each one a complete reimagining of the same idea. The goal was to exhaust the obvious directions quickly and find the less obvious ones.

Around v16, a pattern emerged: the versions that felt most true to the product were the ones that were warm, restrained, and unhurried. V3's earthy palette, V6's editorial structure, and V9's single-column stillness kept pulling at the same thread.

Versions 16–18 are explicit attempts to converge those three — combining elements, stripping others, seeing what survived. V18 felt like the answer: Libre Baskerville, a clay accent, 120px of breathing room, and almost nothing else.

V19–V25 built that out into a real page. Full-width layouts, interactive university selection, a demo modal, testimonials carousel, scroll-spy navigation, and incremental polish through to v25 — where the testimonials section shifted from dark to warm, bringing the whole page into a consistent palette.

---

## Reflection

**What files make up your site and what does each one do?**

`index.html` at the root is the gallery — it presents all 25 versions as a navigable collection with descriptions and tags. Each `/v{n}/index.html` is a standalone landing page for Campus Coffee Roulette with its own embedded CSS. There are no shared stylesheets — every version is self-contained.

**Describe the pipeline: what happens from git push to your site updating on Vercel?**

Vercel is connected directly to this GitHub repository. On every push to `main`, Vercel detects the change, runs a build (which for a static site is effectively a no-op), and deploys the updated files to its CDN. The live URL reflects the latest commit within about 30 seconds.

**Why v25?**

V25 is the version where the design stopped asking for attention and started doing its job. The warm palette, the editorial structure, and the restrained typography all serve the same goal: make the idea feel approachable without overselling it. The product is a quiet thing — a coffee, a stranger, thirty minutes. The page should feel the same way. V25 does.

---

## Built by

Gurshaan Bariana · [LinkedIn](https://www.linkedin.com/in/gbariana) · gbariana@chicagobooth.edu
