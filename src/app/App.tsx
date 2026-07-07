import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, Star, Users, TrendingUp, Heart,
  ChevronDown, MessageCircle, Phone,
  ArrowRight, Check, CalendarDays, Clock, Zap, Monitor,
  Eye, Briefcase, Map, Trophy, Flame
} from "lucide-react";
import confetti from "canvas-confetti";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { BackToTop } from "../components/layout/BackToTop";
import { CopyHashtag } from "../components/ui/CopyHashtag";
import { useFadeIn } from "../hooks/useFadeIn";
import { useParallax } from "../hooks/useParallax";
import { useCountdown } from "../hooks/useCountdown";
import { FACEBOOK_URL, COUNTDOWN_DAYS, COUNTDOWN_HOURS, WEBINAR_DATE, WEBINAR_TIME, WEBINAR_PLATFORM } from "../config/constants";


/* ─── Utility ─── */
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Ember Particles (upward drift) ─── */
type Ember = { id: number; x: number; size: number; duration: number; delay: number; color: string };
function EmberParticles({ count = 40 }: { count?: number }) {
  const [embers] = useState<Ember[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 8,
      color: i % 4 === 0 ? "#d4a017" : i % 4 === 1 ? "#f07030" : i % 4 === 2 ? "#c94a1a" : "#4a90d9",
    }))
  );
  return (
    <>
      <style>{`
        @keyframes ember-rise {
          0%   { transform: translateY(100vh) scale(1) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(0.3) rotate(180deg); opacity: 0; }
        }
        @keyframes ember-sway {
          0%, 100% { margin-left: 0; }
          50%       { margin-left: 20px; }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((e) => (
          <div
            key={e.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${e.x}%`,
              width: e.size,
              height: e.size,
              backgroundColor: e.color,
              boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
              animation: `ember-rise ${e.duration}s ${e.delay}s infinite linear, ember-sway ${e.duration * 0.6}s ${e.delay}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* ─── Glow Cursor (hero only) ─── */
function GlowCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const leave = () => setPos({ x: -999, y: -999 });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [containerRef]);
  return (
    <div
      className="absolute pointer-events-none transition-opacity duration-300"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,74,26,0.18) 0%, rgba(212,160,23,0.08) 40%, transparent 70%)",
        filter: "blur(8px)",
        zIndex: 5,
      }}
    />
  );
}

/* ─── Fire Divider ─── */
function FireDivider() {
  return (
    <>
      <style>{`
        @keyframes shimmer { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
      `}</style>
      <div className="relative w-full h-px overflow-visible flex items-center justify-center my-0">
        <div className="absolute inset-0 flex items-center">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,74,26,0.6), rgba(212,160,23,0.8), rgba(201,74,26,0.6), transparent)", animation: "shimmer 3s ease-in-out infinite" }} />
        </div>
        <div className="relative z-10 flex items-center gap-2 px-3" style={{ background: "#05030a" }}>
          <Flame size={14} className="text-amber-400" style={{ filter: "drop-shadow(0 0 6px #f07030)" }} />
        </div>
      </div>
    </>
  );
}

/* ─── Dragon SVG Silhouette ─── */
function DragonSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 300 C80 200, 150 180, 200 160 C220 152, 240 140, 260 120 C280 100, 310 70, 350 60 C390 50, 430 55, 460 70 C490 85, 510 110, 520 140 C530 165, 525 190, 510 210 C495 230, 475 240, 450 248 C430 255, 400 258, 380 265 C360 272, 350 285, 340 300 C330 315, 320 335, 300 350 C280 365, 250 370, 230 360 C210 350, 200 325, 195 305 C188 280, 190 255, 185 240 C178 220, 162 210, 150 220 C135 232, 120 260, 100 280 Z" fill="currentColor" opacity="0.15" />
      <path d="M350 60 C370 40, 400 20, 430 15 C455 10, 475 18, 490 35 C505 52, 510 75, 500 95 C490 112, 470 120, 450 118" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M460 70 C480 50, 510 35, 540 40 C565 45, 580 65, 575 90 C570 112, 550 128, 530 132" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <path d="M350 120 C300 80, 220 60, 150 80 C100 95, 60 130, 50 160 C70 140, 110 125, 160 130 C200 134, 240 150, 270 140 C300 130, 330 118, 350 120 Z" fill="currentColor" opacity="0.12" />
      <path d="M400 100 C440 60, 510 40, 560 55 C590 65, 600 90, 590 115 C575 100, 545 92, 510 98 C480 103, 450 115, 420 118 Z" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

/* ─── Smoke Effect ─── */
function SmokeLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: "linear-gradient(to top, rgba(5,3,10,0.8) 0%, rgba(201,74,26,0.05) 50%, transparent 100%)" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(201,74,26,0.08) 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 left-1/2 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(74,144,217,0.06) 0%, transparent 70%)" }} />
    </div>
  );
}


function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={cn(className, "transition-all duration-700")}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}


/* ─── Staggered Word Reveal ─── */
function WordReveal({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  const words = text.split(" ");
  return (
    <div ref={ref} className={cn(className, "flex flex-wrap justify-center gap-x-4 gap-y-0")} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
            transitionDelay: `${i * 180}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}


function CountdownTimer() {
  const target = new Date(Date.now() + COUNTDOWN_DAYS * 24 * 60 * 60 * 1000 + COUNTDOWN_HOURS * 3600000);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-['Cinzel'] font-bold text-2xl"
            style={{
              background: "rgba(201,74,26,0.12)",
              border: "1px solid rgba(201,74,26,0.3)",
              color: "#f07030",
              boxShadow: "0 0 20px rgba(201,74,26,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase mt-1.5" style={{ color: "rgba(240,230,211,0.4)" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}


/* ─── Hero ─── */
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const dragonRef = useParallax(0.15);
  const smokeRef = useParallax(0.08);
  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05030a 0%, #0d0515 50%, #05030a 100%)" }}>
      {/* Parallax dragon */}
      <div ref={dragonRef} className="absolute inset-0 w-full h-full pointer-events-none">
        <DragonSilhouette className="w-full h-full text-red-900 opacity-30" />
      </div>
      {/* Parallax smoke */}
      <div ref={smokeRef} className="absolute inset-0 pointer-events-none">
        <SmokeLayer />
      </div>

      <EmberParticles count={50} />
      <GlowCursor containerRef={heroRef} />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,74,26,0.12) 0%, rgba(212,160,23,0.05) 40%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-['Plus_Jakarta_Sans'] font-semibold tracking-widest uppercase"
          style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017", animation: "shimmer 3s ease-in-out infinite" }}>
          <Flame size={12} />Business Opportunity Webinar<Flame size={12} />
        </div>

        {/* Staggered title */}
        <WordReveal
          text="DRAGONS PROJECT"
          className="font-['Cinzel_Decorative'] font-black leading-none tracking-widest mb-4"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            background: "linear-gradient(135deg, #f5c842 0%, #e8621a 40%, #c94a1a 70%, #4a90d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(201,74,26,0.5))",
          }}
        />

        <p className="font-['Cinzel'] font-semibold tracking-[0.3em] mb-3 uppercase"
          style={{ fontSize: "clamp(0.8rem, 2vw, 1.2rem)", color: "#d4a017" }}>
          One Team. One Vision. One Family.
        </p>
        <p className="font-['Cinzel'] italic mb-8 tracking-widest"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)", color: "rgba(240,230,211,0.6)" }}>
          "Walang Shortcut sa Tagumpay."
        </p>
        <p className="font-['Plus_Jakarta_Sans'] font-light leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(240,230,211,0.7)" }}>
          Join a movement of ordinary people achieving extraordinary things. Dragons Project is more than a webinar — it is the beginning of your transformation through teamwork, leadership, and relentless perseverance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #c94a1a, #f07030)", color: "#fff", boxShadow: "0 0 30px rgba(201,74,26,0.5), 0 4px 20px rgba(0,0,0,0.4)", fontSize: "0.95rem" }}>
            <Flame size={18} />Reserve Your Slot
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.4)", color: "#d4a017", fontSize: "0.95rem" }}>
            Learn More<ChevronDown size={16} />
          </button>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-amber-400/50" />
            <ChevronDown size={16} className="text-amber-400/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: "500+", label: "Community Members" },
    { value: "3", label: "Years Strong" },
    { value: "10+", label: "Cities Nationwide" },
    { value: "100%", label: "Real Opportunities" },
  ];
  const { ref, visible } = useFadeIn(0.3);
  return (
    <div ref={ref} className="relative py-10 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(201,74,26,0.08) 0%, rgba(212,160,23,0.05) 50%, rgba(74,144,217,0.04) 100%)", borderTop: "1px solid rgba(212,160,23,0.1)", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }, i) => (
          <div key={label} className="text-center transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: `${i * 100}ms` }}>
            <div className="font-['Cinzel_Decorative'] font-black mb-1"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", background: "linear-gradient(135deg, #f5c842, #e8621a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {value}
            </div>
            <div className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase" style={{ color: "rgba(240,230,211,0.45)" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string | React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans'] font-semibold tracking-widest uppercase mb-4"
        style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
        {label}
      </div>
      <h2 className="font-['Cinzel'] font-bold tracking-wider mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f0e6d3" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="font-['Plus_Jakarta_Sans'] font-light max-w-2xl mx-auto" style={{ color: "rgba(240,230,211,0.55)", fontSize: "1.05rem", lineHeight: "1.8" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group", className)}
      style={{ background: "rgba(15,8,25,0.6)", border: "1px solid rgba(212,160,23,0.15)", backdropFilter: "blur(20px)", boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)", ...style }}>
      {children}
    </div>
  );
}

/* ─── About ─── */
function About() {
  const pillars = [
    { icon: <Users size={20} />, label: "Teamwork" },
    { icon: <Shield size={20} />, label: "Leadership" },
    { icon: <TrendingUp size={20} />, label: "Growth" },
    { icon: <Heart size={20} />, label: "Perseverance" },
  ];
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden" style={{ background: "#05030a" }}>
      <SmokeLayer />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn><SectionHeader label="Our Story" title="About Dragons Project"
          subtitle="We are a community of ordinary people with an extraordinary vision — to build real opportunities through the power of unity, discipline, and shared purpose." /></FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={100}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                style={{ background: "linear-gradient(135deg, #c94a1a, #d4a017)" }} />
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c94a1a, #e8621a)" }}>
                    <Flame size={20} className="text-white" />
                  </div>
                  <h3 className="font-['Cinzel'] font-bold tracking-widest" style={{ color: "#d4a017", fontSize: "0.9rem" }}>THE MISSION</h3>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed mb-6" style={{ color: "rgba(240,230,211,0.75)", fontSize: "1rem" }}>
                  Dragons Project was born from a simple belief: that every person — regardless of background, status, or resources — deserves access to real business opportunities. We exist to bridge that gap through education, community, and mentorship.
                </p>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed" style={{ color: "rgba(240,230,211,0.75)", fontSize: "1rem" }}>
                  Through our webinars and collaborative network, we equip individuals with the mindset, tools, and connections needed to create sustainable income and lasting impact in their communities.
                </p>
              </GlassCard>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="space-y-6">
              <p className="font-['Cinzel'] font-semibold tracking-widest uppercase text-sm" style={{ color: "#d4a017" }}>Built on Four Pillars</p>
              <div className="grid grid-cols-2 gap-4">
                {pillars.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:border-amber-400/40 hover:scale-105 cursor-default group/pillar relative overflow-hidden"
                    style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.15)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover/pillar:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                      style={{ background: "radial-gradient(ellipse at center, rgba(212,160,23,0.12) 0%, transparent 70%)" }} />
                    <div className="text-amber-400 relative z-10 transition-transform duration-300 group-hover/pillar:scale-110">{icon}</div>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold tracking-wider text-sm relative z-10" style={{ color: "#f0e6d3" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl mt-4"
                style={{ background: "linear-gradient(135deg, rgba(201,74,26,0.12), rgba(212,160,23,0.08))", border: "1px solid rgba(201,74,26,0.2)" }}>
                <p className="font-['Cinzel'] italic text-lg leading-relaxed" style={{ color: "#d4a017" }}>
                  "Hindi kami nagbebenta ng pangarap. <br />
                  <span style={{ color: "rgba(240,230,211,0.8)" }}>Tumutulong kaming gumawa ng landas."</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Flip Card ─── */
function FlipCard({ icon, title, desc, detail, color }: { icon: React.ReactNode; title: string; desc: string; detail: string; color: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <>
      <style>{`
        .flip-card { perspective: 1000px; }
        .flip-inner { transition: transform 0.65s cubic-bezier(0.4,0.2,0.2,1); transform-style: preserve-3d; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-front, .flip-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }
      `}</style>
      <div
        className="flip-card h-72 cursor-pointer"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={`flip-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="flip-front absolute inset-0 rounded-2xl p-8 flex flex-col"
            style={{ background: "rgba(15,8,25,0.7)", border: `1px solid ${color}22`, backdropFilter: "blur(20px)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
              {icon}
            </div>
            <h3 className="font-['Cinzel'] font-bold tracking-wider mb-3" style={{ color: "#f0e6d3", fontSize: "1rem" }}>{title}</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed flex-1" style={{ color: "rgba(240,230,211,0.6)" }}>{desc}</p>
            <div className="mt-4 text-xs font-['Plus_Jakarta_Sans'] tracking-widest uppercase flex items-center gap-1" style={{ color }}>
              Hover to reveal <ArrowRight size={10} />
            </div>
          </div>
          {/* Back */}
          <div className="flip-back absolute inset-0 rounded-2xl p-8 flex flex-col justify-center items-center text-center"
            style={{ background: `linear-gradient(135deg, ${color}18, rgba(5,3,10,0.95))`, border: `1px solid ${color}40`, backdropFilter: "blur(24px)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
              style={{ background: `${color}25`, border: `1px solid ${color}50`, color }}>
              {icon}
            </div>
            <h3 className="font-['Cinzel'] font-bold tracking-wider mb-4" style={{ color, fontSize: "0.95rem" }}>{title}</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed" style={{ color: "rgba(240,230,211,0.8)" }}>{detail}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── What You'll Discover ─── */
function Discover() {
  const cards = [
    { icon: <Eye size={28} />, title: "Vision & Mission", desc: "Understand the heart behind Dragons Project — what we stand for and where we are headed.", detail: "We exist to create a world where opportunity is not a privilege. Every decision, every action, every webinar is aligned to one goal: equipping ordinary people with extraordinary tools.", color: "#d4a017" },
    { icon: <Trophy size={28} />, title: "Success Stories", desc: "Hear real stories from real people who transformed their lives through this community.", detail: "From zero capital to thriving businesses, from doubt to confidence — our members' stories are the proof. Real transformation starts with a real decision.", color: "#c94a1a" },
    { icon: <Briefcase size={28} />, title: "Business Opportunities", desc: "Discover legitimate, actionable business models you can start with minimal capital.", detail: "We don't sell dreams — we teach systems. Discover income models that work in the real world, with real support from people who have already walked the path.", color: "#4a90d9" },
    { icon: <Map size={28} />, title: "Your Journey", desc: "Learn the exact steps to get started — from day one to building your own team.", detail: "A clear roadmap awaits you. From your first step to financial independence, we walk alongside you every milestone of the way. No one is left behind.", color: "#d4a017" },
  ];
  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05030a 0%, #0d0515 50%, #05030a 100%)" }}>
      <SmokeLayer />
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <DragonSilhouette className="w-full h-full text-blue-400" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn><SectionHeader label="The Experience" title="What You'll Discover"
          subtitle="Every session is designed to ignite something in you. Hover the cards to unlock what awaits." /></FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 100}>
              <FlipCard {...card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Join ─── */
function WhyJoin() {
  const cards = [
    { icon: <Shield size={32} />, title: "We Fight Together", desc: "In Dragons Project, no one is left behind. When one struggles, the whole team shows up. Unity is our greatest weapon.", accent: "#c94a1a" },
    { icon: <TrendingUp size={32} />, title: "We Grow Together", desc: "Knowledge, skills, and breakthroughs are shared openly. Your success accelerates when the people around you are committed to growing too.", accent: "#d4a017" },
    { icon: <Star size={32} />, title: "We Succeed Together", desc: "Our wins are collective. Every milestone is celebrated as a team. The vision is clear: financial freedom and life transformation — for all.", accent: "#4a90d9" },
  ];
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "#05030a" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,74,26,0.06) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn><SectionHeader label="The Dragons Way" title="Why Join Us"
          subtitle="Three principles that define every Dragon. Not just words — a way of life we live every single day." /></FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ icon, title, desc, accent }, i) => (
            <FadeIn key={title} delay={i * 120}>
              <div className="relative rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-2 cursor-default"
                style={{ background: "rgba(15,8,25,0.5)", border: `1px solid ${accent}22`, backdropFilter: "blur(20px)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${accent}0a 0%, transparent 70%)` }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `1px solid ${accent}35`, color: accent }}>
                  {icon}
                </div>
                <h3 className="font-['Cinzel'] font-bold tracking-wider mb-4" style={{ color: "#f0e6d3", fontSize: "1.15rem" }}>{title}</h3>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed" style={{ color: "rgba(240,230,211,0.6)", fontSize: "0.95rem" }}>{desc}</p>
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Speaker ─── */
function Speaker() {
  return (
    <section id="speaker" className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05030a, #0d0515 50%, #05030a)" }}>
      <SmokeLayer />
      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn><SectionHeader label="Meet the Speaker" title="The Voice Behind the Vision" /></FadeIn>
        <FadeIn delay={100}>
          <div className="rounded-3xl overflow-hidden"
            style={{ background: "rgba(15,8,25,0.7)", border: "1px solid rgba(212,160,23,0.2)", backdropFilter: "blur(24px)" }}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative flex items-center justify-center min-h-80 md:min-h-auto"
                style={{ background: "linear-gradient(135deg, rgba(201,74,26,0.15), rgba(74,144,217,0.08))" }}>
                <div className="absolute inset-0"
                  style={{ background: "url('https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&h=700&fit=crop&auto=format') center/cover no-repeat", opacity: 0.25 }} />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-36 h-36 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(201,74,26,0.3), rgba(212,160,23,0.2))", border: "2px solid rgba(212,160,23,0.4)", boxShadow: "0 0 40px rgba(201,74,26,0.3)" }}>
                    <Users size={56} className="text-amber-400 opacity-70" />
                  </div>
                  <div className="text-center">
                    <p className="font-['Cinzel'] font-bold text-lg tracking-widest" style={{ color: "#d4a017" }}>MP</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(240,230,211,0.4)" }}>Photo Coming Soon</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(201,74,26,0.15), transparent)" }} />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold tracking-widest uppercase" style={{ color: "#c94a1a" }}>Featured Speaker</span>
                </div>
                <h3 className="font-['Cinzel'] font-bold mb-1" style={{ color: "#f0e6d3", fontSize: "2rem" }}>Marlon Pilapil</h3>
                <p className="font-['Plus_Jakarta_Sans'] font-semibold mb-6 tracking-wider text-sm uppercase" style={{ color: "#d4a017" }}>Dragons Project Business Partner</p>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed mb-4" style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.95rem" }}>
                  Marlon Pilapil is a passionate entrepreneur, community builder, and business strategist who has dedicated his career to helping ordinary Filipinos discover their potential through principled business practices.
                </p>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed mb-8" style={{ color: "rgba(240,230,211,0.7)", fontSize: "0.95rem" }}>
                  As a core partner of Dragons Project, Marlon brings firsthand experience in network building, leadership development, and creating income systems that work for everyday people — not just those with capital or connections.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Entrepreneur", "Community Builder", "Business Coach"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-xs tracking-wider"
                      style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Registration ─── */
function Register() {
  const [form, setForm] = useState({ name: "", contact: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!form.contact.trim()) e.contact = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fireConfetti = () => {
    const end = Date.now() + 1500;
    const colors = ["#c94a1a", "#d4a017", "#f07030", "#4a90d9", "#f5c842"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1, y: 0.7 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, contact: true, email: true });
    if (!validate()) return;
    
    setLoading(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      
      setSubmitted(true);
      fireConfetti();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (id: string) => {
    setTouched((t) => ({ ...t, [id]: true }));
    validate();
  };

  return (
    <section id="register" className="relative py-28 px-6 overflow-hidden" style={{ background: "#05030a" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,74,26,0.07) 0%, transparent 70%)" }} />
      <EmberParticles count={25} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn><SectionHeader label="Secure Your Seat" title="Join the Dragons"
          subtitle="Slots are strictly limited. Reserve yours today and take the first step toward your transformation." /></FadeIn>

        {/* Countdown */}
        <FadeIn delay={80}>
          <div className="mb-12 text-center">
            <p className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(240,230,211,0.35)" }}>
              Registration window closes in
            </p>
            <CountdownTimer />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={100}>
            <div className="space-y-4">
              {[
                { label: "Date", value: WEBINAR_DATE, icon: <CalendarDays size={20} />, color: "#d4a017" },
                { label: "Time", value: WEBINAR_TIME, icon: <Clock size={20} />, color: "#c94a1a" },
                { label: "Slots", value: "Limited — First come, first served", icon: <Zap size={20} />, color: "#f07030" },
                { label: "Platform", value: WEBINAR_PLATFORM, icon: <Monitor size={20} />, color: "#4a90d9" },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:border-amber-400/25"
                  style={{ background: "rgba(15,8,25,0.6)", border: "1px solid rgba(212,160,23,0.12)", backdropFilter: "blur(16px)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-['Cinzel'] font-semibold text-xs tracking-widest uppercase mb-0.5" style={{ color: "#d4a017" }}>{label}</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-sm" style={{ color: "rgba(240,230,211,0.7)" }}>{value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2 space-y-3">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold tracking-wider text-sm uppercase transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0066FF, #00A6FF)", color: "#fff", boxShadow: "0 0 20px rgba(0,102,255,0.3)" }}>
                  <MessageCircle size={18} />Message Us on Messenger
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold tracking-wider text-sm uppercase transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}>
                  <Phone size={18} />Message Us on WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            {submitted ? (
              <GlassCard className="text-center py-16">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg, #c94a1a, #e8621a)", boxShadow: "0 0 30px rgba(201,74,26,0.4)" }}>
                  <Check size={36} className="text-white" />
                </div>
                <h3 className="font-['Cinzel'] font-bold text-xl tracking-wider mb-3" style={{ color: "#f0e6d3" }}>You are In! 🐉</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed mb-6" style={{ color: "rgba(240,230,211,0.6)" }}>
                  Thank you for registering, <strong style={{ color: "#d4a017" }}>{form.name.split(" ")[0]}</strong>! We will reach out via your contact details with confirmation and next steps. Welcome to the Dragons family!
                </p>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold tracking-wider text-sm uppercase transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0066FF, #00A6FF)", color: "#fff", boxShadow: "0 0 16px rgba(0,102,255,0.3)" }}>
                  <MessageCircle size={16} />Reach Out on Messenger
                </a>
              </GlassCard>
            ) : (
              <GlassCard>
                <h3 className="font-['Cinzel'] font-bold tracking-wider mb-8 text-xl" style={{ color: "#f0e6d3" }}>Pre-Registration Form</h3>
                <form onSubmit={handle} className="space-y-5" noValidate>
                  {[
                    { id: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                    { id: "contact", label: "Contact / Messenger", placeholder: "Phone or Messenger handle", type: "text" },
                    { id: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                  ].map(({ id, label, placeholder, type }) => (
                    <div key={id}>
                      <label className="block font-['Plus_Jakarta_Sans'] font-semibold text-xs tracking-widest uppercase mb-2" style={{ color: "#d4a017" }}>{label}</label>
                      <input type={type} value={form[id as keyof typeof form]}
                        onChange={(e) => { setForm({ ...form, [id]: e.target.value }); if (touched[id]) validate(); }}
                        onBlur={() => handleBlur(id)}
                        placeholder={placeholder}
                        className="w-full px-4 py-3.5 rounded-xl font-['Plus_Jakarta_Sans'] text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: touched[id] && errors[id]
                            ? "1px solid rgba(239,68,68,0.7)"
                            : touched[id] && !errors[id] && form[id as keyof typeof form]
                              ? "1px solid rgba(34,197,94,0.5)"
                              : "1px solid rgba(212,160,23,0.2)",
                          color: "#f0e6d3",
                          caretColor: "#d4a017",
                          boxShadow: touched[id] && errors[id] ? "0 0 12px rgba(239,68,68,0.15)" : "none",
                        }} />
                      {touched[id] && errors[id] && (
                        <p className="font-['Plus_Jakarta_Sans'] text-xs mt-1.5" style={{ color: "#ef4444" }}>
                          {id === "email" ? "Please enter a valid email address" : `${label} is required`}
                        </p>
                      )}
                    </div>
                  ))}
                  {submitError && (
                    <div className="p-3 rounded-lg text-xs font-['Plus_Jakarta_Sans'] text-center"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
                      {submitError}
                    </div>
                  )}
                  <button type="submit" disabled={loading}
                    className="group w-full py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-bold tracking-widest uppercase text-sm mt-2 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: "linear-gradient(135deg, #c94a1a, #f07030)", color: "#fff", boxShadow: "0 0 30px rgba(201,74,26,0.4)" }}>
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Flame size={18} />Reserve My Slot
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </GlassCard>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const quotes = [
    { quote: "Hindi ko akala magiging ganito yung buhay ko. Nagsimula ako bilang ordinary na tao, ngayon may sarili na akong negosyo. Salamat Dragons!", name: "Maria Santos", role: "Member since 2023", initials: "MS", color: "#c94a1a" },
    { quote: "The community is what makes this different. Hindi ka nag-iisa dito. Everyone wants you to win — and they show up to make sure you do.", name: "Jose Reyes", role: "Team Leader, Luzon Chapter", initials: "JR", color: "#d4a017" },
    { quote: "I was skeptical at first. But after the first webinar, something shifted. The knowledge, the energy, the people — it all clicked. Don't wait.", name: "Ana Cruz", role: "Business Partner", initials: "AC", color: "#4a90d9" },
  ];
  return (
    <section className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05030a, #0d0515 50%, #05030a)" }}>
      <SmokeLayer />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn><SectionHeader label="Voices of the Community" title="What Dragons Say" /></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map(({ quote, name, role, initials, color }, i) => (
            <FadeIn key={name} delay={i * 120}>
              <div className="rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(15,8,25,0.6)", border: `1px solid ${color}20`, backdropFilter: "blur(20px)" }}>
                <div className="mb-6" style={{ color, fontSize: "2.5rem", lineHeight: 1, fontFamily: "serif" }}>"</div>
                <p className="font-['Plus_Jakarta_Sans'] leading-relaxed flex-1 mb-8" style={{ color: "rgba(240,230,211,0.75)", fontSize: "0.95rem" }}>{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-['Cinzel'] flex-shrink-0"
                    style={{ background: `${color}20`, border: `1px solid ${color}30`, color }}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold text-sm" style={{ color: "#f0e6d3" }}>{name}</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs" style={{ color: "rgba(240,230,211,0.45)" }}>{role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── App ─── */
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  return (
    <div className="min-h-screen font-['Plus_Jakarta_Sans']" style={{ background: "#05030a" }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <FireDivider />
      <About />
      <FireDivider />
      <Discover />
      <FireDivider />
      <WhyJoin />
      <FireDivider />
      <Speaker />
      <FireDivider />
      <Register />
      <FireDivider />
      <Testimonials />
      <Footer />
      <BackToTop />
    </div>
  );
}
