"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Save } from "lucide-react";
import { DetailShell } from "@/components/common/DetailShell";
import { LocalNotice } from "@/components/common/LocalNotice";
import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addInterestDraft } from "@/lib/demoStore";
import type { SignalItem } from "@/types/domain";

export function OpportunitySheet({ signal, open, onOpenChange }: { signal?: SignalItem; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError,setCopyError]=useState(false);
  useEffect(() => {setNote("");setSaved(false);setCopied(false);setCopyError(false);}, [signal?.id,open]);
  if (!signal) return null;
  const draftText = `Interest draft: ${signal.title}\n\n${note}\n\nDrafted from sample data in the Williams in Technology preview. No application or message has been sent.`;
  const save = () => { if (note.trim().length < 20) return; addInterestDraft(signal.id, note.trim()); setSaved(true); };
  return <DetailShell open={open} onOpenChange={onOpenChange} title={signal.title} description={`${signal.category.replace("-", " ")} · ${signal.location}`}>
    <div className="flex flex-wrap gap-2"><Tag tone={signal.sample ? "sample" : "accent"}>{signal.sample ? "Sample opportunity" : "Local demo post"}</Tag>{signal.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div>
    <dl className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2">{[["Role", signal.role || "Not set"], ["Company", signal.company || "Not set"], ["Audience", signal.audience], ["Deadline", signal.deadline ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${signal.deadline}T12:00:00`)) : "Not set"], ["Referral", signal.referral === "available" ? "Available" : signal.referral === "not-confirmed" ? "Not confirmed" : "Not offered"], ["Source", signal.source]].map(([label, value]) => <div key={label} className="bg-paper p-4"><dt className="font-mono text-xs uppercase text-muted-foreground">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>)}</dl>
    <p className="mt-7 text-lg leading-relaxed">{signal.body}</p><p className="mt-5 border-l-2 border-highlight pl-3 text-sm text-muted-foreground">Provenance: {signal.provenance}</p>
    <section className="mt-9 border-t border-primary pt-6"><h3 className="font-serif text-3xl text-primary">Draft interest</h3><p className="mt-2 text-sm text-muted-foreground">This creates copyable text on this device. It is not an application.</p><Label htmlFor="interest-note" className="mt-5 block">Your note</Label><Textarea id="interest-note" value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} className="mt-2 min-h-32 rounded-sm" placeholder="I’m interested because… My relevant work includes…" />{saved ? <div className="mt-4 flex flex-wrap items-center gap-2 border border-primary bg-highlight p-3 text-sm"><Check className="size-4" />Interest draft saved on this device. No application or message was sent.<LocalNotice /></div> : null}{copyError&&<p role="status" className="mt-3 text-sm">Copy is unavailable. You can select your note above.</p>}<div className="mt-4 flex gap-2"><Button onClick={save} disabled={note.trim().length < 20} className="rounded-sm"><Save />Save draft</Button><Button variant="outline" disabled={!note.trim()} className="rounded-sm" onClick={async () => { try{await navigator.clipboard.writeText(draftText);setCopied(true);setCopyError(false);}catch{setCopyError(true);} }}><Copy />{copied ? "Copied" : "Copy draft"}</Button></div></section>
  </DetailShell>;
}

