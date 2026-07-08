import {
  Eye,
  Star,
  Briefcase,
  TrendingUp,
  Crown,
  Users,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";

interface BenefitItem {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
}

const BENEFITS: BenefitItem[] = [
  {
    icon: Eye,
    title: "Vision & Mission",
    body: "Understand the powerful purpose that drives Dragons Project — a movement built to create scalable freedom for everyday people around the world.",
    accent: "#c0392b",
  },
  {
    icon: Star,
    title: "Success Stories",
    body: "Hear directly from real partners who began exactly where you are now — with doubt, no experience, and one courageous decision.",
    accent: "#d4870a",
  },
  {
    icon: Briefcase,
    title: "Business Opportunities",
    body: "Explore proven, practical income models that don't require a large capital, a degree, or prior business experience to begin.",
    accent: "#c0392b",
  },
  {
    icon: TrendingUp,
    title: "Personal Growth",
    body: "Gain frameworks for mindset transformation, disciplined goal-setting, and the habits that separate dreamers from those who deliver.",
    accent: "#d4870a",
  },
  {
    icon: Crown,
    title: "Leadership Skills",
    body: "Discover how to lead yourself first. Dragons Project doesn't just build earners — it develops leaders who elevate entire communities.",
    accent: "#c0392b",
  },
  {
    icon: Users,
    title: "Community Support",
    body: "Step into a tribe of builders who celebrate wins, sharpen skills, and genuinely show up for each other at every stage of the journey.",
    accent: "#d4870a",
  },
];

const CHECKLIST = [
  "The Dragons Project business model",
  "How to start with zero experience",
  "Real earnings from real partners",
  "Step-by-step onboarding process",
  "Your questions, answered live",
  "Exclusive bonuses for attendees",
];

function BenefitCard({
  card,
  delay,
}: {
  card: BenefitItem;
  delay: number;
}) {
  const { ref, visible } = useReveal();
  const Icon = card.icon;

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl p-7 border transition-all duration-500 cursor-default
        hover:-translate-y-2 hover:shadow-2xl ${visible ? "scale-in" : "opacity-0"}`}
      style={{
        animationDelay: `${delay}s`,
        background:
          "linear-gradient(135deg, rgba(17,12,12,0.95) 0%, rgba(22,14,10,0.9) 100%)",
        borderColor: "rgba(192,57,43,0.2)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${card.accent}55, 0 0 40px ${card.accent}15`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: `linear-gradient(135deg, ${card.accent}30, ${card.accent}10)`,
          border: `1px solid ${card.accent}35`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: card.accent }} />
      </div>

      <h3
        className="text-base font-bold text-foreground mb-3 tracking-wide"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {card.title}
      </h3>
      <p
        className="text-[13px] text-muted-foreground leading-relaxed"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        {card.body}
      </p>

      {/* Corner ornament */}
      <div className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
        <div
          className="w-full h-full border-r border-b rounded-br-sm"
          style={{ borderColor: card.accent }}
        />
      </div>
    </div>
  );
}

/** 3-column benefit card grid plus a session checklist CTA block. */
export function Benefits() {
  return (
    <section
      id="benefits"
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080808 0%, #0a0606 50%, #080808 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Why Attend"
          title="What You'll Discover"
          sub="Every minute of this webinar is engineered to give you clarity, confidence, and a clear path forward."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((card, i) => (
            <BenefitCard key={card.title} card={card} delay={i * 0.08} />
          ))}
        </div>

        {/* Checklist CTA */}
        <div
          className="mt-16 rounded-2xl p-8 border border-amber-900/20 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,10,5,0.9), rgba(20,12,8,0.95))",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,135,10,0.06) 0%, transparent 70%)",
            }}
          />
          <p
            className="text-[11px] text-amber-500 uppercase tracking-[0.4em] mb-4 relative"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Everything covered in one session
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto relative">
            {CHECKLIST.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-left px-3 py-2"
              >
                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span
                  className="text-[13px] text-foreground/70"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
