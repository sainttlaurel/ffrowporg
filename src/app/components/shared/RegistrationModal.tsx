import { useState } from "react";
import { X, Zap, Shield, CheckCircle, ExternalLink, AlertCircle, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/app/lib/config";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

function validate(data: FormData): Partial<FormData> {
  const errors: Partial<FormData> = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[0-9+\-\s()]{7,20}$/.test(data.phone))
    errors.phone = "Please enter a valid phone number.";
  return errors;
}

async function submitToFormspree(data: FormData): Promise<void> {
  const endpoint = SITE_CONFIG.formspreeEndpoint;

  if (!endpoint) {
    const subject = encodeURIComponent("Dragons Project Webinar — Registration");
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      _subject: "Dragons Project Webinar — New Registration",
    }),
  });

  if (!res.ok) throw new Error("Submission failed");
}

/** Registration modal.
 *  - If googleFormUrl is set in config: shows a simple CTA that opens the Google Form in a new tab.
 *  - Otherwise: shows the built-in name/email/phone form submitted via Formspree.
 */
export function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [state, setState] = useState<SubmitState>("idle");

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setState("submitting");
    try {
      await submitToFormspree(form);
      setState("success");
    } catch {
      setState("error");
    }
  }

  function handleReset() {
    setForm({ name: "", email: "", phone: "" });
    setErrors({});
    setState("idle");
    onClose();
  }

  /* ── Shared panel wrapper ── */
  const Panel = ({ children }: { children: React.ReactNode }) => (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Webinar Registration"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden border z-10"
        style={{
          background: "linear-gradient(135deg, #110a0a 0%, #1a0d0d 60%, #110a0a 100%)",
          borderColor: "rgba(192,57,43,0.4)",
          boxShadow:
            "0 0 80px rgba(192,57,43,0.2), 0 0 160px rgba(212,135,10,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #c0392b, #d4870a, #ffd700, #d4870a, #c0392b)",
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-white transition-colors z-20"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );

  /* ── Google Form mode ── */
  if (SITE_CONFIG.googleFormUrl) {
    return (
      <Panel>
        <div className="px-8 py-12 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 float-y"
            style={{
              background: "linear-gradient(135deg, #c0392b, #d4870a)",
              boxShadow: "0 0 40px rgba(192,57,43,0.4)",
            }}
          >
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p
            className="text-[11px] uppercase tracking-[0.4em] text-amber-500 mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Free Webinar
          </p>
          <h3
            className="text-2xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Reserve Your Seat
          </h3>
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs mx-auto"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Click the button below to complete your registration. It only takes a few seconds.
          </p>
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white btn-shimmer transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <Zap className="w-4 h-4" /> Register Now — Free
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <div
            className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/40"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <Shield className="w-3 h-3 text-green-500/50" />
            Opens Google Forms — no spam, completely free.
          </div>
        </div>
      </Panel>
    );
  }

  /* ── Built-in form mode (Formspree / mailto fallback) ── */
  return (
    <Panel>
      {state === "success" ? (
        <div className="px-8 py-12 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #c0392b, #d4870a)" }}
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-2xl font-black text-white mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            You're Registered!
          </h3>
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-8"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Welcome to the Dragons Project Webinar. Check your email for
            confirmation and full event details. We'll see you there!
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-white btn-shimmer transition-transform hover:scale-105"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Done
          </button>
        </div>
      ) : (
        <div className="px-8 py-8">
          <div className="text-center mb-7">
            <p
              className="text-[11px] uppercase tracking-[0.4em] text-amber-500 mb-1"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Free Webinar
            </p>
            <h3
              className="text-2xl font-black text-white leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Reserve Your Seat
            </h3>
            <p
              className="mt-2 text-[13px] text-muted-foreground"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Fill in your details below — takes 20 seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="reg-name"
                className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Full Name
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Maria Santos"
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${errors.name ? "rgba(239,68,68,0.5)" : "rgba(200,80,30,0.18)"}`,
                  fontFamily: "'Raleway', sans-serif",
                }}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Email Address
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. maria@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${errors.email ? "rgba(239,68,68,0.5)" : "rgba(200,80,30,0.18)"}`,
                  fontFamily: "'Raleway', sans-serif",
                }}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-phone"
                className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Phone Number
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 0917 123 4567"
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${errors.phone ? "rgba(239,68,68,0.5)" : "rgba(200,80,30,0.18)"}`,
                  fontFamily: "'Raleway', sans-serif",
                }}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {state === "error" && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-900/40 bg-red-950/20">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-300" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Something went wrong. Please try again or send a direct message for assistance.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full mt-2 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white btn-shimmer transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                {state === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Reserving…
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Reserve My Spot — Free
                  </>
                )}
              </span>
            </button>
          </form>

          <div
            className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/40"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <Shield className="w-3 h-3 text-green-500/50" />
            No spam. Your info is safe with us.
          </div>
        </div>
      )}
    </Panel>
  );
}
