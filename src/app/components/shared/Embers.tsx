import { useRef } from "react";

interface EmbersProps {
  count?: number;
}

/**
 * Animated floating ember / fire-particle effect.
 * Automatically disabled for users who prefer reduced motion.
 */
export function Embers({ count = 20 }: EmbersProps) {
  // Respect prefers-reduced-motion — don't render particles at all
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  return <EmbersInner count={count} />;
}

function EmbersInner({ count }: { count: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 35,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      dur: 4 + Math.random() * 5,
      dx: (Math.random() - 0.5) * 60,
      color: i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#ff6b00" : "#c0392b",
    }))
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            background: p.color,
            boxShadow: `0 0 6px 2px ${p.color}`,
            ["--dx" as string]: `${p.dx}px`,
            animation: `ember-rise ${p.dur}s ${p.delay}s ease-out infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
