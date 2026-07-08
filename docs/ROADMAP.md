# Dragons Project — Website Roadmap

> Deployment target: **GitHub + Vercel**  
> Workflow: **Code → Test Run → GitHub → Vercel auto-deploy**

---

## Legend

| Status | Meaning |
|--------|---------|
| ✅ Done | Implemented and test-run verified |
| 🔨 In Progress | Currently being built |
| 📋 Planned | Scoped, not started |
| 💡 Idea | Suggested improvement, not yet committed |

---

## Phase 0 — Foundation & Cleanup ✅

These are already complete as of the initial codebase setup.

- [x] Project scaffolded with Vite + React + TypeScript + Tailwind v4
- [x] shadcn/ui component library installed
- [x] Custom dark theme (crimson/amber/black) via CSS custom properties
- [x] Google Fonts: Cinzel, Raleway, Oswald
- [x] Landing page sections: Hero, Testimonials, About, Benefits, Webinar, FAQ, Final CTA, Footer
- [x] Scroll-based navigation (smooth scroll to section IDs)
- [x] Responsive navbar with mobile drawer
- [x] Ember particle animation
- [x] Scroll-reveal (IntersectionObserver) for sections
- [x] Infinite marquee testimonials
- [x] **Code organisation** — split monolithic App.tsx into per-section components
- [x] **Bug fix** — React Rules of Hooks violation in FAQ (useReveal inside .map)
- [x] **File cleanup** — removed empty globals.css, moved default_shadcn_theme.css to docs/
- [x] RULES.md and roadmap.md created

---

## Phase 1 — Core Functionality ✅

### 1.1 Registration Flow ✅
- [x] Registration modal built (name, email, phone fields)
- [x] All "Reserve Your Slot / Spot" buttons across Hero, Navbar, Webinar, FinalCTA now open the modal
- [x] Client-side form validation (required fields, email format, phone format)
- [x] Formspree backend integration — set `formspreeEndpoint` in `src/app/lib/config.ts`
- [x] Fallback to `mailto:` when no endpoint is configured
- [x] Success state: confirmation message
- [x] Error state: clear error feedback with retry
- [x] Loading spinner during submission
- [x] Global state via `RegistrationContext` — no prop drilling

### 1.2 Webinar Date & Time ✅
- [x] `CountdownTimer` component built — days / hours / mins / secs
- [x] Auto-shows "Webinar is Live!" when target time is reached
- [x] Auto-shows "Session has ended" after the 2-hour window
- [x] Shows "Date to be announced" badge when date is null
- [x] Set `webinarDate` in `src/app/lib/config.ts` to activate the countdown
- [x] Webinar section date/time labels now auto-format from `config.ts`

### 1.3 Real Content ✅
- [x] Social links (Facebook, Instagram, YouTube) read from `src/app/lib/config.ts`
- [x] "Message Marlon" reads WhatsApp (`wa.me`) or Messenger URL from config
- [x] Footer host name reads from config
- [x] All links open in new tab with `rel="noopener noreferrer"` when real URLs are set
- [ ] **TODO (owner):** Replace Unsplash About photo with real photo of Marlon
- [ ] **TODO (owner):** Fill in real URLs in `src/app/lib/config.ts`
- [ ] **TODO (owner):** Update testimonials with real partner names/quotes

### 1.4 SEO & Meta Tags ✅
- [x] `noindex, nofollow` removed — page is now indexable by Google
- [x] `<title>` updated: "Dragons Project Free Webinar — Reserve Your Seat Today"
- [x] `<meta name="description">` updated with real copy
- [x] Full Open Graph tags added (og:title, og:description, og:image, og:url, og:locale)
- [x] Twitter Card tags added
- [x] `theme-color` meta added for mobile browser chrome
- [x] Emoji favicon placeholder added
- [ ] **TODO (owner):** Replace `og:image` and favicon with real branded assets
- [x] ~~**TODO (owner):** Update `og:url` with real domain once deployed~~ — updated to https://ffrowporg.vercel.app

---

## Phase 2 — SEO & Performance ✅

### 2.1 SEO
- [x] ~~`noindex, nofollow` removed~~ (done in Phase 1)
- [x] ~~Title and description updated~~ (done in Phase 1)
- [x] ~~Open Graph and Twitter Card tags~~ (done in Phase 1)
- [x] JSON-LD Event structured data added to `index.html` (Google Search rich results)
- [x] `<link rel="preconnect">` added for Google Fonts CDN (faster font loading)
- [ ] Add `sitemap.xml` — needed once deployed on a real domain

### 2.2 Performance ✅
- [x] `loading="lazy"` added to all below-the-fold images (About texture, About portrait, Webinar bg, FinalCTA bg)
- [x] Hero image stays `eager` — it is above the fold and must load immediately
- [x] `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` in `index.html`
- [ ] Replace Unsplash URLs with locally optimised images (WebP, <200 KB) — pending real assets
- [ ] Self-host Google Fonts — optional improvement, CDN is fine for now
- [ ] Audit and remove unused npm packages (MUI, react-slick, etc.) — Phase 4.5

