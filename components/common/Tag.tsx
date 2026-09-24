"use client";
import { cn } from "@/lib/utils";

export function Tag({ children, tone = "default", className }: { children: React.ReactNode; tone?: "default" | "accent" | "sample" | "official"; className?: string }) {
  return (
    <span className={cn("inline-flex min-h-7 items-center border px-2 py-1 font-mono text-xs uppercase leading-none tracking-normal", tone === "accent" && "border-primary bg-highlight text-primary", tone === "sample" && "border-lilac-strong bg-lilac text-primary", tone === "official" && "border-primary bg-primary text-primary-foreground", tone === "default" && "border-border bg-surface text-muted-foreground", className)}>
      {children}
    </span>
  );
}

