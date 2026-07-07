# Monumenth Growth — Website Design & Build Spec (for Claude Code)

> Single source of truth for building the Monumenth Growth marketing site. Build exactly what is specified. Where a value is marked `[PROPOSED]`, it is a suggestion you may keep. Where marked `[NEEDS PROOF]` or `[SET BY USER]`, do not invent — leave a clearly-labeled placeholder.

---

## 0. Build Brief

- **Goal:** A single-page (long-scroll) marketing site whose only job is to drive the visitor to one action: **Get in touch via WhatsApp**.
- **Primary conversion action:** WhatsApp deep link. Every CTA opens WhatsApp with a prefilled message. There are **no email forms and no contact forms** anywhere on the site.
- **Target visitor:** US-based kitchen & bathroom remodeling contractors / home-service business owners who want more booked $20K+ jobs without doing their own marketing.
- **Stack:** Astro + Tailwind CSS, static output, deployed on Vercel. `[SET BY USER — default]`
- **Deployment:** Static build (`astro build`), Vercel, custom domain TBD.

### Do NOT build (scope lock)
- No authentication, login, or user accounts.
- No CMS, blog, or admin/dashboard.
- No dark mode toggle in v1 (dark tokens are included for future use only — ship light theme).
- No email capture, contact form, newsletter signup, or backend/API.
- No cookie banner unless analytics requiring consent is added (none in v1).
- No extra pages beyond the single landing page + a `/privacy` and `/terms` stub if legally needed.
- No animation library beyond CSS + a lightweight scroll-reveal (IntersectionObserver). No GSAP/Framer.

### Acceptance criteria (binary, checkable)
- [ ] Every CTA button/link resolves to `https://wa.me/{WHATSAPP_NUMBER}?text=...` and opens in a new tab.
- [ ] A persistent WhatsApp floating button is visible on mobile at all scroll positions.
- [ ] No `<form>`, no `mailto:`, no email input exists in the DOM.
- [ ] All 7 sections render in the order in §3, using the exact copy provided.
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] Zero horizontal scroll and zero layout shift (CLS ≈ 0) at 375px, 768px, 1280px.
- [ ] Keyboard-only user can reach and activate every CTA with a visible focus ring.
- [ ] `prefers-reduced-motion` disables all transform/opacity entrance animations.

---

## 1. Design Direction

**Aesthetic intent.** Warm, grounded, and confident — the visual world of a real trade (remodeling) crossed with the precision of a growth operator. Cream/bone canvas, charcoal ink, and one decisive coral-orange that belongs to a single job: the CTA. The page should feel like a well-built room — quiet materials, sharp edges, one bold accent — not a SaaS gradient deck. Restraint everywhere except the CTA and the signature motif.

**Mood / reference cues:** premium contractor portfolio · editorial print (Playfair headlines on cream) · workshop/materials warmth · a single high-visibility "safety orange" accent · calm, generous whitespace.

**Signature element:** the **"two-layer" motif.** The whole pitch is *attention layer + conversion layer*. Express it as a recurring pair of offset stacked panels (a back panel in `--muted`/`--card`, a front panel in `--card`/white, separated by a soft shadow and a hairline) used for the hero media frame, the "How it works" steps, and the offer card. It visually rhymes with a video frame (the raw footage) sitting on top of a funnel surface. Spend the page's boldness here and on the orange CTA — keep all else disciplined.

### Palette — CONFIRMED (from user tokens). Light theme ships in v1.

| Role | Hex | Usage |
|---|---|---|
| `background` | `#E9E4D8` | Page canvas (warm bone) |
| `card` / surface | `#F4EFE4` | Cards, raised panels, popovers |
| `foreground` (text) | `#1E1E1E` | Primary text, near-black |
| `primary` (ink) | `#2E2E2E` | Secondary buttons, strong UI ink |
| `primary-foreground` | `#E6E4D7` | Text on charcoal |
| `secondary` | `#D8D2C4` | Secondary surfaces / chips |
| `muted` | `#CFC8B8` | Back panel of the two-layer motif, subtle fills |
| `muted-foreground` | `#5E5A52` | Sub-labels, captions, meta |
| `accent` | `#E6E4D7` | Soft accent surface |
| `border` / `input` | `#D2CBBB` | Hairlines, dividers, borders |
| `ring` | `#2E2E2E` | Focus ring base (see a11y note) |
| **`cta` (brand orange)** | **`#F26A4B`** | **Primary CTA buttons, links-as-action, key emphasis. Reserve for conversion.** |
| `cta-hover` | `#E15335` `[PROPOSED]` | Darkened orange for hover/active |
| `destructive` | `#DC2626` | Error states only (minimal use) |

