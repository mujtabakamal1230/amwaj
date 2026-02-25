# CMS Requirements & Options for Amwaj

This document outlines what you need to let users change content and images on the Amwaj site, and how you can achieve it.

---

## 1. What Needs to Be Editable

### Content (text)

| Location | Current content | Suggested CMS field(s) |
|----------|-----------------|------------------------|
| **Hero** | Tagline, headline, subtext, CTA label | `hero.tagline`, `hero.headline`, `hero.description`, `hero.ctaLabel` |
| **Header** | Nav labels (How we help, Services, Why amwaj, Contact us), “Book Consultation” | `header.navItems[]`, `header.ctaLabel` |
| **Insurance** | Section title, list of insurers (names + logos) | `insurance.title`, `insurance.providers[]` |
| **Feelings / How we help** | Section titles, descriptions, card titles/descriptions | Section-level blocks or a “sections” collection |
| **Therapist** | Name, title, bio, image | `therapist.name`, `therapist.title`, `therapist.bio`, `therapist.image` |
| **Services** | Titles, descriptions | `services.items[]` or page blocks |
| **Why choose / Testimonials** | Headings, testimonial quote/author/role | `testimonials[]`, `whyChoose.copy` |
| **CTA** | Heading, subheading, button label | `cta.heading`, `cta.subheading`, `cta.buttonLabel` |
| **FAQ** | Questions and answers | `faq.items[]` with `question`, `answer` |
| **Final CTA** | Headline, CTA button label | `finalCta.headline`, `finalCta.ctaLabel` |
| **Footer** | Company blurb, phone, email, address, link labels, copyright | `footer.description`, `footer.contact`, `footer.links[]`, `footer.copyright` |
| **Site-wide** | SEO title, meta description, OG image | `site.title`, `site.description`, `site.ogImage` |

### Images

| Asset | Used in | Suggested CMS |
|-------|---------|----------------|
| Logo | Header, Footer | Single “site” or “header” image field |
| Hero background | HeroSection | Hero image field |
| Footer background | FinalCTASection | Final CTA image field |
| Help section bg | HowWeHelpSection | Section image or “media” library |
| Therapy session images | HowWeHelpSection | Media library or section images |
| Insurance logos | InsuranceSection | Per-provider image (or media ref) |
| CTA icon, choose illustration | CTASection | Section images or media library |
| Therapist photo | TherapistSection | Therapist image field |
| Care / decorative | FeelingsSection | Section or media library |

You can start with a small set (e.g. Hero, Therapist, FAQ, key images) and expand later.

---

## 2. Requirements Summary

- **Content model**  
  Structured content (sections, FAQs, nav, therapist, footer, etc.) so the front end can read from one source (API or DB).

- **Media (images)**  
  Upload, store, and serve images; return URLs (and optional alt/caption) to the front end. Optional: resize/crop for different breakpoints.

- **Authentication**  
  Only allowed users can create/update/delete content and upload images.

- **Admin UI**  
  Simple forms/lists so non-developers can edit text and replace images without touching code.

- **Delivery**  
  Next.js must get content at build time (SSG) and/or request time (SSR/ISR) via API or server-side DB access.

- **Preview (optional)**  
  Ability to preview draft changes before publishing.

---

## 3. Ways to Achieve It

### Option A: Headless CMS (hosted)

Use a third-party CMS; your site fetches content via API.

| CMS | Pros | Cons | Best for |
|-----|------|------|----------|
| **Sanity** | Rich editor, real-time, free tier, image CDN, strong Next.js story | Learning curve (GROQ) | Flexible content, lots of blocks/media |
| **Contentful** | Mature, good UI, GraphQL/REST | Free tier limits, cost at scale | Teams used to traditional CMS |
| **Strapi Cloud** | Open source, self-host possible, REST/GraphQL | You maintain if self-hosted | Control + familiar REST APIs |
| **Decap (ex-Netlify CMS)** | Git-based, no DB, free | Requires GitHub auth, editor is basic | Simple text + images, static site |

**You need:**  
- Account and content model in the chosen CMS  
- Next.js integration: fetch in `getStaticProps` / Server Components / API routes and pass to components  
- Image URLs from CMS (or Next.js `Image` with CMS domain in `remotePatterns`)

---

### Option B: Payload CMS (self-hosted, Node)

