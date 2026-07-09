import { Facebook, Instagram, Youtube, ArrowUp, Flame } from "lucide-react";
import { Divider } from "@/app/components/shared/Divider";
import { scrollTo } from "@/app/lib/utils";
import { SITE_CONFIG } from "@/app/lib/config";

const FOOTER_LINKS = ["Home", "Benefits", "Webinar", "FAQ"];

const SOCIAL_LINKS = [
  { Icon: Facebook, label: "Facebook", href: () => SITE_CONFIG.facebookUrl },
  { Icon: Instagram, label: "Instagram", href: () => SITE_CONFIG.instagramUrl },
  { Icon: Youtube, label: "YouTube", href: () => SITE_CONFIG.youtubeUrl },
] as const;

/** Page footer — brand, nav shortcuts, social links, copyright. */
export function Footer() {
  return (
    <footer className="bg-black border-t border-red-950/30 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <img
                src="/logo.png"
                alt="Dragons Project"
                className="h-9 w-auto object-contain"
              />
              <div>
                <div
                  className="text-white font-black tracking-[0.15em] text-sm uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Dragons Project
                </div>
                <div
                  className="text-amber-500/50 text-[9px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Official Webinar
                </div>
              </div>
            </div>
          </div>

          {/* Nav shortcuts */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-[11px] text-muted-foreground hover:text-amber-400 uppercase tracking-[0.2em] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href()}
                aria-label={label}
                target={href() !== "#" ? "_blank" : undefined}
                rel={href() !== "#" ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-red-950/30 text-muted-foreground hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <Divider className="mt-8 mb-6" />

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground/40"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          <p>© {new Date().getFullYear()} Dragons Project. All rights reserved.</p>

          {/* Back to Top */}
          <button
            onClick={() => scrollTo("home")}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-muted-foreground/40 hover:text-amber-400 transition-colors group"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[11px] uppercase tracking-[0.2em]">Back to Top</span>
          </button>

          <p className="flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-red-800" />
            Built with passion for your success
          </p>
        </div>
      </div>
    </footer>
  );
}
