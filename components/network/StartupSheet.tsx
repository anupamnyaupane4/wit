"use client";

import {DetailShell} from "@/components/common/DetailShell";
import {Tag} from "@/components/common/Tag";
import {Button} from "@/components/ui/button";
import {cityName,people} from "@/data/seed";
import type {Startup} from "@/types/domain";
export function StartupSheet({startup,open,onOpenChange}:{startup?:Startup;open:boolean;onOpenChange:(v:boolean)=>void}){if(!startup)return null;return <DetailShell open={open} onOpenChange={onOpenChange} title={startup.name} description={`${startup.stage} · ${cityName(startup.city)}`}><div className="flex gap-2"><Tag tone="sample">Sample startup</Tag><Tag>{startup.sector}</Tag></div><p className="my-8 text-lg">{startup.summary}</p><h3 className="font-serif text-3xl">What would help</h3><ul className="my-5 space-y-3">{startup.asks.map(ask=><li className="border-t border-border pt-3" key={ask}>{ask}</li>)}</ul><h3 className="mt-8 font-serif text-3xl">Meet the founders</h3><div className="mt-5 flex flex-wrap gap-3">{startup.founderIds.map(id=><Button asChild variant="outline" key={id}><a href={`/network?open=${id}`}>{people.find(p=>p.id===id)?.name??"View founder"}</a></Button>)}</div></DetailShell>}
