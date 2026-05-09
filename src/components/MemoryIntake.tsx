import { useState } from "react"
import { api } from "../lib/api"
import { DEMO_CLIENT_ID, DEMO_CLIENT_NAME, DEMO_MEMORIES } from "../lib/demo/seed"
import type { MemoryType } from "../lib/types"

const MEMORY_TYPES: { value: MemoryType; label: string }[] = [
  { value: "delivery_feedback", label: "Delivery Feedback" },
  { value: "revision_pattern", label: "Revision Pattern" },
  { value: "client_preference", label: "Client Preference" },
  { value: "tone_preference", label: "Tone Preference" },
  { value: "editing_preference", label: "Editing Preference" },
  { value: "brand_constraint", label: "Brand Constraint" },
  { value: "performance_signal", label: "Performance Signal" },
  { value: "editor_note", label: "Editor Note" },
  { value: "project_context", label: "Project Context" },
]

interface Props {
  clientId: string
  onClientChange: (id: string) => void
  memoriesLoaded: boolean
  onMemoriesLoaded: () => void
}

export function MemoryIntake({ clientId, onClientChange, memoriesLoaded, onMemoriesLoaded }: Props) {
  const [source, setSource] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState<MemoryType>("delivery_feedback")
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)
  const [customClient, setCustomClient] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  const activeClientId = useCustom ? customClient : clientId

  async function loadDemo() {
    setDemoLoading(true)
    setStatus(null)
    try {
      onClientChange(DEMO_CLIENT_ID)
      setUseCustom(false)
      const res = await api.ingest({ clientId: DEMO_CLIENT_ID, items: DEMO_MEMORIES })
      setStatus({ ok: true, msg: `Loaded ${res.memoriesAdded} memories for ${DEMO_CLIENT_NAME}` })
      onMemoriesLoaded()
    } catch (e) {
      setStatus({ ok: false, msg: String(e) })
    } finally {
      setDemoLoading(false)
    }
  }

  async function addMemory() {
    if (!content.trim() || !activeClientId) return
    setLoading(true)
    setStatus(null)
    try {
      const res = await api.ingest({
        clientId: activeClientId,
        items: [{ type, source: source || "manual entry", content }],
      })
      setStatus({ ok: true, msg: `Memory added (${res.memoriesAdded} ingested)` })
      setContent("")
      setSource("")
      onMemoriesLoaded()
    } catch (e) {
      setStatus({ ok: false, msg: String(e) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Client selector */}
      <div className="card">
        <p className="label mb-3">Client</p>
        <div className="flex gap-2 mb-3">
          <button
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              !useCustom
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-zinc-500 hover:border-zinc-600"
            }`}
            onClick={() => { setUseCustom(false); onClientChange(DEMO_CLIENT_ID) }}
          >
            {DEMO_CLIENT_NAME}
          </button>
          <button
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              useCustom
                ? "border-gold text-gold bg-gold/10"
                : "border-border text-zinc-500 hover:border-zinc-600"
            }`}
            onClick={() => setUseCustom(true)}
          >
            Custom
          </button>
        </div>
        {useCustom && (
          <input
            className="input"
            placeholder="client-id (e.g. acme-brand)"
            value={customClient}
            onChange={(e) => { setCustomClient(e.target.value); onClientChange(e.target.value) }}
          />
        )}
      </div>

      {/* Demo loader */}
      <div className="card border-dashed border-gold/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label mb-1">Demo Mode</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Load 12 seeded memories for <span className="text-zinc-300">{DEMO_CLIENT_NAME}</span> — a real estate creator with
              strong opinions on hooks, pacing, and tone.
            </p>
          </div>
          <button className="btn-primary shrink-0" onClick={loadDemo} disabled={demoLoading}>
            {demoLoading ? "Loading…" : "Load Demo"}
          </button>
        </div>
        {memoriesLoaded && (
          <p className="text-xs text-emerald-400 mt-3">
            ✓ Demo memories active — go to Taste Profile to generate
          </p>
        )}
      </div>

      {/* Manual memory input */}
      <div className="card">
        <p className="label mb-4">Add Memory</p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Type</label>
            <select
              className="select"
              value={type}
              onChange={(e) => setType(e.target.value as MemoryType)}
            >
              {MEMORY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Source</label>
            <input
              className="input"
              placeholder="e.g. Round 2 revision notes, client call Oct 14"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Content</label>
            <textarea
              className="textarea"
              rows={4}
              placeholder="Paste feedback, notes, revision comments, or preferences…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            className="btn-primary"
            onClick={addMemory}
            disabled={loading || !content.trim() || !activeClientId}
          >
            {loading ? "Ingesting…" : "Add to Memory"}
          </button>
        </div>
      </div>

      {status && (
        <p
          className={`text-sm px-4 py-3 rounded-md ${
            status.ok
              ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
              : "bg-red-950 text-red-400 border border-red-900"
          }`}
        >
          {status.msg}
        </p>
      )}
    </div>
  )
}
