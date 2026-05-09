import type { MemoryItem } from "../types"

export const DEMO_CLIENT_ID = "fast-real-estate"
export const DEMO_CLIENT_NAME = "Fast Real Estate"

export const DEMO_MEMORIES: Omit<MemoryItem, "clientId" | "id">[] = [
  {
    type: "delivery_feedback",
    source: "Round 3 revision notes — Q1 listing video",
    content:
      "The opener felt too cinematic. We're not selling a luxury resort. Cut straight to the agent speaking or the property exterior. Clients in this market want real, not polished.",
    timestamp: "2024-11-14",
    importance: 9,
    tags: ["opener", "cinematic", "authenticity"],
  },
  {
    type: "editing_preference",
    source: "Client call notes — onboarding",
    content:
      "Kenny specifically said he wants the first 8–10 seconds to hook immediately. No slow reveals, no music-only intros. Jump to the point fast — the audience scrolls if you don't grab them.",
    timestamp: "2024-09-22",
    importance: 10,
    tags: ["hook", "pacing", "first-seconds"],
  },
  {
    type: "revision_pattern",
    source: "Round 2 feedback — coaching reel Sept",
    content:
      "Requested we go faster on cuts in the testimonial section. Said it felt like a corporate video. Fast cuts worked better in the prior coaching reel from July — use that as the reference.",
    timestamp: "2024-09-30",
    importance: 8,
    tags: ["cuts", "pacing", "testimonials"],
  },
  {
    type: "tone_preference",
    source: "Email thread — brand guidelines discussion",
    content:
      "Avoid luxury language. Words like 'prestigious', 'exclusive', and 'curated' feel off-brand. The tone should be confident and educational, not aspirational. Think mentor, not mansion.",
    timestamp: "2024-10-05",
    importance: 9,
    tags: ["tone", "language", "brand"],
  },
  {
    type: "client_preference",
    source: "Round 4 revision notes — market update video",
    content:
      "CTAs were too vague. 'Reach out to learn more' doesn't work. Needs to be specific — 'Book a 15-minute call this week' or 'DM me the word FAST.' Vague CTAs get ignored.",
    timestamp: "2024-11-28",
    importance: 9,
    tags: ["cta", "specificity"],
  },
  {
    type: "editing_preference",
    source: "Feedback call — November recap",
    content:
      "Captions should be bigger and bolder. We've gone back and forth but the data shows it — bold captions get more watch time. Don't use thin fonts. Make them impossible to miss.",
    timestamp: "2024-11-20",
    importance: 8,
    tags: ["captions", "bold", "typography"],
  },
  {
    type: "performance_signal",
    source: "Instagram analytics shared by client",
    content:
      "The July coaching reel outperformed everything else this quarter. Client attributes it to the direct opening and the fast-paced b-roll in the middle. Views 3x the account average.",
    timestamp: "2024-08-10",
    importance: 10,
    tags: ["top-performer", "coaching", "pacing"],
  },
  {
    type: "revision_pattern",
    source: "Round 1 feedback — Q4 market update",
    content:
      "Script ran too long at 90 seconds. Kenny wants 45–60 second max for educational content. Anything longer loses the audience before the CTA.",
    timestamp: "2024-10-18",
    importance: 7,
    tags: ["length", "script", "educational"],
  },
  {
    type: "brand_constraint",
    source: "Brand notes doc shared in Slack",
    content:
      "Music should always be upbeat but understated — not corporate, not lo-fi chill. Something with energy but not distracting. The July reel music was the right call. Reference that.",
    timestamp: "2024-09-15",
    importance: 6,
    tags: ["music", "audio", "brand"],
  },
  {
    type: "delivery_feedback",
    source: "Final approval message — October listing",
    content:
      "This one landed. The hook was direct, pacing was tight, and the CTA was specific. This is the standard now — don't go back to slow builds.",
    timestamp: "2024-10-29",
    importance: 10,
    tags: ["approved", "reference", "standard"],
  },
  {
    type: "editor_note",
    source: "Internal editor note — December project",
    content:
      "Client responds well when we send a short framing message with the delivery. Something like 'We leaned into the direct hook you liked in October' goes a long way. Sets expectations.",
    timestamp: "2024-12-01",
    importance: 7,
    tags: ["delivery", "framing", "communication"],
  },
  {
    type: "tone_preference",
    source: "Round 2 revision — agent intro video",
    content:
      "Pulled back the polish on the color grade per client request. Said the warmer, slightly raw look felt more like him. Doesn't want it to look like every other real estate agent.",
    timestamp: "2024-11-05",
    importance: 7,
    tags: ["color", "authenticity", "visual-style"],
  },
]
