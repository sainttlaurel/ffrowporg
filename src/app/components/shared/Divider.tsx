interface DividerProps {
  className?: string;
}

/** Decorative diamond ornament divider used between section titles and content. */
export function Divider({ className = "" }: DividerProps) {
  return (
    <div className={`flex items-center gap-3 my-3 ${className}`}>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(192,57,43,0.5))",
        }}
      />
      <div className="flex gap-1 items-center">
        <div className="w-1.5 h-1.5 rotate-45 bg-red-700" />
        <div className="w-2.5 h-2.5 rotate-45 bg-amber-500" />
        <div className="w-1.5 h-1.5 rotate-45 bg-red-700" />
      </div>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(90deg, rgba(192,57,43,0.5), transparent)",
        }}
      />
    </div>
  );
}
