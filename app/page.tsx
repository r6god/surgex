
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Bell, Brain, ChartLine, Clock, Coins, Github, Mail, ShieldCheck, Sparkles, Twitter, Users, Check } from "lucide-react";

const HEADLINE = "SurgeX is Coming Soon";
const LOGO_PATH = "/surgex-logo.png";
const FALLBACK_LOGO_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 120'>
    <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#22d3ee'/><stop offset='100%' stop-color='#34d399'/></linearGradient></defs>
    <text x='50%' y='55%' text-anchor='middle' dominant-baseline='middle'
      font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'
      font-size='52' font-weight='900' fill='url(#g)'>SurgeX</text>
  </svg>`);

function LogoImg({ width=120, height=40, className="" }:{width?:number;height?:number;className?:string}){
  const [src, setSrc] = useState<string>(LOGO_PATH);
  return <img src={src} alt="SurgeX Logo" width={width} height={height} className={className} loading="lazy" decoding="async" onError={()=> src!==FALLBACK_LOGO_SVG && setSrc(FALLBACK_LOGO_SVG)} style={{ filter: "drop-shadow(0 8px 26px rgba(34,211,238,0.25))" }} />;
}

const fadeUp = (i=0)=>({ initial:{opacity:0,y:18}, whileInView:{opacity:1,y:0}, transition:{duration:0.6, delay:i*0.06, ease:[0.22,1,0.36,1]}, viewport:{once:true, amount:0.2} });

function GradientCard({children, className=""}:{children:any; className?:string}){
  return (
    <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-cyan-500/20 to-emerald-400/20 ${className}`}>
      <div className="h-full rounded-2xl bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border border-white/10 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function Page(){
  const [email,setEmail]=useState(""); const [status,setStatus]=useState<"idle"|"submitting"|"success"|"error">("idle"); const [message,setMessage]=useState("");
  const validateEmail=(v:string)=>/[^\\s@]+@[^\\s@]+\\.[^\\s@]+/.test(v); const isSubmitDisabled=useMemo(()=>status==="submitting",[status]);

  async function onSubmit(e:any){
    e.preventDefault(); setMessage("");
    if(!validateEmail(email)){ setStatus("error"); setMessage("Please enter a valid email address."); return; }
    setStatus("submitting"); await new Promise(r=>setTimeout(r,600));
    setStatus("success"); setMessage("You're on the list! We'll ping you at launch."); setEmail("");
  }

  useEffect(()=>{
    if(process.env.NODE_ENV==="production") return;
    const tests=[
      {v:"user@example.com",e:true},{v:"bad@",e:false},{v:"",e:false},
      {v:"test@domain.co",e:true},{v:"space @bad.com",e:false},{v:"no-tld@domain",e:false},
    ];
    for(const t of tests) console.assert(validateEmail(t.v)===t.e, "validateEmail failed for", t.v);
  },[]);

  return (
    <div className="min-h-screen bg-[#07090B] text-white selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* Header (smaller) */}
      <header className="flex items-center justify-between px-4 md:px-8 py-2 md:py-3 h-14 md:h-16 border-b border-white/10 sticky top-0 z-20 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-3"><LogoImg /></div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a className="hover:text-cyan-400" href="#features">Features</a>
          <a className="hover:text-cyan-400" href="#how-it-works">How it works</a>
          <a className="hover:text-cyan-400" href="#token">Token</a>
          <a className="hover:text-cyan-400" href="#compare">Compare</a>
          <a className="hover:text-cyan-400" href="#roadmap">Roadmap</a>
          <a className="hover:text-cyan-400" href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-2"><Button className="h-9 px-3 rounded-lg text-sm">Join Waitlist</Button></div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-24 md:pb-32">
          <motion.div {...fadeUp()}>
            <div className="flex justify-center mb-8"><img src={LOGO_PATH} width={256} height={86} alt="SurgeX Logo"/></div>
            <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">{HEADLINE}</span>
            </h1>
            <p className="mt-6 text-center text-gray-300 text-lg max-w-3xl mx-auto">
              The AI-driven memecoin trading hub. Discover early opportunities, catch surges ahead of the crowd,
              and trade with confidence using on-chain analytics and sentiment models.
            </p>
            <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input type="email" placeholder="Enter your email" aria-label="Email address" value={email} onChange={(e:any)=>setEmail(e.target.value)} className="px-4 py-6 text-base rounded-xl" required />
              <Button type="submit" disabled={isSubmitDisabled} className="px-6 py-6 text-base rounded-xl">{status==="submitting"?"Submitting…":"Notify Me"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </form>
            {message && (<p role="status" className={`mt-3 text-center text-sm ${status==="success"?"text-green-400":"text-red-400"}`}>{message}</p>)}
          </motion.div>
        </div>
      </section>

      {/* Rest of sections */}
      <section id="features" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold text-white mb-6">Why SurgeX</motion.h2>
        <motion.p {...fadeUp(1)} className="text-gray-400 max-w-3xl mb-10">
          Purpose-built for memecoins: speed, signals, and social context. Our AI helps filter noise and surface what actually moves.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "AI Discovery", desc: "Scan chains, socials, and deploys to flag promising new tokens early." },
            { icon: ChartLine, title: "Momentum Signals", desc: "Price/volume accelerations, whale activity, and liquidity changes." },
            { icon: Bell, title: "Instant Alerts", desc: "Push, email, and in-app alerts configurable to your risk profile." },
            { icon: ShieldCheck, title: "Risk Screens", desc: "Basic safety checks, contract metadata, and renounce/lock signals." },
            { icon: Users, title: "Community Pulse", desc: "Sentiment + virality indicators from X/Telegram/Reddit." },
            { icon: Coins, title: "One‑Click Trade", desc: "Route to your preferred DEX with slippage presets and gas tips." },
          ].map(({icon:Icon,title,desc},i)=>(
            <motion.div key={title} {...fadeUp(i)}>
              <GradientCard><CardContent className="p-6">{/* @ts-ignore */}<Icon className="h-6 w-6 text-cyan-400"/><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mt-2 text-sm text-gray-400">{desc}</p></CardContent></GradientCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold mb-8">How It Works</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Ingest", desc: "Track deploys, pools, prices, and social signals across chains." },
            { step: "2", title: "Score", desc: "AI models score momentum, risk, virality, and novelty." },
            { step: "3", title: "Alert", desc: "You get configurable alerts as conditions trigger." },
            { step: "4", title: "Trade", desc: "Route to DEX with presets. Track PnL and badges." },
          ].map((s,i)=>(
            <motion.div key={s.step} {...fadeUp(i)}>
              <GradientCard><div className="p-6"><div className="text-cyan-400 text-sm">Step {s.step}</div><div className="mt-1 text-white font-semibold">{s.title}</div><p className="mt-2 text-sm text-gray-400">{s.desc}</p></div></GradientCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="token" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold mb-6">SURGEX Token</motion.h2>
        <motion.p {...fadeUp(1)} className="text-gray-400 max-w-3xl mb-10">
          SURGEX (<span className="text-white/90 font-semibold">$SRGX</span>) is the utility token powering access to premium AI signals,
          staking tiers, trading fee discounts, and governance on SurgeX. Contract: <span className="text-gray-300">TBA (after audit)</span>.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div {...fadeUp(2)}>
            <GradientCard><CardContent className="p-6">
              <div className="text-sm text-cyan-400">Total Supply</div>
              <div className="mt-1 text-2xl font-bold text-white">1,000,000,000</div>
              <p className="text-xs text-gray-400 mt-2">Fixed supply • 9 decimals</p>
            </CardContent></GradientCard>
          </motion.div>
          <motion.div {...fadeUp(3)}>
            <GradientCard><CardContent className="p-6">
              <div className="text-sm text-cyan-400">Ticker / Chain</div>
              <div className="mt-1 text-2xl font-bold text-white">SRGX / Solana (SPL)</div>
              <p className="text-xs text-gray-400 mt-2">Solana SPL token — low fees & speed. Contract address will be published after audit.</p>
            </CardContent></GradientCard>
          </motion.div>
          <motion.div {...fadeUp(4)}>
            <GradientCard><CardContent className="p-6">
              <div className="text-sm text-cyan-400">Launch</div>
              <div className="mt-1 text-2xl font-bold text-white">TBD</div>
              <p className="text-xs text-gray-400 mt-2">Fair, transparent, and bot-mitigated. Details in the litepaper.</p>
            </CardContent></GradientCard>
          </motion.div>
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold mb-6">Why SurgeX vs Axiom</motion.h2>
        <motion.p {...fadeUp(1)} className="text-gray-400 max-w-3xl mb-10">
          Axiom is a solid general screener. SurgeX is <span className="text-white/90 font-semibold">purpose‑built for Solana memecoins</span> with AI‑assisted discovery and trader‑first tools.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GradientCard><CardContent className="p-6">
            <h3 className="font-semibold text-white">Where SurgeX goes further</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              {[ "Solana‑first coverage and memecoin‑focused UX", "AI momentum, risk, and virality scores (explainable)", "New‑deploy detection + social pulse in one feed", "Configurable smart alerts (thresholds, wallet watch, pools)", "Gamified leaderboards, badges, and PnL tracking", "Transparent utility via $SRGX for tiers & fee discounts" ].map((t,i)=>(
                <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-emerald-400"/><span>{t}</span></li>
              ))}
            </ul>
          </CardContent></GradientCard>
          <GradientCard><CardContent className="p-6">
            <h3 className="font-semibold text-white">What Axiom excels at</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              {[ "Broad multi‑chain screener features", "Mature interface with portfolio views", "Good general discovery for many token types" ].map((t,i)=>(
                <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-400"/><span>{t}</span></li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-500">Note: Comparison is directional and focuses on SurgeX’s planned differentiators.</p>
          </CardContent></GradientCard>
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold mb-6">Roadmap</motion.h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
          {[
            { q: "Q4 2025", t: "Private Alpha", d: "Closed test with power users, core signals + alerts." },
            { q: "Q1 2026", t: "Public Beta", d: "Open waitlist access, trading routes, leaderboards." },
            { q: "Q2 2026", t: "AI v2", d: "Refined models, scams filter, improved social scoring." },
            { q: "Q3 2026", t: "Mobile + Partners", d: "iOS/Android, CEX/DEX integrations, growth.", last: true },
          ].map((m,i)=>(
            <motion.div key={m.q} {...fadeUp(i)} className="relative mb-8">
              <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan-400" />
              <div className="ml-4">
                <div className="text-sm text-cyan-400">{m.q}</div>
                <div className="text-white font-semibold">{m.t}</div>
                <p className="text-gray-400 text-sm mt-1">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Be first when SurgeX launches</h3>
            <p className="text-gray-400 text-sm mt-1">Join the waitlist for early access and exclusive updates.</p>
          </div>
          <Button className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold">Join the Waitlist</Button>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <motion.h2 {...fadeUp()} className="text-2xl md:text-3xl font-bold mb-6">FAQ</motion.h2>
        <div className="space-y-4">
          {[
            { q: "What is SurgeX?", a: "An AI-powered discovery and trading companion for memecoins. It helps you find early projects, catch momentum, and manage risk." },
            { q: "When is launch?", a: "We’re targeting Public Beta in Q1 2026. Join the waitlist to get early access." },
            { q: "How does AI help?", a: "Models score momentum, risk, and virality from on-chain + social signals, and trigger configurable alerts." },
            { q: "Is SurgeX custodial?", a: "No. You keep custody of your assets and connect your own wallet to route trades." },
          ].map((f,i)=>(
            <motion.details key={f.q} {...fadeUp(i)} className="group rounded-2xl border border-white/10 bg-gray-900/50 p-5">
              <summary className="list-none cursor-pointer flex items-center justify-between text-white font-medium">
                {f.q}
                <span className="ml-4 text-gray-400 group-open:rotate-90 transition-transform">›</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-10 py-14 border-t border-white/10 text-gray-400">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-3"><LogoImg /></div>
          <nav className="grid grid-cols-2 gap-4 text-sm">
            <a className="hover:text-cyan-400" href="#features">Features</a>
            <a className="hover:text-cyan-400" href="#how-it-works">How it works</a>
            <a className="hover:text-cyan-400" href="#token">Token</a>
            <a className="hover:text-cyan-400" href="#compare">Compare</a>
            <a className="hover:text-cyan-400" href="#roadmap">Roadmap</a>
            <a className="hover:text-cyan-400" href="#faq">FAQ</a>
          </nav>
          <div className="flex justify-start md:justify-end items-center gap-4 text-sm">
            <a className="hover:text-cyan-400" href="#"><Twitter className="h-5 w-5"/></a>
            <a className="hover:text-cyan-400" href="#"><Mail className="h-5 w-5"/></a>
            <a className="hover:text-cyan-400" href="#"><Github className="h-5 w-5"/></a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-8 text-xs text-gray-500">© {new Date().getFullYear()} SurgeX — Meme responsibly. Not financial advice.</div>
      </footer>
    </div>
  );
}
