import { GLOBAL_CSS } from "@/app/lib/animations";
import { Analytics } from "@vercel/analytics/react";
import { SITE_CONFIG } from "@/app/lib/config";
import { useTawkto } from "@/app/hooks/useTawkto";

// Context
import { RegistrationProvider, useRegistration } from "@/app/context/RegistrationContext";

// Layout
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";

// Sections (in page order)
import { Hero } from "@/app/components/sections/Hero";
import { Testimonials } from "@/app/components/sections/Testimonials";
import { About } from "@/app/components/sections/About";
import { VideoIntro } from "@/app/components/sections/VideoIntro";
import { Benefits } from "@/app/components/sections/Benefits";
import { Webinar } from "@/app/components/sections/Webinar";
import { FAQ } from "@/app/components/sections/FAQ";
import { FinalCTA } from "@/app/components/sections/FinalCTA";

// Shared
import { RegistrationModal } from "@/app/components/shared/RegistrationModal";
import { FloatingCTA } from "@/app/components/shared/FloatingCTA";

function AppInner() {
  const { isOpen, closeModal } = useRegistration();

  // Tawk.to live chat — activates only when widgetId is set in config.ts
  useTawkto(SITE_CONFIG.tawktoWidgetId);

  return (
    <div
      className="bg-background text-foreground antialiased"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* Inject global keyframe animations */}
      <style>{GLOBAL_CSS}</style>

      {/* Skip-to-content link — keyboard / screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:text-white focus:bg-red-700"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <Hero />
        <Testimonials />
        <About />
        <VideoIntro />
        <Benefits />
        <Webinar />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {/* Global registration modal — controlled by RegistrationContext */}
      <RegistrationModal open={isOpen} onClose={closeModal} />

      {/* Floating sticky CTA — appears after scrolling past the hero */}
      <FloatingCTA />

      {/* Vercel Analytics — no-op outside Vercel, auto-activates on deploy */}
      <Analytics />
    </div>
  );
}

/**
 * Root application component.
 * Single-page scroll-based landing page for the Dragons Project webinar.
 */
export default function App() {
  return (
    <RegistrationProvider>
      <AppInner />
    </RegistrationProvider>
  );
}
