# Dragons Project — Code Rules

These rules apply to all development on this project. Follow them before pushing any change.

---

## Workflow: Code → Test Run

Before committing or deploying **any** change, you must:

1. **Code** — implement the feature or fix.
2. **Test run** — run the dev server locally (`pnpm dev`) and visually verify:
   - Page loads without console errors.
   - The changed section renders correctly on desktop (1280px+) and mobile (375px).
   - No broken layouts, missing images, or animation glitches.
3. Only after a clean test run should a change be considered ready for GitHub/Vercel.

---

## Project Structure

```
src/
├── main.tsx                        ← entry point, do not modify unless necessary
├── styles/
│   ├── index.css                   ← master CSS import (fonts → tailwind → theme)
│   ├── fonts.css                   ← Google Fonts @import only
│   ├── tailwind.css                ← Tailwind v4 + tw-animate-css
│   └── theme.css                   ← CSS custom properties (colours, radius, etc.)
└── app/
    ├── App.tsx                     ← root component — imports only, no UI logic here
    ├── hooks/                      ← custom React hooks
    │   └── useReveal.ts
    ├── lib/                        ← pure utilities and constants
    │   ├── animations.ts           ← global CSS keyframe string
    │   └── utils.ts                ← cn(), scrollTo()
    └── components/
        ├── layout/                 ← Navbar, Footer
        ├── sections/               ← one file per page section
        │   ├── Hero.tsx
        │   ├── Testimonials.tsx
        │   ├── About.tsx
        │   ├── Benefits.tsx
        │   ├── Webinar.tsx
        │   ├── FAQ.tsx
        │   └── FinalCTA.tsx
        ├── shared/                 ← reusable UI primitives (Embers, Divider, SectionHeading)
        ├── ui/                     ← shadcn/ui components (do not edit manually)
        └── figma/                  ← Figma-generated components
```

---

## Code Style

- **TypeScript** — all new files must be `.ts` or `.tsx`. No plain `.js`.
- **Imports** — use the `@/` alias (`@/app/...`) everywhere, no relative `../../` paths.
- **One section = one file** — each landing-page section lives in `src/app/components/sections/`.
- **No logic in App.tsx** — `App.tsx` is an orchestrator only (imports + layout). All UI lives in section/layout/shared components.
- **Data arrays** — keep static data (BENEFITS, FAQS, TESTIMONIALS, etc.) inside their own section file, or extract to `src/app/lib/data.ts` if shared.
- **No inline `style` for colours that exist in the theme** — prefer Tailwind classes. Use inline `style` only for dynamic values (e.g., animation delays, pseudo-CSS variables).

---

## React Rules

- **Never call hooks inside loops, conditions, or nested functions.** If a list item needs a hook (e.g., `useReveal`), extract it into its own component.
  - ✅ Correct: `<FaqRow />` component with `useReveal()` at its top level.
  - ❌ Wrong: calling `useReveal()` inside a `.map()` callback.
- All `useEffect` cleanups must return a cleanup function.
- Avoid prop-drilling more than 2 levels deep — use composition or context instead.

---

## Accessibility

- Every interactive element (`<button>`, `<a>`) must have visible text or an `aria-label`.
- All decorative images must have `alt=""` and `aria-hidden="true"`.
- All meaningful images must have a descriptive `alt` text.
- Keyboard navigation must work for the navbar and FAQ accordion.
- Do not rely on colour alone to convey information.

---

## Assets

- Real photos of Marlon and the team must go in `src/assets/` and be referenced locally (not Unsplash).
- The Vite `figmaAssetResolver` plugin resolves `figma:asset/<filename>` → `src/assets/<filename>`.
- Never commit large unoptimised images. Target < 200 KB per image (use WebP).

---

## Dependencies

- Do not install new packages without checking if existing ones already cover the use case.
- Currently installed but **unused** (do not use without a clear reason):
  - `@mui/material`, `@emotion/react`, `@emotion/styled` — full MUI stack
  - `react-router` — no routing yet (roadmap Phase 2)
  - `react-hook-form` — needed for registration form (roadmap Phase 1)
  - `motion` (Framer Motion) — available for animations if CSS keyframes aren't enough
  - `recharts` — for any future stats/charts section
- `react` and `react-dom` should eventually be moved from `peerDependencies` to `dependencies`.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `BenefitCard.tsx` |
| Hooks | camelCase, `use` prefix | `useReveal.ts` |
| Utility functions | camelCase | `scrollTo`, `cn` |
| CSS class names | Tailwind utilities only | `text-amber-500`, `rounded-2xl` |
| Data constants | SCREAMING_SNAKE_CASE | `BENEFITS`, `FAQS` |
| Section IDs (HTML) | lowercase, no spaces | `id="webinar"` |

---

## Git (for when GitHub is set up)

- Branch from `main` for every feature: `feature/<short-description>`
- Commit messages: `type: short description` (e.g., `feat: add registration form`, `fix: faq hooks violation`)
- Never force-push to `main`.
- PR must have a clean test run before merge.
