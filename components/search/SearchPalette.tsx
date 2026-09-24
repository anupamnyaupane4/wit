"use client";
import { useEffect, useMemo, useState } from "react";

import { useDemoStoreSnapshot } from "@/lib/demoStore";
import type { SearchResult } from "@/types/domain";
import { ArrowRight, CalendarDays, CommandIcon, FileText, Network, Search, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag } from "@/components/common/Tag";
import { queryChips, searchCommunity } from "@/lib/search";

const samples = [
  "AI founders in Boston",
  "people who can help with healthcare sales",
  "summer startup internships",
  "Williams alumni in cybersecurity",
  "founders looking for engineers",
  "upcoming events in San Francisco",
];

const icons = { people: Network, startups: Sparkles, signals: CommandIcon, events: CalendarDays, resources: FileText };

export function SearchPalette({ open, onOpenChange, initialQuery = "" }: { open: boolean; onOpenChange: (open: boolean) => void; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const store = useDemoStoreSnapshot();

  useEffect(() => {
    if (open) setQuery(initialQuery);
  }, [open, initialQuery]);

  useEffect(() => {
    if (!query.trim()) { setLoading(false); return; }
    setLoading(true);
    const timeout = window.setTimeout(() => setLoading(false), 120);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const results = useMemo(() => searchCommunity(query, store.approvedSignals), [query, store.approvedSignals]);
  const chips = useMemo(() => queryChips(query), [query]);
  const grouped = results.reduce<Record<string, SearchResult[]>>((groups, result) => { (groups[result.type] ??= []).push(result); return groups; }, {});

  const openResult = (route: string, id: string) => {
    onOpenChange(false);
    window.location.assign(`${route}?open=${encodeURIComponent(id)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[8vh] max-h-[84vh] max-w-2xl translate-y-0 overflow-hidden border border-primary bg-paper p-0 shadow-editorial sm:rounded-sm">
        <DialogTitle className="sr-only">Search sample community</DialogTitle>
        <DialogDescription className="sr-only">Search fictional people, startups, opportunities, events, and resources.</DialogDescription>
        <Command shouldFilter={false} loop className="rounded-none bg-paper">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center justify-between gap-4 pr-9">
              <p className="font-mono text-xs uppercase text-muted-foreground">Search sample community</p>
              <Tag tone="sample">Community preview</Tag>
            </div>
          </div>
          <CommandInput value={query} onValueChange={setQuery} autoFocus placeholder="Try “AI founders in Boston”" className="h-14 text-base" />
          {chips.length ? <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">{chips.map((chip) => <Tag key={chip} tone="accent">{chip}</Tag>)}</div> : null}
          <CommandList className="max-h-[58vh] p-2">
            {loading ? <div className="space-y-2 p-3" aria-live="polite"><Skeleton className="h-12" /><Skeleton className="h-12" /></div> : null}
            {!query.trim() ? (
              <CommandGroup heading="Useful starting points">
                {samples.map((sample) => <CommandItem key={sample} onSelect={() => setQuery(sample)} className="min-h-12"><Search /><span>{sample}</span><ArrowRight className="ml-auto" /></CommandItem>)}
              </CommandGroup>
            ) : null}
            {!loading && query.trim() ? <CommandEmpty><div className="px-4"><p className="font-serif text-xl">No sample results</p><p className="mt-1 text-sm text-muted-foreground">Try a city, expertise, “internships,” or “founders.”</p></div></CommandEmpty> : null}
            {!loading ? Object.entries(grouped).map(([group, items]) => items?.length ? (
              <CommandGroup key={group} heading={`${group} · ${items.length}`}>
                {items.map((result) => {
                  const Icon = icons[result.type];
                  return <CommandItem key={`${result.type}-${result.id}`} value={`${result.type}-${result.id}`} onSelect={() => openResult(result.route, result.id)} className="min-h-16 items-start border-b border-border py-3 last:border-0"><Icon className="mt-1" /><div className="min-w-0"><p className="font-medium">{result.title}</p><p className="truncate text-xs text-muted-foreground">{result.subtitle}</p><div className="mt-2 flex flex-wrap gap-1">{result.chips.slice(0, 3).map((chip) => <Tag key={chip}>{chip}</Tag>)}</div></div><ArrowRight className="ml-auto mt-1" /></CommandItem>;
                })}
              </CommandGroup>
            ) : null) : null}
          </CommandList>
          <div className="flex justify-between border-t border-border px-4 py-2 font-mono text-xs text-muted-foreground"><span>{query.trim() ? `${results.length} results` : "Local deterministic search"}</span><span>↑↓ move · enter open · esc close</span></div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

