import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const base = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";

        const variants = {
            default: "bg-primary text-white hover:bg-primary/90",
            outline: "border border-input hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground"
        };

        return (
            <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
        );
    }
);

Button.displayName = "Button";