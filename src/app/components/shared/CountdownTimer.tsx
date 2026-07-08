import { useCountdown } from "@/app/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string | null;
}

function Pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black text-white tabular-nums"
        style={{
          background: "linear-gradient(135deg, rgba(192,57,43,0.3), rgba(212,135,10,0.15))",
          border: "1px solid rgba(192,57,43,0.35)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        {Pad(value)}
      </div>
      <span
        className="mt-1.5 text-[9px] uppercase tracking-[0.3em] text-muted-foreground"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Countdown timer that counts down to a target ISO date.
 * Shows "To Be Announced" when targetDate is null.
 * Shows "Webinar is Live!" when the target time is reached.
 */
export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const timeLeft = useCountdown(targetDate);

  // No date set
  if (!targetDate) {
    return (
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest text-amber-400/70"
        style={{
          borderColor: "rgba(212,135,10,0.3)",
          background: "rgba(212,135,10,0.06)",
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
        Date to be announced
      </div>
    );
  }

  // Still calculating (first render)
  if (!timeLeft) return null;

  // Webinar is live
  if (timeLeft.isLive) {
    return (
      <div
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold uppercase tracking-widest text-white"
        style={{
          borderColor: "rgba(192,57,43,0.6)",
          background: "linear-gradient(135deg, rgba(192,57,43,0.3), rgba(212,135,10,0.2))",
          boxShadow: "0 0 20px rgba(192,57,43,0.4)",
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
        🔴 Webinar is Live Now!
      </div>
    );
  }

  // Past (more than 2h ago)
  if (timeLeft.isPast) {
    return (
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest text-muted-foreground"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        This session has ended — next date coming soon
      </div>
    );
  }

  // Counting down
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-[10px] uppercase tracking-[0.4em] text-amber-500/70"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        Starts in
      </p>
      <div className="flex items-start gap-3">
        <TimeBlock value={timeLeft.days} label="Days" />
        <span className="text-2xl font-black text-red-700/60 mt-3 leading-none">:</span>
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <span className="text-2xl font-black text-red-700/60 mt-3 leading-none">:</span>
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <span className="text-2xl font-black text-red-700/60 mt-3 leading-none">:</span>
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}
