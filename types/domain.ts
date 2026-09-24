export type CityId = "williamstown" | "boston" | "new-york" | "san-francisco";
export type Expertise =
  | "AI / ML"
  | "Healthcare sales"
  | "Cybersecurity"
  | "Climate tech"
  | "Robotics"
  | "Fintech"
  | "Product design"
  | "Founder ops"
  | "Hardware"
  | "Go-to-market"
  | "Community";

export type PersonKind = "student" | "alumni" | "founder";

export interface CommunityCity {
  id: CityId;
  name: string;
  shortName: string;
  timezone: string;
  coordinate: string;
  summary: string;
}

export interface Person {
  id: string;
  name: string;
  classYear: number;
  kind: PersonKind;
  role: string;
  city: CityId;
  bio: string;
  expertise: Expertise[];
  asks: string[];
  offers: string[];
  mentorship: boolean;
  startupIds: string[];
  sample: true;
}

export interface Startup {
  id: string;
  name: string;
  sector: Expertise;
  stage: string;
  city: CityId;
  founderIds: string[];
  summary: string;
  asks: string[];
  sample: true;
}

export type SignalCategory = "job" | "internship" | "founder-request" | "ask" | "offer" | "community";
export type ReferralState = "available" | "not-confirmed" | "not-offered";

export interface SignalItem {
  id: string;
  category: SignalCategory;
  title: string;
  role?: string;
  company?: string;
  location: string;
  city?: CityId;
  audience: string;
  referral: ReferralState;
  deadline?: string;
  topics: Expertise[];
  source: string;
  timestamp: string;
  body: string;
  provenance: string;
  sample: boolean;
  locallyApproved?: boolean;
}

export interface Gathering {
  id: string;
  title: string;
  date: string;
  city: CityId;
  timezone: string;
  venue: string;
  capacity: number;
  reserved: number;
  imageSlot: "dinner" | "workshop" | "landscape";
  summary: string;
  agenda: string[];
  sample: true;
}

export interface ResourceModule {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  body: string[];
  relatedPeople: string[];
  relatedSignals: string[];
  imageSlot: "collage" | "workspace" | "workshop" | "none";
  externalUrl?: string;
  officialExternal?: boolean;
  sample: boolean;
}

export interface IntroDraft {
  id: string;
  personId: string;
  reason: string;
  createdAt: string;
}

export interface InterestDraft {
  id: string;
  signalId: string;
  note: string;
  createdAt: string;
}

export interface DemoStoreState {
  version: 1;
  savedSignalIds: string[];
  savedPersonIds: string[];
  savedEventIds: string[];
  introDrafts: IntroDraft[];
  interestDrafts: InterestDraft[];
  approvedSignals: SignalItem[];
  rsvpEventIds: string[];
}

export type SearchEntityType = "people" | "startups" | "signals" | "events" | "resources";

export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  route: string;
  score: number;
  chips: string[];
}

export interface ExtractedSignalFields {
  type: SignalCategory | "";
  title: string;
  role: string;
  location: string;
  audience: string;
  referral: ReferralState;
  topics: Expertise[];
  notes: string[];
}

