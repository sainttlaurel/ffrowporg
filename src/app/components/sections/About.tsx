import { TrendingUp, Briefcase, Crown, Users } from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";

const PILLARS = [
  { icon: TrendingUp, label: "Entrepreneurship" },
  { icon: Briefcase, label: "Financial Education" },
  { icon: Crown, label: "Leadership" },
  { icon: Users, label: "Community Building" },
] as const;

const STATS = [
  { v: "50+", l: "Mentored" },
  { v: "5+", l: "Years" },
  { v: "100+", l: "Impacted" },
] as const;

/** Two-column section: host photo card on the left, bio text on the right. */
export function About() {
  const { ref: leftRef, visible: leftV } = useReveal();
  const { ref: rightRef, visible: rightV } = useReveal();

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1760172287483-02d382f63a6f?w=1400&h=800&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.04, mixBlendMode: "luminosity" }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow=""
          title="About Sir Mark Anthony Cruz"
          sub="The man behind the invitation — and the mission."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo column */}
          <div
            ref={leftRef}
            className={`flex justify-center ${leftV ? "reveal-left" : "opacity-0"}`}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 blur-xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, #c0392b, #d4870a, #ffd700, #d4870a, #c0392b)",
                }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl overflow-hidden border border-red-900/30"
                style={{
                  boxShadow:
                    "0 0 60px rgba(192,57,43,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Photo */}
                <div className="relative w-72 md:w-80 aspect-[3/4] bg-zinc-900">
                  <img
                    src="/marlon.png"
                    alt="Sir Mark Anthony Cruz — Dragons Project Speaker"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Cinematic overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 50%, rgba(192,57,43,0.1) 100%)",
                    }}
                  />

                  {/* Name plate */}
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p
                      className="text-white font-black text-xl leading-tight"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Sir Mark Anthony Cruz
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-amber-500 to-transparent" />
                    </div>
                    <p
                      className="text-amber-400 text-[11px] uppercase tracking-widest mt-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Independent Business Partner
                    </p>
                  </div>
                </div>

                {/* Stat bar */}
                <div className="grid grid-cols-3 divide-x divide-border bg-card/80 backdrop-blur-sm">
                  {STATS.map((s) => (
                    <div key={s.l} className="py-4 text-center">
                      <div
                        className="text-xl font-black text-amber-400"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {s.v}
                      </div>
                      <div
                        className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge removed */}
            </div>
          </div>

          {/* Text column */}
          <div
            ref={rightRef}
            className={rightV ? "reveal-right" : "opacity-0"}
          >
            <div
              className="space-y-5 text-muted-foreground leading-relaxed text-[15px]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              <p className="text-foreground/90 text-lg leading-relaxed">
                Sir Mark Anthony Cruz is a passionate entrepreneur, financial
                educator, and community builder committed to helping ordinary
                people unlock extraordinary results.
              </p>
              <p>
                As a key figure in the Dragons Project, he has personally guided
                dozens of individuals — many starting from zero — through the
                journey of entrepreneurship, financial literacy, and personal
                leadership.
              </p>
              <p>
                His approach is direct, practical, and deeply human. He doesn't
                just teach a system; he walks alongside the people he mentors,
                celebrating their wins and sharpening their resolve through every
                challenge.
              </p>
              <p className="text-amber-400/80 italic">
                "I was once looking for exactly what I now offer others. This
                webinar is my way of paying it forward."
              </p>
            </div>

            {/* Pillar cards */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {PILLARS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl p-3.5 border border-border bg-card/50 hover:border-red-800/50 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(192,57,43,0.25), rgba(212,135,10,0.15))",
                    }}
                  >
                    <Icon className="w-4 h-4 text-amber-500" />
                  </div>
                  <span
                    className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
