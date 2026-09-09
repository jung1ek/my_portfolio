# My Portfolio — Project Documentation

A personal portfolio + blog built with **Astro**. Content is Markdown-driven (posts and projects collections), fully static, with no client-side framework (no React/Svelte/Vue).

Tech stack: **Astro 7, Content Collections, MDX, Shiki syntax highlighting, sitemap, variable fonts (Inter + Newsreader)**.

---

## 1. Dependencies & Libraries

From `package.json`:

| Package | Purpose |
| --- | --- |
| `astro` | Static site generator / framework, routing, Markdown/MDX rendering |
| `@astrojs/mdx` | MDX integration (write posts/projects as `.mdx` too) |
| `@astrojs/sitemap` | Auto-generates `sitemap-index.xml` / `sitemap-0.xml` at build |
| `@fontsource-variable/inter` | Self-hosted Inter variable font (body/UI sans) |
| `@fontsource-variable/newsreader` | Self-hosted Newsreader variable font (headings/serif) |

There is **no CSS framework** (e.g. Tailwind). All styles are hand-written in a single global stylesheet with CSS custom properties (design tokens). **No JS framework** — interactivity is plain vanilla `<script>` blocks in components.

### Scripts

```json
"dev": "astro dev",
"build": "astro build",
"preview": "astro preview"
```

### Browser/client-side features (vanilla JS)

- **Theme toggle** (`Header.astro`): toggles `html[data-theme]` between `light`/`dark` and persists the choice in `localStorage`.
- **Theme bootstrap** (`BaseLayout.astro`, inline script in `<head>`): reads `localStorage` theme or falls back to `prefers-color-scheme` before first paint (avoids flash).
- **Mobile nav toggle** (`Header.astro`): toggles the `.is-open` class on the nav, updates `aria-expanded`/`aria-label`.

---

