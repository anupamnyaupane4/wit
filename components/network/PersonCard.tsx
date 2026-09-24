"use client";
import { ArrowUpRight, Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/common/Tag";
import { cityName } from "@/data/seed";
import type { Person } from "@/types/domain";

export function PersonCard({ person, saved, onOpen, onSave }: { person: Person; saved: boolean; onOpen: () => void; onSave: () => void }) {
  return <article className="group grid min-h-64 border-t border-primary py-5 md:grid-cols-[5rem_1fr_auto] md:gap-5">
    <div className="font-mono text-xs text-muted-foreground">’{String(person.classYear).slice(-2)}<br />{person.kind}</div>
    <button type="button" onClick={onOpen} className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><h3 className="mt-2 font-serif text-3xl leading-none text-primary transition-transform group-hover:translate-x-1 md:mt-0">{person.name}</h3><p className="mt-2 text-sm font-semibold">{person.role}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{person.bio}</p><div className="mt-4 flex flex-wrap gap-2">{person.expertise.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}{person.mentorship ? <Tag tone="accent">Offers mentorship</Tag> : null}</div><p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground"><MapPin className="size-3" />{cityName(person.city)}</p></button>
    <div className="mt-4 flex gap-2 md:mt-0"><Button size="icon" variant={saved ? "default" : "outline"} className="min-h-11 min-w-11 rounded-sm" onClick={onSave} aria-label={`${saved ? "Unsave" : "Save"} ${person.name}`} aria-pressed={saved}><Bookmark className={saved ? "fill-current" : ""} /></Button><Button size="icon" variant="outline" className="min-h-11 min-w-11 rounded-sm" onClick={onOpen} aria-label={`Open ${person.name}'s profile`}><ArrowUpRight /></Button></div>
  </article>;
}

