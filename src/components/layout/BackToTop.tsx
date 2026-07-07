import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #c94a1a, #f07030)",
        boxShadow: "0 0 24px rgba(201,74,26,0.5), 0 4px 12px rgba(0,0,0,0.4)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <ArrowUp size={20} className="text-white" />
    </button>
  );
}
