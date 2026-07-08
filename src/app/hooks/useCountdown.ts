import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isPast: boolean;
}

/**
 * Returns the time remaining until a target ISO date string.
 * Updates every second.
 * - isLive: true when the target time has just been reached (within 2h window)
 * - isPast: true when the target time is more than 2h ago
 */
export function useCountdown(targetDate: string | null): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    function calc() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0 && diff > -2 * 60 * 60 * 1000) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true, isPast: false });
        return;
      }
      if (diff <= -2 * 60 * 60 * 1000) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false, isPast: false });
    }

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}
