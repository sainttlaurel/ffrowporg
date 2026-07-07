# Dragons Project - Development Roadmap

## Project Overview
Dragons Project is a business opportunity webinar landing page built with React, Vite, and TypeScript. The project aims to connect users with business opportunities through community, education, and mentorship.

## Current Status
- **Live Site**: https://marlon-dragon.vercel.app
- **GitHub**: https://github.com/sainttlaurel/frowproj
- **Build Status**: ✅ Passing
- **Deployment**: ✅ Active on Vercel

---

## Phase 1: Code Organization ✅ IN PROGRESS

### Completed
- ✅ Removed unused `src/app/components` folder (50+ unused UI components)
- ✅ Removed empty `src/styles/globals.css` file
- ✅ Created proper folder structure:
  - `src/hooks/` - Custom React hooks
  - `src/components/layout/` - Layout components (Navbar, Footer, BackToTop)
  - `src/components/sections/` - Page sections (Hero, About, Register, etc.)
  - `src/components/ui/` - Reusable UI components
- ✅ Extracted custom hooks:
  - `useFadeIn.ts` - Intersection Observer for fade-in animations
  - `useParallax.ts` - Parallax scroll effects
  - `useCountdown.ts` - Countdown timer logic
- ✅ Extracted layout components:
  - `Navbar.tsx` - Navigation with mobile menu
  - `Footer.tsx` - Footer with social links and hashtags
  - `BackToTop.tsx` - Scroll-to-top button
  - `CopyHashtag.tsx` - Copy-to-clipboard functionality

### In Progress
- 🔄 Extract section components from App.tsx
- 🔄 Update App.tsx to use extracted components
- 🔄 Fix navigation UX (restore internal page navigation)

### Remaining
- ⏳ Extract visual components (EmberParticles, GlowCursor, etc.)
- ⏳ Extract form components (Registration form)
- ⏳ Create shared UI components (Button, Card, SectionHeader)

---

## Phase 2: Navigation UX Fix 🔴 HIGH PRIORITY

### Problem
Currently all navigation buttons link to Facebook, preventing users from navigating within the page.

### Solution
- Restore internal navigation for section links (Home, About, Speaker, Register)
- Keep Facebook links only for external CTAs (Register Now, Message Us)
- Maintain smooth scroll behavior for internal links

### Implementation
```typescript
// Navbar - Internal links should scroll to sections
<button onClick={() => scrollTo("home")}>Home</button>
<button onClick={() => scrollTo("about")}>About</button>

// External CTAs should link to Facebook
<a href="https://www.facebook.com/lexie.lonzkie">Register Now</a>
```

---

## Phase 3: Styling Architecture 🔴 HIGH PRIORITY

### Problem
- 100+ inline style objects in App.tsx
- Lint warnings about inline styles
- Difficult to maintain and update styles
- No design system consistency

### Solution
- Extract inline styles to CSS modules
- Create design system with Tailwind CSS custom classes
- Implement CSS variables for theme colors
- Create reusable style constants

### Implementation Plan
1. Create `src/styles/components/` folder
2. Convert inline styles to CSS modules
3. Create `src/styles/theme.css` with design tokens
4. Update components to use CSS modules

---

## Phase 4: Form Functionality 🔴 HIGH PRIORITY

### Problem
- Registration form only shows success state
- No actual data submission
- No backend integration
- No error handling

### Solution
- Add backend integration (email service, database, or API)
- Implement loading states during submission
- Add proper error handling and user feedback
- Add form validation on server side

### Implementation Options
- **Option A**: Email service (SendGrid, Mailgun, Resend)
- **Option B**: Database (Supabase, Firebase, MongoDB)
- **Option C**: API endpoint (Vercel Functions, Express)

### Recommended
Use Vercel Functions + Resend for email notifications

---

## Phase 5: Performance Optimization 🟡 MEDIUM PRIORITY

### Current Issues
- Large bundle size (210KB JS)
- No code splitting
- No image optimization
- Unused dependencies

