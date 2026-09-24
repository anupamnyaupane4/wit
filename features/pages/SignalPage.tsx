"use client";
import { useDetailState } from "@/lib/useDetailState";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageIntro } from "@/components/common/PageIntro";
import { EmptyState } from "@/components/common/EmptyState";
import { FilterBar } from "@/components/common/FilterBar";
import { SignalRow } from "@/components/signal/SignalRow";
import { OpportunitySheet } from "@/components/signal/OpportunitySheet";
import { SubmissionFlow } from "@/components/signal/SubmissionFlow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cities, signals } from "@/data/seed";
import { toggleSavedSignal, useDemoStoreSnapshot } from "@/lib/demoStore";
import type { CityId, SignalCategory } from "@/types/domain";

export function SignalPage() {
  const [openId,setOpenId]=useDetailState();const closeDetail=()=>setOpenId(undefined);
  const store = useDemoStoreSnapshot(); const [query, setQuery] = useState(""); const [category, setCategory] = useState<SignalCategory | "all">("all"); const [city, setCity] = useState<CityId | "all">("all"); const [savedOnly, setSavedOnly] = useState(false);  const [shareOpen, setShareOpen] = useState(false);
  
  const all = [...store.approvedSignals, ...signals];
  const filtered = useMemo(() => all.filter((item) => { const text = `${item.title} ${item.company} ${item.location} ${item.topics.join(" ")} ${item.body}`.toLowerCase(); return (!query || text.includes(query.toLowerCase())) && (category === "all" || item.category === category) && (city === "all" || item.city === city) && (!savedOnly || store.savedSignalIds.includes(item.id)); }), [all, query, category, city, savedOnly, store.savedSignalIds]);
  const openSignal = all.find((item) => item.id === openId);
  const clear = () => { setQuery(""); setCategory("all"); setCity("all"); setSavedOnly(false); };
  return <><PageIntro number="03" eyebrow="Jobs / Asks / Offers / Community" title="The Signal" description="A readable sample feed where each post names its source, audience, referral state, and what remains unconfirmed." actions={<Button onClick={() => setShareOpen(true)} className="rounded-sm"><Plus />Share a signal</Button>} />
    <section className="border-b border-primary"><div className="mx-auto space-y-3 px-4 py-5 sm:px-6 lg:max-w-[96rem] lg:px-10"><div className="flex flex-wrap gap-2"><div className="relative min-w-60 flex-1"><Search className="absolute left-3 top-3.5 size-4" /><Input aria-label="Search signals" value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 rounded-sm pl-10" placeholder="Search sample signals" /></div><Button variant={savedOnly ? "default" : "outline"} aria-pressed={savedOnly} className="rounded-sm" onClick={() => setSavedOnly((value) => !value)}>Saved only</Button></div><FilterBar label="Category" options={(["job", "internship", "founder-request", "ask", "offer", "community"] as const).map((item) => ({ value: item, label: item.replace("-", " ") }))} value={category} onChange={setCategory} /><FilterBar label="City" options={cities.map((item) => ({ value: item.id, label: item.shortName }))} value={city} onChange={setCity} /></div></section>
    <section className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-10"><div className="border-b border-primary pb-3 font-mono text-xs uppercase">{filtered.length} signals · sample & locally approved posts</div>{filtered.length ? filtered.map((signal) => <SignalRow key={signal.id} signal={signal} saved={store.savedSignalIds.includes(signal.id)} onOpen={() => setOpenId(signal.id)} onSave={() => toggleSavedSignal(signal.id)} fresh={signal.locallyApproved} />) : <div className="mt-6"><EmptyState title="No signals found." body="Clear the filters or add a local demo post. Nothing leaves this device." action={{ label: "Clear filters", onClick: clear }} /></div>}</section><OpportunitySheet signal={openSignal} open={Boolean(openSignal)} onOpenChange={(open) => !open && closeDetail()} /><SubmissionFlow open={shareOpen} onOpenChange={setShareOpen} /></>;
}

