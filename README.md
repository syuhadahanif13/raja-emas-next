# Raja Emas Indonesia — Next.js + Payload CMS

Landing page implementation for **Raja Emas Indonesia** built with Next.js
(App Router), Tailwind CSS, and Payload CMS 3 (embedded directly into the
Next.js app).

## Stack

- **Next.js 15** (App Router, React Server Components)
- **Tailwind CSS** for styling (gold/ink brand palette in `tailwind.config.ts`)
- **Payload CMS 3** running inside the same Next.js app (`/admin`, `/api`)
- **Postgres** as the database adapter (swap for `@payloadcms/db-mongodb` if preferred)

## Project structure

```
src/
  collections/          Payload collections: Users, Media, Prices, Locations, Testimonials
  payload.config.ts     Root Payload config
  lib/getPayloadClient.ts   Cached Local API client for server components
  app/
    (frontend)/         The public landing page
      layout.tsx, page.tsx, globals.css
      components/       Header, Hero, Features, PricingTable, LocationsSection,
                         LocationCard, SocialTestimonials, SocialContribution, Footer
    (payload)/           Payload's own admin UI + REST API routes
      admin/[[...segments]]/page.tsx
      api/[...slug]/route.ts
  scripts/seed.ts        Seeds example price & location data
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env`. It's already pointed at your **raja-emas**
   Supabase project (`db.rytaeenjobbutzodsido.supabase.co`, region
   `ap-southeast-2`) — you just need to fill in `[YOUR-DB-PASSWORD]` with the
   database password from **Supabase Dashboard → raja-emas → Project
   Settings → Database → Connection string** (Supabase never exposes this
   via API, so it has to be copied from there). Also set a random
   `PAYLOAD_SECRET`.
   - Use the direct connection (port `5432`) for local dev / a long-running
     Node server.
   - Use the pooler connection (port `6543`, commented out in the example)
     if you deploy to a serverless/edge platform.
3. Run the dev server. Payload will introspect your collections and
   auto-create the matching tables in the `raja-emas` Supabase database on
   first run:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000/admin` to create your first admin user, then
   add content in the **Prices**, **Locations**, and **Testimonials**
   collections. Or seed example data:
   ```bash
   npx tsx src/scripts/seed.ts
   ```
5. Visit `http://localhost:3000` for the landing page — it reads straight
   from the Supabase database via Payload's Local API.

## Content model notes

- **Prices**: `category` (`karat` / `logam_mulia` / `lainnya`) drives which
  column of the pricing table an entry appears in. `sortOrder` controls
  ranking (e.g. K24 → K5 descending).
- **Locations**: `cityGroup` powers the filter tabs (Jakarta, Depok, Bekasi,
  Tangerang, Bogor, Serang, Bandung). `number` is the display index (01, 02…).
- **Testimonials**: `videoUrl` can point to a YouTube, TikTok, or Instagram
  Reel; `thumbnail` is a required upload used as the play-button cover image.

## Design notes

Placeholder SVGs live in `/public` (hero art, map thumbnail, testimonial
cover, social contribution photos) — swap these for real photography/assets
once available. The brand palette (`gold` / `ink`) is defined in
`tailwind.config.ts` and reused via the `.btn-gold`, `.btn-outline`, and
`.section-title` utility classes in `globals.css`.