### Solution
- Implement code splitting with React.lazy()
- Add lazy loading for images
- Remove unused Radix UI components
- Optimize bundle size

### Implementation
```typescript
// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
```

---

## Phase 6: Accessibility 🟡 MEDIUM PRIORITY

### Current Issues
- Missing ARIA labels
- No keyboard navigation
- Focus management issues
- Color contrast concerns

### Solution
- Add proper ARIA labels throughout
- Implement keyboard navigation
- Add focus management for modals
- Ensure WCAG AA compliance

---

## Phase 7: SEO & Analytics 🟡 MEDIUM PRIORITY

### Current Issues
- No structured data
- No analytics tracking
- Missing Open Graph images
- Limited SEO metadata

### Solution
- Add JSON-LD structured data
- Implement Google Analytics
- Add Open Graph images
- Improve meta tags

---

## Phase 8: Testing 🟢 LOW PRIORITY

### Current State
- No tests present
- No test coverage
- No E2E tests

### Solution
- Add unit tests with Vitest
- Add component tests with React Testing Library
- Add E2E tests with Playwright
- Set up CI/CD testing

---

## Phase 9: Configuration 🟢 LOW PRIORITY

### Current Issues
- Hardcoded values throughout
- No environment configuration
- Hardcoded Facebook URL

### Solution
- Add environment variables
- Make countdown timer configurable
- Extract constants to config file

### Implementation
```env
# .env.local
VITE_FACEBOOK_URL=https://www.facebook.com/lexie.lonzkie
VITE_COUNTDOWN_DAYS=14
```

---

## Phase 10: Documentation 🟢 LOW PRIORITY

### Current State
- Minimal documentation
- No JSDoc comments
- No component documentation

### Solution
- Add JSDoc comments for functions
- Document component props
- Create README with setup instructions
- Add contribution guidelines

---

## Dependencies Cleanup

### Unused Dependencies to Remove
- Most Radix UI components (40+ unused)
- React DnD (not used)
- React Slick (not used)
- Recharts (not used)
- Many others

### Estimated Savings
- Bundle size: ~50-80KB reduction
- Install time: ~30% faster
- Maintenance: Easier dependency management

---

## Timeline Estimate

### Phase 1: Code Organization
- **Estimated**: 2-3 hours
- **Status**: 70% complete

### Phase 2: Navigation UX Fix
- **Estimated**: 30 minutes
- **Status**: Pending

### Phase 3: Styling Architecture
- **Estimated**: 4-6 hours
- **Status**: Pending

### Phase 4: Form Functionality
- **Estimated**: 3-4 hours
- **Status**: Pending

### Phase 5: Performance Optimization
- **Estimated**: 2-3 hours
- **Status**: Pending

### Phase 6-10: Remaining Improvements
- **Estimated**: 8-12 hours
- **Status**: Pending

**Total Estimated Time**: 20-30 hours

---

## Priority Order

1. **Phase 2**: Navigation UX Fix (Critical user experience issue)
2. **Phase 3**: Styling Architecture (Maintainability & lint warnings)
3. **Phase 4**: Form Functionality (Core feature not working)
4. **Phase 5**: Performance Optimization (User experience)
5. **Phase 6**: Accessibility (User experience & compliance)
6. **Phase 7**: SEO & Analytics (Marketing & visibility)
7. **Phase 8**: Testing (Quality assurance)
8. **Phase 9**: Configuration (Flexibility)
9. **Phase 10**: Documentation (Maintainability)

---

## Next Steps

1. Complete Phase 1 (finish component extraction)
2. Fix navigation UX in App.tsx
3. Test the application to ensure no breaking changes
4. Commit and deploy changes
5. Begin Phase 3 (Styling Architecture)

---

## Notes

- All changes should be tested locally before deployment
- Use feature branches for major changes
- Update this roadmap as progress is made
- Consider user feedback when prioritizing features