[Payload](https://payloadcms.com/) runs in your repo (or a separate service). You define collections (e.g. `Page`, `Therapist`, `FAQ`, `Media`); it gives you admin UI + REST/GraphQL.

- **Pros:** Full control, one codebase, TypeScript, file uploads, roles.  
- **Needs:** Node server (or separate deployment), defining collections and optionally REST/GraphQL consumption from Next.js.

---

### Option C: Custom admin with Supabase (you already have it)

Use Supabase for **database (content)** and **Storage (images)**; build a small admin (e.g. `/admin` in this Next.js app or a separate app).

**You need:**

1. **Supabase project**  
   - Tables for each “content type” (e.g. `site_settings`, `hero`, `therapist`, `faq`, `sections`, `nav_links`).  
   - Row Level Security (RLS) so only authenticated users can write; allow public read for the front end (or use service role in API routes).

2. **Storage bucket**  
   - For images (e.g. `images` or `media`).  
   - Policies: upload/update/delete for authenticated users; public read for front end (or signed URLs if you prefer).

3. **Auth**  
   - Supabase Auth (email/password or magic link).  
   - Restrict admin routes to logged-in users (e.g. middleware or checks in `/admin`).

4. **Admin UI**  
   - Next.js routes under `/admin`: forms to edit each content type and upload/replace images.  
   - List views and simple validation (e.g. Zod) before saving to Supabase.

5. **Front end**  
   - Replace hardcoded strings and `/images/...` with data from Supabase:  
     - Fetch in Server Components or in `getStaticProps`/`getServerSideProps` (depending on Next version).  
     - Images: use Supabase Storage public URL (or a small API that returns signed URLs) and Next.js `Image` with the Supabase domain allowed.

**Pros:** No extra vendor, you already have Supabase; full control over schema and UI.  
**Cons:** You build and maintain the admin UI and content model.

---

## 4. Recommended Paths

- **Fastest to “editable by client” with minimal code:**  
  Use **Sanity** or **Contentful**: define a small schema (hero, therapist, FAQ, global/site, media), connect Next.js, then replace one section at a time (e.g. Hero → Therapist → FAQ → images).

- **Maximum control and already on Supabase:**  
  Use **Option C**: design a few Supabase tables + Storage bucket, add `/admin` pages, then switch components to read from Supabase (and optionally cache with ISR).

- **Want a ready-made admin and self-hosted:**  
  Use **Payload**: define collections that match the table above, then consume from Next.js via fetch or GraphQL.

---

## 5. High-Level Implementation Steps (any option)

1. **Define the content model**  
   Map each section to entities and fields (as in the table in §1). Start with Hero, Therapist, FAQ, and a few key images.

2. **Set up the CMS or Supabase**  
   - Headless: create project, content types, and API keys.  
   - Supabase: create tables and Storage bucket, enable Auth and RLS.

3. **Add data fetching in Next.js**  
   - One place to load all content (e.g. a `getContent()` or React context/server cache) used by layout and page.  
   - Use environment variables for API keys or Supabase URL/key.

4. **Refactor one section**  
   - e.g. Hero: replace hardcoded headline/description/CTA with CMS/DB fields; replace hero image with CMS/Storage URL.  
   - Then do Therapist, FAQ, then remaining sections and footer.

5. **Images**  
   - Ensure all editable images come from CMS or Storage (URL + alt).  
   - Configure `next.config.js` `images.domains` (or `remotePatterns`) for the image host (Sanity, Contentful, Supabase, etc.).

6. **Admin**  
   - Headless/Payload: use their admin.  
   - Supabase: build `/admin` and protect it with Supabase Auth.

7. **Optional**  
   - Draft/publish (e.g. `published: boolean` or `status: 'draft' | 'published'`).  
   - Preview route that reads draft content.  
   - Caching/ISR so content updates appear within a few minutes.

---

## 6. Quick Start: Minimal Supabase CMS (Option C)

If you choose the custom Supabase route, a minimal setup could look like:

**Tables (examples):**

- `site_settings` – key/value or JSON for site title, meta, logo URL.
- `hero` – one row: `tagline`, `headline`, `description`, `cta_label`, `image_url`.
- `therapist` – one row: `name`, `title`, `bio`, `image_url`.
- `faq` – `question`, `answer`, `order`.
- `media` – `key` (e.g. `hero`, `logo`, `footer_bg`), `url`, `alt`, `updated_at`.

**Storage:**  
One bucket `images`; uploads get a path (e.g. `hero.png`, `therapist.jpg`). Use public URL in content.

**Next.js:**  
- `lib/supabase.ts` – create client (server + browser if needed).  
- `app/api/content/route.ts` or server helpers – fetch from Supabase (with caching).  
- `app/admin/*` – protected pages with forms; on submit, update Supabase and optionally revalidate.

Then in `HeroSection.tsx` (and others), replace literals and `/images/hero.png` with props or data from `getContent()` (or similar).

---

If you tell me which option you prefer (Sanity, Contentful, Supabase custom, or Payload), I can outline concrete steps and example code for this repo (e.g. schema, one section refactor, and admin route structure).
