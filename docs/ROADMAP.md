# Dragons Project — Website Roadmap

> Deployment target: **GitHub + Vercel**
> Live URL: **https://ffrowporg.vercel.app**
> GitHub: **https://github.com/sainttlaurel/ffrowporg**
> Workflow: **Code → Build check → GitHub push → Vercel auto-deploy**

---

## Legend

| Status | Meaning |
|--------|---------|
| ✅ Done | Implemented and verified |
| 🔨 In Progress | Currently being built |
| 📋 Planned | Scoped, not started |
| 💡 Idea | Suggested, not committed |
| ⏳ Owner | Needs content/action from site owner |

---

## Phase 0 — Foundation & Cleanup ✅

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
- [x] Split monolithic App.tsx into per-section components
- [x] Bug fix — React Rules of Hooks violation in FAQ (useReveal inside .map)
- [x] File cleanup — removed empty globals.css, moved default_shadcn_theme.css to docs/
- [x] RULES.md and ROADMAP.md created

---

## Phase 1 — Core Functionality ✅

### 1.1 Registration Flow ✅
- [x] Registration modal (name, email, phone fields)
- [x] All "Reserve Your Slot / Spot" buttons open the modal (Hero, Navbar, Webinar, FinalCTA)
- [x] Client-side validation (required fields, email format, phone format)
- [x] Formspree backend integration — set `formspreeEndpoint` in `src/app/lib/config.ts`
- [x] Fallback to `mailto:` when no endpoint is configured
- [x] Success / error / loading states

### 1.2 Webinar Date & Time ✅
- [x] `CountdownTimer` component — days / hours / mins / secs
- [x] Auto-shows "Webinar is Live!" when target time is reached
- [x] Auto-shows "Session has ended" after the 2-hour window
- [x] Shows "Date to be announced" badge when date is null
- [x] Set `webinarDate` in `src/app/lib/config.ts` to activate the countdown

### 1.3 Real Content — Partial ⏳
- [x] Social and contact links read from `src/app/lib/config.ts`
- [x] "Message Marlon" — set to `https://m.me/lexie.lonzkie` (Facebook Messenger)
- [x] Facebook URL — set to `https://www.facebook.com/lexie.lonzkie`
- [x] Footer host name reads from config
- [x] All external links open in new tab with `rel="noopener noreferrer"`
- [x] About photo — replaced Unsplash stock with real photo (`/marlon.png`)
- [ ] ⏳ Set `instagramUrl` in `config.ts` — Instagram profile URL
- [ ] ⏳ Set `youtubeUrl` in `config.ts` — YouTube channel URL
- [ ] ⏳ Set `webinarDate` in `config.ts` — confirmed date/time (ISO 8601, PHT)
- [ ] ⏳ Set `formspreeEndpoint` in `config.ts` — so registration emails actually send
- [ ] ⏳ Update testimonials with real partner names and quotes
- [ ] ⏳ Replace `og:image` with a real 1200×630 branded cover image
- [ ] ⏳ Replace 🔥 emoji favicon with a real branded icon

### 1.4 SEO & Meta Tags ✅
- [x] `noindex, nofollow` removed — page is indexable
- [x] `<title>` and `<meta name="description">` updated
- [x] Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- [x] Twitter Card tags
- [x] `theme-color` meta for mobile browser chrome
- [x] `og:url` updated to `https://ffrowporg.vercel.app`
- [x] JSON-LD Event structured data (Google rich results)
- [x] `<link rel="preconnect">` for Google Fonts CDN

---

## Phase 2 — SEO & Performance ✅

### 2.1 SEO
- [x] JSON-LD Event schema in `index.html`
- [x] Preconnect hints for Google Fonts
- [ ] 📋 Add `sitemap.xml` once a custom domain is confirmed

### 2.2 Performance
- [x] `loading="lazy"` on all below-the-fold images
- [x] Hero image set to `eager` (above the fold)
- [x] Preconnect for `fonts.googleapis.com` and `fonts.gstatic.com`
- [x] Removed 14 unused npm packages (MUI, react-slick, react-dnd, canvas-confetti, etc.)
- [ ] ⏳ Replace remaining Unsplash background URLs with local/optimised images (WebP, <200 KB)

