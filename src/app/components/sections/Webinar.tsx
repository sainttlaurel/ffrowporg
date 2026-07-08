import {
  Calendar,
  Clock,
  Monitor,
  Gift,
  AlertCircle,
  Flame,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { CountdownTimer } from "@/app/components/shared/CountdownTimer";
import { useRegistration } from "@/app/context/RegistrationContext";
import { SITE_CONFIG } from "@/app/lib/config";

interface DetailItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

function getDetails(): DetailItem[] {
  const dateLabel = SITE_CONFIG.webinarDate
    ? new Date(SITE_CONFIG.webinarDate).toLocaleDateString("en-PH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "To Be Announced";

  const timeLabel = SITE_CONFIG.webinarDate
    ? new Date(SITE_CONFIG.webinarDate).toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : "To Be Announced";

  return [
    { icon: Calendar, label: "Date", value: dateLabel },
    { icon: Clock, label: "Time", value: timeLabel },
    { icon: Monitor, label: "Platform", value: SITE_CONFIG.platform },
    { icon: Gift, label: "Investment", value: "Completely Free" },
    { icon: AlertCircle, label: "Availability", value: "Limited Seats Only" },
  ];
}

/** Event details card + registration CTA — the primary conversion section. */
export function Webinar() {
  const { ref, visible } = useReveal(0.1);
  const { openModal } = useRegistration();

  const details = getDetails();

  return (
    <section
      id="webinar"
      className="relative py-32 overflow-hidden bg-background"
    >
      {/* Background fire photo */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1759455024821-609e6218797c?w=1400&h=800&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: 0.06, mixBlendMode: "screen" }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow="Save Your Seat"
          title="Webinar Details"
          sub="A free, high-impact session designed to shift your perspective and set you into motion."
        />

        <div
          ref={ref}
          className={`relative rounded-3xl overflow-hidden border transition-all duration-700 ${
            visible ? "scale-in" : "opacity-0"
          }`}
          style={{
            borderColor: "rgba(192,57,43,0.3)",
            background:
              "linear-gradient(135deg, #110a0a 0%, #1a0d0d 40%, #110a0a 100%)",
            boxShadow:
              "0 0 80px rgba(192,57,43,0.15), 0 0 160px rgba(212,135,10,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Corner glows */}
          <div
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(192,57,43,0.25)" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(212,135,10,0.2)" }}
          />

          {/* Top accent line */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #c0392b, #d4870a, #ffd700, #d4870a, #c0392b)",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-red-950/40">
            {/* Event details */}
            <div className="p-10 md:p-12">
              <p
                className="text-[11px] uppercase tracking-[0.4em] text-amber-500 mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Event Information
              </p>
              <div className="space-y-5">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(192,57,43,0.2), rgba(212,135,10,0.12))",
                        border: "1px solid rgba(192,57,43,0.25)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p
                        className="text-[10px] text-muted-foreground uppercase tracking-widest"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-sm font-semibold text-foreground mt-0.5"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Urgency strip */}
              <div className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl border border-red-900/30 bg-red-950/20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <p
                  className="text-xs text-red-300/80"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  <span className="font-bold text-red-300">
                    Slots filling fast.
                  </span>{" "}
                  Register early to guarantee your place.
                </p>
              </div>
            </div>

            {/* CTA side */}
            <div className="p-10 md:p-12 flex flex-col items-center justify-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 float-y"
                style={{
                  background: "linear-gradient(135deg, #c0392b, #d4870a)",
                  boxShadow:
                    "0 0 50px rgba(192,57,43,0.5), 0 0 100px rgba(212,135,10,0.2)",
                }}
              >
                <Flame className="w-9 h-9 text-white" />
              </div>

              <p
                className="text-[11px] uppercase tracking-[0.4em] text-amber-500 mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Your seat is waiting
              </p>

              <h3
                className="text-3xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Join Us for a
                <br />
                <span className="shimmer-text">Life-Changing</span>
                <br />
                Session
              </h3>

              {/* Countdown timer */}
              <div className="mb-8">
                <CountdownTimer targetDate={SITE_CONFIG.webinarDate} />
              </div>

              <button
                onClick={openModal}
                className="w-full px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white btn-shimmer transition-all duration-300 hover:scale-105 pulse-ring"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> Reserve My Spot — Free
                </span>
              </button>

              <p
                className="mt-4 text-[11px] text-muted-foreground/40"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                No spam · No cost · Pure value
              </p>

              <div
                className="mt-6 flex items-center gap-3 text-[11px] text-muted-foreground/50"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <Shield className="w-3.5 h-3.5 text-green-500/60" />
                <span>Your information is safe with us.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
