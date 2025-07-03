import * as React from "react";

export function Card({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`rounded-2xl border bg-white text-black shadow-sm ${className}`}>{children}</div>;
}

export function CardHeader({ children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className="p-6 border-b">{children}</div>;
}

export function CardTitle({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function CardDescription({ children }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className="text-sm text-muted-foreground mt-1">{children}</p>;
}

export function CardContent({ children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className="p-6 pt-4">{children}</div>;
}