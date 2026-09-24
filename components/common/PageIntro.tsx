"use client";
import {Tag} from "@/components/common/Tag";
export function PageIntro({number,eyebrow,title,description,actions}:{number:string;eyebrow:string;title:string;description:string;actions?:React.ReactNode}){
 return <header className="border-b border-border bg-surface"><div className="mx-auto grid max-w-[96rem] gap-6 px-5 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.6fr)] lg:px-14 lg:py-12"><div><p className="section-kicker">{eyebrow}<span aria-hidden="true" className="ml-3 text-muted-foreground">/ {number}</span></p><h1 className="my-5 font-serif text-5xl leading-tight text-primary sm:text-6xl">{title}</h1><div className="intro-rule"/></div><div className="self-end"><p className="max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p><div className="mt-4 flex flex-wrap items-center gap-3">{actions}<Tag tone="sample">Sample community data</Tag></div></div></div></header>;
}
