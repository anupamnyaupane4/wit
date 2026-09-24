"use client";
import { Empty,EmptyHeader,EmptyTitle,EmptyDescription } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: { label: string; onClick: () => void } }) {
  return (
    <Empty className="border border-dashed border-border bg-surface p-6"><EmptyHeader>
      <EmptyTitle className="font-serif text-2xl text-primary">{title}</EmptyTitle>
      <EmptyDescription>{body}</EmptyDescription></EmptyHeader>
      {action ? <Button className="mt-4" variant="outline" onClick={action.onClick}>{action.label}</Button> : null}
    </Empty>
  );
}