## 2. Build Configuration

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tekjung.dev',          // 👈 replace with your real domain
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,              // colors applied per-theme via CSS variables
    },
  },
});
```

Key points:
- `site` is used for canonical URLs, RSS links, OG image URLs, and the sitemap.
- Shiki syntax highlighting ships two themes; the CSS in `global.css` switches colors based on `html[data-theme]`.
- `tsconfig.json` extends `astro/tsconfigs/strict`.

---

## 3. Directory & Flow Overview

```
my_portfolio/
├── astro.config.mjs          # Astro config (site, integrations, shiki)
├── package.json
├── tsconfig.json
├── public/                   # static assets copied as-is to dist
│   ├── favicon.svg
│   ├── og.svg                # default Open Graph image
│   ├── robots.txt
│   └── images/
│       ├── avatar.svg
│       ├── blog/*.svg        # post thumbnails
│       └── projects/*.svg    # project thumbnails
├── src/
│   ├── data/site.ts          # global site config (name, links, social, newsletter)
│   ├── content.config.ts     # content collection schemas (zod)
│   ├── content/              # Markdown/MDX source
│   │   ├── posts/            # 6 blog posts
│   │   └── projects/         # 4 project case studies
│   ├── layouts/              # page shells
│   │   ├── BaseLayout.astro  # HTML skeleton, head, theme bootstrap, header/footer
│   │   ├── ArticleLayout.astro  # blog post detail layout
│   │   └── ProjectLayout.astro  # project detail layout
│   ├── components/           # reusable UI components (see §6)
│   ├── lib/content.ts        # content helpers (queries, URLs, formatters)
│   ├── pages/                # routes (see §5)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── resume.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   ├── writing/index.astro
│   │   ├── writing/[slug].astro
│   │   ├── projects/index.astro
│   │   └── projects/[slug].astro
│   └── styles/global.css     # all styles, design tokens, responsive rules
```

**High-level flow:**

1. Request hits an Astro page under `src/pages/`.
2. List pages (`/writing`, `/projects`, home) call helpers in `src/lib/content.ts` to query the content collections (`src/content/`) via `getCollection`.
3. Particle pages (`writing/[slug].astro`, `projects/[slug].astro`) export `getStaticPaths()` to pre-render one HTML file per post/project.
4. Every page is wrapped in `BaseLayout`, which renders `<head>` (SEO, meta, fonts, theme bootstrap) and a `<Header>` / `<Footer>` shell.
5. Astro builds to a fully static `dist/` — no server required.

---

## 4. Content: Collections & Schemas

Collections are defined in `src/content.config.ts` using `astro:content` + `glob` loader + `zod` schemas.

### `posts` collection — `src/content/posts/*.md`
Frontmatter fields:

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | — | required |
| `description` | string | — | required, used for lists/SEO |
| `date` | date (coerced) | — | required |
| `image` | string | — | required, thumbnail path |
| `imageAlt` | string | optional | |
| `tags` | string[] | `[]` | |
| `author` | string | `'Tek Jung'` | |
| `featured` | boolean | `false` | |
| `draft` | boolean | `false` | hidden in production builds |

Current posts (6): tiny-autograd, learning-rust, public-notebook, eulers-formula, systems-taste, nlp-side-projects.

### `projects` collection — `src/content/projects/*.md`
Frontmatter fields:

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | — | required |
| `description` | string | — | required |
| `date` | date (coerced) | — | required |
| `image` | string | — | required |
| `imageAlt` | string | optional | |
| `technologies` | string[] | `[]` | shown as tags |
| `github` | url string | optional | shows GitHub button |
| `demo` | url string | optional | shows "Live demo" button |
| `status` | `'active' \| 'completed' \| 'archived' \| 'wip'` | optional | |
| `featured` | boolean | `false` | |
| `draft` | boolean | `false` | hidden in production builds |

Current projects (4): tiny-autograd, math-visualizer, token-notebook, tracebox.

> Drafts are hidden in production (`import.meta.env.PROD`) but visible in dev. See `getPosts`/`getProjects` in `src/lib/content.ts`.

---

## 5. Routes (Pages)

| URL | File | What it renders |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Home: hero, about blurb, latest 4 writing items, up to 3 featured projects, contact CTA |
| `/about/` | `src/pages/about.astro` | Bio, skills grid, "Elsewhere" social links |
| `/resume/` | `src/pages/resume.astro` | Placeholder resume page |
| `/writing/` | `src/pages/writing/index.astro` | Full list of all posts via `BlogList`, plus newsletter signup |
| `/writing/[slug]/` | `src/pages/writing/[slug].astro` | Single post (uses `ArticleLayout`) |
| `/projects/` | `src/pages/projects/index.astro` | Full list of all projects via `ProjectList` |
| `/projects/[slug]/` | `src/pages/projects/[slug].astro` | Single project (uses `ProjectLayout`) |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS 2.0 feed of all posts (JSON API route) |
| `/404` | `src/pages/404.astro` | Custom 404 page |
| `sitemap-0.xml` | generated by `@astrojs/sitemap` | Auto-generated at build |

`[slug].astro` pages use `getStaticPaths()` to pre-render one HTML per markdown file. Because routes are inferred from file paths and `getStaticPaths`, there is no manual router config. The homepage is a static composition — not a CMS.

### Which files load where (composition of each page)

**Home (`/`)** — `BaseLayout` → `Hero` → inline section (about) → `WritingPreview` (4 latest) → `ProjectList` (featured, max 3) → `SocialLinks`.

**Writing index (`/writing/`)** — `BaseLayout` (wide) → `BlogList` (all posts) → `NewsletterSignup`.

**Post detail (`/writing/[slug]/`)** — `ArticleLayout` → `BaseLayout` → SEO (article type, JSON-LD) + header/footer → content prose (`<Content />`) → `NewsletterSignup`.

**Projects index (`/projects/`)** — `BaseLayout` (wide) → `ProjectList` (all projects).

**Project detail (`/projects/[slug]/`)** — `ProjectLayout` → `BaseLayout` → cover image, meta (date, year, status), `Tags`, GitHub/demo buttons, content prose (`<Content />`).

---

## 6. Components

| Component | Role |
| --- | --- |
| `BaseLayout.astro` | Global HTML shell: imports fonts + `global.css`, `<head>` meta/SEO, theme bootstrap script, renders `Header`, `<main>` with `.wrap`/`.wrap--wide` slot container, `Footer`. Props: `title`, `description`, `image`, `imageAlt`, `type`, `publishedTime`, `tags`, `author`, `wide`. |
| `ArticleLayout.astro` | Wraps a post in `BaseLayout` with article meta, cover image, prose, newsletter. Also emits **JSON-LD** `BlogPosting` structured data and uses `itemscope`/`itemprop` microdata. |
| `ProjectLayout.astro` | Wraps a project in `BaseLayout`: meta line (date · year · status), `Tags` (technologies), GitHub/demo buttons, cover, prose. |
| `Header.astro` | Sticky site header: wordmark, primary nav (Home/Writing/Projects/About/GitHub), theme toggle + mobile menu buttons (with vanilla JS behaviors). |
| `Footer.astro` | Page footer: © year + name, GitHub/LinkedIn/RSS links. |
| `Hero.astro` | Homepage intro: kicker, name headline, role, description, avatar image. |
| `BlogList.astro` | Maps an array of posts into `BlogListItem`s inside `.blog-feed`. |
| `BlogListItem.astro` | Single post card: title link, description, date + reading time (`readingTime()`), `Tags`, thumb image. |
| `WritingPreview.astro` | Compact home list of posts as `.writing-row` links (title + date). |
| `ProjectList.astro` | Maps projects into `ProjectItem`s inside `.project-list`. |
| `ProjectItem.astro` | Single project card: thumb, status badge, title, description, technology `Tags`; whole card links to the case study. |
| `Tags.astro` | Renders a tag/pill list (`<ul class="tags">`), hidden when empty. |
| `SocialLinks.astro` | GitHub / LinkedIn / Email buttons (`.btn-row`). |
| `NewsletterSignup.astro` | Newsletter section. Renders a real `<form>` only if `site.newsletter.action` is set; otherwise a placeholder note. Hidden if `site.newsletter.enabled` is false. |
| `ImageWithCaption.astro` | `<figure>` wrapper for images with optional `<figcaption>`. |
| `Seo.astro` | Renders all meta tags: title, description, canonical, author, Open Graph, Twitter card, `article:*` tags. Defaults OG image to `/og.svg`. |

---

## 7. Helper Library — `src/lib/content.ts`

| Function | Purpose |
| --- | --- |
| `getPosts()` | All posts, drafts filtered in prod, sorted newest-first |
| `getProjects()` | All projects, drafts filtered in prod, sorted newest-first |
| `formatDate(date)` | Human-readable date (e.g. `Sep 9, 2026`) |
| `readingTime(text)` | Rounds to `N min read` (~200 wpm), minimum 1 |
| `postUrl(post)` | `/writing/{id}/` |
| `projectUrl(project)` | `/projects/{id}/` |

---

## 8. Global Site Config — `src/data/site.ts`

Single source of truth for site-wide values:

- Identity: `name`, `shortName`, `role`, `description`, `email`, `locale`
- URLs: `url` (domain), `twitter`
- Social: `social.github`, `social.linkedin`, `social.resume`
- Newsletter: `newsletter.enabled`, `newsletter.heading`, `newsletter.blurb`, `newsletter.action` (empty → placeholder form shown)

Update this file to personalize the site. `action` should point to a real provider (e.g. Formspark / Buttondown / Getform) to make the newsletter form functional.

---

## 9. Styling — `src/styles/global.css`

- **Design tokens** (CSS custom properties on `:root` and `html[data-theme='dark']`): colors (`--bg`, `--ink`, `--accent`, …), widths (`--max: 44rem`, `--max-wide: 54rem`), fonts (`--sans`, `--serif`, `--mono`), header height.
- **Light/dark theming**: every color has a dark override; Shiki code colors swap via `html[data-theme]` selectors; `color-scheme` set accordingly.
- **Centered layout**: `.wrap { width: min(var(--max), calc(100% - 2.5rem)); margin-inline: auto; }` and `.wrap--wide` (54rem) — both horizontally centered.
- **Key components**: sticky header, hero grid, section blocks with top borders, `.writing-row`, `.blog-item`, `.project-item` grid cards, pill `.tag`s, buttons (`.btn`, `.btn--ghost`), `.prose` typography (serif, blockquote, code, `pre`), newsletter form, skills grid.
- **Responsive breakpoints**:
  - `760px`: hero single-column, mobile nav (hamburger) appears, cards compress.
  - `520px`: container gutters shrink, thumbnails stack above text.
  - `prefers-reduced-motion`: removes transitions/animations.

---

## 10. Notable Implementation Details

- **Fully static** — no API routes other than `rss.xml.ts`; everything is pre-rendered at build time.
- **URL building** relies on `astro:content` collection `id`s (file names). Post/project IDs become the slug.
- **Reading time** is computed from the raw body string (`post.body`).
- **Drafts**: `getCollection` filter hides `draft: true` entries only when `import.meta.env.PROD` is true, so drafts are viewable in `astro dev`.
- **SEO**: open graph + Twitter tags are emitted by `Seo.astro`; posts additionally get JSON-LD (`BlogPosting`) for rich results.
- **RSS**: `src/pages/rss.xml.ts` builds a valid RSS 2.0 feed from `getPosts()` and links each item to `writing/{id}/`.

---

## 11. Adding Content

1. **New blog post**: create `src/content/posts/my-slug.md` with the frontmatter from §4. It automatically appears on `/writing/`, the RSS feed, and (if recent enough) the homepage.
2. **New project**: create `src/content/projects/my-slug.md`. Set `featured: true` to control homepage selection; it appears on `/projects/`.
3. Optionally write `.mdx` instead of `.md` for JSX components inside content.
4. Replace placeholder images under `public/images/blog/` and `public/images/projects/`, and `public/images/avatar.svg` / `public/og.svg`.
5. Personalized copy lives in `src/data/site.ts` and `src/pages/` (e.g. `about.astro`, `resume.astro`, `Hero.astro`, `index.astro`).

---

## 12. Build & Deploy

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # static output to dist/
npm run preview   # preview the production build locally
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.). Remember to set the real `site` URL in `astro.config.mjs` before deploying so canonicals, RSS, OG images, and the sitemap resolve correctly.

---