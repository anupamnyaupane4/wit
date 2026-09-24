"use client";
import { ArrowUpRight, Bookmark, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtworkPlaceholder } from "@/components/common/ArtworkPlaceholder";
import { Tag } from "@/components/common/Tag";
import { cityName } from "@/data/seed";
import type { Gathering } from "@/types/domain";

export function EventCard({ event, saved, rsvped, onOpen, onSave, onRsvp }: { event: Gathering; saved: boolean; rsvped: boolean; onOpen: () => void; onSave: () => void; onRsvp: () => void }) {
  const date = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: event.timezone, timeZoneName: "short" }).format(new Date(event.date));
  return <article className="grid border-t border-primary py-5 lg:grid-cols-[minmax(14rem,0.38fr)_1fr_auto] lg:gap-5"><ArtworkPlaceholder slot={event.imageSlot} className="min-h-44" /><div className="py-5 lg:py-0"><div className="flex flex-wrap gap-2"><Tag tone="sample">Proposed sample event</Tag><Tag>{cityName(event.city)}</Tag></div><button type="button" onClick={onOpen} className="mt-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><h3 className="font-serif text-4xl leading-none text-primary">{event.title}</h3></button><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{event.summary}</p><div className="mt-4 grid gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-2"><span className="flex gap-2"><CalendarDays className="size-4" />{date}</span><span className="flex gap-2"><MapPin className="size-4" />{event.venue}</span></div><p className="mt-4 text-sm">Sample capacity: {event.reserved + (rsvped ? 1 : 0)} / {event.capacity}</p></div><div className="flex gap-2 lg:flex-col"><Button variant={saved ? "default" : "outline"} size="icon" className="min-h-11 min-w-11 rounded-sm" onClick={onSave} aria-pressed={saved} aria-label="Save event"><Bookmark className={saved ? "fill-current" : ""} /></Button><Button variant={rsvped ? "secondary" : "default"} className="min-h-11 rounded-sm" onClick={onRsvp}>{rsvped ? "RSVP saved" : "Local RSVP"}</Button><Button variant="outline" size="icon" className="min-h-11 min-w-11 rounded-sm" onClick={onOpen} aria-label="Open event"><ArrowUpRight /></Button></div></article>;
}

