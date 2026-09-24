"use client";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/common/Tag";
import { cities, cityName, people, signals } from "@/data/seed";
import type { CityId, Expertise, Person } from "@/types/domain";

const cityPositions: Record<CityId, { x: number; y: number }> = {
  williamstown: { x: 265, y: 180 },
  boston: { x: 465, y: 75 },
  "new-york": { x: 470, y: 290 },
  "san-francisco": { x: 85, y: 265 },
};
const expertiseNodes: Array<{ label: Expertise; x: number; y: number }> = [
  { label: "AI / ML", x: 370, y: 155 },
  { label: "Cybersecurity", x: 385, y: 360 },
  { label: "Climate tech", x: 130, y: 110 },
  { label: "Healthcare sales", x: 245, y: 335 },
];

export function NetworkMap({ onPerson, visiblePeople = people }: { onPerson?: (id: string) => void; visiblePeople?: Person[] }) {
  const [mode, setMode] = useState<"places" | "people" | "expertise">("places");
  const [selectedCity, setSelectedCity] = useState<CityId | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise | null>(null);
  const matchedPeople = useMemo(() => visiblePeople.filter((person) => (!selectedCity || person.city === selectedCity) && (!selectedExpertise || person.expertise.includes(selectedExpertise))), [selectedCity, selectedExpertise, visiblePeople]);
  const matchedSignals = useMemo(() => signals.filter((signal) => (!selectedCity || signal.city === selectedCity) && (!selectedExpertise || signal.topics.includes(selectedExpertise))), [selectedCity, selectedExpertise]);
  const reset = () => { setSelectedCity(null); setSelectedExpertise(null); };

  return <section aria-labelledby="network-map-title" className="self-start border border-primary bg-surface">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary p-3"><div><p className="font-mono text-xs uppercase text-muted-foreground">Sample network · explore connections</p><h2 id="network-map-title" className="font-serif text-2xl text-primary">The network in motion</h2></div><div className="flex flex-wrap gap-1">{(["places", "people", "expertise"] as const).map((item) => <Button key={item} size="sm" variant={mode === item ? "default" : "ghost"} aria-pressed={mode === item} className="min-h-10 rounded-sm capitalize" onClick={() => setMode(item)}>{item}</Button>)}</div></div>
    <div className="network-panel relative min-h-[26rem] overflow-hidden bg-paper">
      <svg className="h-[26rem] w-full" viewBox="0 0 550 420" role="img" aria-label="Schematic network connecting Williamstown, Boston, New York, and San Francisco with people and expertise">
        <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" className="fill-primary" /></marker></defs>
        {cities.filter((city) => city.id !== "williamstown").map((city, index) => <path key={city.id} d={`M265 180 Q${270 + index * 35} ${80 + index * 80} ${cityPositions[city.id].x} ${cityPositions[city.id].y}`} className={`network-line ${selectedCity && selectedCity !== city.id ? "opacity-15" : "opacity-70"}`} markerEnd="url(#arrow)" />)}
        {expertiseNodes.map((node) => <path key={node.label} d={`M265 180 L${node.x} ${node.y}`} className={`network-line network-line-secondary ${selectedExpertise && selectedExpertise !== node.label ? "opacity-10" : "opacity-50"}`} />)}
        {cities.map((city) => { const pos = cityPositions[city.id]; const active = selectedCity === city.id; return <g key={city.id} role="button" tabIndex={0} aria-label={`Filter by ${city.name}`} aria-pressed={active} onClick={() => { setSelectedCity(active ? null : city.id); setSelectedExpertise(null); setMode("places"); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedCity(active ? null : city.id); setSelectedExpertise(null); } }} className="cursor-pointer outline-none focus-visible:[&_circle]:stroke-highlight"><circle cx={pos.x} cy={pos.y} r={city.id === "williamstown" ? 27 : 18} className={active ? "fill-highlight stroke-primary stroke-2" : "fill-paper stroke-primary stroke-2"} /><text x={pos.x} y={pos.y + (city.id === "williamstown" ? 44 : 34)} textAnchor="middle" className="fill-primary font-mono text-[12px] uppercase">{city.name}</text></g>; })}
        {expertiseNodes.map((node) => { const active = selectedExpertise === node.label; return <g key={node.label} role="button" tabIndex={0} aria-label={`Filter by ${node.label}`} aria-pressed={active} onMouseEnter={() => mode === "expertise" && setSelectedExpertise(node.label)} onFocus={() => mode === "expertise" && setSelectedExpertise(node.label)} onClick={() => { setSelectedExpertise(active ? null : node.label); setSelectedCity(null); setMode("expertise"); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedExpertise(active ? null : node.label); setSelectedCity(null); } }} className="cursor-pointer outline-none"><rect x={node.x - 8} y={node.y - 8} width="16" height="16" className={active ? "fill-highlight stroke-primary" : "fill-lilac stroke-primary"} /><text x={node.x} y={node.y + 23} textAnchor="middle" className="fill-primary font-mono text-[12px] uppercase">{node.label}</text></g>; })}
        {mode === "people" ? matchedPeople.map((person, index) => { const center = cityPositions[person.city]; const angle = (index / matchedPeople.length) * Math.PI * 2; const x = center.x + Math.cos(angle) * 42; const y = center.y + Math.sin(angle) * 42; return <g key={person.id} role="button" tabIndex={0} aria-label={`Open ${person.name}`} onClick={() => onPerson?.(person.id)} onKeyDown={(event) => event.key === "Enter" && onPerson?.(person.id)} className="cursor-pointer"><circle cx={x} cy={y} r="10" className="fill-primary stroke-paper stroke-2" /><title>{person.name}</title></g>; }) : null}
      </svg>
      <div className="relative mx-3 mb-3 flex flex-wrap items-center justify-between gap-2 border border-primary bg-paper/95 p-3"><div><p className="font-mono text-xs uppercase text-muted-foreground">{selectedCity ? cityName(selectedCity) : selectedExpertise ?? "All sample connections"}</p><p className="text-sm"><strong>{matchedPeople.length}</strong> people · <strong>{matchedSignals.length}</strong> opportunities</p></div>{selectedCity || selectedExpertise ? <Button variant="ghost" size="sm" onClick={reset}><RotateCcw />Clear</Button> : null}</div>
    </div>
    <div className="border-t border-primary p-3"><p className="font-mono text-xs uppercase text-muted-foreground">Explore by place</p><div className="mt-2 flex flex-wrap gap-2">{cities.map((city) => <Button key={city.id} variant={selectedCity === city.id ? "default" : "outline"} size="sm" className="min-h-11 rounded-sm" onClick={() => { setSelectedCity(selectedCity === city.id ? null : city.id); setSelectedExpertise(null); }}>{city.name}</Button>)}</div>{selectedCity || selectedExpertise || mode === "people" ? <div className="mt-3 flex flex-wrap gap-2">{matchedPeople.map((person) => <Button key={person.id} variant="link" className="h-auto p-0" onClick={() => onPerson?.(person.id)}>{person.name}</Button>)}</div> : null}</div>
  </section>;
}

