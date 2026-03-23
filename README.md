# Leadcase — Developer Guide

## Overview

Static site built with **Gatsby 5 + React 18**, deployed to GitHub Pages at `https://leadcase.net`.

All content (topics, tags, images) is stored locally in the `data/` directory as JSON files and images — no runtime API calls. The site is fully static after build.

---

## Project Structure

```
leadcase/
├── data/
│   ├── tags.json              # 8 competency tags
│   ├── topics/                # 52 topic JSON files (one per topic)
│   │   └── {slug}.json
│   └── images/
│       ├── {slug}.png         # Topic header images (used by Gatsby Image)
│       └── cards/
│           └── {id}.png       # Card content images (source copies)
│
├── static/
│   ├── logo.svg
│   ├── favicon.ico
│   ├── CNAME                  # Custom domain: leadcase.net
│   └── images/
│       └── cards/
│           └── {id}.png       # Card images served as static assets
│
├── src/
│   ├── pages/
│   │   ├── index.js           # Home page (topic grid + competency filter)
│   │   ├── about.js
│   │   └── 404.js
│   ├── templates/
│   │   └── topic.js           # Individual topic page
│   └── components/
│       ├── Layout.js
│       ├── Header.js / .module.css
│       ├── Footer.js
│       └── TopicCard.js / .module.css
│
├── scripts/
│   ├── fetch-content.js       # Fetch topics/tags from API → data/
│   └── download-images.js     # Download images from remote URLs → data/ + static/
│
├── gatsby-config.js
├── gatsby-node.js
└── package.json
```

---

## How the Build Works

### 1. Data sources → GraphQL nodes (`gatsby-node.js`)

`sourceNodes` runs at build time and reads local JSON files:

- **`data/tags.json`** → creates `Tag` GraphQL nodes
- **`data/topics/*.json`** → creates `Topic` GraphQL nodes

Each `Topic` node stores: `title`, `slug`, `description`, `topicType`, `tagTitles`, `tagIds`, `whatDescription`, `howDescription`, `links` (JSON string), `cards` (JSON string).

### 2. Image processing (`createResolvers`)

Topic header images live in `data/images/{slug}.png` and are registered with `gatsby-source-filesystem` (instance name: `topic-images`).

A custom resolver `localImage` is added to the `Topic` type — it finds the matching `File` node by slug name, enabling `gatsby-plugin-image` to generate optimized WebP images at build time.

Card images (inside `cards` JSON) are served as plain static files from `static/images/cards/` — no Sharp processing needed.

### 3. Page creation (`createPages`)

One page is created per topic at `/topics/{slug}/` using `src/templates/topic.js`.

Static pages (`/`, `/about`, `/404`) are in `src/pages/`.

Total: ~57 pages (52 topics + 5 static).

---

## npm Scripts

| Script | What it does |
|--------|-------------|
| `npm run develop` | Start local dev server at `http://localhost:8000` |
| `npm run build` | Production build into `public/` |
| `npm run serve` | Serve the production build locally |
| `npm run clean` | Clear Gatsby cache (`.cache/` and `public/`) |
| `npm run fetch-content` | Pull latest topics/tags from API → `data/` |
| `npm run download-images` | Download all remote images to `data/` + `static/` |
| `npm run deploy` | Build + publish to GitHub Pages (`gh-pages` branch) |

---

## Updating Content

Content is stored in `data/` and can be edited manually, or refreshed from the API:

### Refresh everything from the API

```bash
npm run fetch-content      # re-fetches all topics + tags
npm run download-images    # downloads any new images
```

Only new/missing images are downloaded — existing files are skipped.

### Edit a topic manually

Open `data/topics/{slug}.json` and edit any field directly. Run `npm run develop` to see changes.

### Add a new topic

1. Create `data/topics/{new-slug}.json` with the topic data
2. Add the header image at `data/images/{new-slug}.png`
3. Run `npm run develop` or `npm run build`

---

## Images

There are two types of images with different handling:

| Type | Source | How served |
|------|--------|------------|
| Topic header (icon) | `data/images/{slug}.png` | Processed by `gatsby-plugin-image` (WebP, lazy-load, LQIP) |
| Card content images | `static/images/cards/{id}.png` | Served as static files, referenced by `withPrefix('/images/cards/{id}.png')` |

Card images also have `localUrl` set in the topic JSON (written by `download-images.js`), which the template uses instead of the remote Azure URL.

---

## Deployment

The site deploys to the `gh-pages` branch of the GitHub repo, served by GitHub Pages with custom domain `leadcase.net`.

```bash
npm run deploy
```

This runs `gatsby build` (no pathPrefix needed since a custom domain is used) then pushes `public/` to the `gh-pages` branch.

The `static/CNAME` file contains `leadcase.net` and is included in every build so the custom domain setting persists after each deploy.

### DNS

`leadcase.net` is a CNAME pointing to `andreykuzmenko.github.io`.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `gatsby` | Static site generator |
| `react` / `react-dom` | UI framework |
| `gatsby-plugin-image` | Optimized image component |
| `gatsby-plugin-sharp` | Image processing (WebP conversion, resizing) |
| `gatsby-transformer-sharp` | Connects Sharp to GraphQL |
| `gatsby-source-filesystem` | Exposes local files to GraphQL |
| `node-fetch` | HTTP requests in scripts |
| `gh-pages` | Deploy to GitHub Pages |
