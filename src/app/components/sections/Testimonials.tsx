import { Star, Quote } from "lucide-react";

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

/** Infinite auto-scrolling marquee of testimonial cards. */
export function Testimonials() {
  // Double the array so the marquee loop is seamless
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

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

      <div
        className="flex marquee-track w-max"
        aria-label="Testimonials carousel"
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </section>
  );
}
