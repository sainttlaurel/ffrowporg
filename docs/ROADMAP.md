# Dragons Project — Website Roadmap

> Live URL: https://ffrowporg.vercel.app
> GitHub: https://github.com/sainttlaurel/ffrowporg
> Workflow: Code → Build check → GitHub push → Vercel auto-deploy

---

## Legend

| Status | Meaning |
|--------|---------|
| Done | Implemented and verified |
| In Progress | Currently being built |
| Planned | Scoped, not started |
| Idea | Suggested, not committed |
| Owner | Needs content/action from site owner |

---

## Phase 0 — Foundation & Cleanup — Done

- [x] Project scaffolded with Vite + React + TypeScript + Tailwind v4
- [x] shadcn/ui component library installed
- [x] Custom dark theme (crimson/amber/black) via CSS custom properties
- [x] Google Fonts: Cinzel, Raleway, Oswald
- [x] Landing page sections: Hero, Testimonials, Benefits, Webinar, FAQ, Final CTA, Footer
- [x] About section removed — no longer part of the page
- [x] Scroll-based navigation (smooth scroll to section IDs)
- [x] Responsive navbar with mobile drawer — About link removed from nav
- [x] Ember particle animation
- [x] Scroll-reveal (IntersectionObserver) for sections
- [x] Infinite marquee testimonials
- [x] Split monolithic App.tsx into per-section components
- [x] Bug fix — React Rules of Hooks violation in FAQ
- [x] File cleanup — removed empty globals.css
- [x] RULES.md and ROADMAP.md created

---

## Phase 1 — Core Functionality — Done

### 1.1 Registration Flow
- [x] Registration modal (name, email, phone fields)
- [x] All "Reserve Your Slot / Spot" buttons open the modal
- [x] Client-side validation (required fields, email format, phone format)
- [x] Formspree backend integration — set `formspreeEndpoint` in `src/app/lib/config.ts`
- [x] Fallback to mailto when no endpoint is configured
- [x] Success / error / loading states

### 1.2 Webinar Date & Time
- [x] CountdownTimer component — days / hours / mins / secs
- [x] Auto-shows "Webinar is Live!" when target time is reached
- [x] Auto-shows "Session has ended" after the 2-hour window
- [x] Shows "Date to be announced" when date is null
- [x] Set `webinarDate` in `src/app/lib/config.ts` to activate

### 1.3 Real Content — Partial (Owner actions pending)
- [x] Social and contact links read from `src/app/lib/config.ts`
- [x] "Send a Direct Message" button linked to https://m.me/lexie.lonzkie
- [x] Facebook URL — set to https://www.facebook.com/lexie.lonzkie
- [x] Footer host name reads from config
- [x] All external links open in new tab with rel="noopener noreferrer"
- [x] Speaker set to Sir Mark Anthony Cruz across all sections and meta tags
- [x] Webinar schedule: 1:00 PM, 5:00 PM, 8:00 PM, 10:00 PM PHT
- [x] Webinar date set: July 20, 2026 — 1:00 PM PHT (countdown active)
- [x] Registration wired to Google Forms — https://forms.gle/XES68JpqSYjioFb49 (free, unlimited, saves to Google Sheets)
- [x] Eligibility: 18 years old and above only
- [x] Availability: Open to all countries
- [x] CTA copy: "Secure your slot — comment country + DRAGONS or send a direct message"
- [x] Real logo added to navbar and footer (/logo.png)
- [x] "Presented by / Independent Business Partner" text removed from footer
- [ ] Owner: Set `instagramUrl` in config.ts
- [ ] Owner: Set `youtubeUrl` in config.ts
- [ ] Owner: Update testimonials with real partner names and quotes
- [ ] Owner: Replace og:image with a real 1200x630 branded cover image
- [ ] Owner: Replace emoji favicon with a real branded icon

### 1.4 SEO & Meta Tags
- [x] noindex removed — page is indexable
- [x] Title and meta description updated with Sir Mark Anthony Cruz
- [x] Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- [x] Twitter Card tags
- [x] theme-color meta for mobile browser chrome
- [x] og:url updated to https://ffrowporg.vercel.app
- [x] JSON-LD Event structured data (Google rich results)
- [x] Preconnect hints for Google Fonts CDN

---

## Phase 2 — SEO & Performance — Done

### 2.1 SEO
- [x] JSON-LD Event schema in index.html
- [x] Preconnect hints for Google Fonts
- [ ] Planned: Add sitemap.xml once a custom domain is confirmed

