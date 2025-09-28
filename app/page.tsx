
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Brain, ChartLine, Clock, Coins, Github, Mail, ShieldCheck, Sparkles, Twitter, Users, Check } from "lucide-react";

const HEADLINE="SurgeX is Coming Soon"; const LOGO_PATH="/surgex-logo.png";
const FALLBACK_LOGO_SVG="data:image/svg+xml;utf8,"+encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 120\"><defs><linearGradient id=\"g\" x1=\"0\" x2=\"1\" y1=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#22d3ee\"/><stop offset=\"100%\" stop-color=\"#34d399\"/></linearGradient></defs><text x=\"50%\" y=\"55%\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-family=\"Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif\" font-size=\"52\" font-weight=\"900\" fill=\"url(#g)\">SurgeX</text></svg>");
function LogoImg({width=160,height=54,className=""}:{width?:number;height?:number;className?:string}){const [src,setSrc]=useState(LOGO_PATH); return <img src={src} alt="SurgeX Logo" width={width} height={height} className={className} loading="lazy" decoding="async" onError={()=>src!==FALLBACK_LOGO_SVG&&setSrc(FALLBACK_LOGO_SVG)} style={{filter:"drop-shadow(0 8px 26px rgba(34,211,238,0.25))"}}/>}
const fadeUp=(i=0)=>({initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},transition:{duration:0.6,delay:i*0.06,ease:[0.22,1,0.36,1]},viewport:{once:true,amount:0.2}});
function GradientCard({children,className=""}:{children:any;className?:string}){return <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-cyan-500/20 to-emerald-400/20 ${className}`}><div className="h-full rounded-2xl bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border border-white/10 flex flex-col">{children}</div></div>}

export default function Page(){
  const [email,setEmail]=useState(""); const [status,setStatus]=useState<"idle"|"submitting"|"success"|"error">("idle"); const [message,setMessage]=useState("");
  const validateEmail=(v:string)=>/[^\s@]+@[^\s@]+\.[^\s@]+/.test(v); const isSubmitDisabled=useMemo(()=>status==="submitting",[status]);
  async function onSubmit(e:any){e.preventDefault(); setMessage(""); if(!validateEmail(email)){setStatus("error"); setMessage("Please enter a valid email address."); return;} setStatus("submitting"); await new Promise(r=>setTimeout(r,600)); setStatus("success"); setMessage("You're on the list! We'll ping you at launch."); setEmail("");}
  useEffect(()=>{if(process.env.NODE_ENV==="production")return; const tests=[{v:"user@example.com",e:true},{v:"bad@",e:false},{v:"",e:false},{v:"test@domain.co",e:true},{v:"space @bad.com",e:false},{v:"no-tld@domain",e:false}]; for(const t of tests) console.assert(validateEmail(t.v)===t.e, "validateEmail failed for", t.v)},[]);

  return (<div className="min-h-screen bg-[#07090B] text-white">
    <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10 sticky top-0 z-20 bg-black/50 backdrop-blur-xl">
      <LogoImg width={150} height={50}/>
      <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
        <a className="hover:text-cyan-400" href="#features">Features</a>
        <a className="hover:text-cyan-400" href="#faq">FAQ</a>
      </nav>
      <Button className="rounded-xl">Join Waitlist</Button>
    </header>
    <section className="mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-24">
      <motion.div {...fadeUp()}>
        <div className="flex justify-center mb-8"><LogoImg width={256} height={86}/></div>
        <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight"><span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">{HEADLINE}</span></h1>
        <p className="mt-6 text-center text-gray-300 text-lg max-w-3xl mx-auto">The AI-driven memecoin trading hub on Solana.</p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <Input type="email" placeholder="Enter your email" aria-label="Email address" value={email} onChange={(e:any)=>setEmail(e.target.value)} className="px-4 py-6 text-base rounded-xl" required/>
          <Button type="submit" disabled={isSubmitDisabled} className="px-6 py-6 text-base rounded-xl">{status==="submitting"?"Submitting…":"Notify Me"}<ArrowRight className="ml-2 h-4 w-4"/></Button>
        </form>
        {message && (<p role="status" className={`mt-3 text-center text-sm ${status==="success"?"text-green-400":"text-red-400"}`}>{message}</p>)}
      </motion.div>
    </section>
    <section id="features" className="mx-auto max-w-7xl px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{icon:Brain,title:"AI Discovery",desc:"Flags promising new tokens early."},{icon:ChartLine,title:"Momentum Signals",desc:"Volume, whales, liquidity changes."},{icon:Bell,title:"Smart Alerts",desc:"Email/push, wallet watch, thresholds."}].map(({icon:Icon,title,desc},i)=>(
          <GradientCard key={title}><CardContent className="p-6">{/* @ts-ignore */}<Icon className="h-6 w-6 text-cyan-400"/><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mt-2 text-sm text-gray-400">{desc}</p></CardContent></GradientCard>
        ))}
      </div>
    </section>
    <footer className="px-6 md:px-10 py-14 border-t border-white/10 text-gray-400"><div className="mx-auto max-w-7xl text-xs text-gray-500">© {new Date().getFullYear()} SurgeX — Not financial advice.</div></footer>
  </div>);
}
