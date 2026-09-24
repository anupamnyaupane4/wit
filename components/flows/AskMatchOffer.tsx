"use client";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/common/Tag";
import { people, signals } from "@/data/seed";

const steps = ["Ask", "Match", "Offer"] as const;

export function AskMatchOffer({ onPerson }: { onPerson?: (id: string) => void }) {
  const [step, setStep] = useState<(typeof steps)[number]>("Ask");
  const ask = signals.find((signal) => signal.id === "signal-healthcare-sales-help");
  const match = people.find((person) => person.id === "maya-chen");
  const shared = useMemo(() => ask && match ? ask.topics.filter((topic) => match.expertise.includes(topic)) : [], [ask, match]);
  if (!ask || !match) return null;
  return <section className="border-y border-primary bg-lilac/70"><div className="mx-auto grid max-w-[96rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.35fr_1fr] lg:px-10"><div><p className="font-mono text-xs uppercase text-muted-foreground">One small ask, a useful next step</p><h2 className="mt-3 font-serif text-5xl leading-none text-primary">Ask → Match → Offer</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Find someone whose experience connects with what you need.</p><div className="mt-5 flex flex-wrap gap-2">{steps.map((item) => <Button key={item} variant={step === item ? "default" : "outline"} className="rounded-sm" aria-pressed={step === item} onClick={() => setStep(item)}>{item}</Button>)}</div></div><div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]"><Panel active={step === "Ask"} title="Ask" eyebrow="Student need"><p>{ask.body}</p><Tag tone="sample">{ask.source}</Tag></Panel><ArrowRight className="hidden self-center md:block" /><Panel active={step === "Match"} title="Match" eyebrow="Why this match"><p>{match.name} has healthtech go-to-market experience and offers first customer interview scripts.</p><div className="flex flex-wrap gap-2">{shared.map((tag) => <Tag key={tag} tone="accent">{tag}</Tag>)}</div></Panel><ArrowRight className="hidden self-center md:block" /><Panel active={step === "Offer"} title="Offer" eyebrow="Draft"><p>Could you share 20 minutes on healthcare sales cycles and review the student’s discovery questions?</p><Button variant="outline" className="rounded-sm" onClick={() => onPerson?.(match.id)}>Open Maya’s sample profile</Button></Panel></div></div></section>;
}

function Panel({ active, title, eyebrow, children }: { active: boolean; title: string; eyebrow: string; children: React.ReactNode }) { return <article className={`min-h-64 border border-primary p-5 transition-transform ${active ? "bg-paper shadow-editorial md:-translate-y-2" : "bg-surface"}`}><p className="font-mono text-xs uppercase text-muted-foreground">{eyebrow}</p><h3 className="mt-2 font-serif text-3xl text-primary">{title}</h3><div className="mt-5 space-y-4 text-sm leading-relaxed">{children}</div></article>; }

