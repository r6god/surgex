import * as React from "react";
import cn from "../cn";
type Props=React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:"solid"|"outline"};
export const Button=React.forwardRef<HTMLButtonElement,Props>(function Button({className="",variant="solid",...p},r){
  const base="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed";
  const styles=variant==="outline"?"border border-white/10 text-white hover:bg-white/5":
    "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold shadow hover:from-cyan-300 hover:to-emerald-300";
  return <button ref={r} className={cn(base,styles,className)} {...p}/>;
});
export default Button;
