import {
  Zap,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Shield,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { Embers } from "@/app/components/shared/Embers";
import { Divider } from "@/app/components/shared/Divider";
import { scrollTo } from "@/app/lib/utils";
import { useRegistration } from "@/app/context/RegistrationContext";
import { SITE_CONFIG } from "@/app/lib/config";

const PROOF_ITEMS = [
  { icon: Shield, label: "100% Free" },
  { icon: Users, label: "50+ Mentored" },
  { icon: Star, label: "Proven System" },
  { icon: CheckCircle, label: "No Experience Needed" },
] as const;

/** Full-screen hero section with background image, ember particles, and CTA buttons. */
export function Hero() {
  const { openModal } = useRegistration();

  const messageUrl = SITE_CONFIG.messengerUrl !== "#"
    ? SITE_CONFIG.messengerUrl
    : SITE_CONFIG.whatsappNumber
    ? `https://wa.me/${SITE_CONFIG.whatsappNumber}`
    : "#";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1765148754568-3bdda3dc843f?w=1600&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.28 }}
        />
      </div>

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(192,57,43,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black to-transparent" />

      <Embers count={24} />

      {/* Top accent line */}
      <div
        className="absolute top-[70px] inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(192,57,43,0.5) 30%, rgba(212,135,10,0.6) 50%, rgba(192,57,43,0.5) 70%, transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
        {/* Urgency badge */}
        <div className="hero-fade flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{
              borderColor: "rgba(212,135,10,0.5)",
              background: "rgba(212,135,10,0.1)",
              fontFamily: "'Oswald', sans-serif",
              color: "#ffd700",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Limited Seats — Registration Now Open
          </div>
        </div>

        {/* Tag line */}
        <p
          className="hero-fade d1 text-[11px] uppercase tracking-[0.5em] text-red-400/80 mb-4"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Presented by Sir Mark Anthony Cruz · Dragons Project
        </p>

        {/* Main title */}
        <h1
          className="hero-fade d2 font-black leading-[0.95] mb-6"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="shimmer-text block text-6xl sm:text-7xl md:text-8xl">
            DRAGONS
          </span>
          <span className="shimmer-text block text-6xl sm:text-7xl md:text-8xl">
            PROJECT
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl text-white/90 mt-3 tracking-[0.12em] font-bold">
            WEBINAR INVITATION
          </span>
        </h1>

        <Divider className="hero-fade d3 max-w-sm mx-auto" />

        {/* Subtitle */}
        <p
          className="hero-fade d3 text-xl md:text-2xl text-amber-200/80 font-light italic mt-6 mb-5 leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          "Ready to learn how ordinary people are creating extraordinary
          opportunities?"
        </p>

        <p
          className="hero-fade d4 text-[15px] text-white/50 leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Discover the vision of Dragons Project, hear inspiring success stories,
          explore real business opportunities, and learn exactly how to start your
          journey toward financial freedom and lasting impact.
        </p>

        {/* CTA buttons */}
        <div className="hero-fade d5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="w-full sm:w-auto group relative px-10 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white btn-shimmer transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{
              fontFamily: "'Oswald', sans-serif",
              boxShadow:
                "0 0 40px rgba(192,57,43,0.5), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <span className="relative flex items-center gap-2">
              <Zap className="w-4 h-4" /> Reserve Your Free Slot{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <a
            href={messageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/20 hover:border-amber-500/60 hover:text-amber-300 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <MessageCircle className="w-4 h-4" /> Send a Direct Message
          </a>
        </div>

        {/* Social proof strip */}
        <div className="hero-fade d6 mt-14 flex items-center justify-center gap-6 flex-wrap">
          {PROOF_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-xs text-white/40"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              <Icon className="w-3.5 h-3.5 text-amber-500/70" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo("about")}
          className="mt-12 mx-auto flex flex-col items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors group"
          aria-label="Scroll down"
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Discover More
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