> **CTA color rule:** `#F26A4B` is the site's scarcity color. Use it ONLY for the primary WhatsApp CTA and one or two intentional emphasis moments. Do not scatter it. Secondary/tertiary actions use charcoal (`--primary #2E2E2E`) or ghost styles.

Dark-theme tokens (from user CSS) are preserved at the end of §4 for future use. Do not wire a toggle in v1.

### Typography — CONFIRMED (families from user tokens)

- **Display / headlines:** `Playfair Display` (serif), weight 600. Used with restraint for h1/h2 only.
- **Body / UI:** `Inter` (sans), weights 400/500/600.
- **Utility / eyebrows / step numbers / stats:** `JetBrains Mono`, weight 500, uppercase, letter-spacing `0.08em`.

**Type scale** (desktop → mobile), `--letter-spacing: 0.01em` global base:

| Token | Font | Desktop | Mobile | Weight | Line-height | Tracking |
|---|---|---|---|---|---|---|
| Display / H1 | Playfair Display | 60px / 3.75rem | 38px | 600 | 1.05 | -0.01em |
| H2 | Playfair Display | 40px / 2.5rem | 30px | 600 | 1.12 | -0.005em |
| H3 | Inter | 24px / 1.5rem | 21px | 600 | 1.3 | 0 |
| H4 | Inter | 20px / 1.25rem | 18px | 600 | 1.4 | 0 |
| Body-lg | Inter | 18px / 1.125rem | 17px | 400 | 1.6 | 0 |
| Body | Inter | 16px / 1rem | 16px | 400 | 1.6 | 0 |
| Small / caption | Inter | 14px | 14px | 400 | 1.5 | 0 |
| Eyebrow / label | JetBrains Mono | 13px | 12px | 500 | 1.4 | 0.08em (UPPER) |

### Spacing, radii, shadows, layout

- **Spacing base:** `--spacing: 0.25rem` (4px). Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section rhythm:** `py-24` (96px) desktop, `py-16` (64px) mobile. Consistent — no ad-hoc gaps.
- **Container:** `max-width: 1200px`, horizontal padding `px-6` (mobile) / `px-8` (desktop).
- **Radii:** base `0.5rem` (8px) for buttons/inputs; `0.75rem` for cards/panels `[PROPOSED]`; pills fully rounded for eyebrow chips.
- **Shadows** (from tokens: offset-y 4px, blur 10px, black @ 0.1):
  - `shadow-sm`: `0 2px 6px rgba(0,0,0,0.08)`
  - `shadow-md`: `0 4px 10px rgba(0,0,0,0.10)` (default panel shadow)
  - `shadow-lg`: `0 12px 28px rgba(0,0,0,0.12)` (hero media / offer card)
- **Breakpoints:** Tailwind defaults — sm 640, md 768, lg 1024, xl 1280.

---

## 2. Global System

### Header / nav
- Sticky top, `background` with `backdrop-blur` and a `border-b` hairline (`--border`) that appears only after 8px scroll.
- Left: wordmark "Monumenth Growth" (Playfair, 600) — logo asset `[NEEDS PROOF — user to supply SVG]`; until then, styled text wordmark.
- Center/right (desktop): anchor links — `How it works`, `Proof`, `Offer`, `FAQ` — Inter 15px, `muted-foreground`, hover → `foreground`.
- Right: **primary WhatsApp CTA** button "Get in touch".
- Mobile: wordmark left, WhatsApp CTA right (icon + short label). Nav links collapse into a simple slide-down menu (hamburger). Keep menu lightweight — links + one CTA.

