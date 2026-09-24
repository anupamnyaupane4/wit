"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function DetailShell({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; children: React.ReactNode }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-l border-border bg-paper p-0 sm:max-w-2xl">
        <SheetHeader className="border-b border-border p-5 text-left">
          <SheetTitle className="font-serif text-3xl leading-none text-primary">{title}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">{description}</SheetDescription>
        </SheetHeader>
        <div className="p-5">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

