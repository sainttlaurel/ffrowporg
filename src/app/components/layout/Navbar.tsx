import { useState, useEffect } from "react";
import { Menu, X, Flame, Zap } from "lucide-react";
import { scrollTo } from "@/app/lib/utils";
import { useRegistration } from "@/app/context/RegistrationContext";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Benefits", id: "benefits" },
  { label: "Webinar", id: "webinar" },
  { label: "FAQ", id: "faq" },
];

/** Fixed top navigation bar with scroll-aware background and mobile drawer. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useRegistration();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-2xl shadow-2xl shadow-black/60 border-b border-red-950/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 group"
          aria-label="Go to top"
        >
          <div className="relative w-9 h-9">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-red-700 to-amber-600 group-hover:scale-110 transition-transform duration-300"
              style={{ boxShadow: "0 0 16px rgba(192,57,43,0.6)" }}
            />
            <Flame className="absolute inset-0 m-auto w-4 h-4 text-white" />
          </div>
          <div>
            <div
              className="text-foreground font-black tracking-[0.15em] text-sm uppercase leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Dragons Project
            </div>
            <div
              className="text-amber-500/70 text-[9px] tracking-[0.3em] uppercase leading-none mt-0.5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Official Webinar
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="text-[11px] text-muted-foreground hover:text-amber-400 transition-colors uppercase tracking-[0.2em] relative group"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={openModal}
          className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-white btn-shimmer pulse-ring transition-transform hover:scale-105"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Zap className="w-3.5 h-3.5" /> Reserve Your Slot
        </button>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-black/97 backdrop-blur-2xl border-t border-red-950/30 px-6 py-8 flex flex-col gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                scrollTo(l.id);
                setOpen(false);
              }}
              className="text-left text-foreground hover:text-amber-400 uppercase tracking-[0.2em] text-sm transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              openModal();
              setOpen(false);
            }}
            className="mt-2 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white btn-shimmer"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Reserve Your Slot
          </button>
        </div>
      )}
    </nav>
  );
}
