import type { ExtractedSignalFields, Expertise, SignalCategory } from "@/types/domain";

const topicRules: Array<[RegExp, Expertise]> = [
  [/\b(ai|ml|machine learning|model)\b/i, "AI / ML"],
  [/\bhealth|clinic|clinical|medical\b/i, "Healthcare sales"],
  [/\bsecurity|cyber|identity|appsec\b/i, "Cybersecurity"],
  [/\bclimate|energy|grid|carbon\b/i, "Climate tech"],
  [/\brobot|hardware|sensor\b/i, "Robotics"],
  [/\bfintech|finance|cash[- ]?flow\b/i, "Fintech"],
  [/\bdesign|product\b/i, "Product design"],
  [/\bfounder|startup|hiring\b/i, "Founder ops"],
];

export function extractSignal(raw: string): ExtractedSignalFields {
  const text = raw.trim();
  
  const topics = topicRules.filter(([pattern]) => pattern.test(text)).map(([, topic]) => topic);
  const uniqueTopics = [...new Set(topics)];

  let type: SignalCategory | "" = "";
  if (/\bintern(ship)?\b/i.test(text)) type = "internship";
  else if (/\bfounder|co[- ]?founder\b/i.test(text)) type = "founder-request";
  else if (/\b(job|role|hiring)\b/i.test(text)) type = "job";
  else if (/\boffer|happy to help|can help\b/i.test(text)) type = "offer";
  else if (/\bneed|seeking|looking for\b/i.test(text)) type = "ask";

  const roleMatch = text.match(/(?:looking for|hiring|seeking|need(?:s)?|role[:\s]+)(?: an?| the)?\s+([A-Za-z0-9 /+-]+?)(?:\s+(?:this|for|in|at|summer|remote|who|with)|[.!?]|$)/i);
  const internMatch = text.match(/\b((?:ML|AI|software|security|product|data)(?: engineering)?\s+intern)\b/i);
  const role = (internMatch?.[1] ?? roleMatch?.[1] ?? "").trim().replace(/\s+/g, " ");

  let location = "";
  if (/\bremote\b/i.test(text)) location = "Remote";
  const city = text.match(/\b(Boston|New York|NYC|San Francisco|SF|Williamstown)\b/i)?.[1];
  if (city) location = location ? `${location} / ${city}` : city;

  let audience = "";
  if (/williams students?/i.test(text)) audience = "Williams students";
  else if (/alumni/i.test(text)) audience = "Williams alumni";

  const saysHappyToTalk = /happy to talk|open to talk|glad to chat/i.test(text);
  const explicitReferral = /referral available|happy to refer|can refer|warm referral/i.test(text) && !/no referral|cannot refer|can.t refer|not available|unable to refer/i.test(text);
  const referral = explicitReferral ? "available" : "not-confirmed";

  const title = role ? `${role.replace(/\bml\b/i, "ML")} opportunity` : "";
  const notes = [
    ...(saysHappyToTalk && !explicitReferral ? ["Text says happy to talk, but does not explicitly confirm a referral."] : []),
    ...(!type ? ["Type was not confidently detected; choose one before approving."] : []),
    ...(!role ? ["Role/title was not confidently detected; add it manually."] : []),
  ];

  return { type, title, role, location, audience, referral, topics: uniqueTopics, notes };
}

