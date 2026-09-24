"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FilterBar<T extends string>({ label, options, value, onChange, allLabel = "All" }: { label: string; options: Array<{ value: T; label: string }>; value: T | "all"; onChange: (value: T | "all") => void; allLabel?: string }) {
  return (
    <div aria-label={label} className="flex flex-wrap gap-2">
      <Button type="button" variant={value === "all" ? "default" : "outline"} size="sm" aria-pressed={value === "all"} onClick={() => onChange("all")} className={cn("min-h-11 rounded-sm font-mono text-xs uppercase")}>{allLabel}</Button>
      {options.map((option) => (
        <Button key={option.value} type="button" variant={value === option.value ? "default" : "outline"} size="sm" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className="min-h-11 rounded-sm font-mono text-xs uppercase">
          {option.label}
        </Button>
      ))}
    </div>
  );
}

