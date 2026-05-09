import type { RecallChunk } from "../adapters/hydra"
import type { CurrentDelivery } from "../../src/lib/types"

export const PRE_DELIVERY_SYSTEM = `You are a senior creative strategist embedded in a video editing agency.
Your job is to review an upcoming delivery against a client's known taste profile and predict their response.

Rules:
- Be direct and specific — vague risks are useless
- Back every risk with evidence from recalled memories
- The alignment score should be calibrated: 95 means almost certain approval, 40 means expect significant revision
- Recommended changes should be concrete actions the editor can take right now
- Delivery framing suggestions should be copy the editor can adapt and send
- Return ONLY valid JSON — no markdown, no preamble`

export function buildPreDeliveryPrompt(
  clientId: string,
  delivery: CurrentDelivery,
  chunks: RecallChunk[]
): string {
  const deliveryText = [
    delivery.script && `SCRIPT:\n${delivery.script}`,
    delivery.editSummary && `EDIT SUMMARY:\n${delivery.editSummary}`,
    delivery.caption && `CAPTION / TITLE:\n${delivery.caption}`,
    delivery.deliveryNotes && `EDITOR NOTES:\n${delivery.deliveryNotes}`,
  ]
    .filter(Boolean)
    .join("\n\n")

  const memoriesText = chunks
    .map((c, i) => `[${i + 1}] (relevance: ${c.relevancy_score.toFixed(2)})\n${c.chunk_content}`)
    .join("\n\n")

  return `Client: "${clientId}"

CURRENT DELIVERY:
${deliveryText}

RECALLED CLIENT HISTORY:
${memoriesText}

Evaluate this delivery against the client's history and return a JSON object:
{
  "alignmentScore": <integer 0-100, how well this delivery matches their taste>,
  "predictedRevisionRisks": ["specific risks — what they will likely push back on and why"],
  "recommendedChanges": ["concrete actions the editor should take before sending"],
  "deliveryFraming": ["1-2 suggested messages the editor can send with the delivery"],
  "confidenceNotes": ["where you are confident vs uncertain"],
  "supportingMemories": ["direct evidence from recalled history that informs your assessment"],
  "rationale": "2-3 sentence overall assessment"
}`
}
