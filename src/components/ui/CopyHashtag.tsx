import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

export function CopyHashtag({ tag }: { tag: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback: ignore */ }
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-sm transition-colors hover:text-amber-400 cursor-pointer group"
      style={{ color: copied ? "#d4a017" : "rgba(240,230,211,0.5)" }}
    >
      {tag}
      {copied
        ? <CheckCheck size={12} className="text-green-400" />
        : <Copy size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
      }
    </button>
  );
}
