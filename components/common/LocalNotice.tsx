"use client";
import { Tag } from "@/components/common/Tag";

export function LocalNotice({ children = "Demo · saved on this device" }: { children?: React.ReactNode }) {
  return <Tag tone="accent">{children}</Tag>;
}

