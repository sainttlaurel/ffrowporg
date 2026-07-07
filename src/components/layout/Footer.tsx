import { Flame, Facebook, Instagram, MessageCircle } from "lucide-react";
import { CopyHashtag } from "../ui/CopyHashtag";
import { FACEBOOK_URL } from "../../config/constants";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden"
      style={{ background: "#02010a", borderTop: "1px solid rgba(212,160,23,0.12)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame size={24} className="text-amber-400" />
              <span className="font-['Cinzel_Decorative'] font-bold tracking-widest text-sm" style={{ color: "#d4a017" }}>DRAGONS PROJECT</span>
            </div>
            <p className="font-['Cinzel'] italic text-sm mb-4" style={{ color: "rgba(240,230,211,0.5)" }}>One Team. One Vision. One Family.</p>
            <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed" style={{ color: "rgba(240,230,211,0.35)" }}>
              Empowering ordinary people to build extraordinary futures through community, education, and business.
            </p>
          </div>
          <div>
            <p className="font-['Cinzel'] font-bold text-xs tracking-widest uppercase mb-4" style={{ color: "#d4a017" }}>Follow the Movement</p>
            <div className="space-y-2">
              {["#DragonsProject", "#dragonsprojectbyronaldallanuy", "#WalangShortcutSaTagumpay", "#OneTeamOneVision"].map((tag) => (
                <CopyHashtag key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-['Cinzel'] font-bold text-xs tracking-widest uppercase mb-4" style={{ color: "#d4a017" }}>Connect With Us</p>
            <div className="flex gap-3 mb-6">
              {[
                { icon: <Facebook size={18} />, label: "Facebook", href: FACEBOOK_URL },
                { icon: <Instagram size={18} />, label: "Instagram", href: FACEBOOK_URL },
                { icon: <MessageCircle size={18} />, label: "Messenger", href: FACEBOOK_URL },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-amber-400/40"
                  style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.15)", color: "#d4a017" }} aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed" style={{ color: "rgba(240,230,211,0.4)" }}>
              Reach out via Messenger or WhatsApp<br />to speak with our team directly.
            </p>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(212,160,23,0.08)" }}>
          <p className="font-['Plus_Jakarta_Sans'] text-xs" style={{ color: "rgba(240,230,211,0.25)" }}>
            © {new Date().getFullYear()} Dragons Project by Marlon M. Pilapil. All rights reserved.
          </p>
          <p className="font-['Cinzel'] text-xs tracking-widest italic" style={{ color: "rgba(212,160,23,0.35)" }}>
            Walang Shortcut sa Tagumpay.
          </p>
        </div>
      </div>
    </footer>
  );
}
