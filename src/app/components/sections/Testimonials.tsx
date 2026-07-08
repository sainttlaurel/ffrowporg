import { Star, Quote } from "lucide-react";
import { useRef, useState, useCallback } from "react";

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ana R.",
    role: "Partner, Cebu",
    quote:
      "I never thought I'd be earning from home — Dragons Project changed my entire perspective on business.",
  },
  {
    name: "Mark L.",
    role: "Partner, Manila",
    quote:
      "Marlon's webinar was the push I needed. Within 3 months, I replaced my day-job income.",
  },
  {
    name: "Jenny C.",
    role: "Partner, Davao",
    quote:
      "The community alone is worth it. These people genuinely want you to succeed.",
  },
  {
    name: "Renz M.",
    role: "Partner, Iloilo",
    quote:
      "I was skeptical at first. Now I'm living proof that the system works.",
  },
  {
    name: "Claire T.",
    role: "Partner, QC",
    quote:
      "Best decision I made was attending that free webinar. It opened doors I didn't know existed.",
  },
  {
    name: "Dennis G.",
    role: "Partner, Batangas",
    quote:
      "Dragons Project gave me financial education no school ever taught me.",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative flex-shrink-0 w-72 rounded-2xl p-6 border mx-3"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,10,10,0.95), rgba(30,15,10,0.9))",
        borderColor: "rgba(192,57,43,0.25)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <Quote className="w-5 h-5 text-red-700/60 mb-3 float-y" />
      <p
        className="text-[13px] text-white/70 leading-relaxed mb-4 italic"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #c0392b, #d4870a)",
            fontFamily: "'Oswald', sans-serif",
          }}
        >
          {t.name[0]}
        </div>
        <div>
          <p
            className="text-xs font-bold text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {t.name}
          </p>
          <p
            className="text-[11px] text-amber-500/70"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {t.role}
          </p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Infinite auto-scrolling marquee with touch/mouse drag support. */
export function Testimonials() {
  // Triple the array so wrapping stays seamless even after large drags
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  // Pause auto-scroll on hover (desktop)
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    if (!isDragging) setIsPaused(false);
  }, [isDragging]);

  // Pointer down — start drag
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setIsPaused(true);
    dragStart.current = { x: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
    track.style.cursor = "grabbing";
  }, []);

  // Pointer move — scroll the container
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !dragStart.current) return;
      const track = trackRef.current;
      if (!track) return;
      const dx = e.clientX - dragStart.current.x;
      track.scrollLeft = dragStart.current.scrollLeft - dx;
    },
    [isDragging]
  );

  // Pointer up — end drag
  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      setIsPaused(false);
      dragStart.current = null;
      const track = trackRef.current;
      if (track) {
        track.releasePointerCapture(e.pointerId);
        track.style.cursor = "grab";
      }
    },
    [isDragging]
  );

  return (
    <section
      className="py-20 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(180deg, #080808 0%, #0c0808 50%, #080808 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080808, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080808, transparent)" }}
      />

      <p
        className="text-center text-[11px] uppercase tracking-[0.4em] text-amber-500/70 mb-8 px-6"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        Voices from our growing community
      </p>

      {/*
        Outer div: clips overflow, handles pointer events.
        Inner div: the scrollable track — CSS marquee runs on it,
        paused while dragging via animation-play-state.
      */}
      <div
        className="overflow-hidden select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-y" }}
        aria-label="Testimonials carousel — drag or swipe to browse"
      >
        <div
          ref={trackRef}
          className={`flex w-max ${isPaused ? "" : "marquee-track"}`}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
