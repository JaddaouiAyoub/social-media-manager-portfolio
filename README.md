# Ayoub Jaddaoui — Social Media Manager Portfolio

A premium, animated and fully responsive portfolio website for **Ayoub Jaddaoui, Social Media Manager**, built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

---

## 1. Project overview

The site presents Ayoub's profile, services, way of working and projects. Its purpose is to turn visitors (brands, small businesses, recruiters) into conversations through a clear contact section.

The visual direction is dark, near-black backgrounds with violet, magenta and blue gradients, glass cards, soft glows and subtle motion. A full light theme is also available.

The site never presents invented information as fact. There are no fake figures, clients or testimonials, and the contact form never pretends to send a message. Anything not yet supplied by the owner is either hidden or clearly labelled (for example, "Concept project").

## 2. Main features

- One-page layout with smooth anchor navigation and an **active-section indicator** in the header.
- Sticky, translucent header and an accessible **full-screen mobile menu** (Escape to close, focus trap, focus restore, closes after a link is selected).
- **Dark / light themes** with persistence, no flash on load, and a circular reveal transition.
- Animated **hero** with an illustrated composition: glowing monogram, orbit ring, floating platform tiles and illustrative analytics cards, with pointer parallax.
- **Scroll-reveal** animations, hover micro-interactions and a pointer spotlight on cards.
- **Filterable portfolio** with layout animations, a quick-view **dialog**, and statically generated **project pages** (`/projects/[slug]`).
- **Contact form** with client- and server-side validation, loading, success and error states, a honeypot, a minimum fill time and rate limiting. Email delivery goes through Resend.
- Floating social rail and **back-to-top** buttons.
- SEO: metadata, Open Graph image, favicon, `robots.txt`, `sitemap.xml`, web manifest, schema.org `Person` JSON-LD and a custom 404 page.
- Accessibility: semantic landmarks, skip link, visible focus, labelled controls, `prefers-reduced-motion` support.