### 2.3 Accessibility ✅
- [x] Skip-to-content link added — keyboard users can jump past the navbar
- [x] `role="main"` and `id="main-content"` on the `<main>` element
- [x] `focus-visible` outline added globally (amber, 2px, meets WCAG 2.1 SC 2.4.11)
- [x] `prefers-reduced-motion` — all decorative animations (shimmer, pulse-ring, float, marquee, reveal) disabled when user prefers reduced motion
- [x] Ember particles fully suppressed when `prefers-reduced-motion` is active
- [x] All decorative images have `alt=""` and `aria-hidden="true"`
- [x] All interactive `<button>` elements have visible text or `aria-label`
- [x] Modal has `role="dialog"`, `aria-modal="true"`, `aria-label`
- [x] FAQ accordion buttons have `aria-expanded`
- [ ] Full screen-reader test — manual step, requires assistive technology
- [ ] Replace all Unsplash URLs with locally optimised images (WebP, <200 KB each)
- [ ] Add `loading="lazy"` to below-the-fold images
- [ ] Self-host Google Fonts instead of loading from CDN (improves LCP)
- [ ] Add `<link rel="preconnect">` for font origins
- [ ] Audit and remove completely unused npm packages (MUI, react-slick, react-responsive-masonry, etc.)

### 2.3 Accessibility
- [ ] Audit full keyboard navigation (tab order, focus indicators)
- [ ] Ensure colour contrast meets WCAG AA minimum (4.5:1 for normal text)
- [ ] Add `role="main"` and landmark regions
- [ ] Test with a screen reader

---

## Phase 3 — GitHub & Vercel Deployment ✅

*(Do this after Phase 1 is complete and the page has real content.)*

### 3.1 GitHub Setup
- [x] Create a GitHub repository (`dragonproject` or similar)
- [x] Set up `.gitignore` (node_modules, .env, dist)
- [x] Create initial commit with clean codebase
- [ ] Set up branch protection on `main`

### 3.2 Vercel Setup
- [x] Connect Vercel to the GitHub repository
- [x] Configure build settings: framework = Vite, build command = `pnpm build`, output = `dist`
- [ ] Set up custom domain (if available)
- [x] Verify production deployment — live at https://ffrowporg.vercel.app/

### 3.3 CI/CD
- [ ] Add a GitHub Actions workflow for basic checks (TypeScript `tsc --noEmit`, lint) on pull requests

---

## Phase 4 — Enhanced Features ✅

These improvements have been added to enhance UX and prepare for analytics.

### 4.1 TypeScript Config 📋
- [ ] Add `tsconfig.json` with `strict: true`, path alias `@/*` pointing to `src/`
- [ ] Run `tsc --noEmit` as part of the test-run workflow to catch type errors

### 4.2 Analytics ✅
- [x] Vercel Analytics installed (`@vercel/analytics@1.5.0`) — auto-activates on Vercel deploy
- [ ] Track CTA button clicks (registration attempts) with a simple event log — Phase 5 if needed

### 4.3 Additional Sections (Optional) ✅
- [ ] **Gallery / Highlights** — photos/clips from past events (needs real assets — owner action)
- [ ] **Partners / Logos strip** — credibility logos if applicable (needs real assets — owner action)
- [x] **Video embed** — `VideoIntro` section built; wired to `config.ts` (`introVideoUrl`); hidden automatically when URL is empty
- [x] **Live chat widget** — Tawk.to integration built via `useTawkto` hook; wired to `config.ts` (`tawktoWidgetId`); zero-cost, activates when ID is set

### 4.4 UX Improvements ✅
- [x] Floating sticky "Reserve Slot" button — appears after scrolling past hero, hides near page bottom
- [x] "Back to Top" button in the footer — smooth scroll to #home
- [x] Reduced motion support — already done in Phase 2
- [ ] Page loading skeleton or progress bar — optional improvement

### 4.5 Codebase Health ✅
- [x] Removed 14 unused packages (MUI, react-slick, react-dnd, motion, canvas-confetti, etc.) — 80 sub-packages removed
- [x] Fixed `react`/`react-dom` moved from `peerDependencies` (optional) to `dependencies` (correct for an app)
- [ ] Set up ESLint + Prettier configs — Phase 5 if needed
- [ ] Move all static data arrays to `src/app/lib/data.ts` — Phase 5 if needed
- [ ] Add `tsconfig.json` with strict mode — Phase 5 if needed

---

## Known Bugs / Issues to Fix

| Priority | Issue | Status |
|----------|-------|--------|
| 🔴 Critical | ~~React Rules of Hooks violation in FAQ (useReveal inside .map)~~ | ✅ Fixed |
| 🟡 Medium | ~~Registration buttons do nothing (no form, no modal)~~ | ✅ Fixed — Phase 1.1 |
| 🟡 Medium | ~~All social/contact links point to `#`~~ | ✅ Fixed — config-driven |
| 🟡 Medium | ~~Webinar date shows "To Be Announced"~~ | ✅ Fixed — countdown live |
| � Medium | ~~`noindex, nofollow` meta tag blocks Google~~ | ✅ Fixed — Phase 1.4 |
| 🟠 Low | About photo is a stock image, not Marlon | ⏳ Owner action needed |
| 🟠 Low | Social URLs still point to `#` until config.ts is filled in | ⏳ Owner action needed |
| 🟠 Low | No `tsconfig.json` — no type checking | 📋 Phase 4.5 |
| 🟠 Low | MUI and other unused packages inflate node_modules | 📋 Phase 2.2 |
| 🟠 Low | `react`/`react-dom` listed as optional peerDeps (should be deps) | 💡 Phase 4.5 |
