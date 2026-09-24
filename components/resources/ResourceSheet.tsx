"use client";

import { ExternalLink } from "lucide-react";
import { DetailShell } from "@/components/common/DetailShell";
import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { people, signals } from "@/data/seed";
import type { ResourceModule } from "@/types/domain";

export function ResourceSheet({ resource, open, onOpenChange }: { resource?: ResourceModule; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!resource) return null;
  const relatedPeople = people.filter((person) => resource.relatedPeople.includes(person.id));
  const relatedSignals = signals.filter((signal) => resource.relatedSignals.includes(signal.id));
  return <DetailShell open={open} onOpenChange={onOpenChange} title={resource.title} description={resource.officialExternal ? "Official external Williams reading" : `${resource.category} · fictional sample module`}><div className="flex flex-wrap gap-2"><Tag tone={resource.officialExternal ? "official" : "sample"}>{resource.officialExternal ? "Official external reading" : "Sample community content"}</Tag><Tag>{resource.readTime}</Tag></div>{resource.officialExternal ? <p className="mt-5 border border-primary bg-highlight p-4 text-sm">This link goes to an official Williams Alumni Career Commentary article. It is not fictional sample community content.</p> : null}<div className="mt-7 space-y-5 text-base leading-relaxed">{resource.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{resource.externalUrl ? <Button asChild className="mt-6 rounded-sm"><a href={resource.externalUrl} target="_blank" rel="noreferrer">Open official Williams resource<ExternalLink /></a></Button> : null}{relatedPeople.length || relatedSignals.length ? <section className="mt-9 border-t border-primary pt-5"><h3 className="font-serif text-3xl text-primary">Related sample context</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{relatedPeople.map((person) => <a href={`/network?open=${person.id}`} key={person.id} className="border-t border-border pt-3 hover:underline"><p className="font-medium">{person.name}</p><p className="text-sm text-muted-foreground">{person.role}</p></a>)}{relatedSignals.map((signal) => <a href={`/signal?open=${signal.id}`} key={signal.id} className="border-t border-border pt-3 hover:underline"><p className="font-medium">{signal.title}</p><p className="text-sm text-muted-foreground">{signal.location}</p></a>)}</div></section> : null}</DetailShell>;
}

