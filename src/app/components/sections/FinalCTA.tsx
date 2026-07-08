import { Flame, ArrowRight, MessageCircle, Shield } from "lucide-react";
import { Embers } from "@/app/components/shared/Embers";
import { Divider } from "@/app/components/shared/Divider";
import { useReveal } from "@/app/hooks/useReveal";
import { useRegistration } from "@/app/context/RegistrationContext";
import { SITE_CONFIG } from "@/app/lib/config";

/** Full-width fire-themed final call-to-action section. */
export function FinalCTA() {
  const { ref, visible } = useReveal(0.1);
  const { openModal } = useRegistration();

  const messageUrl = SITE_CONFIG.messengerUrl !== "#"
    ? SITE_CONFIG.messengerUrl
    : SITE_CONFIG.whatsappNumber
    ? `https://wa.me/${SITE_CONFIG.whatsappNumber}`
    : "#";

  return (
    <section className="relative py-40 overflow-hidden bg-black">
      {/* Background fire photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1761140623139-840b6f04a3e8?w=1600&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(192,57,43,0.25) 0%, transparent 70%)",
          }}
        />
      </div>

      <Embers count={30} />

      {/* Top border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c0392b 25%, #ffd700 50%, #c0392b 75%, transparent 100%)",
        }}
      />

      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center ${
          visible ? "scale-in" : "opacity-0"
        }`}
      >
        <p
          className="text-[11px] uppercase tracking-[0.5em] text-amber-500/80 mb-5"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          The moment is now
        </p>

        <h2
          className="font-black leading-none mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="shimmer-text block text-6xl sm:text-7xl md:text-8xl">
            Your Future
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl text-white/90 mt-2 tracking-wide">
            Starts With One Decision.
          </span>
        </h2>

        <Divider className="max-w-xs mx-auto" />

        <p
          className="mt-8 text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Every great story began with someone who simply chose to show up. This
          webinar could be that pivotal moment for you. Reserve your seat today —
          it costs nothing except your commitment to a better tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={openModal}
            className="w-full sm:w-auto group relative px-12 py-5 rounded-full text-[13px] font-black uppercase tracking-[0.25em] text-white btn-shimmer transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{
              fontFamily: "'Oswald', sans-serif",
              boxShadow:
                "0 0 60px rgba(192,57,43,0.5), 0 6px 30px rgba(0,0,0,0.5)",
            }}
          >
            <span className="relative flex items-center gap-2.5">
              <Flame className="w-4 h-4" />
              Reserve Your Seat Today — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <a
            href={messageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white/70 border border-white/15 hover:border-amber-500/50 hover:text-amber-300 transition-all duration-300"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <MessageCircle className="w-4 h-4" /> Ask Marlon Directly
          </a>
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-2 text-white/25 text-xs"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          <Shield className="w-3.5 h-3.5 text-green-500/50" />
          No spam. No cost. Just one decision that could change everything.
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c0392b 25%, #ffd700 50%, #c0392b 75%, transparent 100%)",
        }}
      />
    </section>
  );
}