### 2.3 Accessibility ✅
- [x] Skip-to-content link for keyboard users
- [x] `role="main"` and `id="main-content"` on `<main>`
- [x] `focus-visible` outline globally (amber, 2px, WCAG 2.1 SC 2.4.11)
- [x] `prefers-reduced-motion` — all decorative animations disabled
- [x] Ember particles suppressed when reduced motion is active
- [x] Decorative images have `alt=""` and `aria-hidden="true"`
- [x] All buttons have visible text or `aria-label`
- [x] Modal has `role="dialog"`, `aria-modal="true"`, `aria-label`
- [x] FAQ accordion buttons have `aria-expanded`
- [ ] 💡 Full screen-reader test (manual, requires assistive technology)
- [ ] 💡 Audit colour contrast — confirm WCAG AA (4.5:1) across all text

---

## Phase 3 — Deployment ✅

### 3.1 GitHub
- [x] Repository created: `https://github.com/sainttlaurel/ffrowporg`
- [x] `.gitignore` configured (node_modules, .env, dist)
- [x] Initial commit pushed
- [ ] 📋 Set up branch protection on `main`

### 3.2 Vercel
- [x] Connected to GitHub repository
- [x] Build settings: Vite, `pnpm build`, output `dist`
- [x] Production deployment live: `https://ffrowporg.vercel.app`
- [ ] ⏳ Set up custom domain (if available)

### 3.3 CI/CD
- [ ] 📋 GitHub Actions workflow — `tsc --noEmit` + lint on pull requests

---

## Phase 4 — Enhanced Features ✅

### 4.1 Analytics ✅
- [x] Vercel Analytics (`@vercel/analytics@1.5.0`) — auto-activates on Vercel deploy

### 4.2 UX Improvements ✅
- [x] Floating sticky "Reserve Slot" button — appears after hero, hides near footer
- [x] "Back to Top" button in footer
- [x] Touch/drag support on testimonials marquee (fixes mobile swipe)
- [x] Auto-pause marquee on hover (desktop)

### 4.3 Additional Sections
- [x] Video embed section (`VideoIntro`) — hidden automatically when `introVideoUrl` is empty
- [x] Live chat widget — Tawk.to via `useTawkto` hook; activates when `tawktoWidgetId` is set
- [ ] ⏳ Gallery / Highlights — needs real event photos/clips
- [ ] ⏳ Partners / Logos strip — needs real credibility logos

### 4.4 Codebase Health
- [x] 14 unused packages removed (80 sub-packages)
- [x] `react`/`react-dom` moved to `dependencies` (was incorrectly in peerDeps)
- [ ] 📋 Add `tsconfig.json` with `strict: true` and `@/*` path alias
- [ ] 💡 Set up ESLint + Prettier
- [ ] 💡 Move static data arrays to `src/app/lib/data.ts`

---

## Bugs / Issues

| Priority | Issue | Status |
|----------|-------|--------|
| 🔴 Critical | React Hooks violation in FAQ | ✅ Fixed |
| 🟡 Medium | Registration buttons did nothing | ✅ Fixed |
| 🟡 Medium | Social/contact links pointed to `#` | ✅ Partially fixed — FB/Messenger set, Instagram/YouTube pending |
| 🟡 Medium | Webinar countdown not active | ⏳ Needs `webinarDate` set in config.ts |
| 🟡 Medium | Registration form not sending emails | ⏳ Needs `formspreeEndpoint` set in config.ts |
| 🟡 Medium | Testimonials not swipeable on mobile | ✅ Fixed — touch/drag added |
| 🟠 Low | `noindex` blocked Google | ✅ Fixed |
| 🟠 Low | `og:url` was wrong domain | ✅ Fixed |
| 🟠 Low | About photo was stock image | ✅ Fixed — real photo in place |
| 🟠 Low | No `tsconfig.json` — no strict type checking | 📋 Planned |

---

## Next Actions (Priority Order)

1. ⏳ **Owner:** Fill in `config.ts` — webinar date, Formspree endpoint, Instagram, YouTube
2. ⏳ **Owner:** Update testimonials with real names and quotes
3. ⏳ **Owner:** Provide branded `og:image` (1200×630 PNG/JPG) and favicon
4. 📋 **Code:** Add `tsconfig.json` with strict mode
5. 📋 **Code:** Add `sitemap.xml` (after custom domain confirmed)
6. 📋 **Code:** GitHub branch protection + CI/CD GitHub Actions
