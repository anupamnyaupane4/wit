"use client";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { SubmissionFlow } from "@/components/signal/SubmissionFlow";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [shareOpen, setShareOpen] = useState(false);
  return <div className="min-h-screen bg-paper text-foreground"><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to content</a><AppHeader onShareSignal={() => setShareOpen(true)} /><main id="main-content">{children}</main><AppFooter /><SubmissionFlow open={shareOpen} onOpenChange={setShareOpen} /></div>;
}

