import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "@/app/hooks/useReveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Who is this webinar for?",
    a: "This webinar is for anyone curious about creating additional income, building a business, or making smarter financial decisions. No experience required — only an open mind and the desire to grow.",
  },
  {
    q: "Is it really 100% free?",
    a: "Yes, completely free. There are no hidden fees, upsells during the session, or pressure to purchase anything. Dragons Project believes the right knowledge should be accessible to everyone.",
  },
  {
    q: "Do I need prior business experience?",
    a: "Absolutely not. Many of our most successful partners started with zero business background. The webinar is specifically designed to meet you exactly where you are today.",
  },
  {
    q: "What platform will it be on?",
    a: "The session will be conducted via Zoom or Google Meet. Full details — including the join link — will be sent to your email upon registration. Check your inbox and spam folder after signing up.",
  },
  {
    q: "How do I reserve my slot?",
    a: 'Click any "Reserve My Spot" button on this page and complete the short registration form. You\'ll receive an instant confirmation with all event details.',
  },
  {
    q: "What if I can't attend the live session?",
    a: "We strongly encourage attending live for the interactive Q&A. However, message Marlon directly via the contact link for alternative arrangements — he personally responds to every inquiry.",
  },
];

/**
 * Single FAQ accordion row.
 * Extracted so the reveal hook is called at component top-level — not inside a map loop.
 * This fixes a violation of the React Rules of Hooks.
 */
function FaqRow({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 group hover:border-red-900/40 ${
        visible ? "reveal-up" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 0.06}s`,
        background: isOpen
          ? "linear-gradient(135deg, rgba(17,10,8,0.98), rgba(24,12,8,0.95))"
          : "rgba(14,10,10,0.8)",
        borderColor: isOpen
          ? "rgba(192,57,43,0.35)"
          : "rgba(192,57,43,0.12)",
        boxShadow: isOpen
          ? "0 0 30px rgba(192,57,43,0.08), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "none",
      }}
    >
      <div className="flex">
        {/* Left accent bar */}
        <div
          className="w-1 flex-shrink-0 transition-all duration-300 rounded-l-2xl"
          style={{
            background: isOpen
              ? "linear-gradient(180deg, #c0392b, #d4870a)"
              : "transparent",
          }}
        />

        <div className="flex-1">
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <span
              className="font-semibold text-foreground text-sm md:text-base leading-snug"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {faq.q}
            </span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              style={{
                background: isOpen
                  ? "linear-gradient(135deg,#c0392b,#d4870a)"
                  : "rgba(192,57,43,0.15)",
              }}
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
          </button>

          {isOpen && (
            <div className="px-6 pb-5">
              <div
                className="h-px mb-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(192,57,43,0.4), transparent)",
                }}
              />
              <p
                className="text-[14px] text-muted-foreground leading-relaxed"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {faq.a}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Accordion FAQ section. Each row is its own component to keep hooks at top-level. */
export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080808 0%, #090808 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(212,135,10,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          eyebrow="Questions Answered"
          title="Frequently Asked Questions"
          sub="Everything you need to know before reserving your seat."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqRow
              key={i}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
