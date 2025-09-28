
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Bell, Brain, ChartLine, Clock, Coins, Github, Mail, ShieldCheck, Sparkles, Twitter, Users, Check } from "lucide-react";

const HEADLINE = "SurgeX is Coming Soon";
const LOGO_PATH = "/surgex-logo.png";
const FALLBACK_LOGO_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#22d3ee'/><stop offset='100%' stop-color='#34d399'/></linearGradient></defs><text x='50%' y='55%' text-anchor='middle' dominant-baseline='middle' font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif' font-size='52' font-weight='900' fill='url(#g)'>SurgeX</text></svg>`);

const DEMO_EMBED_URL = ""; // set to a YouTube/Loom embed URL to show the iframe

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
  const validateEmail=(v:string)=>/[^\s@]+@[^\s@]+\.[^\s@]+/.test(v); const isSubmitDisabled=useMemo(()=>status==="submitting",[status]);

  async function onSubmit(e:any){
    e.preventDefault(); setMessage("");
    if(!validateEmail(email)){ setStatus("error"); setMessage("Please enter a valid email address."); return; }
    setStatus("submitting"); await new Promise(r=>setTimeout(r,600));
    setStatus("success"); setMessage("You're on the list! We'll ping you at launch."); setEmail("");
  }

  useEffect(()=>{
    if(process.env.NODE_ENV==="production") return;
    const tests=[{v:"user@example.com",e:true},{v:"bad@",e:false},{v:"",e:false},{v:"test@domain.co",e:true},{v:"space @bad.com",e:false},{v:"no-tld@domain",e:false}];
    for(const t of tests) console.assert(validateEmail(t.v)===t.e, "validateEmail failed for", t.v);
  },[]);

  return (
    <div className="min-h-screen bg-[#07090B] text-white selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* Header with Demo button */}
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
        <div className="flex items-center gap-2">
          <a href="#demo" className="inline-flex items-center justify-center h-9 px-3 rounded-lg text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold shadow hover:from-cyan-300 hover:to-emerald-300">View Demo</a>
        </div>
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
            <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <Input type="email" placeholder="Enter your email" aria-label="Email address" value={email} onChange={(e:any)=>setEmail(e.target.value)} className="px-3 py-3 text-sm rounded-lg h-10" required />
              <Button type="submit" disabled={isSubmitDisabled} className="px-4 py-3 text-sm rounded-lg h-10">{status==="submitting"?"Submitting…":"Notify Me"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </form>
            {message && (<p role="status" className={`mt-3 text-center text-sm ${status==="success"?"text-green-400":"text-red-400"}`}>{message}</p>)}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Product Demo</h2>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-2xl blur-2xl opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.25),transparent_60%)]" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            {DEMO_EMBED_URL ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={DEMO_EMBED_URL}
                  title="SurgeX Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-xl border-0"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 text-gray-300 text-sm text-center">
                <p className="mb-2">Demo video coming soon.</p>
                <p>Set <code>DEMO_EMBED_URL</code> in <code>app/page.tsx</code> to a YouTube/Loom embed URL.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The rest (Features, How it works, Token, Compare, Roadmap, CTA, FAQ, Footer) can be added here as in the previous builds. For brevity, only the core demo-related change is shown. */}
      <section id="features" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why SurgeX</h2>
        <p className="text-gray-400 max-w-3xl mb-10">Purpose-built for memecoins: speed, signals, and social context. Our AI helps filter noise and surface what actually moves.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ icon: Brain, title: "AI Discovery", desc: "Scan chains, socials, and deploys to flag promising new tokens early." },
            { icon: ChartLine, title: "Momentum Signals", desc: "Price/volume accelerations, whale activity, and liquidity changes." },
            { icon: Bell, title: "Instant Alerts", desc: "Push, email, and in-app alerts configurable to your risk profile." }].map(({icon:Icon,title,desc},i)=>(
            <Card key={title} className="bg-gray-900/70 border-gray-800"><CardContent className="p-6">{/* @ts-ignore */}<Icon className="h-6 w-6 text-cyan-400"/><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mt-2 text-sm text-gray-400">{desc}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-10 py-14 border-t border-white/10 text-gray-400">
        <div className="mx-auto max-w-7xl text-xs text-gray-500">© {new Date().getFullYear()} SurgeX — Not financial advice.</div>
      </footer>
    </div>
  );
}
