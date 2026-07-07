import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/lexie.lonzkie";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  
  const links = ["Home", "About", "Speaker", "Register"];
  const scrollTo = (id: string) => { 
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); 
    setOpen(false); 
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? "rgba(5,3,10,0.92)" : "rgba(5,3,10,0.4)", backdropFilter: "blur(20px)", borderBottom: scrolled ? "1px solid rgba(212,160,23,0.15)" : "1px solid transparent" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-700 opacity-80 group-hover:opacity-100 transition-opacity" />
            <Flame className="relative w-8 h-8 text-yellow-300" />
          </div>
          <span className="font-['Cinzel'] font-bold text-base tracking-widest text-amber-300">DRAGONS</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="font-['Plus_Jakarta_Sans'] text-sm tracking-wider text-amber-100/70 hover:text-amber-300 transition-colors duration-300 uppercase">{l}</button>
          ))}
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #c94a1a, #e8621a)", color: "#fff", boxShadow: "0 0 20px rgba(201,74,26,0.4)" }}>
            Register Now
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-amber-300">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(5,3,10,0.97)", borderTop: "1px solid rgba(212,160,23,0.1)" }}>
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="font-['Plus_Jakarta_Sans'] text-sm tracking-wider text-amber-100/70 hover:text-amber-300 transition-colors text-left uppercase">{l}</button>
          ))}
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wider uppercase w-full"
            style={{ background: "linear-gradient(135deg, #c94a1a, #e8621a)", color: "#fff" }}>
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
