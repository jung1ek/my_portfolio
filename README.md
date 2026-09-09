# Tek Jung — personal site

Minimal personal site and writing archive for **Tek Jung**. Built with [Astro](https://astro.build) so posts and projects are Markdown files, not hardcoded React.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Add a blog post

1. Create `src/content/posts/your-slug.md`
2. Fill in frontmatter (see an existing post)
3. Put a cover image in `public/images/blog/`
4. Write the article
5. Run `npm run dev` or `npm run build`

The listing (`/writing`) and the page (`/writing/your-slug`) are generated from that file. You do not edit React/Astro components to publish.

## Add a project

1. Create `src/content/projects/your-slug.md`
2. Fill in frontmatter (`title`, `description`, `date`, `image`, `technologies`, optional `github`, `demo`, `status`, `featured`)
3. Put images in `public/images/projects/`
4. Write the case study sections in Markdown

## Customize

| What | Where |
| --- | --- |
| Name, bio, email, social links, newsletter | `src/data/site.ts` |
| Site URL (SEO, sitemap, RSS) | `src/data/site.ts` **and** `astro.config.mjs` |
| Avatar | `public/images/avatar.svg` (or a photo at that path) |
| Resume | add `public/resume.pdf` and/or edit `src/pages/resume.astro` |
| LinkedIn | `site.social.linkedin` — currently a placeholder |

Placeholder articles and projects are marked in the UI. Replace those Markdown files with your own work.

## Routes

- `/` home
- `/writing` all articles
- `/writing/<slug>` one article
- `/projects` all projects
- `/projects/<slug>` one project
- `/about`
- `/resume`
- `/rss.xml`
- `/sitemap-index.xml`
