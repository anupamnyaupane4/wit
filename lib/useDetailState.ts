"use client";
import { useCallback, useEffect, useState } from "react";
/** Keep detail panels shareable and synchronized with browser Back. */
export function useDetailState() {
  const [id, setId] = useState<string>();
  useEffect(() => {
    const sync = () => setId(new URLSearchParams(window.location.search).get("open") ?? undefined);
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const select = useCallback((next: string | undefined) => {
    setId(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("open", next);
    else url.searchParams.delete("open");
    if (next) window.history.pushState(window.history.state, "", url);
    else window.history.replaceState(window.history.state, "", url);
  }, []);
  return [id, select] as const;
}
