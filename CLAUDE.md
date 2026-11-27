# CLAUDE.md

Rules for AI agents working in this repository. Read `ARCHITECTURE.md` for how the code is organized.

## What this project is

Ana Jacobsen's personal blog. It is a fork of [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) **v1.5.6**, upgraded in place to current libraries. It is **not** the upstream v2 structure (no App Router, no Contentlayer, no pliny). Do not copy code from upstream v2 without adapting it.

This project is independent from the `glintt` monorepo above it. The parent `CLAUDE.md` rules (yarn, `yarn commit`, 100% coverage) do **not** apply here.

## Stack

- Next.js 16 (Pages Router, Turbopack), React 19
- Tailwind CSS 4 (theme still in `tailwind.config.js`, loaded via `@config`)
- MDX via `mdx-bundler` + remark/rehype plugins
- Node.js >= 20.9, package manager **npm** (there is a `package-lock.json`)

## Commands

| Task                       | Command           |
| -------------------------- | ----------------- |
| Install                    | `npm install`     |
| Dev server                 | `npm run dev`     |
| Dev with live post reload  | `npm start`       |
| Production build + sitemap | `npm run build`   |
| Serve production build     | `npm run serve`   |
| Lint (auto-fix)            | `npm run lint`    |
| New post (interactive)     | `npm run compose` |
| Bundle analysis            | `npm run analyze` |

## Definition of done

A change is finished only when all of these pass:

1. `npm run lint` exits with 0 errors (warnings are allowed).
2. `npm run build` succeeds.
3. If UI changed: the affected pages were opened and look right in **light and dark** mode, on desktop and mobile width.

There is no test suite. The build is the main safety net, because it prerenders every page and post.

## Rules

### General

- Keep changes small and focused. One concern per commit.
- Do not add a dependency if a few lines of code solve it. Prefer the libraries already in `package.json`.
- Do not migrate architecture (App Router, Contentlayer, TypeScript, etc.) unless explicitly asked.
- Never commit secrets. Env vars go in `.env.local` (see `.env.example`).
- Do not edit generated files: `public/sitemap.xml`, `public/feed.xml`, `public/tags/**`, `.next/`.

### Code style

- JavaScript only (`.js` / `.mjs`), no TypeScript.
- Prettier: no semicolons, single quotes, 2 spaces, width 100. Let `npm run lint` format code.
- Use the path aliases: `@/components`, `@/data`, `@/layouts`, `@/lib`, `@/css`.
- Internal links use `@/components/Link`, images use `@/components/Image`. Do not import `next/link` or `next/image` directly in pages/layouts.

### Content (posts)

- Posts live in `data/blog/` as `.md` or `.mdx`. Sub-folders become nested URLs.
- Required front matter: `title`, `date` (`'YYYY-MM-DD'`), `tags`, `draft`, `summary`.
- Optional: `layout` (`PostLayout` default, or `PostSimple`), `authors`, `images`, `canonicalUrl`, `lastmod`.
- Multi-line YAML values must indent their continuation lines, or the build fails.
- Footnotes use `[^name]` syntax. Inline `^[...]` footnotes are **not** supported.
- Images go in `public/static/images/` and are referenced as `/static/images/...`.

### Styling

- Use Tailwind utility classes. Use v4 class names (`rounded-sm`, `shadow-xs`, `outline-hidden`, `bg-red-500/20`).
- Brand colors: `primary` and the `rose` palette; gray is `neutral`. Change theme colors in `tailwind.config.js`.
- Global CSS only in `css/tailwind.css` and `css/prism.css` (code highlighting).
- Every visible element needs a `dark:` variant when it sets a color.

### Site configuration

- Site-wide settings (title, URLs, analytics, comments, newsletter): `data/siteMetadata.js`.
- Header menu: `data/headerNavLinks.js`. Projects page: `data/projectsData.js`. Author bio: `data/authors/default.md`.

### Git

- Work on a branch, never directly on `master`.
- Conventional commit messages: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.
- The husky pre-commit hook runs lint-staged (ESLint + Prettier). Do not bypass it with `--no-verify`.

## Known issues

- The home page logo (`data/logo2.svg`, fixed `width="500"`) overflows on narrow mobile screens.
- `siteUrl`, `email`, `github` and `linkedin` in `data/siteMetadata.js` are still template placeholders.
- Some sample posts from the template are still in `data/blog/`.
