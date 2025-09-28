import * as React from "react"; import cn from "../cn";
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ className="", ...props }, ref){
  const base="w-full rounded-md border bg-gray-900/80 border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400";
  return <input ref={ref} className={cn(base,className)} {...props}/>;
});
export default Input;