### Footer
- Charcoal-ink text on `background`. Columns: wordmark + one-line positioning ("The attention & conversion layer for kitchen & bath remodelers."), the same anchor links, and a final WhatsApp CTA.
- Legal row: © year Monumenth Growth · `Privacy` · `Terms` (stub links). No social icons unless assets provided `[NEEDS PROOF]`.

### Button system
- **Primary (WhatsApp CTA):** solid `--cta #F26A4B`, text `#FFFFFF`, radius 8px, padding `14px 24px`, Inter 16px/600, leading WhatsApp glyph icon (16px). States: hover `--cta-hover` + `shadow-md`; active translateY(1px); focus visible ring (see a11y); disabled 40% opacity (rarely used).
- **Secondary:** outline, `border --primary`, text `--primary`, transparent bg → hover fill `--primary` / text `--primary-foreground`.
- **Ghost / text link:** `--foreground`, underline-on-hover; action links that trigger WhatsApp use `--cta` text.

### WhatsApp CTA component (single source of truth)
Create one reusable component. Do **not** hardcode links inline.

```
WHATSAPP_NUMBER = "{{WHATSAPP_NUMBER}}"   // [SET BY USER] international, digits only, no +, e.g. 1XXXXXXXXXX

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```
- Every CTA renders `<a href={waLink(MESSAGE)} target="_blank" rel="noopener noreferrer">`.
- **Per-section prefilled messages** (raw strings — the helper URL-encodes them) are listed in each section in §3. Rationale: the first WhatsApp message tells Monumenth where the lead clicked from, aiding qualification. This is a design decision, not fabricated content.
- **Default message** (header, footer, sticky): `Hi Monumenth Growth, I'd like to get more booked remodeling jobs. Can we talk?`
- **Mobile sticky button:** fixed bottom-right FAB, 56px circle, WhatsApp green `#25D366` `[PROPOSED — official WhatsApp brand color, chosen over brand orange here for instant recognition of the floating bubble]`, white glyph, `shadow-lg`, `z-50`. Visible < 1024px at all scroll positions; gentle entrance after 400px scroll. `aria-label="Chat on WhatsApp"`. Does not overlap the footer CTA (hide when footer is in view, optional).

