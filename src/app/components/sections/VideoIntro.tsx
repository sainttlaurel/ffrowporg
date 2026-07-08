import { Play } from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { SITE_CONFIG } from "@/app/lib/config";

/**
 * Optional video intro section — renders only when SITE_CONFIG.introVideoUrl is set.
 * Placed between About and Benefits to let viewers hear from Marlon before the pitch.
 */
export function VideoIntro() {
  const { ref, visible } = useReveal(0.15);

  // Hidden entirely when no video URL is configured
  if (!SITE_CONFIG.introVideoUrl) return null;

  return (
    <section
      id="video"
      className="relative py-28 overflow-hidden bg-background"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          eyebrow="Hear It First"
          title="A Message From Marlon"
          sub="Before you reserve your seat, watch this short introduction and see what the Dragons Project is all about."
        />

        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "scale-in" : "opacity-0"}`}
        >
          {/* Video frame */}
          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              borderColor: "rgba(192,57,43,0.35)",
              boxShadow:
                "0 0 80px rgba(192,57,43,0.18), 0 0 160px rgba(212,135,10,0.07), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, #c0392b, #d4870a, #ffd700, #d4870a, #c0392b)",
              }}
            />

            {/* 16:9 responsive iframe */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={SITE_CONFIG.introVideoUrl}
                title="Dragons Project — Introduction by Marlon M. Pilapil"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full bg-black"
              />
            </div>
          </div>

          {/* Caption strip */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
            <Play className="w-3 h-3 text-amber-500/60" />
            <span style={{ fontFamily: "'Raleway', sans-serif" }}>
              Presented by {SITE_CONFIG.hostName} · Independent Business Partner
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
