import type {
  IngestRequest,
  TasteProfileRequest,
  PreDeliveryRequest,
  TasteProfile,
  DeliveryReview,
} from "./types"

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  ingest: (body: IngestRequest) =>
    post<{ success: boolean; memoriesAdded: number }>("/api/ingest", body),

  tasteProfile: (body: TasteProfileRequest) =>
    post<TasteProfile>("/api/taste-profile", body),

  preDeliveryReview: (body: PreDeliveryRequest) =>
    post<DeliveryReview>("/api/pre-delivery-review", body),
}