### 2.2 Performance
- [x] loading="lazy" on all below-the-fold images
- [x] Hero image set to eager (above the fold)
- [x] Preconnect for fonts.googleapis.com and fonts.gstatic.com
- [x] Removed 14 unused npm packages (MUI, react-slick, react-dnd, canvas-confetti, etc.)
- [ ] Owner: Replace remaining Unsplash background images with local optimised images (WebP, under 200 KB)

### 2.3 Accessibility
- [x] Skip-to-content link for keyboard users
- [x] role="main" and id="main-content" on the main element
- [x] focus-visible outline globally (amber, 2px, WCAG 2.1 SC 2.4.11)
- [x] prefers-reduced-motion — all decorative animations disabled
- [x] Ember particles suppressed when reduced motion is active
- [x] Decorative images have alt="" and aria-hidden="true"
- [x] All buttons have visible text or aria-label
- [x] Modal has role="dialog", aria-modal="true", aria-label
- [x] FAQ accordion buttons have aria-expanded
- [ ] Idea: Full screen-reader test (manual, requires assistive technology)
- [ ] Idea: Audit colour contrast — confirm WCAG AA (4.5:1) across all text

---

## Phase 3 — Deployment — Done

### 3.1 GitHub
- [x] Repository created: https://github.com/sainttlaurel/ffrowporg
- [x] .gitignore configured (node_modules, .env, dist)
- [x] Initial commit pushed
- [ ] Planned: Set up branch protection on main

### 3.2 Vercel
- [x] Connected to GitHub repository
- [x] Build settings: Vite, pnpm build, output dist
- [x] Production deployment live: https://ffrowporg.vercel.app
- [ ] Owner: Set up custom domain (if available)

### 3.3 CI/CD
- [ ] Planned: GitHub Actions workflow — tsc --noEmit + lint on pull requests

---

## Phase 4 — Enhanced Features — Done

### 4.1 Analytics
- [x] Vercel Analytics (@vercel/analytics@1.5.0) — auto-activates on Vercel deploy

### 4.2 UX Improvements
- [x] Floating sticky "Reserve Slot" button — appears after hero, hides near footer
- [x] "Back to Top" button in footer
- [x] Touch/drag support on testimonials marquee (mobile swipe fixed)
- [x] Auto-pause marquee on hover (desktop)

### 4.3 Additional Sections
- [x] Video embed section (VideoIntro) — hidden automatically when introVideoUrl is empty
- [x] Live chat widget — Tawk.to via useTawkto hook; activates when tawktoWidgetId is set
- [ ] Owner: Gallery / Highlights section — needs real event photos or clips
- [ ] Owner: Partners / Logos strip — needs real credibility logos

### 4.4 Codebase Health
- [x] 14 unused packages removed (80 sub-packages)
- [x] react/react-dom moved to dependencies (was incorrectly in peerDeps)
- [ ] Planned: Add tsconfig.json with strict: true and @/* path alias
- [ ] Idea: Set up ESLint + Prettier
- [ ] Idea: Move static data arrays to src/app/lib/data.ts

---

## Bugs / Issues

| Priority | Issue | Status |
|----------|-------|--------|
| Critical | React Hooks violation in FAQ | Fixed |
| Medium | Registration buttons did nothing | Fixed |
| Medium | Social links pointed to # | Partial — FB/Messenger set, Instagram/YouTube pending |
| Medium | Webinar countdown not active | Fixed — set to July 20, 2026 1:00 PM PHT |
| Medium | Registration form not sending emails | Fixed — Google Forms integration live |
| Medium | Testimonials not swipeable on mobile | Fixed — touch/drag added |
| Low | noindex blocked Google | Fixed |
| Low | og:url was wrong domain | Fixed |
| Low | No tsconfig.json — no strict type checking | Planned |

---

## Next Actions (Priority Order)

Owner actions — only the site owner can do these:

1. Update testimonials with real partner names and quotes
2. Set `instagramUrl` and `youtubeUrl` in config.ts
3. Provide branded og:image (1200x630 PNG/JPG) and favicon file

Code tasks — can be done anytime:

1. Add tsconfig.json with strict mode and @/* path alias
2. Add sitemap.xml (after custom domain is confirmed)
3. GitHub branch protection on main
4. GitHub Actions CI/CD for type checking and lint on pull requests
