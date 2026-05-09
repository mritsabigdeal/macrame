import { useState } from "react"
import { api } from "../lib/api"
import { EvidenceCard } from "./EvidenceCard"
import type { DeliveryReview, CurrentDelivery } from "../lib/types"

interface Props {
  clientId: string
  memoriesLoaded: boolean
}

function ScoreDial({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400"
  const label =
    score >= 80 ? "Strong Alignment" : score >= 60 ? "Moderate Risk" : "High Revision Risk"

  return (
    <div className="flex items-center gap-4">
      <div className={`text-6xl font-light tabular-nums ${color}`}>{score}</div>
      <div>
        <p className={`text-sm font-medium ${color}`}>{label}</p>
        <p className="text-xs text-zinc-600 mt-0.5">Delivery readiness score</p>
      </div>
    </div>
  )
}

const DEMO_DELIVERY: CurrentDelivery = {
  editSummary:
    "60-second real estate market update. Opens with a slow cinematic pan over a neighborhood, then cuts to the agent speaking. Music-forward first 5 seconds before the agent appears. CTA at end: 'Reach out if you have questions about the market.'",
  script:
    "The market is shifting. Whether you're buying or selling, now is a time to pay close attention. Interest rates, inventory levels, and buyer sentiment are all moving in ways that could impact your decisions. Reach out if you have questions about what this means for your situation.",
  caption: "What's happening in the market right now 🏡 #realestate #marketupdate",
}

export function PreDeliveryReview({ clientId, memoriesLoaded }: Props) {
  const [delivery, setDelivery] = useState<CurrentDelivery>({
    script: "",
    editSummary: "",
    caption: "",
    deliveryNotes: "",
  })
  const [review, setReview] = useState<DeliveryReview | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  function loadDemoDelivery() {
    setDelivery(DEMO_DELIVERY)
  }

  async function runReview() {
    if (!clientId) return
    setLoading(true)
    setError(null)
    try {
      const result = await api.preDeliveryReview({ clientId, currentDelivery: delivery })
      setReview(result)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  function copyFraming(text: string, i: number) {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  const hasDelivery = Object.values(delivery).some((v) => v?.trim())

  return (
    <div className="flex flex-col gap-5">
      {/* Delivery input */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="label">Current Delivery</p>
          <button className="btn-ghost text-xs" onClick={loadDemoDelivery}>
            Load Demo Delivery
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Edit Summary</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Describe the edit — format, structure, pacing, key moments…"
              value={delivery.editSummary}
              onChange={(e) => setDelivery((d) => ({ ...d, editSummary: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Script</label>
            <textarea
              className="textarea"
              rows={4}
              placeholder="Paste the script or spoken content…"
              value={delivery.script}
              onChange={(e) => setDelivery((d) => ({ ...d, script: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Caption / Title</label>
            <input
              className="input"
              placeholder="Caption, title, or hook text…"
              value={delivery.caption}
              onChange={(e) => setDelivery((d) => ({ ...d, caption: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Editor Notes</label>
            <textarea
              className="textarea"
              rows={2}
              placeholder="Anything else about this delivery the system should know…"
              value={delivery.deliveryNotes}
              onChange={(e) => setDelivery((d) => ({ ...d, deliveryNotes: e.target.value }))}
            />
          </div>
          <button
            className="btn-primary"
            onClick={runReview}
            disabled={loading || !memoriesLoaded || !hasDelivery || !clientId}
          >
            {loading ? "Reviewing…" : "Run Pre-Delivery Check"}
          </button>
          {!memoriesLoaded && (
            <p className="text-xs text-zinc-600">Load client memory first</p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm px-4 py-3 rounded-md bg-red-950 text-red-400 border border-red-900">
          {error}
        </p>
      )}

      {loading && (
        <div className="card flex flex-col gap-4 animate-pulse">
          <div className="h-16 bg-zinc-800 rounded w-1/3" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-5/6" />
          <div className="h-3 bg-zinc-800 rounded w-4/6" />
        </div>
      )}

      {review && !loading && (
        <>
          {/* Score */}
          <div className="card border-zinc-700">
            <ScoreDial score={review.alignmentScore} />
            {review.rationale && (
              <p className="text-sm text-zinc-400 leading-relaxed mt-4 pt-4 border-t border-border">
                {review.rationale}
              </p>
            )}
          </div>

          {/* Revision risks */}
          {review.predictedRevisionRisks?.length > 0 && (
            <div className="card">
              <p className="label mb-3">Predicted Revision Risks</p>
              <ul className="flex flex-col gap-3">
                {review.predictedRevisionRisks.map((risk, i) => (
                  <li key={i} className="risk-high text-sm text-zinc-300 leading-relaxed">
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended changes */}
          {review.recommendedChanges?.length > 0 && (
            <div className="card">
              <p className="label mb-3">Recommended Changes</p>
              <ul className="flex flex-col gap-3">
                {review.recommendedChanges.map((change, i) => (
                  <li key={i} className="flex gap-2 text-sm text-zinc-300 leading-relaxed">
                    <span className="text-gold shrink-0 mt-0.5">→</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Delivery framing */}
          {review.deliveryFraming?.length > 0 && (
            <div className="card border-gold/20">
              <p className="label mb-3">Suggested Delivery Message</p>
              <div className="flex flex-col gap-3">
                {review.deliveryFraming.map((frame, i) => (
                  <div key={i} className="relative group">
                    <p className="text-sm text-zinc-300 leading-relaxed bg-black border border-border rounded-md p-3 pr-16">
                      {frame}
                    </p>
                    <button
                      className="absolute right-3 top-3 text-xs text-zinc-600 hover:text-gold transition-colors"
                      onClick={() => copyFraming(frame, i)}
                    >
                      {copied === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supporting evidence */}
          {review.supportingMemories?.length > 0 && (
            <div>
              <p className="label mb-3">Why We Think This</p>
              <div className="flex flex-col gap-2">
                {review.supportingMemories.map((m, i) => (
                  <EvidenceCard key={i} text={m} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Confidence notes */}
          {review.confidenceNotes?.length > 0 && (
            <div className="card border-zinc-800">
              <p className="label mb-2">Confidence Notes</p>
              <ul className="flex flex-col gap-1.5">
                {review.confidenceNotes.map((n, i) => (
                  <li key={i} className="text-xs text-zinc-500 leading-relaxed flex gap-2">
                    <span className="shrink-0">·</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
