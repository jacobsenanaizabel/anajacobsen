# Architecture

How the blog is built. For working rules, see `CLAUDE.md`.

## Overview

A statically generated blog. At build time Next.js reads Markdown/MDX files from `data/`, compiles them with `mdx-bundler`, and prerenders every page to HTML. There is no database. The only server code is the optional newsletter API routes.

```
data/blog/*.mdx ──► lib/mdx.js ──► pages/ (getStaticProps) ──► layouts/ ──► components/ ──► static HTML
   (content)       (compile MDX)      (routes + data)          (page shape)   (UI pieces)
```

## Folder map

| Folder        | Responsibility                                                                      |
| ------------- | ----------------------------------------------------------------------------------- |
| `pages/`      | Routes (Pages Router). Each file is a URL. Fetches data in `getStaticProps`.        |
| `layouts/`    | Full-page templates that wrap content (post, list, author).                         |
| `components/` | Reusable UI pieces (header, footer, links, cards, comments, analytics).             |
| `lib/`        | Build-time logic: MDX compilation, custom remark plugins, tags, RSS, utils.         |
| `data/`       | All content and configuration: posts, authors, site settings, menus, logos.         |
| `css/`        | Global styles: Tailwind entry (`tailwind.css`) and code highlighting (`prism.css`). |
| `public/`     | Static files served as-is (images, favicons). Sitemap/RSS are generated here.       |
| `scripts/`    | Node scripts: sitemap generation, new-post wizard, dev live-reload server.          |

## Routes

| URL                 | File                        | Data source                         |
| ------------------- | --------------------------- | ----------------------------------- |
| `/`                 | `pages/index.js`            | latest posts                        |
| `/blog`             | `pages/blog.js`             | all posts, page 1                   |
| `/blog/page/[page]` | `pages/blog/page/[page].js` | all posts, paginated                |
| `/blog/[...slug]`   | `pages/blog/[...slug].js`   | one post + prev/next + authors      |
| `/tags`             | `pages/tags.js`             | tag counts                          |
| `/tags/[tag]`       | `pages/tags/[tag].js`       | posts with that tag (+ RSS per tag) |
| `/projects`         | `pages/projects.js`         | `data/projectsData.js`              |
| `/about`            | `pages/about.js`            | `data/authors/default.md`           |
| `/api/*`            | `pages/api/*.js`            | newsletter providers (server-side)  |

## Content pipeline

1. **Listing** – `getAllFilesFrontMatter()` in `lib/mdx.js` reads front matter with `gray-matter`, drops `draft: true`, sorts by date.
2. **Compiling a post** – `getFileBySlug()` runs `bundleMDX` with:
   - remark: front matter extraction, table of contents, GFM (tables, footnotes), code titles, math, local images → `<Image>` with real sizes
   - rehype: heading slugs + anchors, KaTeX, citations (`data/references-data.bib`), Prism highlighting, minify
3. **Rendering** – `components/MDXComponents.js` turns the compiled code into React. It picks the layout named in front matter from a fixed map (`PostLayout`, `PostSimple`, `ListLayout`, `AuthorLayout`) and maps MDX elements to custom components (`a` → `Link`, `pre` → `Pre` with copy button, `Image`, `TOCInline`).
4. **After build** – `scripts/generate-sitemap.mjs` writes `public/sitemap.xml`; RSS feeds are written during `getStaticProps`.

To add a new layout: create it in `layouts/` **and** register it in the `layouts` map in `components/MDXComponents.js`.

## Styling

- Tailwind 4 through PostCSS (`@tailwindcss/postcss`).
- `css/tailwind.css` imports Tailwind, imports `prism.css`, loads `tailwind.config.js` with `@config`, and defines the class-based `dark` variant.
- `tailwind.config.js` holds colors (`primary`, gray = neutral), the Inter font, and the `prose` typography overrides (light and `prose-dark`).
- Dark mode is a `dark` class on `<html>`, managed by `next-themes` (`components/ThemeSwitch.js`). Default theme comes from `siteMetadata.theme`.
- The page background gradient is the `.light-theme-2` class in `css/prism.css`, applied in `pages/_document.js`.

## Configuration files

| File                   | Purpose                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `next.config.js`       | Security headers (CSP), SVG-as-component loader (Turbopack + webpack), bundle analyzer |
| `tailwind.config.js`   | Theme, typography, plugins (`forms`, `typography`)                                     |
| `postcss.config.js`    | Tailwind PostCSS plugin                                                                |
| `eslint.config.mjs`    | ESLint 9 flat config: Next core-web-vitals + Prettier                                  |
| `prettier.config.js`   | Formatting + Tailwind class sorting                                                    |
| `jsconfig.json`        | `@/` path aliases                                                                      |
| `data/siteMetadata.js` | Site identity, analytics, comments, newsletter provider                                |

## Integrations (all optional, configured in `data/siteMetadata.js`)

- **Comments**: Giscus (active), Utterances, or Disqus — `components/comments/`. Credentials via `NEXT_PUBLIC_*` env vars.
- **Analytics**: Plausible, Simple Analytics, Umami, Google Analytics, Posthog — `components/analytics/`.
- **Newsletter**: Mailchimp, Buttondown, ConvertKit, Klaviyo, EmailOctopus, Revue — `pages/api/`. API keys via env vars.

When adding an external service, also allow its domain in the CSP in `next.config.js`.

## Suggested agent responsibilities

A starting point for splitting work if an orchestrator agent delegates tasks:

| Agent        | Owns                                                                         | Must verify                         |
| ------------ | ---------------------------------------------------------------------------- | ----------------------------------- |
| Content      | `data/blog/`, `data/authors/`, `public/static/images/`                       | front matter valid, `npm run build` |
| UI / Style   | `components/`, `layouts/`, `css/`, `tailwind.config.js`                      | lint, build, light + dark + mobile  |
| Pipeline     | `lib/`, `scripts/`, `pages/`                                                 | lint, build, sitemap/RSS output     |
| Config / Ops | `package.json`, `next.config.js`, `data/siteMetadata.js`, dependency updates | lint, build, dev server starts      |

The orchestrator should run the definition of done from `CLAUDE.md` after each delegated change.
