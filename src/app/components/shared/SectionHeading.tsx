import { useReveal } from "@/app/hooks/useReveal";
import { Divider } from "./Divider";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  sub?: string;
  /** Use lighter text colours when section background is dark. */
  light?: boolean;
}

/** Reusable animated section heading: eyebrow → title → divider → optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
}: SectionHeadingProps) {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="text-center mb-16">
      <p
        className={`text-[11px] uppercase tracking-[0.4em] mb-3 font-bold ${
          light ? "text-amber-400" : "text-amber-500"
        } ${visible ? "reveal-up" : "opacity-0"}`}
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-4xl md:text-5xl font-black leading-[1.1] mb-2 ${
          light ? "text-white" : "text-foreground"
        } ${visible ? "reveal-up d1" : "opacity-0"}`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {title}
      </h2>
      <div className={visible ? "reveal-up d2" : "opacity-0"}>
        <Divider />
      </div>
      {sub && (
        <p
          className={`mt-5 max-w-xl mx-auto leading-relaxed text-[15px] ${
            light ? "text-white/60" : "text-muted-foreground"
          } ${visible ? "reveal-up d3" : "opacity-0"}`}
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