### Motion
- **Easings:** `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`; `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- **Durations:** micro-interactions 180ms; entrances 500ms.
- **Scroll reveal:** IntersectionObserver adds a class → elements fade+rise from `opacity:0; translateY(16px)` to settled. Stagger children 80ms. Trigger once, at 15% visibility.
- **Hover:** buttons/cards lift ≤ 2px + shadow step-up. No parallax, no auto-playing motion.
- **`prefers-reduced-motion: reduce`:** disable all transforms/opacity transitions; content renders in final state. Sticky FAB appears without animation.

---

## 3. Page Sections (in order)

Copy is final and taken from the approved copy doc. Do not rewrite. Carry `[NEEDS PROOF]` blocks forward as visible placeholders, not published claims.

### 1 — Hero
- **Purpose & conversion role:** State the dream outcome + effort cost and offer the CTA above the fold to capture highest-intent visitors immediately.
- **Layout — desktop:** Two-column, 7/5 split. Left: eyebrow, H1, subhead, body, primary CTA + a small trust line. Right: the **two-layer media frame** signature (a video/still frame panel sitting offset over a back panel — represents "raw footage → funnel"). Media asset `[NEEDS PROOF — user footage/still]`; until supplied, use a neutral placeholder frame with a play glyph.
- **Layout — mobile:** Single column, media frame below the CTA (CTA stays high). No shrinking H1 below 38px.
- **Content slots:**
  - Eyebrow (JetBrains Mono): `ATTENTION LAYER + CONVERSION LAYER`
  - H1: **Book more $20K+ kitchen & bath remodels from social media — on 1–2 hours a month.**
  - Subhead: *Monumenth Growth builds your attention layer and your conversion layer, so your raw footage turns into content, content turns into leads, and leads turn into booked jobs.*
  - Body: *You film the work. We do the rest — short-form content, a website wired to WhatsApp, and follow-ups that don't let leads go cold. Built specifically for remodeling contractors.*
  - CTA button: **Get in touch**
- **Visual treatment:** `background` canvas, H1 in Playfair charcoal, one word or the "$20K+" set in `--cta` for a single emphasis beat `[PROPOSED]`. Generous top space under sticky header.
- **CTA:** `waLink("Hi Monumenth Growth — I want more booked $20K+ remodels from social media. Can we talk?")` · label **Get in touch**
- **Interaction / motion:** page-load: eyebrow → H1 → subhead → CTA reveal in sequence (respect reduced-motion). Media frame lifts on load.
- **Responsive notes:** 375px — media frame full-width under CTA; H1 38px. 768px — media frame stacks but larger. 1280px — full 7/5 split.

### 2 — Problem / Agitation
- **Purpose & conversion role:** Mirror the visitor's reality so they self-identify, then reframe the pain as a *missing system* (buyable), pointing at what Monumenth sells.
- **Layout:** Single centered column, max-width ~720px for reading comfort. H2 + body + CTA.
- **Content slots:**
  - Eyebrow: `THE GAP`
  - H2: **Great at remodeling. Too busy to market it.**
  - Body: *You post a job when you remember to. It gets a few views, then nothing. The lead that did message you three weeks ago never got a follow-up. Meanwhile the remodel of your life is sitting on your camera roll, doing zero for your pipeline. The problem was never the work — it's that nobody built the layer between the work and the booked job.*
  - CTA button: **Get in touch**
- **Visual treatment:** Quieter section on `background`; the last sentence ("the layer between the work and the booked job") emphasized with weight 600 in charcoal — not orange (reserve orange for CTA).
- **CTA:** `waLink("Hi Monumenth Growth — my content gets views but no booked jobs. Can you help?")` · **Get in touch**
- **Interaction / motion:** scroll-reveal fade+rise on the block.
- **Responsive notes:** comfortable line length capped; padding `py-16` mobile.

### 3 — How It Works (Content → Leads → Booked Jobs)
- **Purpose & conversion role:** Remove "this is complicated" fear by showing three labeled steps; reinforce effort asymmetry right before evaluation.
- **Layout — desktop:** Three-column steps using the **two-layer panel** motif per card; monospace step numbers `01 / 02 / 03` (numbering justified — this IS a real sequence). Section CTA centered below.
- **Layout — mobile:** stacked cards, vertical connector line between them.
- **Content slots:**
  - Eyebrow: `HOW IT WORKS`
  - H2: **Three moving parts. You touch one of them.**
  - Step 01 — **Send your raw footage.** *1–2 hours a month is your entire job. We turn that footage into short-form content built to get watched.* Tag: *Your attention layer.*
  - Step 02 — **We build the funnel machine.** *A website wired straight to WhatsApp, engineered to turn views into qualified leads instead of dead-end likes.* Tag: *Your conversion layer.*
  - Step 03 — **We keep leads warm.** *Automated follow-ups stay on every lead until they book — so nothing slips through while you're on a job site.*
  - CTA button: **Get in touch**
- **Visual treatment:** step number in JetBrains Mono `--cta` (small, allowed emphasis); card front panel `--card` over back panel `--muted`; "attention layer / conversion layer" tags as mono eyebrow chips.
- **CTA:** `waLink("Hi Monumenth Growth — I want the done-for-you content + funnel system. Where do we start?")` · **Get in touch**
- **Interaction / motion:** cards reveal with 80ms stagger; hover lift 2px.
- **Responsive notes:** 375px single column; 768px 1-col wider; 1024px+ 3-col.

### 4 — Proof
- **Purpose & conversion role:** Use niche specificity as credibility while real results are pending; reassure "will this work for my business?".
- **Layout:** Centered statement + a results/testimonial area clearly flagged for real data.
- **Content slots:**
  - Eyebrow: `BUILT FOR ONE SECTOR`
  - H2: **Built for one sector, not everyone.**
  - Body: *We don't do dentists, gyms, or general "small business marketing." We build content and conversion machines for home contractors in the remodeling space — kitchen and bath. That focus is why the content sounds like your trade and the funnel is built around how remodels actually get booked.*
  - **[NEEDS PROOF] Results block:** real numbers (jobs booked, views, lead volume, or named client outcome). Render as a labeled placeholder card — do NOT publish with fake figures.
  - **[NEEDS PROOF] Testimonial:** one real contractor quote with name, company, location. Placeholder card until supplied.
  - CTA button: **Get in touch**
- **Visual treatment:** placeholder proof cards visibly marked (dashed border `--border`, muted label "Add real result") so no fabricated stat ships.
- **CTA:** `waLink("Hi Monumenth Growth — I run a kitchen & bath remodeling business and want to know if this fits. Can we talk?")` · **Get in touch**
- **Interaction / motion:** reveal on scroll.
- **Responsive notes:** proof cards stack on mobile.

### 5 — Offer
- **Purpose & conversion role:** Bundle the three mechanisms into one "done-for-you" decision; strongest effort-asymmetry beat right before the CTA.
- **Layout:** Single prominent offer card (two-layer motif, `shadow-lg`) — checklist of deliverables, effort line, CTA.
- **Content slots:**
  - Eyebrow: `THE PACKAGE`
  - H2: **Everything between your footage and a booked job — done for you.**
  - Checklist:
    - A **content engine** that turns your raw footage into short-form content, automatically.
    - A **funnel machine** — website connected to WhatsApp — that converts views into qualified leads.
    - **Automated follow-ups** that keep every lead engaged until they book.
    - Built by specialists in kitchen & bath remodeling. Your time cost: **1–2 hours a month.**
  - **[NEEDS PROOF] Pricing / guarantee:** confirm package price and any guarantee before publishing. Not in brief — render as labeled placeholder, no invented number.
  - CTA button: **Get in touch**
- **Visual treatment:** checklist ticks in `--cta`; effort line emphasized; card is the visual anchor of the page.
- **CTA:** `waLink("Hi Monumenth Growth — I'm interested in the done-for-you package. Can you send details?")` · **Get in touch**
- **Interaction / motion:** card reveal + subtle lift; checklist items stagger.
- **Responsive notes:** card full-width mobile, padding tightened.

### 6 — FAQ
- **Purpose & conversion role:** Remove the four main frictions (time, skill, fit, mechanics); every answer funnels to WhatsApp.
- **Layout:** Accordion (or open list), max-width ~760px. Question = H4 Inter 600; answer = Body. Each answer ends with an inline WhatsApp text-link.
- **Content slots (verbatim):**
  - **How much of my time does this take?** — *1–2 hours a month. You send raw footage; we handle content, the funnel, and follow-ups. Questions about your setup?* → **Get in touch**
  - **Do I need to film professionally?** — *No. Raw footage from your phone on the job site is the input — turning it into content that gets watched is our job, not yours.* → **Get in touch**
  - **Is this built for my kind of business?** — *If you remodel kitchens and bathrooms, yes — that's specifically who we build for.* → **Get in touch**
  - **How do leads actually reach me?** — *Through WhatsApp. Your site is wired to it, and automated follow-ups keep each lead warm until they book.* → **Get in touch**
- **Visual treatment:** hairline dividers `--border`; open-state chevron rotate; inline links in `--cta`.
- **CTA:** each inline link uses `waLink("Hi Monumenth Growth — I have a question about how this works. Can we talk?")` (or per-question variants if desired).
- **Interaction / motion:** accordion expand/collapse 200ms `--ease-standard`; reduced-motion → instant.
- **Responsive notes:** full-width tap targets ≥ 44px.

### 7 — Final CTA
- **Purpose & conversion role:** Peak-end close — strongest, most concrete image last; convert remaining intent.
- **Layout:** Full-width band, contrast surface (`--card` or charcoal band `[PROPOSED]`), centered H2 + body + one large primary CTA.
- **Content slots:**
  - H2: **Your next $20K remodel is already on your camera roll.**
  - Body: *Right now that footage is doing nothing. Hand it over, spend 1–2 hours a month, and let the attention layer and conversion layer turn it into booked jobs. One conversation starts it.*
  - CTA button (large): **Get in touch**
- **Visual treatment:** the one place a larger CTA and, optionally, an inverted charcoal band is justified for a strong finish. If charcoal band: text `--primary-foreground`, CTA remains `--cta` orange (contrast pops).
- **CTA:** `waLink("Hi Monumenth Growth — I'm ready to turn my footage into booked jobs. Let's talk.")` · **Get in touch**
- **Interaction / motion:** section reveal; CTA subtle pulse on first view only `[PROPOSED]`, disabled under reduced-motion.
- **Responsive notes:** CTA full-width on mobile.

---

## 4. Component & File Structure

### Components (props)
- `Layout.astro` — base HTML, `<head>` meta, fonts, global CSS. props: `title`, `description`, `ogImage`.
- `Header.astro` — props: `navLinks[]`.
- `Footer.astro` — props: `navLinks[]`.
- `WhatsAppButton.astro` — props: `message` (raw string), `label`, `variant` ("primary" | "secondary" | "large"), `iconOnly?`. Builds href via `waLink()`.
- `StickyWhatsApp.astro` — mobile FAB; props: `message`.
- `Eyebrow.astro` — props: `text`.
- `Section.astro` — wrapper enforcing `py` rhythm + container; props: `id`, `tone` ("canvas" | "card" | "charcoal").
- `LayerPanel.astro` — the two-layer signature motif; props: `children`, `elevation`.
- `Hero.astro`, `ProblemSection.astro`, `HowItWorks.astro`, `StepCard.astro` (props: `number`, `title`, `body`, `tag`), `ProofSection.astro`, `ProofPlaceholder.astro`, `OfferSection.astro`, `FAQ.astro`, `FaqItem.astro` (props: `question`, `answer`, `waMessage`), `FinalCTA.astro`.
- `scripts/reveal.ts` — IntersectionObserver scroll-reveal + reduced-motion guard.
- `lib/whatsapp.ts` — `WHATSAPP_NUMBER`, `waLink(message)`, and the per-section message constants.

### File tree (Astro)
```
monumenth-growth/
├─ astro.config.mjs
├─ tailwind.config.mjs        # maps CSS vars → Tailwind theme tokens
├─ package.json
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.jpg            # [NEEDS PROOF]
│  └─ fonts/                  # or load via Google Fonts (Inter, Playfair, JetBrains Mono)
├─ src/
│  ├─ styles/
│  │  └─ global.css           # :root tokens (from user CSS) + base layer
│  ├─ lib/
│  │  └─ whatsapp.ts
│  ├─ scripts/
│  │  └─ reveal.ts
│  ├─ components/
│  │  ├─ Layout.astro
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ WhatsAppButton.astro
│  │  ├─ StickyWhatsApp.astro
│  │  ├─ Section.astro
│  │  ├─ Eyebrow.astro
│  │  ├─ LayerPanel.astro
│  │  ├─ Hero.astro
│  │  ├─ ProblemSection.astro
│  │  ├─ HowItWorks.astro
│  │  ├─ StepCard.astro
│  │  ├─ ProofSection.astro
│  │  ├─ ProofPlaceholder.astro
│  │  ├─ OfferSection.astro
│  │  ├─ FAQ.astro
│  │  ├─ FaqItem.astro
│  │  └─ FinalCTA.astro
│  └─ pages/
│     ├─ index.astro          # composes all 7 sections in order
│     ├─ privacy.astro        # stub [NEEDS PROOF]
│     └─ terms.astro          # stub [NEEDS PROOF]
```

### Section → component map
Hero→`Hero` · Problem→`ProblemSection` · How it works→`HowItWorks`+`StepCard` · Proof→`ProofSection`+`ProofPlaceholder` · Offer→`OfferSection` · FAQ→`FAQ`+`FaqItem` · Final CTA→`FinalCTA`. Header/Footer/StickyWhatsApp wrap all via `Layout`.

### Token wiring
- Put the user's `:root` and `.dark` variable blocks in `global.css` verbatim.
- In `tailwind.config.mjs`, extend `colors` to reference the vars: e.g. `background: 'var(--background)'`, `foreground: 'var(--foreground)'`, `cta: '#F26A4B'`, etc.; `fontFamily.sans: ['Inter', ...]`, `serif: ['Playfair Display', ...]`, `mono: ['JetBrains Mono', ...]`; `borderRadius.DEFAULT: 'var(--radius)'`.
- Dark tokens present but **not** toggled in v1.

---

## 5. Accessibility & Performance

**WCAG AA**
- Contrast pairs to honor: charcoal `#1E1E1E` on cream `#E9E4D8` (passes AA for text). Orange `#F26A4B` CTA uses **white** text — verify ≥ 4.5:1; if borderline at small sizes, use CTA text at ≥ 16px/600 (large-text threshold) or darken to `--cta-hover`. `[VERIFY]`
- Never rely on the orange alone to convey meaning.
- Focus: visible ring on every interactive element — 2px `--ring #2E2E2E` offset 2px; on orange CTA use a white inner + charcoal outer ring for visibility.
- Tap targets ≥ 44×44px (buttons, FAQ rows, sticky FAB is 56px).
- Semantic landmarks: `<header> <main> <section aria-labelledby> <footer>`; each section H2 has an `id` referenced by `aria-labelledby`. One `<h1>` only (Hero).
- All images require descriptive `alt`; decorative panels `alt=""`/`aria-hidden`. WhatsApp links: `aria-label` including "opens WhatsApp".
- Accordion: proper `button[aria-expanded]` + `aria-controls`; keyboard operable.

