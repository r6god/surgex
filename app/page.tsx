"use client";
import { useEffect, useMemo, useState } from "react";

const HEADLINE = "SurgeX is Coming Soon";
const LOGO_PATH = "/surgex-logo.png";
const FALLBACK_LOGO_SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgMTIwIj48cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjIxMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBVYnVudHUsIENhbnRhcmVsbCwgTm90byBTYW5zLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjMjJkM2VlIj5TdXJnZVg8L3RleHQ+PC9zdmc+";

function LogoImg({ width = 140, height = 48, className = "" }: { width?: number; height?: number; className?: string }) {
  const [src, setSrc] = useState<string>(LOGO_PATH);
  return (
    <img
      src={src}
      alt="SurgeX Logo"
      width={width}
      height={height}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => src !== FALLBACK_LOGO_SVG && setSrc(FALLBACK_LOGO_SVG)}
    />
  );
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (val: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);
  const isSubmitDisabled = useMemo(() => status === "submitting", [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    try {
      setStatus("submitting");
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setMessage("You're on the list! We'll ping you at launch.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    const header = document.querySelector('header');
    const links = Array.from(document.querySelectorAll('a.navlink')) as HTMLAnchorElement[];
    const smoothTo = (id: string) => {
      const el = document.querySelector(id);
      if (!el) return;
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - (header?.clientHeight || 0) - 8;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo(prefersReduced ? { top } : { top, behavior: 'smooth' });
    };
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      if (!a?.hash) return;
      e.preventDefault();
      smoothTo(a.hash);
    };
    links.forEach(a => a.addEventListener('click', onClick));

    const ids = ['#features','#how','#token','#compare','#roadmap','#faq'];
    const sections = ids.map(id => document.querySelector(id)).filter(Boolean) as HTMLElement[];
    const byId = (id: string) => links.find(a => a.getAttribute('href') === id);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + (entry.target as HTMLElement).id;
        const link = byId(id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('text-cyan-400','font-semibold'));
          link.classList.add('text-cyan-400','font-semibold');
        }
      });
    }, { rootMargin: '-60% 0px -35% 0px', threshold: 0.01 });
    sections.forEach(s => io.observe(s));

    return () => {
      links.forEach(a => a.removeEventListener('click', onClick));
      io.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,187,0.08),transparent_60%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <header className="h-[72px] flex items-center justify-between px-6 md:px-10 border-b border-white/5 sticky top-0 z-20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <LogoImg width={140} height={48} />
        </div>
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-white/80">
          <a className="navlink hover:text-cyan-400" href="#features">Features</a>
          <a className="navlink hover:text-cyan-400" href="#how">How it works</a>
          <a className="navlink hover:text-cyan-400" href="#token">SURGEX Token</a>
          <a className="navlink hover:text-cyan-400" href="#compare">Why SurgeX vs Axiom</a>
          <a className="navlink hover:text-cyan-400" href="#roadmap">Roadmap</a>
          <a className="navlink hover:text-cyan-400" href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">{/* no View Demo */}</div>
      </header>

      <section id="hero" className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-3xl animate-drift" />
            <div className="absolute -bottom-20 -right-16 h-[420px] w-[420px] rounded-full bg-emerald-400/20 blur-3xl animate-drift-slow" />
          </div>
          <div className="flex justify-center mb-8">
            <LogoImg width={220} height={74} />
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-cyan-400">{HEADLINE}</h1>
          <p className="mt-6 text-center text-white/70 text-lg max-w-3xl mx-auto">
            AI-driven memecoin trading on Solana. Discover early opportunities, catch surges
            ahead of the crowd, and trade with confidence using on-chain analytics & sentiment.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input type="email" placeholder="Enter your email" aria-label="Email address"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg w-full outline-none focus:border-cyan-400/60" required />
            <button type="submit" disabled={isSubmitDisabled}
              className="px-6 py-3 rounded-lg bg-emerald-400 text-black font-bold hover:brightness-110 disabled:opacity-60">
              {status === "submitting" ? "Submitting…" : "Notify Me"}
            </button>
          </form>
          {message && (<p role="status" className={`mt-3 text-center text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>{message}</p>)}
          <div className="mt-6 flex items-center justify-center gap-4 text-white/60 text-sm">
            <div>🔐 Non-custodial</div><div>⚡ Real-time alerts</div><div>✨ AI scoring</div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 md:px-10 py-14 reveal">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why SurgeX</h2>
        <p className="text-white/70 max-w-3xl mb-8">Purpose-built for memecoins on Solana: speed, signals, and social context. AI filters noise and surfaces what actually moves.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "AI Discovery", desc: "Scan chains, socials, and deploys to flag promising new tokens early." },
            { title: "Momentum Signals", desc: "Price/volume acceleration, whale activity, and liquidity changes." },
            { title: "Instant Alerts", desc: "Push/email/in-app alerts configurable to your risk profile." },
            { title: "Risk Screens", desc: "Contract metadata, renounce/lock signals, and rug risk heuristics." },
            { title: "Community Pulse", desc: "Virality indicators from X/Telegram/Reddit sentiment." },
            { title: "One‑Click Trade", desc: "Route to your preferred DEX with sane slippage and gas tips." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
              <div className="text-white font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 md:px-10 py-14 border-t border-white/5 reveal">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Ingest", desc: "Track deploys, pools, prices, and social signals." },
            { step: "2", title: "Score", desc: "AI models score momentum, risk, virality, and novelty." },
            { step: "3", title: "Alert", desc: "Configurable alerts as conditions trigger." },
            { step: "4", title: "Trade", desc: "Route to DEX with presets. Track PnL and badges." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
              <div className="text-cyan-400 text-sm">Step {s.step}</div>
              <div className="mt-1 text-white font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="token" className="mx-auto max-w-6xl px-6 md:px-10 py-14 reveal">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">SURGEX Token (Solana)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
            <div className="font-semibold">Utility</div>
            <ul className="mt-3 list-disc list-inside text-white/70 text-sm space-y-2">
              <li>Priority access to AI signals & alerts</li>
              <li>Reduced routing fees and premium features</li>
              <li>Community governance & seasonal quests</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
            <div className="font-semibold">Tokenomics</div>
            <ul className="mt-3 list-disc list-inside text-white/70 text-sm space-y-2">
              <li>Chain: Solana • SPL</li>
              <li>Supply & schedule: TBA</li>
              <li>Liquidity & emissions: transparent reports</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-6xl px-6 md:px-10 py-14 border-t border-white/5 reveal">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Why SurgeX vs Axiom</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Solana‑first speed", desc: "Purpose‑built for SOL memecoins and real‑time feeds." },
            { title: "Explainable AI", desc: "Feature attributions per signal so you know why." },
            { title: "Flexible trade routes", desc: "Route to your preferred DEX, not locked in." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
              <div className="text-white font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-6xl px-6 md:px-10 py-14 reveal">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Roadmap</h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
          {[
            { q: "Q4 2025", t: "Private Alpha", d: "Closed test with power users, core signals + alerts." },
            { q: "Q1 2026", t: "Public Beta", d: "Open waitlist access, trading routes, leaderboards." },
            { q: "Q2 2026", t: "AI v2", d: "Refined models, scams filter, improved social scoring." },
            { q: "Q3 2026", t: "Mobile + Partners", d: "iOS/Android, CEX/DEX integrations, growth." },
          ].map((m) => (
            <div key={m.q} className="relative mb-8">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan-400" />
              <div className="ml-4">
                <div className="text-sm text-cyan-400">{m.q}</div>
                <div className="text-white font-semibold">{m.t}</div>
                <p className="text-white/70 text-sm mt-1">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-6 md:px-10 py-14 border-t border-white/5 reveal">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
        <div className="space-y-3">
          {[
            { q: "What is SurgeX?", a: "An AI-powered discovery and trading companion for memecoins on Solana." },
            { q: "When is launch?", a: "Targeting Public Beta in Q1 2026. Join the waitlist for early access." },
            { q: "How does AI help?", a: "Models score momentum, risk, and virality from on-chain + social signals." },
            { q: "Is SurgeX custodial?", a: "No. You keep custody and connect your own wallet. Not financial advice." },
          ].map((f) => (
            <details key={f.q} className="faq-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
              <summary className="list-none cursor-pointer flex items-center justify-between text-white/90 font-medium">
                {f.q}
                <span className="ml-4 text-white/50 group-hover:text-cyan-300 group-open:rotate-90 transition-transform">›</span>
              </summary>
              <p className="mt-3 text-white/70 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-10 py-10 border-t border-white/5 text-white/60">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoImg width={120} height={40} />
            <span className="text-sm">© {new Date().getFullYear()} SurgeX • Meme responsibly. Not financial advice.</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a className="navlink hover:text-cyan-400" href="#features">Features</a>
            <a className="navlink hover:text-cyan-400" href="#how">How it works</a>
            <a className="navlink hover:text-cyan-400" href="#token">Token</a>
            <a className="navlink hover:text-cyan-400" href="#compare">Why SurgeX</a>
            <a className="navlink hover:text-cyan-400" href="#faq">FAQ</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
