import { Router } from "express"
import { recall } from "../adapters/hydra"
import { generate } from "../adapters/pipeshift"
import { TASTE_PROFILE_SYSTEM, buildTasteProfilePrompt } from "../prompts/tasteProfile"
import type { TasteProfile, TasteProfileRequest } from "../../src/lib/types"

const router = Router()

router.post("/", async (req, res) => {
  try {
    const { clientId } = req.body as TasteProfileRequest

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required" })
    }

    const chunks = await recall(
      "macrame",
      clientId,
      `client preferences, editing style, tone, pacing, dislikes, revision patterns for ${clientId}`,
      25
    )

    console.log(`[taste-profile] recall returned ${chunks.length} chunks for ${clientId}`)

    if (chunks.length === 0) {
      return res.status(404).json({
        error: "No memories found for this client. Ingest some history first.",
      })
    }

    const userPrompt = buildTasteProfilePrompt(clientId, chunks)
    const profile = await generate<TasteProfile>(TASTE_PROFILE_SYSTEM, userPrompt)
    profile.clientId = clientId

    return res.json(profile)
  } catch (err) {
    console.error("Taste profile error:", err)
    return res.status(500).json({ error: String(err) })
  }
})

export default router