**Performance**
- Images: serve WebP/AVIF, explicit `width`/`height` to prevent CLS, `loading="lazy"` for below-fold, hero media eager. Use Astro `<Image>` if assets local.
- Fonts: preconnect + `font-display: swap`; subset to used weights (Inter 400/500/600, Playfair 600, JetBrains Mono 500). Avoid layout shift with size-adjust or preloading display face.
- Ship zero unused JS: only the tiny reveal + accordion scripts. No framework runtime.
- Lighthouse mobile targets per §0 acceptance criteria. CLS ≈ 0.

---

## 6. SEO & Meta

- **Title:** `Monumenth Growth — Booked $20K+ Kitchen & Bath Remodels from Social Media`
- **Meta description:** `We build the content and WhatsApp funnel that turn your raw footage into booked $20K+ remodeling jobs — on 1–2 hours a month. Get in touch.` (≤ 155 chars — trim to fit `[VERIFY]`)
- **OG/Twitter:** `og:title`, `og:description`, `og:type=website`, `og:image` = `/og-image.jpg` `[NEEDS PROOF]`, `twitter:card=summary_large_image`.
- **Favicon:** `/favicon.svg` `[NEEDS PROOF — from logo]`; fallback wordmark "M" glyph.
- **Structured data `[PROPOSED]`:** `Organization` + `Service` JSON-LD (name, description, areaServed: US, serviceType: marketing for remodeling contractors). Do not include unverified ratings/reviews.
- **`robots.txt`** allow all; **`sitemap.xml`** via Astro sitemap integration. Canonical tag on index.
- Set `lang="en"`.

---

## 7. Open Questions / [NEEDS PROOF]

1. **`WHATSAPP_NUMBER`** — user must supply international number (digits only). Blocks all CTAs from resolving. `[SET BY USER]`
2. **Logo / wordmark asset** (SVG) — for header, footer, favicon, OG image.
3. **Hero media** — a real raw-footage still or short clip for the two-layer frame.
4. **Proof — results** — real, publishable numbers (jobs booked, views, lead volume, or named client).
5. **Proof — testimonial** — one real contractor quote with name, company, location.
6. **Pricing / guarantee** — package price and any guarantee for the Offer section; not defined in brief.
7. **Domain** — production domain for canonical + Vercel deploy.
8. **Sector scope** — confirm kitchen & bath only, or name adjacent remodeling trades.
9. **CTA-vs-WhatsApp-green decision** — confirm inline CTAs stay brand orange while the sticky FAB is WhatsApp green, or unify.
10. **Analytics** — if any (e.g. Plausible), add and note whether consent UI is required.
```
