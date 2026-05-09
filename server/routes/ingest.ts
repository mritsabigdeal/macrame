import { Router } from "express"
import { createTenant, addMemories } from "../adapters/hydra"
import type { IngestRequest } from "../../src/lib/types"

const router = Router()

router.post("/", async (req, res) => {
  try {
    const { clientId, items } = req.body as IngestRequest

    if (!clientId || !items?.length) {
      return res.status(400).json({ error: "clientId and items are required" })
    }

    const tenantId = "macrame"
    const subTenantId = clientId

    // Create tenant (idempotent)
    await createTenant(tenantId)

    // Format memories with source context
    const memories = items.map((item) => ({
      text: `[${item.type}] Source: ${item.source}\n${item.content}`,
      infer: false,
    }))

    await addMemories(tenantId, subTenantId, memories)

    return res.json({ success: true, memoriesAdded: items.length })
  } catch (err) {
    console.error("Ingest error:", err)
    return res.status(500).json({ error: String(err) })
  }
})

export default router
