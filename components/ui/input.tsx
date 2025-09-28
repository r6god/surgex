import * as React from "react";
import cn from "../cn";
export const Input=React.forwardRef<HTMLInputElement,React.InputHTMLAttributes<HTMLInputElement>>(function Input({className="",...p},r){
  return <input ref={r} className={cn("w-full rounded-md border bg-gray-900/80 border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400",className)} {...p}/>;
});
export default Input;
