import { Router } from "express"
import { recall } from "../adapters/hydra"
import { generate } from "../adapters/pipeshift"
import { PRE_DELIVERY_SYSTEM, buildPreDeliveryPrompt } from "../prompts/preDeliveryReview"
import type { DeliveryReview, PreDeliveryRequest } from "../../src/lib/types"

const router = Router()

router.post("/", async (req, res) => {
  try {
    const { clientId, currentDelivery } = req.body as PreDeliveryRequest

    if (!clientId || !currentDelivery) {
      return res.status(400).json({ error: "clientId and currentDelivery are required" })
    }

    const deliveryContext = [
      currentDelivery.script,
      currentDelivery.editSummary,
      currentDelivery.caption,
      currentDelivery.deliveryNotes,
    ]
      .filter(Boolean)
      .join(" ")

    const query = `revision risks, client preferences, dislikes, approval patterns related to: ${deliveryContext.slice(0, 400)}`

    const chunks = await recall("macrame", clientId, query, 20)

    if (chunks.length === 0) {
      return res.status(404).json({
        error: "No memories found for this client. Ingest some history first.",
      })
    }

    const userPrompt = buildPreDeliveryPrompt(clientId, currentDelivery, chunks)

    const review = await generate<DeliveryReview>(
      PRE_DELIVERY_SYSTEM,
      userPrompt,
      currentDelivery.imageBase64,
      currentDelivery.imageMediaType
    )

    return res.json(review)
  } catch (err) {
    console.error("Pre-delivery review error:", err)
    return res.status(500).json({ error: String(err) })
  }
})

export default router
