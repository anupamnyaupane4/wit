"use client";
import { useState } from "react";
import { useDetailState } from "@/lib/useDetailState";
import { PageIntro } from "@/components/common/PageIntro";
import { FilterBar } from "@/components/common/FilterBar";
import { EmptyState } from "@/components/common/EmptyState";
import { EventCard } from "@/components/gatherings/EventCard";
import { EventSheet } from "@/components/gatherings/EventSheet";
import { cities,gatherings } from "@/data/seed";
import { toggleRsvpEvent,toggleSavedEvent,useDemoStoreSnapshot } from "@/lib/demoStore";
import type { CityId } from "@/types/domain";
export function GatheringsPage(){const store=useDemoStoreSnapshot();const [id,setId]=useDetailState();const closeDetail=()=>setId(undefined);const[city,setCity]=useState<CityId|"all">("all");const events=gatherings.filter(e=>city==="all"||e.city===city);const selected=gatherings.find(e=>e.id===id);return <><PageIntro number="04" eyebrow="Around the table / Across the map" title="Gatherings" description="Small dinners, open work sessions, and generous conversations. Explore proposed gatherings for a community that makes time for each other."/><section className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-10"><FilterBar label="Gathering city" options={cities.map(c=>({value:c.id,label:c.name}))} value={city} onChange={setCity}/><p className="my-6 font-mono text-xs text-muted-foreground">{events.length} PROPOSED GATHERINGS · RSVP SAVES ON THIS DEVICE ONLY</p>{events.length?events.map(event=><EventCard key={event.id} event={event} saved={store.savedEventIds.includes(event.id)} rsvped={store.rsvpEventIds.includes(event.id)} onOpen={()=>setId(event.id)} onSave={()=>toggleSavedEvent(event.id)} onRsvp={()=>toggleRsvpEvent(event.id)}/>):<EmptyState title="Nothing on this calendar yet." body="Try another city to see proposed gatherings." action={{label:"Show all cities",onClick:()=>setCity("all")}}/>}</section><EventSheet event={selected} open={!!selected} onOpenChange={v=>!v&&closeDetail()} rsvped={!!selected&&store.rsvpEventIds.includes(selected.id)} onRsvp={()=>selected&&toggleRsvpEvent(selected.id)}/></>}
