import type { DemoStoreState, InterestDraft, IntroDraft, SignalItem } from "@/types/domain";

export const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const STORAGE_KEY = "witt-community-preview-v1";

const initialState: DemoStoreState = {
  version: 1,
  savedSignalIds: [],
  savedPersonIds: [],
  savedEventIds: [],
  introDrafts: [],
  interestDrafts: [],
  approvedSignals: [],
  rsvpEventIds: [],
};

let memoryState: DemoStoreState = initialState;

const canUseStorage = () => typeof window !== "undefined" && "localStorage" in window;

const normalize = (value: unknown): DemoStoreState => {
  if (!value || typeof value !== "object") return initialState;
  const state = value as Partial<DemoStoreState>;
  if (state.version !== 1) return initialState;
  return {
    ...initialState,
    ...state,
    savedSignalIds: Array.isArray(state.savedSignalIds) ? state.savedSignalIds : [],
    savedPersonIds: Array.isArray(state.savedPersonIds) ? state.savedPersonIds : [],
    savedEventIds: Array.isArray(state.savedEventIds) ? state.savedEventIds : [],
    introDrafts: Array.isArray(state.introDrafts) ? state.introDrafts : [],
    interestDrafts: Array.isArray(state.interestDrafts) ? state.interestDrafts : [],
    approvedSignals: Array.isArray(state.approvedSignals) ? state.approvedSignals : [],
    rsvpEventIds: Array.isArray(state.rsvpEventIds) ? state.rsvpEventIds : [],
  };
};

export function readDemoStore(): DemoStoreState {
  if (!canUseStorage()) return memoryState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryState;
    const parsed = normalize(JSON.parse(raw));
    memoryState = parsed;
    return parsed;
  } catch {
    return memoryState;
  }
}

export function writeDemoStore(next: DemoStoreState): DemoStoreState {
  const state = normalize(next);
  memoryState = state;
  if (canUseStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      memoryState = state;
    }
  }
  window.dispatchEvent(new CustomEvent("witt-demo-store", { detail: state }));
  return state;
}

export function resetDemoStore(): DemoStoreState {
  memoryState = initialState;
  if (canUseStorage()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      memoryState = initialState;
    }
  }
  window.dispatchEvent(new CustomEvent("witt-demo-store", { detail: initialState }));
  return initialState;
}

export function updateDemoStore(updater: (state: DemoStoreState) => DemoStoreState): DemoStoreState {
  return writeDemoStore(updater(readDemoStore()));
}

const toggle = (items: string[], id: string) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

export const toggleSavedSignal = (id: string) => updateDemoStore((state) => ({ ...state, savedSignalIds: toggle(state.savedSignalIds, id) }));
export const toggleSavedPerson = (id: string) => updateDemoStore((state) => ({ ...state, savedPersonIds: toggle(state.savedPersonIds, id) }));
export const toggleSavedEvent = (id: string) => updateDemoStore((state) => ({ ...state, savedEventIds: toggle(state.savedEventIds, id) }));
export const toggleRsvpEvent = (id: string) => updateDemoStore((state) => ({ ...state, rsvpEventIds: toggle(state.rsvpEventIds, id) }));

export function addIntroDraft(personId: string, reason: string): IntroDraft {
  const draft: IntroDraft = { id: newId(), personId, reason, createdAt: new Date().toISOString() };
  updateDemoStore((state) => ({ ...state, introDrafts: [draft, ...state.introDrafts] }));
  return draft;
}

export function addInterestDraft(signalId: string, note: string): InterestDraft {
  const draft: InterestDraft = { id: newId(), signalId, note, createdAt: new Date().toISOString() };
  updateDemoStore((state) => ({ ...state, interestDrafts: [draft, ...state.interestDrafts] }));
  return draft;
}

export function addApprovedSignal(signal: SignalItem) {
  updateDemoStore((state) => ({ ...state, approvedSignals: [signal, ...state.approvedSignals] }));
}

export function useDemoStoreSnapshot() {
  const [state, setState] = React.useState<DemoStoreState>(initialState);
  React.useEffect(() => {
    setState(readDemoStore());
    const onStore = (event: Event) => setState(normalize((event as CustomEvent).detail));
    window.addEventListener("witt-demo-store", onStore);
    const onStorage = () => setState(readDemoStore());
    window.addEventListener("storage", onStorage);
    return () => { window.removeEventListener("witt-demo-store", onStore); window.removeEventListener("storage", onStorage); };
  }, []);
  return state;
}

import * as React from "react";

