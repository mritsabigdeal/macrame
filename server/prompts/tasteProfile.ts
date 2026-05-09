import type { RecallChunk } from "../adapters/hydra"

export const TASTE_PROFILE_SYSTEM = `You are a creative intelligence system for a video editing agency.
Your job is to analyze historical client feedback, revision notes, and communication patterns to build a precise taste profile.

Rules:
- Synthesize patterns, do not just quote memories
- Distinguish durable preferences (repeated across time) from recent signals (one or two instances)
- Be specific and actionable — vague generalizations are useless to an editor
- Surface dislikes and revision triggers explicitly
- Note your confidence level honestly
- Return ONLY valid JSON matching the schema exactly — no markdown, no explanation outside the JSON`

export function buildTasteProfilePrompt(
  clientId: string,
  chunks: RecallChunk[]
): string {
  const memoriesText = chunks
    .map((c, i) => `[${i + 1}] (relevance: ${c.relevancy_score.toFixed(2)})\n${c.chunk_content}`)
    .join("\n\n")

  return `Build a taste profile for client "${clientId}" based on these recalled memories:

${memoriesText}

Return a JSON object with this exact shape:
{
  "clientId": "${clientId}",
  "summary": "2-3 sentence editorial summary of who this client is and what they want",
  "tonePreferences": ["string array of tone/voice preferences"],
  "editingPreferences": ["string array of editing style preferences"],
  "pacingPreferences": ["string array of pacing preferences"],
  "dislikes": ["string array of specific dislikes, the more specific the better"],
  "revisionTriggers": ["string array of things that reliably trigger revision requests"],
  "deliveryPreferences": ["string array of how they like edits delivered / framed"],
  "highConfidencePatterns": ["patterns you've seen 3+ times or marked high importance"],
  "evolvingSignals": ["recent shifts or one-time signals worth watching"],
  "confidenceNotes": ["where you have strong evidence vs where you're inferring"],
  "supportingMemories": ["3-5 direct quotes or paraphrases from the memories as evidence"]
}`
}
