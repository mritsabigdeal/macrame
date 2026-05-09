const BASE = "https://api.hydradb.com"

function headers() {
  return {
    Authorization: `Bearer ${process.env.HYDRADB_API_KEY}`,
    "Content-Type": "application/json",
  }
}

export async function createTenant(tenantId: string): Promise<void> {
  const res = await fetch(`${BASE}/tenants/create`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ tenant_id: tenantId }),
  })
  // 409 = already exists, that's fine
  if (!res.ok && res.status !== 409) {
    throw new Error(`HydraDB createTenant failed: ${res.status}`)
  }
}

export async function addMemories(
  tenantId: string,
  subTenantId: string,
  memories: { text: string; infer?: boolean }[]
): Promise<void> {
  const res = await fetch(`${BASE}/memories/add_memory`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      tenant_id: tenantId,
      sub_tenant_id: subTenantId,
      memories: memories.map((m) => ({ text: m.text, infer: m.infer ?? true })),
    }),
  })
  if (!res.ok) {
    throw new Error(`HydraDB addMemories failed: ${res.status}`)
  }
}

export interface RecallChunk {
  chunk_uuid: string
  source_id: string
  chunk_content: string
  relevancy_score: number
}

export async function recall(
  tenantId: string,
  subTenantId: string,
  query: string,
  maxResults = 20
): Promise<RecallChunk[]> {
  const body = {
    tenant_id: tenantId,
    sub_tenant_id: subTenantId,
    query,
    max_results: maxResults,
    graph_context: true,
  }
  console.log("[hydra recall] request:", JSON.stringify(body))
  const res = await fetch(`${BASE}/recall/recall_preferences`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  })
  const text = await res.text()
  console.log("[hydra recall] status:", res.status, "body:", text.slice(0, 300))
  if (!res.ok) {
    throw new Error(`HydraDB recall failed: ${res.status} ${text}`)
  }
  const data = JSON.parse(text)
  return (data.chunks ?? []) as RecallChunk[]
}
