"use client";
import { useEffect, useState } from "react";
import { Check, Copy, MapPin, Save } from "lucide-react";
import { DetailShell } from "@/components/common/DetailShell";
import { LocalNotice } from "@/components/common/LocalNotice";
import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addIntroDraft } from "@/lib/demoStore";
import { cityName } from "@/data/seed";
import type { Person } from "@/types/domain";

export function ProfileSheet({ person, open, onOpenChange }: { person?: Person; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError,setCopyError]=useState(false);
  useEffect(() => {setReason("");setSaved(false);setCopied(false);setCopyError(false);}, [person?.id,open]);
  if (!person) return null;
  const draftText = `Introduction request for ${person.name}\n\nWhy I’d value the connection: ${reason}\n\nDrafted in the Williams in Technology community preview. No message has been sent.`;
  const save = () => { if (reason.trim().length < 20) return; addIntroDraft(person.id, reason.trim()); setSaved(true); };
  const copy = async () => { try {await navigator.clipboard.writeText(draftText);setCopied(true);setCopyError(false);}catch{setCopyError(true);} };
  return <DetailShell open={open} onOpenChange={onOpenChange} title={person.name} description={`Fictional sample profile · Class of ${person.classYear}`}>
    <div className="flex flex-wrap items-center gap-2"><Tag tone="sample">Sample profile</Tag><Tag>{person.kind}</Tag><span className="flex items-center gap-1 font-mono text-xs text-muted-foreground"><MapPin className="size-3" />{cityName(person.city)}</span></div>
    <p className="mt-6 text-lg leading-relaxed">{person.bio}</p>
    <section className="mt-8 border-t border-border pt-5"><h3 className="font-mono text-xs uppercase text-muted-foreground">Expertise</h3><div className="mt-3 flex flex-wrap gap-2">{person.expertise.map((item) => <Tag key={item} tone="accent">{item}</Tag>)}</div></section>
    <div className="mt-8 grid gap-6 sm:grid-cols-2"><section><h3 className="font-serif text-2xl text-primary">Current ask</h3><ul className="mt-3 space-y-2 text-sm">{person.asks.map((ask) => <li key={ask} className="border-t border-border pt-2">{ask}</li>)}</ul></section><section><h3 className="font-serif text-2xl text-primary">Can offer</h3><ul className="mt-3 space-y-2 text-sm">{person.offers.map((offer) => <li key={offer} className="border-t border-border pt-2">{offer}</li>)}</ul></section></div>
    <section className="mt-10 border-t border-primary pt-6"><h3 className="font-serif text-3xl text-primary">Draft an introduction</h3><p className="mt-2 text-sm text-muted-foreground">This saves a draft on this device. It does not send a message.</p><Label htmlFor="intro-reason" className="mt-5 block text-sm">Why would this connection be useful?</Label><Textarea id="intro-reason" value={reason} onChange={(event) => { setReason(event.target.value); setSaved(false); }} placeholder="I’m exploring healthcare sales for a student project and would value 20 minutes on buyer workflows…" className="mt-2 min-h-32 rounded-sm" /><div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground"><span>Minimum 20 characters</span><span>{reason.trim().length}</span></div>{saved ? <div className="mt-4 flex flex-wrap items-center gap-3 border border-primary bg-highlight p-3 text-sm"><Check className="size-4" /><span>Introduction draft saved on this device. No message has been sent.</span><LocalNotice /></div> : null}{copyError&&<p role="status" className="mt-3 text-sm">Copy is unavailable in this browser. You can select the draft text above.</p>}<div className="mt-4 flex flex-wrap gap-2"><Button onClick={save} disabled={reason.trim().length < 20} className="min-h-11 rounded-sm"><Save />Save introduction draft</Button><Button onClick={copy} disabled={!reason.trim()} variant="outline" className="min-h-11 rounded-sm"><Copy />{copied ? "Copied" : "Copy draft"}</Button></div></section>
  </DetailShell>;
}

