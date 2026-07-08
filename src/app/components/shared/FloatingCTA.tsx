import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useRegistration } from "@/app/context/RegistrationContext";

/**
 * Floating sticky "Reserve Your Slot" button.
 * Appears after the user scrolls past the hero section (~100vh),
 * and hides again when they reach the very bottom of the page
 * (FinalCTA already has a prominent button there).
 * Respects prefers-reduced-motion — no animation when disabled.
 */
export function FloatingCTA() {
  const { openModal } = useRegistration();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show after hero (~80vh), hide when within 300px of the page bottom
      const pastHero = scrollY > winHeight * 0.8;
      const nearBottom = scrollY + winHeight >= docHeight - 300;

      setVisible(pastHero && !nearBottom);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className="fixed bottom-6 right-6 z-[150] transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <button
        onClick={openModal}
        aria-label="Reserve your free slot"
        className="group flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold uppercase tracking-[0.18em] text-white btn-shimmer shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        style={{
          fontFamily: "'Oswald', sans-serif",
          boxShadow: "0 0 32px rgba(192,57,43,0.55), 0 4px 16px rgba(0,0,0,0.5)",
        }}
      >
        <Zap className="w-3.5 h-3.5 group-hover:animate-pulse" />
        Reserve Your Slot
      </button>
    </div>
  );
}
