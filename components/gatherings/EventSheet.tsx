"use client";
import { DetailShell } from "@/components/common/DetailShell";
import { LocalNotice } from "@/components/common/LocalNotice";
import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { cityName } from "@/data/seed";
import type { Gathering } from "@/types/domain";

export function EventSheet({ event, open, onOpenChange, rsvped, onRsvp }: { event?: Gathering; open: boolean; onOpenChange: (open: boolean) => void; rsvped: boolean; onRsvp: () => void }) {
  if (!event) return null;
  const date = new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "short", timeZone: event.timezone }).format(new Date(event.date));
  return <DetailShell open={open} onOpenChange={onOpenChange} title={event.title} description={`${cityName(event.city)} · proposed sample gathering`}><div className="flex flex-wrap gap-2"><Tag tone="sample">Not factual event</Tag><Tag>{date}</Tag><Tag>{event.timezone}</Tag></div><p className="mt-6 text-lg leading-relaxed">{event.summary}</p><dl className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2"><div className="bg-paper p-4"><dt className="font-mono text-xs uppercase text-muted-foreground">Venue</dt><dd>{event.venue}</dd></div><div className="bg-paper p-4"><dt className="font-mono text-xs uppercase text-muted-foreground">Sample capacity</dt><dd>{event.reserved + (rsvped ? 1 : 0)} / {event.capacity}</dd></div></dl><section className="mt-8"><h3 className="font-serif text-3xl text-primary">Agenda</h3><ul className="mt-3 space-y-2">{event.agenda.map((item) => <li key={item} className="border-t border-border pt-2">{item}</li>)}</ul></section><div className="mt-8 flex flex-wrap items-center gap-3"><Button onClick={onRsvp} className="rounded-sm">{rsvped ? "Remove local RSVP" : "Save local RSVP"}</Button>{rsvped ? <LocalNotice>RSVP saved on this device only</LocalNotice> : null}</div></DetailShell>;
}

