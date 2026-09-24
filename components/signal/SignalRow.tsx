"use client";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/common/Tag";
import type { SignalItem } from "@/types/domain";

const referralLabel = { available: "Referral available", "not-confirmed": "Referral not confirmed", "not-offered": "No referral stated" };

export function SignalRow({ signal, saved, onOpen, onSave, fresh = false, compact = false }: { signal: SignalItem; saved: boolean; onOpen: () => void; onSave: () => void; fresh?: boolean; compact?: boolean }) {
  return <article className={`group grid border-t border-primary py-4 ${fresh ? "signal-enter bg-highlight/40" : ""} ${compact ? "grid-cols-[1fr_auto] gap-x-3" : "md:grid-cols-[8rem_minmax(0,1fr)_10rem_auto] md:gap-4"}`}>
    <div className={compact?"col-span-2 mb-3 flex items-center gap-2":"flex flex-wrap items-start gap-2 md:block"}><Tag tone={signal.locallyApproved ? "accent" : "sample"}>{signal.locallyApproved ? "Local demo post" : "Sample"}</Tag><p className={`${compact?"":"mt-2"} font-mono text-xs uppercase text-muted-foreground`}>{signal.category.replace("-", " ")}</p></div>
    <button type="button" onClick={onOpen} className="min-w-0 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:py-0"><h3 className="font-serif text-2xl leading-tight text-primary group-hover:underline">{signal.title}</h3><p className="mt-1 text-sm text-muted-foreground">{signal.company ? `${signal.company} · ` : ""}{signal.location}</p><div className="mt-3 flex flex-wrap gap-2">{signal.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div></button>
    <div className={compact?"hidden":"py-2 font-mono text-xs text-muted-foreground md:py-0"}><p>{signal.source}</p><p className="mt-1">{new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(signal.timestamp))}</p><p className="mt-2">{referralLabel[signal.referral]}</p></div>
    <div className="flex gap-2"><Button size="icon" variant={saved ? "default" : "outline"} className="min-h-11 min-w-11 rounded-sm" onClick={onSave} aria-label={`${saved ? "Unsave" : "Save"} ${signal.title}`} aria-pressed={saved}><Bookmark className={saved ? "fill-current" : ""} /></Button><Button size="icon" variant="outline" className="min-h-11 min-w-11 rounded-sm" onClick={onOpen} aria-label={`Open ${signal.title}`}><ArrowUpRight /></Button></div>
  </article>;
}

