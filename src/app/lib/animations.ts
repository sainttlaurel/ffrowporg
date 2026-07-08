/**
 * Global CSS keyframe animations injected via <style> in the root App component.
 * Kept in one place so all sections can reference animation class names consistently.
 */
export const GLOBAL_CSS = `
  @keyframes ember-rise {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
    10%  { opacity: 1; }
    80%  { opacity: 0.4; }
    100% { transform: translateY(-160px) translateX(var(--dx)) scale(0.4); opacity: 0; }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-ring {
    0%, 100% { box-shadow: 0 0 0 0 rgba(192,57,43,0.5), 0 0 30px 6px rgba(192,57,43,0.25); }
    50%       { box-shadow: 0 0 0 12px rgba(192,57,43,0), 0 0 50px 12px rgba(212,135,10,0.3); }
  }
  @keyframes float-y {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes reveal-left {
    from { opacity: 0; transform: translateX(-36px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes reveal-right {
    from { opacity: 0; transform: translateX(36px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes hero-fade {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .reveal-up    { animation: reveal-up   0.75s cubic-bezier(.22,1,.36,1) both; }
  .reveal-left  { animation: reveal-left 0.75s cubic-bezier(.22,1,.36,1) both; }
  .reveal-right { animation: reveal-right 0.75s cubic-bezier(.22,1,.36,1) both; }
  .scale-in     { animation: scale-in   0.7s cubic-bezier(.22,1,.36,1) both; }
  .hero-fade    { animation: hero-fade  1s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay: 0.1s; }
  .d2 { animation-delay: 0.22s; }
  .d3 { animation-delay: 0.34s; }
  .d4 { animation-delay: 0.46s; }
  .d5 { animation-delay: 0.58s; }
  .d6 { animation-delay: 0.70s; }

  .shimmer-text {
    background: linear-gradient(90deg, #f5f0e8 0%, #ffd700 28%, #e8830a 50%, #ffd700 72%, #f5f0e8 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer-bg 4s linear infinite;
  }
  .btn-shimmer {
    background: linear-gradient(135deg, #9b1e15 0%, #c0392b 30%, #d4870a 60%, #c0392b 80%, #9b1e15 100%);
    background-size: 200% auto;
    animation: shimmer-bg 3s linear infinite;
  }
  .pulse-ring { animation: pulse-ring 2.8s ease-in-out infinite; }
  .float-y    { animation: float-y 4s ease-in-out infinite; }
  .marquee-track { animation: marquee 28s linear infinite; }

  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #080808; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#c0392b, #d4870a); border-radius: 4px; }

  /* Respect user's motion preference — stop decorative animations */
  @media (prefers-reduced-motion: reduce) {
    .reveal-up, .reveal-left, .reveal-right, .scale-in, .hero-fade {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .shimmer-text { animation: none !important; }
    .btn-shimmer  { animation: none !important; }
    .pulse-ring   { animation: none !important; box-shadow: none !important; }
    .float-y      { animation: none !important; }
    .marquee-track { animation: none !important; }
  }
`;