## 3. Tech stack

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, static generation) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Animation | Framer Motion |
| Icons | Lucide React (plus inline SVG brand glyphs) |
| Fonts | `next/font`: Sora (headings), Manrope (body), Yellowtail (script accents) |
| Theme | Custom lightweight provider (inline pre-paint script + `useSyncExternalStore`) |
| Email | [Resend](https://resend.com) HTTP API, called with `fetch` (no SDK dependency) |
| Quality | ESLint (`eslint-config-next`), TypeScript type checking |

## 4. Architecture & folder structure

Components are Server Components by default. `"use client"` is used only where interactivity or animation needs it.

```text
src/
  app/
    layout.tsx               Root layout: fonts, metadata, theme script, Header/Footer shell
    page.tsx                 One-page home composed of sections
    globals.css              Design tokens (dark/light), Tailwind theme, utilities
    projects/[slug]/page.tsx Statically generated project detail pages
    api/contact/route.ts     Contact form endpoint (validation, anti-spam, delivery)
    not-found.tsx            Custom 404
    opengraph-image.tsx      Generated social sharing image
    icon.svg  manifest.ts  robots.ts  sitemap.ts
  components/
    layout/                  Header, MobileNavigation, Footer, FloatingRail, BackToTopButton, CurrentYear
    sections/                Hero, About, Services, Portfolio (+ PortfolioGrid), Process, Skills, Testimonials, Contact
    ui/                      Button, SectionHeading, ThemeToggle, Reveal/FadeIn, ServiceCard, ProjectCard,
                             ProjectModal, ProjectDetails, ProjectBadge, ContactForm, Counter, SpotlightCard…
    visuals/                 HeroVisual, NeonSign, ProjectCover (illustrations rendered in code)
    icons/                   BrandIcon (social glyphs) and icon-map (icon names used in data files)
    providers/               ThemeProvider, Providers (MotionConfig)
    seo/                     PersonJsonLd
  data/                      ALL editable content (see section 11)
  hooks/                     useActiveSection, useScrolled, useMounted
  lib/                       utils, theme script, contact validation & configuration
public/                      Static assets (add your images under public/images/)
```

## 5. Sections

| Section | Anchor | Content source |
| --- | --- | --- |
| Hero | `#home` | `src/data/profile.ts`, `src/data/stats.ts` |
| About | `#about` | `src/data/profile.ts` (`about`) |
| Services | `#services` | `src/data/services.ts` |
| Portfolio | `#portfolio` | `src/data/projects.ts` |
| How I Work | `#process` | `src/data/process.ts` |
| Skills | `#skills` | `src/data/skills.ts` |
| Testimonials | `#testimonials` | `src/data/testimonials.ts` |
| Contact | `#contact` | `src/data/socials.ts` + `/api/contact` |

What each section does when data is missing:

- **Hero badges**: the green "Available for new projects" badge appears only when `profile.availability.confirmed` is `true`. Otherwise a neutral focus badge is shown.
- **Hero stats**: animated counters appear only for stats marked `verified: true`. Until then, qualitative highlights (Strategy, Content, Analytics) are shown.
- **"Watch Intro"**: shown only when `profile.introVideoUrl` is set. Otherwise a "View Services" button is shown.
- **Portrait**: when `profile.portrait.src` is set, the real photo replaces the illustrated monogram (hero) and the neon visual (about).
- **Testimonials**: an elegant empty state is shown until real, permission-granted testimonials are added.
- **Contact links**: only configured email and social profiles are rendered.

## 6. Dark mode / light mode

- **Tokens**: all colours are CSS variables defined in `src/app/globals.css`, under `:root, .light` (light) and `.dark` (dark). They are exposed to Tailwind via `@theme inline` (e.g. `bg-surface`, `text-muted`, `border-line`, `text-primary`). Components never hard-code theme colours.
- **No flash**: an inline script in `<head>` (`src/lib/theme.ts`) runs before the first paint. It reads the saved choice from `localStorage` (key `aj-theme`) and sets the `dark` / `light` class on `<html>`.
- **Default**: `siteConfig.defaultTheme` in `src/data/site.ts`. It is `"dark"` by default. Set it to `"system"` to follow the visitor's OS preference on the first visit.
- **Persistence**: the toggle (`ThemeToggle`, a `role="switch"` button) saves the choice and applies it. Supported browsers get a circular View Transition; other browsers get a short colour cross-fade. Both are skipped with reduced motion.
- **Tailwind**: the `dark:` variant is class-based (`@custom-variant dark`).

## 7. Installation

Requirements: **Node.js 20.9+** (tested with Node 20) and npm.

```bash
npm install
```

## 8. Environment variables

Copy the template and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL (e.g. `https://ayoubjaddaoui.com`). Used for canonical URLs, Open Graph, `robots.txt` and `sitemap.xml`. Defaults to `http://localhost:3000`. |
| `RESEND_API_KEY` | For the contact form | Resend API key. |
| `CONTACT_TO_EMAIL` | For the contact form | Inbox that receives messages. |
| `CONTACT_FROM_EMAIL` | For the contact form | Verified sender, e.g. `Portfolio <contact@your-domain.com>`. |

`.env.local` is ignored by Git. Never commit real secrets.

## 9. Development

```bash
npm run dev
```

Open <http://localhost:3000>. In development, the contact form also shows an owner-only hint explaining which variables are missing.

## 10. Production build

```bash
npm run build   # creates an optimised build (pages are statically generated)
npm run start   # serves the production build on http://localhost:3000
```

The site deploys as-is to Vercel or any Node.js host that supports Next.js. Set the environment variables in the hosting dashboard **before building**. The home page is static, so the contact configuration status is read at build time.

## 11. Customising personal information, services, socials

All editable content lives in **`src/data/`**:

| File | What to edit |
| --- | --- |
| `profile.ts` | Name, role, hero headline (`lead` / `middle` / script `accent`), intro, About texts and values, `availability`, `introVideoUrl`, `portrait` |
| `site.ts` | Navigation items, SEO title/description/keywords, default theme |
| `socials.ts` | `contact.email`, `contact.phone` and the `socialLinks` URLs (an empty `href` hides the network) |
| `services.ts` | Service cards (title, description, icon, bullet points) |
| `process.ts` | The "How I Work" steps |
| `skills.ts` | Skill tags and an optional `tools` list |
| `stats.ts` | Verified figures only (`verified: true`) and fallback highlights |
| `testimonials.ts` | Real testimonials (`permissionGranted: true` is required to display them) |
| `projects.ts` | Portfolio projects (see next section) |

Icons in data files use names from `src/components/icons/icon-map.ts` (`target`, `pen`, `users`, `chart`, `palette`, `megaphone`, `search`, `map`, `sparkles`). To add an icon, import it from `lucide-react` and add it to `iconMap`.

**Adding a real portrait:** put the photo in `public/images/` (e.g. `public/images/portrait.jpg`) and set:

```ts
portrait: { src: "/images/portrait.jpg", alt: "Portrait of Ayoub Jaddaoui" },
```

**Adding a social network:** fill in its `href` in `socialLinks`:

```ts
{ platform: "instagram", label: "Instagram", href: "https://www.instagram.com/your-handle", handle: "@your-handle" },
```

The link then appears automatically in the contact section, footer, mobile menu, floating rail and JSON-LD `sameAs`.

**Confirming availability:** set `availability.confirmed` to `true` in `profile.ts`. You can also change the label.

## 12. Adding or editing portfolio projects

Projects live in `src/data/projects.ts`. Each entry produces a card, a quick-view dialog, a static page at `/projects/<slug>` and a sitemap entry.

```ts
{
  slug: "brand-x-launch",                 // unique, URL-safe
  title: "Brand X Launch Campaign",
  category: "Strategy",                   // one of projectCategories
  kind: "client",                         // "client" (with permission) or "concept"
  summary: "One-sentence summary shown on the card.",
  description: "Longer description shown in the dialog and project page.",
  platforms: ["instagram", "tiktok"],
  deliverables: ["Strategy deck", "30 posts", "Monthly report"],
  approach: ["Step one…", "Step two…", "Step three…"],
  cover: {
    variant: "chart",                     // illustrated cover: feed | chart | calendar | brand | chat | reel
    tone: "violet",                       // violet | magenta | blue | sunset
    image: "/images/projects/brand-x.jpg",// optional real image (replaces the illustration)
    imageAlt: "Brand X campaign visuals",
  },
  link: { label: "View the campaign", href: "https://…" }, // optional
},
```

- Filters are generated automatically from the categories that contain projects. To add a category, extend `projectCategories`.
- `kind: "concept"` shows a "Concept project" badge and a disclaimer. Use `kind: "client"` only for real work you have permission to publish, and never add unverified results.
- The six entries shipped with the site are **concept projects** and contain no client names or results. Replace or remove them when real work is available.

## 13. Contact form configuration

Flow: `ContactForm` (client) → `POST /api/contact` → Resend.

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Create an API key.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in `.env.local` (or your hosting provider), then restart the dev server or rebuild.

Behaviour:

- **Validation** rules are shared between client and server (`src/lib/contact-validation.ts`): name 2–80 characters, a valid email, optional subject up to 120 characters, message 20–4000 characters.
- **Anti-spam**: a hidden honeypot field, a 3-second minimum fill time, and a per-IP rate limit (5 requests per 10 minutes, in memory per server instance; use a shared store such as Redis for multi-instance deployments).
- **Not configured**: if any variable is missing, the API answers `503 not_configured`. The visitor sees a clear message that the message was **not** sent and is pointed to the direct contact links. A notice is also shown above the form.
- Replies go straight to the visitor because `reply_to` is set to their email.

To use another provider, replace the `fetch` call in `src/app/api/contact/route.ts` and update `src/lib/contact-config.ts`.

## 14. Information to provide before deployment

The owner should supply or confirm the following:

- [ ] Real portrait photo, if one should be shown (`profile.portrait`)
- [ ] Final biography and About texts (`profile.about`)
- [ ] Professional email (`socials.ts` → `contact.email`) and, optionally, phone
- [ ] LinkedIn, Instagram, TikTok, YouTube and any other profiles actually used (`socialLinks`)
- [ ] Final list of services (`services.ts`) and tools (`skills.ts`)
- [ ] Real projects to showcase, with permission to publish (`projects.ts`), plus images in `public/images/projects/`
- [ ] Authentic testimonials with written permission (`testimonials.ts`)
- [ ] Verified statistics, only if they should be displayed (`stats.ts`)
- [ ] Availability confirmation (`profile.availability.confirmed`)
- [ ] Intro video URL, if any (`profile.introVideoUrl`)
- [ ] Production domain (`NEXT_PUBLIC_SITE_URL`) and Resend credentials

## 15. Build procedure & checks

Run these before every deployment:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript (tsc --noEmit)
npm run build       # production build
# or all at once:
npm run check
```

Manual checklist:

- `npm run start`, then go through the page in **both themes** and reload to confirm the theme persists.
- Check widths of **320, 375, 768, 1024, 1440 and 1920 px**. There should be no horizontal scroll and the mobile menu should work.
- Click every navigation link, CTA, portfolio filter and project card, and open and close the dialog with the keyboard (Tab / Escape).
- Submit the contact form empty, with an invalid email, and with valid data. Without credentials it must report that nothing was sent; with credentials, confirm the email arrives.
- Enable "reduce motion" in the OS and check that content stays visible and motion is minimal.
- Visit `/robots.txt`, `/sitemap.xml` and `/opengraph-image`, and check that URLs use the production domain.

### Git conventions

Only `README.md` is versioned among Markdown files. `.gitignore` ignores every other `*.md` file, including the local project brief. `.env*` files (except `.env.example`), `node_modules/` and build output are ignored.
