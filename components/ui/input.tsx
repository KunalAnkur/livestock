import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";