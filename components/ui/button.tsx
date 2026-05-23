import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-white text-black hover:bg-zinc-200",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-zinc-700 bg-transparent hover:bg-zinc-900 hover:text-white",
      secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
      ghost: "hover:bg-zinc-800 hover:text-white",
      link: "text-white underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-lg px-4",
      lg: "h-12 rounded-xl px-8",
      icon: "h-11 w-11",
    }
    
    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }